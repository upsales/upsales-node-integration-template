const errors = require('./errors');
const requiredInput = require('../../helpers/errorsHelper').requiredInput;

module.exports = function ({ apiKey, callbackUrl='', importId='' } = requiredInput('options'), { axios, errorsHelper, logger } = requiredInput('dependencies')) {

  const safeSendProgress = async (progress, alternateImportId) => {
    try {
      const actualImportId = alternateImportId ? alternateImportId : importId;

      const options = {
        method: 'PUT',
        url: `https://power.upsales.com/api/v2/onboardingimports/${actualImportId}`,
        headers: {
          'Cookie': `token=${apiKey}`,
          'Content-Type': 'application/json'
        },
        data: {
          id: actualImportId,
          progress: progress
        }
      };

      logger.info('Sending progress: ' + progress);
      const upsalesResponse = await axios(options).then(result => {
        logger.info('Progress sent successfully: ' + progress);
        return result.data;
      });
      return upsalesResponse;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.UPSALES_UI_SEND_PROGRESS_ERROR, err);
      logger.error(errorToReport);
    }
  };


  const safeSendError = async (errorText, alternateCallbackUrl) => {
    try {
      const upsalesResponse = await safeSendMessage({
        message: errorText,
        notify: errorText
      }, alternateCallbackUrl);
      return upsalesResponse;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.UPSALES_UI_SEND_ERROR_ERROR, err);
      logger.error(errorToReport);
    }
  };


  const safeSendMessage = async (notification, alternateCallbackUrl) => {
    try {
      const actualCallbackUrl = alternateCallbackUrl ? alternateCallbackUrl : callbackUrl;

      if (typeof notification === 'string') {
        notification = {
          notify: notification
        };
      }

      const options = {
        method: 'POST',
        url: actualCallbackUrl,
        headers: {
          'Cookie': `token=${apiKey}`,
          'Content-Type': 'application/json'
        },
        data: notification
      };

      logger.info('Sending message to UI: ' + notification.notify);
      const upsalesResponse = await axios(options).then(result => {
        logger.info('Message to UI sent successfully: ' + notification.notify);
        return result.data;
      });
      return upsalesResponse;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.UPSALES_UI_SEND_MESSAGE_ERROR, err);
      logger.error(errorToReport);
    }
  };


  return { safeSendError, safeSendMessage, safeSendProgress };
};
