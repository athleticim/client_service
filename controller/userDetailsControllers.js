const {v4: uuidv4} = require('uuid');
const {insertDoc, getCustomerWithEmail,
  updateClientPass, getDetails} = require('../db_interface');
const bcrypt = require('bcrypt');

const registerClient = async (req, res, next) => {
  const data = {...req.body};
  const venuDetails = data.venue;
  const clientDetails = data.client;
  clientDetails['clientId'] = uuidv4();
  clientDetails['isEmailVerfied'] = false;
  clientDetails['createdAtTime'] = new Date();
  clientDetails['isKycVerified'] = false;
  venuDetails.contentType = req.file?.mimetype;
  venuDetails.clientId = clientDetails.clientId;
  venuDetails.data = req.file?.buffer;
  await insertDoc(venuDetails, `${process.env.collectionType}_venue`);
  await insertDoc(clientDetails, `${process.env.collectionType}_client`);
  // await sendClientResetPass();
  return {
    message: 'client added successfully',
  };
};
const checkIsEmailExist = async (req, res, next) => {
  const email = req.query.email;
  const isAnotherUserPresent = await getCustomerWithEmail({emailAddress: email});
  if (isAnotherUserPresent.length != 0) {
    throw new Error('user already exist');
  }

  return {
    message: 'valid email',
  };
};

const resetClientPassword = async (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const updateData = {
    password: hashedPassword,
    latestPassUpdateTime: new Date(),
  };
  await updateClientPass(
      {
        email: req.body.email,
        updateParam: updateData,
      },
  );
  return {
    message: 'password updated successfully',
  };
};

const loginClient = async (req, res, next) => {
  const body = req.body;
  const clientDetails = await getDetails(`${process.env.collectionType}_client`,
      {email: body.email});
  if (clientDetails.length === 0) {
    throw new Error('client not found');
  }
  const password = clientDetails[0].password;
  const checkStatus = await bcrypt.compare(req.body.password, password);
  if (checkStatus) {
    return {
      message: 'Login successful!',
      clientDetails: clientDetails[0],
    };
  }
  throw new Error('Invalid credentials');
};

module.exports = {
  registerClient,
  checkIsEmailExist,
  resetClientPassword,
  loginClient,
};
