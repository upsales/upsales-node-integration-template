const errors = require('./errors');
const requiredInput = require('../../helpers/errorsHelper').requiredInput;

module.exports = function ({ apiKey } = requiredInput('options'), { axios, errorsHelper, logger } = requiredInput('dependencies')) {

  const getCurrencies = async () => {
    try {
      logger.info('Getting Upsales currencies...');
      const options = {
        method: 'GET',
        url: 'https://power.upsales.com/api/v2/currencies',
        headers: {
          'Cookie': `token=${apiKey}`,
          'Content-Type': 'application/json'
        }
      };

      logger.info('Sending Upsales API request to get currencies...');
      const currencies = (await axios(options)).data.data;
      logger.info('Upsales currencies retrieved.');

      return currencies;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.UPSALES_GET_CURRENCIES_ERROR, err);
      logger.error(errorToReport);
      throw errorToReport;
    }
  };


  const findMasterCurrency = (currencies) => {
    try {
      const foundCurrency = currencies.find((element) => element.masterCurrency);
      return foundCurrency.iso;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.FIND_MASTER_CURRENCY_ERROR, err);
      logger.error(errorToReport);
      throw errorToReport;
    }
  };


  const getMasterCurrency = async () => {
    try {
      logger.info('Getting master currency...');
      const currencies = await getCurrencies(apiKey);
      return findMasterCurrency(currencies);

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.UPSALES_GET_MASTER_CURRENCY_ERROR, err);
      logger.error(errorToReport);
      throw errorToReport;
    }
  };


  return { getMasterCurrency, findMasterCurrency, getCurrencies };
};
