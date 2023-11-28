
const generateInvalidResponse= function(status, message) {
  return {message, status};
};
const getErrorMessage= function(error, defaultMsg) {
  return error.message;
};

module.exports={
  generateInvalidResponse,
  getErrorMessage,
};
