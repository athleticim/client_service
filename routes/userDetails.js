const express=require('express');
const routes=express.Router();
const {tryCatchWrapper}=require('../util/tryCatchWrapper');
const {addCustomer}=require('../controller/userDetailsControllers');
routes.post('/add/customer', async (req, res, next)=>{
  console.log(req.body);
  await tryCatchWrapper(req, res, next, addCustomer);
});

module.exports=routes;
