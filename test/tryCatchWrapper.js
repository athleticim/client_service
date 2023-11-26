const chai=require('chai');
const {tryCatchWrapper}=require('../utils/tryCatchWrapper');
const expect=chai.expect;

describe('test trycatch wrapper', ()=>{
    it('should catch error when handler throws error', async ()=>{
        const handler= ()=>{
            throw new Error('some error');
        }
        const res={
            status:(code)=>{
             return {
                send:(data)=>{
                    return data;
                }
             }
            }
        };
        const result=await tryCatchWrapper({}, res, undefined , handler);
        expect(result).to.be.a('object');
        expect(result.status).to.equal('error');
        expect(result.message).to.equal('some error');
    })
});