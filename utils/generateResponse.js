
const generateInvalidResponse= function(status, message) {
  return {message, status};
};
const getErrorMessage= function(error, defaultMsg) {
  return error.message || defaultMsg || 'Somthing went wrong';
};

module.exports={
  generateInvalidResponse,
  getErrorMessage,
};
