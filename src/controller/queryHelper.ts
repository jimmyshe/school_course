import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";
import Log from "../Util";

export default class QH {
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

     public static isValidQuery(query:any):InsightResponse{


        let ret = {code:199,body:{}}


        if(query['WHERE']==null){
            ret.code = 400;
            ret.body = {"error":"the query is not have 'WHERE'"}
            return ret;
        }

        // if the query is valid.
        
        
        //todo 
        return ret;
    }
    
    
    
    public static filterOut(courseInformation:Section[],
                            filer:{'AND'?:[]},
                                    'OR'?:[]
                                    'LT'?:{}
                                    'GT'?:{}
                                    'EQ'?:{}
                                    'IS'?:{}
                                    'NOT'?:{}):boolean[]{
                                        
        if(filer['NOT']!=null){
            let ret:boolean[] = filterOut(courseInformation,filer['NOT']);
            for(let i of ret){
                i = !i;
            }
            return ret;
        }
        
        
    }
}