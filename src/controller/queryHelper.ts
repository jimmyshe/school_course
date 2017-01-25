import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";
import Log from "../Util";
import {error} from "util";

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
                            filter:{'AND'?:[{}],
                                    'OR'?:[{}]
                                    'LT'?:{}
                                    'GT'?:{}
                                    'EQ'?:{}
                                    'IS'?:{}
                                    'NOT'?:{}}):boolean[]{

        if (filter['LT']!=null){
           let comparision_class:any = filter['LT'];

           if(Object.keys(comparision_class).length!=1){
               throw new Error("more than one comparision key in filter")
           }

           let comparision_key:string =  Object.keys(comparision_class)[0];
           let comparision_value:number = comparision_class[comparision_key];

           let ret:boolean[] = [];
           let len = courseInformation.length;
           for(let i = 0;i<len;i++){
               if((courseInformation[i] as any)[comparision_key]==null){
                   throw new Error("Can't find comparision_key in the data set");
               }else {
                   if ((courseInformation[i] as any)[comparision_key] < comparision_value) {
                       ret.push(true);
                   }
                   else {
                       ret.push(false);
                   }
               }
           }
           return ret;
        }

        if(filter['NOT']!=null){
            let ret:boolean[] = QH.filterOut(courseInformation,filter['NOT']);
            for(let i of ret){
                i = !i;
            }
            return ret;
        }
    }
}