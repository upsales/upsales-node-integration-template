const serializeError = require('serialize-error');


const requiredInput = (name) => {
  throw {
    code: 'REQUIRED_FUNCTION_PARAMETER_MISSING',
    message: `Parameter ${name} is required`
  };
};


const wrapError = (options, cause) => {
  try {
    let serializedError;
    if (!cause) {
      cause = options.cause;
    }
    if (cause) {
      serializedError = serializeError(cause);

      if (!serializedError) {
        serializedError = JSON.stringify(cause);
      }
    }

    return {
      code: options.code ? options.code : '',
      message: options.message ? options.message : '',
      cause: serializedError
    }
  } catch (err) {
    //Ignore errors
    return options;
  }
};


module.exports = {
  requiredInput: requiredInput,
  wrapError: wrapError
};
