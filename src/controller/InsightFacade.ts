/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";


export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {
        return new Promise((fulfill,reject)=>{
            let response:InsightResponse = null;
            response = {code: 400, body: {error: 'Message not provided'}};
            // meaningless implementation just for testing
            reject(response);
        })
    }

    removeDataset(id: string): Promise<InsightResponse> {
        return new Promise((fulfill,reject)=>{
            let response:InsightResponse = null;
            response = {code: 400, body: {error: 'Message not provided'}};
            // meaningless implementation just for testing

            reject(response);
        })
    }

    performQuery(query: QueryRequest): Promise <InsightResponse> {
        return new Promise((fulfill,reject)=>{
            let response:InsightResponse = null;

            response = this.isValidQuery(query);

            if (response.code == 400){
                reject(response);
            }else {

                response.code = 200;

                fulfill(response);
            }
        })
    }

    /*
     *  This is a helper function to check a QueryRequest
     *
     *  @param query  The query to be performed. This is the same as the body of the POST message.
     *  @return Promise <InsightResponse>
     *      Return codes:
     *
     *      199: the query is valid. no missing info.
     *      400: the query miss some info . The return body will be {"error": "my text"} about what is missing.
     *
     */

    isValidQuery(query:any):InsightResponse{


        let ret = {code:199,body:{}}


        if(query['WHERE']==null){
            ret.code = 400;
            ret.body = {"error":"the query is not have 'WHERE'"}
            return ret;
        }

        // if the query is valid.
        return ret;
    }
}
