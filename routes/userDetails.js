const express=require('express');
const routes=express.Router();
const {tryCatchWrapper}=require('../utils/tryCatchWrapper');
const {addCustomer}=require('../controller/userDetailsControllers');
routes.post('/add/customer', async (req, res, next)=>{
  await tryCatchWrapper(req, res, next, addCustomer);
});

module.exports=routes;
