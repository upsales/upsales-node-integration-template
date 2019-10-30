/**
 * Upsales API app config accessing wrapper
 */
const errors = require('./errors');
const requiredInput = require('../../helpers/errorsHelper').requiredInput;

/**
 * Represents an Upsales API app config accessing wrapper
 * @constructor
 * @param {object} options - access keys and other options (apiKey, integrationId)
 * @param {object} dependencies - dependencies (axios, errorsHelper, logger)
 */
module.exports = function ({ apiKey, integrationId } = requiredInput('options'), { axios, errorsHelper, logger } = requiredInput('dependencies')) {

  /**
   * Load app config from Upsales
   * @async
   * @return {object} app config
   *         Note:config itself will reside in configJson field as a JSON string
   * @throws Will throw an error if some error occures during HTTP request to Upsales server
   */
  const load = async () => {
    try {
      const upsalesAppConfigApiUrl = `https://power.upsales.com/api/v2/standardIntegrationSettings/${integrationId}?token=${apiKey}`;
      const appConfig = await axios.get(upsalesAppConfigApiUrl).then(result => result.data.data);
      return appConfig;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.LOAD_UPSALES_APP_CONFIG_ERROR, err);
      logger.error(errorToReport);
      throw errorToReport;
    }
  };


  /**
   * Save app config to Upsales
   * @async
   * @param {object} appConfig - an app config to save
   * @returns {object} response from Upsales server
   * @throws Will throw an error if some error occures during HTTP request to Upsales server
   */
  const save = async (appConfig) => {
    try {
      const upsalesAppConfigApiUrl = `https://power.upsales.com/api/v2/standardIntegrationSettings/${integrationId}?token=${apiKey}`;
      const upsalesResponse = await axios.put(upsalesAppConfigApiUrl, appConfig).then(result => result.data);
      return upsalesResponse;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.SAVE_UPSALES_APP_CONFIG_ERROR, err);
      logger.error(errorToReport);
      throw errorToReport;
    }
  };


  /**
   * Update specified fields of app config at Upsales
   * @async
   * @param {array<object>} changes - list of changes to apply to app config ([{name:'field_name', value:'value_to_set'}, ...])
   * @returns {boolean} true if app config has changed, false if none of the fields actually changed
   * @throws Will throw an error if some error occures during HTTP request to Upsales server
   */
  const updateFields = async (changes) => {
    try {
      const appConfig = await load();
      const parsedAppConfig = JSON.parse(appConfig.configJson);

      let hasChanges = false;

      for (let { name, value } of changes) {
        if (parsedAppConfig[name] != value) {
          hasChanges = true;
          parsedAppConfig[name] = value;
        }
      }

      if (hasChanges) {
        appConfig.configJson = JSON.stringify(parsedAppConfig);
        await save(appConfig);
      }

      return hasChanges;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.UPDATE_UPSALES_APP_CONFIG_ERROR, err);
      logger.error(errorToReport);
      throw errorToReport;
    }

  };


  return { load, save, updateFields };
};
