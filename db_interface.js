const {upsert, recallAll}=require('@athleticim/mongo-access');

async function storeToDb(collectionName, parameters, hostName) {
  return await upsert({collectionName, parameters, hostName});
}

const insertClient= async (upsertPayload, collectionType, hostName)=>{
  await storeToDb( `sports_customer`, upsertPayload, hostName);
};

const getCustomerWithEmail= async ({collectionType, emailAddress})=>{
  return await recallAll({
    collectionName: `sports_customer`,
    query: {email: emailAddress},
  });
};


module.exports={
  insertClient,
  getCustomerWithEmail,
};
