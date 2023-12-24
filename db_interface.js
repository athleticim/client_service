const {upsert, recallAll}=require('@athleticim/mongo-access');

async function storeToDb(collectionName, parameters, hostName) {
  return await upsert({collectionName, parameters, hostName});
}

const insertDoc= async (upsertPayload, collectionType, hostName)=>{
  await storeToDb( collectionType, upsertPayload, hostName);
};

const getCustomerWithEmail= async ({collectionType, emailAddress})=>{
  return await recallAll({
    collectionName: `${process.env.collectionType}_client`,
    query: {email: emailAddress},
  });
};


module.exports={
  insertDoc,
  getCustomerWithEmail,
};
