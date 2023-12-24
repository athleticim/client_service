const {v4: uuidv4} = require('uuid');
const {insertDoc, getCustomerWithEmail} = require('../db_interface');

const registerClient = async (req, res, next) => {
  const data = {...req.body};
  const venuDetails=data.venue;
  const clientDetails=data.client;
  clientDetails['clientId'] = uuidv4();
  clientDetails['isEmailVerfied'] = false;
  clientDetails['createdAtTime'] = new Date();
  clientDetails['isKycVerified'] = false;
  venuDetails.contentType=req.file?.mimetype;
  venuDetails.data =req.file?.buffer;
  await insertDoc(venuDetails, `${process.env.collectionType}_venue`);
  await insertDoc(clientDetails, `${process.env.collectionType}_client`);
  // await sendClientResetPass();
  return {
    message: 'client added successfully',
  };
};
const checkIsEmailExist= async (req, res, nexy)=>{
  const email=req.query.email;
  const isAnotherUserPresent = await getCustomerWithEmail({emailAddress: email});
  if (isAnotherUserPresent.length !=0) {
    throw new Error('user already exist');
  }

  return {
    message: 'valid email',
  };
};


module.exports = {
  registerClient,
  checkIsEmailExist,
};
