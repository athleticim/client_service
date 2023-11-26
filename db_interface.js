const {upsert}=require('@athleticim/mongo-access');

async function storeToDb(collectionName , parameters, hostName){
    return await upsert({collectionName , parameters , hostName});
}

const insertClient= async (upsertPayload, hostName)=>{
    await storeToDb( `${upsertPayload.collectionType}_clients`, upsertPayload, hostName);
}


module.exports={
    insertClient,
}