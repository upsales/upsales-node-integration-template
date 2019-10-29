const errors = require('./errors');
const requiredInput = require('../../helpers/errorsHelper').requiredInput;

module.exports = function ({ apiKey } = requiredInput('options'), { axios, errorsHelper, logger } = requiredInput('dependencies')) {

  const set = async (paramId, value) => {
    try {
      logger.info('Setting upsales client parameter...');
      const options = {
        method: 'PUT',
        url: `https://power.upsales.com/api/v2/master/clientParam/${paramId}`,
        headers: {
          'Cookie': `token=${apiKey}`,
          'Content-Type': 'application/json'
        },
        data: value
      };

      logger.info('Sending Upsales API request to set client parameter...');
      const upsalesResponse = await axios(options).then(result => {
        logger.info('Upsales client parameter has been set.');
        return result.data;
      });

      return upsalesResponse;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.SET_UPSALES_CLIENT_PARAM_ERROR, err);
      logger.error(errorToReport);
      throw errorToReport;
    }
  };


  return { set };
};
