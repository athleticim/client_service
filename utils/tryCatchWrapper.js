const {generateInvalidResponse, getErrorMessage} = require('./generateResponse');

const tryCatchWrapper = async (req, res, next, handler, errMsg) => {
  try {
    const data = await handler(req, res);
    return res.status(200).send(data);
  } catch (error) {
    return res
        .status(400)
        .send(generateInvalidResponse('error', getErrorMessage(error, errMsg)));
  }
};

module.exports = {
  tryCatchWrapper,
};