/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";
import QH from "./queryHelper.ts"
import Log from "../Util";


export default class InsightFacade implements IInsightFacade {

    courseInformation: Section[];  // it will be a private variable later


    constructor() {
        Log.trace('InsightFacadeImpl::init()');
        courseInformation = null;
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
            response = QH.isValidQuery(query);   // validate the request query
            if (response.code == 400){
                reject(response);
            }else {

                let selected:boolean[] = QH.filterOut(this.courseInformation,query["WHERE"]);

                let body_pre = [];
                for(let i = 0;i<this.courseInformation.length;i++){
                    if(selected[i]){
                        body_pre.push(this.courseInformation[i]);
                    }
                }



                response.body = body_pre; // todo There are more work to be done.


                response.code = 200;
                fulfill(response);
            }
        })
    }


}
