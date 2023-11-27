const {v4: uuidv4}=require('uuid');
const {insertClient}=require('../db_interface');

const addCustomer= async (req, res, next)=>{
  console.log(req.body);
  const data={...req.body};
  data['clientId']=uuidv4();
  data['isEmailVerfied']=false;
  data['createdAtTime']=new Date();
  data['isKycVerified']=false;
  await insertClient(data);
  return {
    message: 'client added successfully',
  };
};

module.exports={
  addCustomer,
};
