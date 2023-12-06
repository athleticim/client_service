const express=require('express');
const routes=express.Router();
const {tryCatchWrapper}=require('../utils/tryCatchWrapper');
const {registerCustomer}=require('../controller/userDetailsControllers');
routes.post('/register/customer', async (req, res, next)=>{
  await tryCatchWrapper(req, res, next, registerCustomer);
});

module.exports=routes;
