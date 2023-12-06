const {v4: uuidv4} = require('uuid');
const {insertClient, getCustomerWithEmail} = require('../db_interface');

const registerCustomer = async (req, res, next) => {
  const data = {...req.body};
  data['clientId'] = uuidv4();
  data['isEmailVerfied'] = false;
  data['createdAtTime'] = new Date();
  data['isKycVerified'] = false;
  const isAnotherUserPresent = await getCustomerWithEmail({emailAddress: data['email']});
  if (isAnotherUserPresent.length != 0) {
    throw new Error('user already exist');
  }
  await insertClient(data);

  return {
    message: 'client added successfully',
  };
};

module.exports = {
  registerCustomer,
};
