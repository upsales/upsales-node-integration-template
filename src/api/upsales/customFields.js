const Cache = require('./helpers/customFieldsCache');
const errors = require('./errors');
const requiredInput = require('../../helpers/errorsHelper').requiredInput;

module.exports = function (options, { upsales, errorsHelper, logger } = requiredInput('dependencies')) {
  const cache = Cache();


  const clearCache = (entityType) => {
    cache.clear(entityType);
  }


  const getById = (customFields, fieldId) => {
    try {
      if (!customFields || !Array.isArray(customFields)) {
        return;
      }

      const field = customFields.find((element) => {
        return element.fieldId == fieldId;
      });

      return field;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.FIND_CUSTOM_FIELD_BY_ID_ERROR, err);
      logger.error(errorToReport);
    }
  };


  const getByAlias = async (customFields, entityType, alias, cached = true) => {
    try {
      if (!customFields || !Array.isArray(customFields)) {
        return;
      }

      const fieldMetadata = await loadEntityFieldByAlias(entityType, alias, cached);
      if (!fieldMetadata) {
        logger.info(`Could not find ${entityType} custom field ${alias}.`);
        return;
      }

      const fieldId = fieldMetadata.id;

      const field = customFields.find((element) => {
        return element.fieldId == fieldId;
      });

      return field;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.FIND_CUSTOM_FIELD_BY_ALIAS_ERROR, err);
      logger.error(errorToReport);
    }
  };


  const getValueById = (customFields, fieldId) => {
    try {
      const field = getById(customFields, fieldId);
      if (!field) {
        return;
      }
      return field.value;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.FIND_CUSTOM_FIELD_VALUE_BY_ID_ERROR, err);
      logger.error(errorToReport);
    }
  };


  const getValueByAlias = async (customFields, entityType, alias, cached = true) => {
    try {
      const field = await getByAlias(customFields, entityType, alias, cached);
      if (!field) {
        return;
      }
      return field.value;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.FIND_CUSTOM_FIELD_VALUE_BY_ALIAS_ERROR, err);
      logger.error(errorToReport);
    }
  };


  const setById = (upsalesEntity, field) => {
    try {
      if (!upsalesEntity.custom) {
        upsalesEntity.custom = [];
      }

      const fieldIndex = upsalesEntity.custom.findIndex((element) => {
        return element.fieldId == field.fieldId;
      });

      if (fieldIndex < 0) {
        upsalesEntity.custom.push(field);

      } else {
        upsalesEntity.custom.splice(fieldIndex, 1, field);
      }

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.SET_CUSTOM_FIELD_VALUE_ERROR, err);
      logger.error(errorToReport);
    }

    return upsalesEntity;
  };


  const setByAlias = async (upsalesEntity, entityType, alias, field, cached = true) => {
    const metadata = await loadEntityFieldByAlias(entityType, alias, cached);
    if (!metadata) {
      return upsalesEntity;
    }

    field.fieldId = metadata.id;
    return setById(upsalesEntity, field);
  };


  const setValueById = (upsalesEntity, fieldId, value) => {
    return setById(upsalesEntity,
      {
        fieldId: fieldId,
        value: value
      }
    );
  };


  const setValueByAlias = async (upsalesEntity, entityType, alias, value, cached = true) => {
    return await setByAlias(upsalesEntity, entityType, alias, {
      value: value
    }, cached);
  };


  const findFieldByAlias = (fields, alias) => {
    const safeAliasEqualsFunc = (element) => {
      try {
        return element.alias.toUpperCase() == alias;
      } catch (err) {
        //Ignore any errors
      }
    };

    try {
      alias = alias.toUpperCase();
      return fields.find(safeAliasEqualsFunc);

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.FIND_CUSTOM_FIELD_BY_ALIAS_ERROR, err);
      logger.error(errorToReport);
    }
  };


  const loadEntityFields = async (entityType, cached = true) => {
    try {
      let customFields;

      if (cached) {
        customFields = cache.getEntityFields(entityType);
      }

      if (!customFields || customFields.length == 0) {
        customFields = await upsales[entityType].customfields.list();
        if (cached) {
          cache.replaceFields(entityType, customFields);
        }
      }

      return customFields;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.LOAD_ENTITY_FIELDS_ERROR, err);
      logger.error(errorToReport);
    }

    return {};
  }


  const loadEntityFieldByAlias = async (entityType, alias, cached = true) => {
    try {
      let foundField;

      if (cached) {
        foundField = cache.getByAlias(entityType, alias);
      }

      if (!foundField) {
        const customFields = await upsales[entityType].customfields.list();
        foundField = findFieldByAlias(customFields, alias);

        if (cached) {
          cache.replaceFields(entityType, customFields);
        }
      }

      return foundField;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.LOAD_CUSTOM_FIELD_BY_ALIAS_ERROR, err);
      logger.error(errorToReport);
    }
  };


  const ensureOneFieldExist = async (entityType, fieldDescription, cached = true) => {
    let field;
    let isNew = false;

    try {
      const fieldAlias = fieldDescription.alias.toUpperCase();
      const fieldName = fieldDescription.name;

      try {
        logger.info('Retrieve ' + fieldName + ' field...');
        field = await loadEntityFieldByAlias(entityType, fieldAlias, cached);
      } catch (err) {
        const errorToReport = errorsHelper.wrapError(errors.ENSURE_CUSTOM_FIELDS_EXIST_POSSIBLE_ERROR, err);
        logger.debug(errorToReport);
      }

      if (field == null) {
        logger.info(fieldName + ' field not found. Creating one...');
        const data = Object.assign({}, fieldDescription);

        field = await upsales[entityType].customfields.create(data);
        isNew = true;

        if (field && cached) {
          cache.addField(entityType, field);
        }

        logger.info(fieldName + ' field created.');
      } else {
        logger.info(fieldName + ' field found.');
      }

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.ENSURE_ONE_CUSTOM_FIELD_EXIST_ERROR, err);
      logger.error(errorToReport);
    }

    if (!field) {
      return;
    }

    return {
      field: field,
      isNew: isNew
    };
  };


  const ensureFieldsExist = async (customFieldsList, cached = true) => {
    try {
      const isArrayReceived = Array.isArray(customFieldsList);
      if (!isArrayReceived) {
        customFieldsList = [ customFieldsList ];
      }

      const results = [];
      for (const fieldMetadata of customFieldsList) {
        logger.info('Check field: ' + fieldMetadata.comment);
        const field = await ensureOneFieldExist(fieldMetadata.entityType, fieldMetadata.fieldDescription, cached);
        logger.info('Finished: Check field: ' + fieldMetadata.comment);

        if (field) {
          results.push(field);
        }
      }

      if (isArrayReceived) {
        return results;
      } else {
        return results[0];
      }
    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.ENSURE_CUSTOM_FIELDS_EXIST_ERROR, err);
      logger.error(errorToReport);
    }
  };


  return {
    metadata: {
      ensureFieldsExist,
      findFieldByAlias,
      loadEntityFieldByAlias,
      loadEntityFields
    },

    clearCache,

    getByAlias,
    getById,
    getValueByAlias,
    getValueById,

    setByAlias,
    setById,
    setValueByAlias,
    setValueById
  };

};
