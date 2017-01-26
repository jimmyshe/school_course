/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";
import QH from "./queryHelper";
import Log from "../Util";
import {queryParser} from "restify";


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
            response = QH.isValidQuery(query);   // validate the request query main on the parts other than the filter, since I handle it in filter out function
            if (response.code == 400){
                reject(response);
            }else {
                let selected: boolean[] = null;
                try {
                    selected = QH.filterOut(this.courseInformation,query["WHERE"]);
                }
                catch (e){
                    try {
                        response = JSON.parse(e.message);
                    }catch (e){
                        Log.info("aaa")
                    }
                    reject(response);
                }



                let body_pre = [];
                let len = this.courseInformation.length;
                for(let i = 0;i<len;i++){
                    if(selected[i]){
                        body_pre.push(this.courseInformation[i]);
                    }
                }

                len = body_pre.length;
                //These are all sections selected

                let order_key=query.OPTIONS.ORDER;  // sort the body_pre if it is necessary
                if (order_key!=null){
                     body_pre.sort((n1,n2)=>{

                        if((n1 as any)[order_key] > (n2 as any)[order_key]){
                            return 1;
                        }else if((n1 as any)[order_key] == (n2 as any)[order_key]){
                            return 0;
                        }else {
                            return -1;
                        }
                    });

                }


                let results:{}[]=[];

                for(let i =0;i<body_pre.length;i++){
                    let element:any={};
                    for(let j=query.OPTIONS.COLUMNS.length-1;j>=0;j--){
                        element[query.OPTIONS.COLUMNS[j]]=(body_pre[i] as any)[query.OPTIONS.COLUMNS[j]];
                    }
                    results.push(element);
                }


                response.code = 200;
                response.body = {'render':query.OPTIONS.FORM,'result':results}
                fulfill(response);
            }
        })
    }
}
