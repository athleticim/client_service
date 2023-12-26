const app = require('../app');
require('./setup-mongo');
const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);
const expect = chai.expect;
const {recallAll} = require('@athleticim/mongo-access');

describe('test complete workflow for adding client', () => {
  before(function() {
    process.env.collectionType = 'sports';
  });
  it('test tadding  new client', async () => {
    await chai.request(app).post('/api/client/register').send({
      client: {
        name: 'keerthi',
        email: 'keerthi@gmail.com',
      },
      venue: {
        image: '',
      },
    });
    const result = await recallAll({
      collectionName: `${process.env.collectionType}_client`,
      query: {email: 'keerthi@gmail.com'},
    });
    expect(result.length).eql(1);
  });

  it('test if user already exists in system', async () => {
    const result = await chai.request(app).get('/api/client/verify/email').query({
      email: 'keerthi@gmail.com',
    });
    expect(result.status).eql(400);
  });

  it('verify the email if user does not present in the system', async () => {
    const result = await chai.request(app).get('/api/client/verify/email').query({
      email: 'valid@gmail.com',
    });
    expect(result.status).eql(200);
  });

  it('test reseting password ', async () => {
    await chai.request(app).post('/api/client/reset/login/password').send({
      email: 'keerthi@gmail.com',
      password: 'Keerthi@123',
    });
    const details = await recallAll({
      query: {email: 'keerthi@gmail.com'},
      collectionName: `${process.env.collectionType}_client`,
    });
    expect(details[0].password).not.eql(undefined);
  });

  it('test login client ', async ()=>{
    const loginStatus=await chai.request(app).post('/api/client/login').send({
      email: 'keerthi@gmail.com',
      password: 'Keerthi@123',
    });
    expect(loginStatus.status).eql(200);
    expect(loginStatus.body.message).eql('Login successful!');
  });

  it('test is user enters worng password', async ()=>{
    const badLoginStatus=await chai.request(app).post('/api/client/login').send({
      email: 'keerthi@gmail.com',
      password: 'Kefghjk',
    });
    expect(badLoginStatus.status).eql(400);
  });
  it('test whe user enters worng email', async ()=>{
    const worngEmail=await chai.request(app).post('/api/client/login').send({
      email: 'invalid@gmail.com',
    });
    expect(worngEmail.status).eql(400);
  });
});
