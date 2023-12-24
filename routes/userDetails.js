const express=require('express');
const routes=express.Router();
const {tryCatchWrapper}=require('../utils/tryCatchWrapper');
const {registerClient, checkIsEmailExist}=require('../controller/userDetailsControllers');

routes.post('/register', async (req, res, next)=>{
  await tryCatchWrapper(req, res, next, registerClient);
});

routes.get('/verify/email', async (req, res, next)=>{
  await tryCatchWrapper(req, res, next, checkIsEmailExist);
});

module.exports=routes;
