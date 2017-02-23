import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";
import Log from "../Util";
import {error} from "util";
import {isNumber} from "util";
import {isString} from "util";
import {isArray} from "util";

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
         // The interface defination should do the right job. If it is not the case, I can write more at here.
         // It might not be the case. I have to wrrite it manually.

         if(query.OPTIONS==null||query.WHERE==null){
             ret.code = 400;
             ret.body = {"error": "the query format is wrong"};
             return ret;
         }


         if ((query.OPTIONS.FORM==null)||(query.OPTIONS.FORM!="TABLE")){

             ret.code = 400;
             ret.body = {"error": "the option of view has an invalid key"}
             return ret;
         }

         if ((query.OPTIONS.COLUMNS==null)||!isArray(query.OPTIONS.COLUMNS)){

             ret.code = 400;
             ret.body = {"error": "the option of columns has a wrong format"}
             return ret;
         }





         let courses_valid_counter = 0;
         let room_valid_counter = 0;


         for(let j=query.OPTIONS.COLUMNS.length-1;j>=0;j--){
             if (QH.isValidDateKeyInCourses( query.OPTIONS.COLUMNS[j])){
                courses_valid_counter++;
             }
             if(QH.isValidDateKeyInRooms(query.OPTIONS.COLUMNS[j])){
                 room_valid_counter++;
             }
         }

         if(courses_valid_counter!=query.OPTIONS.COLUMNS.length&&room_valid_counter!=query.OPTIONS.COLUMNS.length) {
             ret.code = 400;
             ret.body = {"error": "the option of columns has an invalid key or the query type is wrong"}
             return ret;
         }

         if(courses_valid_counter==query.OPTIONS.COLUMNS.length) {
             ret.body = ["courses"];
         }

         if(room_valid_counter==query.OPTIONS.COLUMNS.length) {
             ret.body = ["rooms"];
         }


         if(query.OPTIONS.ORDER!=null){
             let order_key:string = query.OPTIONS.ORDER;
             let opt_colimns:string[] = query.OPTIONS.COLUMNS;

             if(!opt_colimns.includes(order_key)) {
                 ret.code = 400;
                 ret.body = {"error": "the option of order has an invalid key"};
                 return ret;
             }
         }




         return ret;
    }

    public static isValidDateKeyInCourses(key:any):boolean{


         let valid_keys = ["courses_id","courses_avg","courses_instructor","courses_dept","courses_title","courses_pass","courses_fail","courses_audit","courses_uuid","courses_year"];


         for(let valid_key of valid_keys){
             if (valid_key == key){
                 return true;
             }
         }
         return false;
    }

    public static isValidDateKeyInRooms(key:any):boolean{


        let valid_keys = ["rooms_fullname","rooms_shortname","rooms_number","rooms_name","rooms_address",
        "rooms_lat","rooms_lon","rooms_seats","rooms_type","rooms_furniture","rooms_href"];

        for(let valid_key of valid_keys){
            if (valid_key == key){
                return true;
            }
        }
        return false;
    }
    
    
    
    // public static filterOut_courses(courseInformation:Section[],
    //                         filter:{'AND'?:[{}]
    //                                 'OR'?:[{}]
    //                                 'LT'?:{}
    //                                 'GT'?:{}
    //                                 'EQ'?:{}
    //                                 'IS'?:{}
    //                                 'NOT'?:{}}):boolean[]{
