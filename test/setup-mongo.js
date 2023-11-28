const {MongoMemoryServer}=require('mongodb-memory-server');
const {setKey}=require('@athleticim/vault-manager');

before(async ()=>{
  await setupInMemoryMongo();
});

const setupInMemoryMongo=async ()=>{
  const mongod=await MongoMemoryServer.create();
  const mongodUrl=mongod.getUri();
  setKey('writeMongo', mongodUrl);
};
