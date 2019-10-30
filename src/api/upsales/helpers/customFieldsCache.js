module.exports = function () {
  let cache = { };


  const clear = (entityType) => {
    try {
      if (!entityType) {
        cache = {};

      } else {
        initEmptyRoots();

        cache.fieldsList[entityType] = {};
        cache.byAlias[entityType] = {};
        cache.byId[entityType] = {};
      }
    } catch (ex) {
      //Ignore errors
    }
  };


  const initEmptyRoots = () => {
    try {
      if (!cache.fieldsList) {
        cache.fieldsList = {};
      }

      if (!cache.byAlias) {
        cache.byAlias = {};
      }

      if (!cache.byId) {
        cache.byId = {};
      }
    } catch (ex) {
      //Ignore errors
    }
  };


  const initEmptyEntityRoots = (entityType) => {
    try {
      initEmptyRoots();

      if (!cache.fieldsList[entityType]) {
        cache.fieldsList[entityType] = [];
      }

      if (!cache.byAlias[entityType]) {
        cache.byAlias[entityType] = {};
      }

      if (!cache.byId[entityType]) {
        cache.byId[entityType] = {};
      }
    } catch (ex) {
      //Ignore errors
    }
  };


  const replaceFields = (entityType, fields) => {
    try {
      initEmptyEntityRoots(entityType);

      cache.fieldsList[entityType] = [];
      cache.byAlias[entityType] = {};

      for (const field of fields) {
        addField(entityType, field);
      }
    } catch (ex) {
      //Ignore errors
    }
  };


  const addField = (entityType, field) => {
    try {
      initEmptyEntityRoots(entityType);

      cache.fieldsList[entityType].push(field);

      try {
        cache.byAlias[entityType][field.alias.toUpperCase()] = field;
      } catch (ex) {
        //Ignore errors
      }

      try {
        cache.byId[entityType][field.id] = field;
      } catch (ex) {
        //Ignore errors
      }
    } catch (ex) {
      //Ignore errors
    }
  };


  const getEntityFields = (entityType) => {
    try {
      initEmptyEntityRoots(entityType);
      return cache.fieldsList[entityType];
    } catch (ex) {
      //Ignore errors
    }
  };


  const getEntityFieldsByAliasMap = (entityType) => {
    try {
      initEmptyEntityRoots(entityType);
      return cache.byAlias[entityType];
    } catch (ex) {
      //Ignore errors
    }
  };


  const getEntityFieldsByIdMap = (entityType) => {
    try {
      initEmptyEntityRoots(entityType);
      return cache.byId[entityType];
    } catch (ex) {
      //Ignore errors
    }
  };


  const getByAlias = (entityType, alias) => {
    try {
      initEmptyEntityRoots(entityType);
      return cache.byAlias[entityType][alias.toUpperCase()];
    } catch (err) {
      //Ignore errors
    }
  };


  const getById = (entityType, id) => {
    try {
      initEmptyEntityRoots(entityType);
      return cache.byId[entityType][id];
    } catch (err) {
      //Ignore errors
    }
  };


  return {
    addField,
    clear,
    getByAlias,
    getById,
    getEntityFields,
    getEntityFieldsByAliasMap,
    getEntityFieldsByIdMap,
    replaceFields
  };
};
