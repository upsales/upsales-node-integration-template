const errors = require('./errors');
const requiredInput = require('../../helpers/errorsHelper').requiredInput;

module.exports = function ({ integrationId, authenticationKey } = requiredInput('options'), { axios, errorsHelper, logger } = requiredInput('dependencies')) {

  const callHook = async (customerId, data) => {
    try {
      logger.info('Calling Upsales app external hook...');
      const options = {
        method: 'POST',
        url: `https://integration.upsales.com/api/external/appHook?customerId=${customerId}&authenticationKey=${authenticationKey}&appId=${integrationId}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      logger.info('  Sending Upsales API request to execute an external hook...');
      logger.debug(options);
      const upsalesResponse = await axios(options).then(result => {
        logger.info('  Upsales API request to execute an external hook is sent.');
        logger.debug(result);
        return result.data;
      });

      return upsalesResponse;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.SEND_UPSALES_EXTERNAL_APP_HOOK_ERROR, err);
      logger.error(errorToReport);
      throw errorToReport;
    }
  };


  return { callHook };
};
