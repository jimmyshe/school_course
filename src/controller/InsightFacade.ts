/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";
import QH from "./queryHelper";
import Log from "../Util";


export default class InsightFacade implements IInsightFacade {

    courseInformation: Section[];  // it will be a private variable later


    constructor() {
        Log.trace('InsightFacadeImpl::init()');
        this.courseInformation = null;
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

                let selected: boolean[] = null;


                try {
                    let selected: boolean[] = QH.filterOut(this.courseInformation,query["WHERE"]);
                }
                catch (e){
                    response.code = 424;
                    response.body = {"missing": e.message};
                    reject(response)
                }



                let body_pre = [];
                let len = this.courseInformation.length;
                for(let i = 0;i<len;i++){
                    if(selected[i]){
                        body_pre.push(this.courseInformation[i]);
                    }
                }

                len = body_pre.length;
                response.body = body_pre; // todo There are more work to be done.


                response.code = 200;
                fulfill(response);
            }
        })
    }


}
