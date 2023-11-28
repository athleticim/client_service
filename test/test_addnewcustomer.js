const app = require('../app');
require('./setup-mongo');
const chai=require('chai');
const chaihttp=require('chai-http');
chai.use(chaihttp);
const expect=chai.expect;

describe('test complete workflow for adding customer', () => {
  it('test tadding  new customer', async () => {
    const res= await chai.request(app).post('/api/user/add/customer').send({
      'Name': 'Keerthi',
    });

    expect(res.body.message).eql('client added successfully');
  });
});
