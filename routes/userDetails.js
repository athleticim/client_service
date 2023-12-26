const express=require('express');
const routes=express.Router();
const {tryCatchWrapper}=require('../utils/tryCatchWrapper');
const {registerClient, checkIsEmailExist,
  resetClientPassword, loginClient} =require('../controller/userDetailsControllers');

routes.post('/register', async (req, res, next)=>{
  await tryCatchWrapper(req, res, next, registerClient);
});

routes.get('/verify/email', async (req, res, next)=>{
  await tryCatchWrapper(req, res, next, checkIsEmailExist);
});

routes.post('/reset/login/password', async (req, res, next)=>{
  await tryCatchWrapper(req, res, next, resetClientPassword);
});

routes.post('/login', async (req, res, next)=>{
  await tryCatchWrapper(req, res, next, loginClient);
});

module.exports=routes;
