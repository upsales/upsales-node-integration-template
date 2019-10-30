/**
 * Upsales API wrapper
 */

const axios = require('axios');
const axiosRetry = require('axios-retry');

const AppConfig = require('./appConfig');
const ClientParam = require('./clientParam');
const Currency = require('./currency');
const CustomFields = require('./customFields');
const ExternalCall = require('./externalCall');
const DynamicLink = require('./dynamicLink');
const UINotification = require('./uiNotification');

const requiredInput = require('../../helpers/errorsHelper').requiredInput;


axiosRetry(axios, {
  retries: 6,
  retryDelay: axiosRetry.exponentialDelay
});


/**
 * Represents an Upsales API wrapper
 * @constructor
 * @param {object} options - access keys and other options (apiKey, integrationId, callbackUrl, importId)
 * @param {object} dependencies - dependencies of the Upsales API wrapper
 */
module.exports = function (options = requiredInput('options'), { upsales, logger, errorsHelper } = requiredInput('dependencies')) {
  const dependencies = { axios, errorsHelper, logger, upsales };

  const appConfig = new AppConfig(options, dependencies);
  const clientParam = new ClientParam(options, dependencies);
  const currency = new Currency(options, dependencies);
  const customFields = new CustomFields(options, dependencies);
  const externalCall = new ExternalCall(options, dependencies);
  const dynamicLink = new DynamicLink(options, dependencies);
  const uiNotification = new UINotification(options, dependencies);

  return { appConfig, clientParam, currency, customFields, entity: upsales, externalCall, uiNotification };
};
