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
    const result = await recallAll({collectionName: `${process.env.collectionType}_client`,
      query: {email: 'keerthi@gmail.com'}});
    expect(result.length).eql(1);
  });

  it('test if user already exists in system', async () => {
    const result = await chai.request(app).get('/api/client/verify/email').query({
      email: 'keerthi@gmail.com',
    });
    expect(result.status).eql(400);
  });

  it('verify the email if user does not present in the system', async ()=>{
    const result = await chai.request(app).get('/api/client/verify/email').query({
      email: 'valid@gmail.com',
    });
    expect(result.status).eql(200);
  });
});
