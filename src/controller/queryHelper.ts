import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";
import Log from "../Util";
import {error} from "util";
import {isNumber} from "util";
import {isString} from "util";

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

     public static isValidQuery(query:QueryRequest):InsightResponse{


        let ret = {code:199,body:{}}


        // The interface defination should do the right job. If it is not the case, I can write more at here.

         if(query.OPTIONS.ORDER!=null){
            let order_key:string = query.OPTIONS.ORDER;

            if(!(order_key=="courses_avg"||order_key=="courses_pass"||order_key=="courses_fail"||order_key=="courses_audit")) {
                ret.code = 400;
                ret.body = {"error": "the option of order has an invalid key"}
                return ret;
            }
         }


         if (query.OPTIONS.FORM!=null&&query.OPTIONS.FORM!="TABLE"){

             ret.code = 400;
             ret.body = {"error": "the option of view has an invalid key"}
             return ret;
         }



         for(let j=query.OPTIONS.COLUMNS.length-1;j>=0;j--){
             if (!QH.isValidDateKey( query.OPTIONS.COLUMNS[j])){
                 ret.code = 400;
                 ret.body = {"error": "the option of columns has an invalid key"}
                 return ret;
             }
         }



        return ret;
    }

    public static isValidDateKey(key:string):boolean{


         let valid_keys = ["courses_id","courses_avg","courses_instructor","courses_dept","courses_title","courses_pass","courses_fail","courses_audit","courses_uuid"]


         for(let valid_key of valid_keys){
             if (valid_key == key){
                 return true;
             }
         }
         return false;
    }
    
    
    
    // public static filterOut(courseInformation:Section[],
    //                         filter:{'AND'?:[{}]
    //                                 'OR'?:[{}]
    //                                 'LT'?:{}
    //                                 'GT'?:{}
    //                                 'EQ'?:{}
    //                                 'IS'?:{}
    //                                 'NOT'?:{}}):boolean[]{
// I did not use the type check built_in



    public static filterOut(courseInformation:Section[],
                            filter:any):boolean[]{

        if(Object.keys(filter).length!=1){
            throw new Error('{"code":400,"body":{"error":"the filter is not valid,since it has more than 1 comparision at the same time"}}');
        }

        let filter_key = Object.keys(filter)[0];

        if(filter_key=='LT'||filter_key=='GT'||filter_key=='EQ') {

            let comparision_class: any = filter[filter_key];
            if (Object.keys(comparision_class).length != 1) {
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since it has more than 1 comparision_key at the same time"}}');
            }

            let comparision_key: string = Object.keys(comparision_class)[0];
            let comparision_value = comparision_class[comparision_key];

            if(!isNumber(comparision_value)){
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since comparision valuse is not a number"}}');
            }


            let ret: boolean[] = [];
            let len = courseInformation.length;
            for (let i = 0; i < len; i++) {
                if ((courseInformation[i] as any)[comparision_key] == null) {
                    throw new Error('{"code":424,"body":{"missing":"'+ courseInformation[i].courses_uuid+'"}}');
                } else {

                    if(!isNumber((courseInformation[i] as any)[comparision_key])){
                        throw new Error('{"code":400,"body":{"error":"the filter is not valid,since its comparision key doesn\'t reffer to a number"}}');
                    }

                    switch (filter_key){
                        case 'LT':
                            if ((courseInformation[i] as any)[comparision_key] < comparision_value) {
                                ret.push(true);
                            }
                            else {
                                ret.push(false);
                            }
                            break;
                        case 'EQ':
                            if ((courseInformation[i] as any)[comparision_key] == comparision_value) {
                                ret.push(true);
                            }
                            else {
                                ret.push(false);
                            }
                            break;
                        case 'GT':
                            if ((courseInformation[i] as any)[comparision_key] > comparision_value) {
                                ret.push(true);
                            }
                            else {
                                ret.push(false);
                            }
                            break;
                    }
                }
            }
            return ret;
        }   // this is the case of MCOMPARISON

        if(filter_key=='IS'){

            let comparision_class: any = filter[filter_key];
            if (Object.keys(comparision_class).length != 1) {
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since it has more than 1 comparision at the same time"}}');
            }

            let comparision_key: string = Object.keys(comparision_class)[0];
            let comparision_value = comparision_class[comparision_key];

            if(!isString(comparision_value)){
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since the comparision value is not a string"}}');
            }

            let ret: boolean[] = [];
            let len = courseInformation.length;
            for (let i = 0; i < len; i++) {
                if ((courseInformation[i] as any)[comparision_key] == null) {
                    throw new Error('{"code":424,"body":{"missing":"'+ courseInformation[i].courses_uuid+'"}}');
                } else {

                    if(!isString((courseInformation[i] as any)[comparision_key])){
                        throw new Error('{"code":400,"body":{"error":"the filter is not valid,since the comparision key does not refer to a string"}}');
                    }

                    if ((courseInformation[i] as any)[comparision_key] == comparision_value) {
                        ret.push(true);
                    }
                    else {
                        ret.push(false);
                    }
                }
            }
            return ret;

        }                       // this is the case of SCOMPARISON

        if(filter_key=='AND'||filter_key=='OR'){
            let logicfilters: {}[] = filter[filter_key];
            if (logicfilters.length < 2) {
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since there are less than two filter in logic"}}');
            }

            let pre_ret:boolean[] = QH.filterOut(courseInformation,logicfilters[0]);

            for(let i=1;i<logicfilters.length;i++){
                let cur_ret = QH.filterOut(courseInformation,logicfilters[i]);

                if(filter_key=='AND'){
                    for(let j=0;j<pre_ret.length;j++){
                        pre_ret[j]=pre_ret[j]&&cur_ret[j];
                    }
                }
                else { // filter_key = 'OR
                    for(let j=0;j<pre_ret.length;j++){
                        pre_ret[j]=pre_ret[j]||cur_ret[j];
                    }
                }
            }
            return pre_ret;
        }   // This is the case for logic

        if(filter_key=='NOT'){
            let ret:boolean[] = QH.filterOut(courseInformation,filter['NOT']);
            for(let i =0;i<ret.length;i++){
                ret[i]=!ret[i];
            }
            return ret;
        }                     // this is the case for negation

        throw new Error('{"code":400,"body":{"error":"the filter is not valid,since there is no valid operation"}}');  // (optional)the filter is not any of the for types but it will not be there due to the interface definition
    }

}