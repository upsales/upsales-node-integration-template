const errors = require('./errors');
const requiredInput = require('../../helpers/errorsHelper').requiredInput;

module.exports = function ({ apiKey } = requiredInput('options'), { axios, errorsHelper, logger } = requiredInput('dependencies')) {

  const createDynamicLink = async (linkObject) => {
    try {
      const upsalesPowerApiUrl = 'https://power.upsales.com/api/v2/link?token=' + apiKey;
      const upsalesResponse = await axios.post(upsalesPowerApiUrl, linkObject).then(result => result.data);
      return upsalesResponse;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.UPSALES_CREATE_DYNAMIC_LINK_ERROR, err);
      logger.error(errorToReport);
    }
  }


  const loadDynamicLinks = async () => {
    try {
      const upsalesPowerApiUrl = 'https://power.upsales.com/api/v2/link?token=' + apiKey;
      const upsalesResponse = await axios.get(upsalesPowerApiUrl).then(result => result.data ? result.data.data : []);
      return upsalesResponse;

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.UPSALES_LOAD_DYNAMIC_LINK_ERROR, err);
      logger.error(errorToReport);
    }
  }


  const isDynamicLinkExist = async (linkObject) => {
    try {
      let links = await loadDynamicLinks();
      if (links && !Array.isArray(links)) {
        links = [ links ];
      }

      const existingLink = links.find(element => { return element.href == linkObject.href});
      if (existingLink) {
        return true;
      }

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.UPSALES_IS_DYNAMIC_LINK_EXIST_ERROR, err);
      logger.error(errorToReport);
    }

    return false;
  };


  const createDynamicLinkIfNecessary = async (linkObject) => {
    try {
      if (await isDynamicLinkExist(linkObject)) {
        logger.info('Dynamic link already exists.');
        return;
      }

      logger.info('Creating new dynamic link...');
      return await createDynamicLink(linkObject);

    } catch (err) {
      const errorToReport = errorsHelper.wrapError(errors.UPSALES_CREATE_DYNAMIC_LINK_IF_NECESSARY_ERROR, err);
      logger.error(errorToReport);
    }
  };


  return { createDynamicLink, createDynamicLinkIfNecessary, isDynamicLinkExist, loadDynamicLinks };
};