// I did not use the type check built_in



    public static filterOut_courses(courseInformation:Section[],
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

            if(!QH.isValidDateKeyInCourses(comparision_key)){
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since comparision key is not a valid key"}}');
            }

            if(!isNumber(comparision_value)){
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since comparision valuse is not a number"}}');
            }


            let ret: boolean[] = [];
            let len = courseInformation.length;
            for (let i = 0; i < len; i++) {
                if ((courseInformation[i] as any)[comparision_key] == null) {
                    throw new Error('{"code":424,"body":["courses"]}');
                } else {

                    if(!isNumber((courseInformation[i] as any)[comparision_key])){
                        throw new Error('{"code":400,"body":{"error":"the filter is not valid,since its comparision key doesn\'t refer to a number"}}');
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

            if(!QH.isValidDateKeyInCourses(comparision_key)){
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since comparision key is not a valid key"}}');
            }


            let comparision_value = comparision_class[comparision_key];


            if(!isString(comparision_value)){
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since the comparision value is not a string"}}');
            }

            let ret: boolean[] = [];
            let len = courseInformation.length;
            for (let i = 0; i < len; i++) {
                if ((courseInformation[i] as any)[comparision_key] == null) {
                    throw new Error('{"code":424,"body":["courses"]}');
                } else {

                    if(!isString((courseInformation[i] as any)[comparision_key])){
                        throw new Error('{"code":400,"body":{"error":"the filter is not valid,since the comparision key does not refer to a string"}}');
                    }


                    //function to handle RegExpression
                    // *key* = contains key
                    // key*  = starts with key
                    // *key  = ends with key
                    ret.push(QH.simple_regx_equal(comparision_value,(courseInformation[i] as any)[comparision_key]));
                }
            }
            return ret;

        }                       // this is the case of SCOMPARISON

        if(filter_key=='AND'||filter_key=='OR'){

            let logicfilters: {}[];
            try {
                logicfilters = filter[filter_key];
            }
            catch (e){
                Log.error(e.message);
                throw new Error('{"code":400,"body":{"error":"Invalid query: AND should contain an array"}}');
            }


            if (logicfilters.length < 1) {
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since there are less than one filter in' + filter_key +'"}}');
            }

            let pre_ret:boolean[] = QH.filterOut_courses(courseInformation,logicfilters[0]);

            for(let i=1;i<logicfilters.length;i++){
                let cur_ret = QH.filterOut_courses(courseInformation,logicfilters[i]);

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
            let ret:boolean[] = QH.filterOut_courses(courseInformation,filter['NOT']);
            for(let i =0;i<ret.length;i++){
                ret[i]=!ret[i];
            }
            return ret;
        }                     // this is the case for negation

        throw new Error('{"code":400,"body":{"error":"the filter is not valid,since there is no valid operation"}}');  // (optional)the filter is not any of the for types but it will not be there due to the interface definition
    }




    public static filterOut_rooms(roomInformation:any,
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

            if(!QH.isValidDateKeyInRooms(comparision_key)){
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since comparision key is not a valid key"}}');
            }

            if(!isNumber(comparision_value)){
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since comparision valuse is not a number"}}');
            }


            let ret: boolean[] = [];
            let len = roomInformation.length;
            for (let i = 0; i < len; i++) {
                if ((roomInformation[i] as any)[comparision_key] == null) {
                    throw new Error('{"code":424,"body":["rooms"]}');
                } else {

                    if(!isNumber((roomInformation[i] as any)[comparision_key])){
                        throw new Error('{"code":400,"body":{"error":"the filter is not valid,since its comparision key doesn\'t refer to a number"}}');
                    }

                    switch (filter_key){
                        case 'LT':
                            if ((roomInformation[i] as any)[comparision_key] < comparision_value) {
                                ret.push(true);
                            }
                            else {
                                ret.push(false);
                            }
                            break;
                        case 'EQ':
                            if ((roomInformation[i] as any)[comparision_key] == comparision_value) {
                                ret.push(true);
                            }
                            else {
                                ret.push(false);
                            }
                            break;
                        case 'GT':
                            if ((roomInformation[i] as any)[comparision_key] > comparision_value) {
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

            if(!QH.isValidDateKeyInRooms(comparision_key)){
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since comparision key is not a valid key"}}');
            }


            let comparision_value = comparision_class[comparision_key];


            if(!isString(comparision_value)){
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since the comparision value is not a string"}}');
            }

            let ret: boolean[] = [];
            let len = roomInformation.length;
            for (let i = 0; i < len; i++) {
                if ((roomInformation[i] as any)[comparision_key] == null) {
                    throw new Error('{"code":424,"body":["courses"]}');
                } else {

                    if(!isString((roomInformation[i] as any)[comparision_key])){
                        throw new Error('{"code":400,"body":{"error":"the filter is not valid,since the comparision key does not refer to a string"}}');
                    }


                    //function to handle RegExpression
                    // *key* = contains key
                    // key*  = starts with key
                    // *key  = ends with key
                    ret.push(QH.simple_regx_equal(comparision_value,(roomInformation[i] as any)[comparision_key]));
                }
            }
            return ret;

        }                       // this is the case of SCOMPARISON

        if(filter_key=='AND'||filter_key=='OR'){

            let logicfilters: {}[];
            try {
                logicfilters = filter[filter_key];
            }
            catch (e){
                Log.error(e.message);
                throw new Error('{"code":400,"body":{"error":"Invalid query: AND should contain an array"}}');
            }


            if (logicfilters.length < 1) {
                throw new Error('{"code":400,"body":{"error":"the filter is not valid,since there are less than one filter in' + filter_key +'"}}');
            }

            let pre_ret:boolean[] = QH.filterOut_rooms(roomInformation,logicfilters[0]);

            for(let i=1;i<logicfilters.length;i++){
                let cur_ret = QH.filterOut_rooms(roomInformation,logicfilters[i]);

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
            let ret:boolean[] = QH.filterOut_rooms(roomInformation,filter['NOT']);
            for(let i =0;i<ret.length;i++){
                ret[i]=!ret[i];
            }
            return ret;
        }                     // this is the case for negation

        throw new Error('{"code":400,"body":{"error":"the filter is not valid,since there is no valid operation"}}');  // (optional)the filter is not any of the for types but it will not be there due to the interface definition
    }

//This is a simplified version of Regx checker with only three cases
    // *key* = contains key
    // key*  = starts with key
    // *key  = ends with key

    public static simple_regx_equal(key:string,str:string):boolean{
         if((key.charAt(0)!="*")&&(key.charAt(key.length-1)!="*")){  //should be exactly the same
             return key == str;
         }
        if((key.charAt(0)=="*")&&(key.charAt(key.length-1)=="*")){  // *key* = contains key
            key = key.substring(1,key.length-1);

            return str.indexOf(key) != -1;

        }
        if((key.charAt(0)!="*")&&(key.charAt(key.length-1)=="*")){  // key*  = starts with key
            key = key.substring(0,key.length-1);

            return str.indexOf(key) == 0;

        }
        if((key.charAt(0)=="*")&&(key.charAt(key.length-1)!="*")){  // *key  = ends with key
            key = key.substring(1);

            return str.indexOf(key) == str.length-key.length;

        }

    }
}