const {insert, recallAll, findAndUpdate}=require('@athleticim/mongo-access');

async function storeToDb(collectionName, parameters, hostName) {
  return await insert({collectionName, parameters, hostName});
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

const updateClientPass= async ({email, updateParam})=>{
  return await findAndUpdate({
    collectionName: `${process.env.collectionType}_client`,
    parameters: updateParam,
    query: {
      email: email,
    },
  });
};
const getDetails = async (collectionName, query)=>{
  return await recallAll({collectionName: collectionName, query: query});
};

module.exports={
  insertDoc,
  getCustomerWithEmail,
  updateClientPass,
  getDetails,
};
