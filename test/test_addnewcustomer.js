const app = require('../app');
require('./setup-mongo');
const chai=require('chai');
const chaihttp=require('chai-http');
chai.use(chaihttp);
const expect=chai.expect;

describe('test complete workflow for adding customer', () => {
  it('test tadding  new customer', async () => {
    const res= await chai.request(app).post('/api/user/register/customer').send({
      'Name': 'Keerthi',
      'email': 'keerthi@gmail.com',
    });

    expect(res.body.message).eql('client added successfully');
  });

  it('test if user already exists in system', async ()=>{
    const res= await chai.request(app).post('/api/user/register/customer').send({
      'Name': 'dummy',
      'email': 'keerthi@gmail.com',
    });
    expect(res.statusCode).eql(400);
    expect(res.body.message).eql('user already exist');
  });
});
