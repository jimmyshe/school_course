import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";
import Log from "../Util";
import {error} from "util";
import {isNumber} from "util";
import {isString} from "util";
import {isArray} from "util";
import {isObject} from "util";

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

        if (query.OPTIONS.COLUMNS.length == 0){

            ret.code = 400;
            ret.body = {"error": "the option of columns can not be empty"}
            return ret;
        }


         let courses_valid_counter = 0;
         let room_valid_counter = 0;
         let apply_key_counter =0;

         for(let j=query.OPTIONS.COLUMNS.length-1;j>=0;j--){
             if (QH.isValidDateKeyInCourses( query.OPTIONS.COLUMNS[j])){
                courses_valid_counter++;
             }
             if(QH.isValidDateKeyInRooms(query.OPTIONS.COLUMNS[j])){
                 room_valid_counter++;
             }
             if(QH.isValidApplyKeyName(query.OPTIONS.COLUMNS[j])){
                 apply_key_counter++;
             }
         }

         if(query.TRANSFORMATIONS==null&&apply_key_counter>0){
             ret.code = 400;
             ret.body = {"error": "the option of columns has an invalid key when the query has trans"}
             return ret;
         }



        if(courses_valid_counter+apply_key_counter!=query.OPTIONS.COLUMNS.length&&room_valid_counter+apply_key_counter!=query.OPTIONS.COLUMNS.length) {
            ret.code = 400;
            ret.body = {"error": "the option of columns has an invalid key or the query type is wrong"}
            return ret;
        }
         if(courses_valid_counter+apply_key_counter==query.OPTIONS.COLUMNS.length) {
             ret.body = {"missing":["courses"]};
         }

         if(room_valid_counter+apply_key_counter==query.OPTIONS.COLUMNS.length) {
             ret.body = {"missing":["rooms"]};
         }


         if(query.OPTIONS.ORDER!=null){

             if(typeof query.OPTIONS.ORDER =="string") {
                 let order_key: string = query.OPTIONS.ORDER;
                 let opt_colimns: string[] = query.OPTIONS.COLUMNS;

                 if (!opt_colimns.includes(order_key)) {
                     ret.code = 400;
                     ret.body = {"error": "the option of order has an invalid key"};
                     return ret;
                 }
             }
             else if(typeof query.OPTIONS.ORDER =="object"){
                 let order_obj = query.OPTIONS.ORDER;
                 let opt_colimns: string[] = query.OPTIONS.COLUMNS;

                 if (order_obj['dir']==null||order_obj['keys']==null) {
                     ret.code = 400;
                     ret.body = {"error": "the option of order has an invalid key"};
                     return ret;
                 }
                 if((!isArray(order_obj['keys']))||(typeof order_obj['dir']!="string")){
                     ret.code = 400;
                     ret.body = {"error": "the option of order has an invalid key:no key or dir"};
                     return ret;
                 }

                 let  keys =  order_obj['keys'];
                 for(let i=0;i<keys.length;i++)
                 if (!opt_colimns.includes(keys[i])) {
                     ret.code = 400;
                     ret.body = {"error": "the option of order has an invalid key:invalid keys"};
                     return ret;
                 }

                 let dir = order_obj['dir'];
                 if(dir!="UP"&&dir!="DOWN"){
                     ret.code = 400;
                     ret.body = {"error": "the option of order has an invalid key:invalid dir"};
                     return ret;
                 }
             }

         }

        if(query["TRANSFORMATIONS"]!=null) {

             let trans = query["TRANSFORMATIONS"];
             if(trans["APPLY"]==null||trans["GROUP"]==null){
                 ret.code = 400;
                 ret.body = {"error": "The Transformation part of query is not complete"};
                 return ret;
             }

             let group = trans["GROUP"];
             let apply = trans["APPLY"];

             if(!isArray(group)||!isArray(apply)){
                 ret.code = 400;
                 ret.body = {"error": "the group/apply is not an array"};
                 return ret;
             }

             if(group.length<1){
                 ret.code = 400;
                 ret.body = {"error": "the group should has at least one key"};
                 return ret;
             }


             for(let i=0;i<group.length;i++){  // check elements in group
                 if(!query.OPTIONS.COLUMNS.includes(group[i])){
                     ret.code = 400;
                     ret.body = {"error": "the group has keys that are not in the columns "};
                     return ret;
                 }
             }

             let namebuffer:any = [];


            for(let i=0;i<apply.length;i++){ // check elements in apply

                 let applyKey = apply[i];
                 if( Object.keys(applyKey).length!=1){
                     ret.code = 400;
                     ret.body = {"error": "Invalid apply key"};
                     return ret;
                 }
                 let applykeyName = Object.keys(applyKey)[0];
                 let applykeyObj = applyKey[applykeyName];

                if(!query.OPTIONS.COLUMNS.includes(applykeyName)){
                    ret.code = 400;
                    ret.body = {"error": "the apply has keys that are not in the columns "};
                    return ret;
                }

                if(namebuffer.includes(applykeyName)){  // check duplicated key string
                    ret.code = 400;
                    ret.body = {"error": "the apply duplicate keyName "};
                    return ret;
                }else {
                    namebuffer.push(applykeyName);
                }

                if(!QH.isValidAppkeyObj(applykeyObj)){
                    ret.code = 400;
                    ret.body = {"error": "the apply has keys that are not valid "};
                    return ret;
                }
            }

            for(let i=0;i<query.OPTIONS.COLUMNS.length;i++){
                let columns_element = query.OPTIONS.COLUMNS;
                if(columns_element.includes("_")){
                    if(!group.includes(columns_element)){
                        ret.code = 400;
                        ret.body = {"error": "the columns has keys that are not valid "};
                        return ret;
                    }
                }else {
                    if(!namebuffer.includes(columns_element)){
                        ret.code = 400;
                        ret.body = {"error": "the cloumns has keys that are not valid "};
                        return ret;
                    }
                }
            }



        }
         return ret;
    }

    public static isValidAppkeyObj(obj:any):boolean{
        if(!isObject(obj)){
            return false;
        }
        if(Object.keys(obj).length!=1){
            return false;
        }
        let applytoken = Object.keys(obj)[0];
        if(!QH.isValidApplyToken(applytoken)){
            return false;
        }
        return true
    }

    public static isValidApplyToken(key:any):boolean{


        let valid_keys = ["MAX","MIN","AVG","COUNT","SUM"];

        for(let valid_key of valid_keys){
            if (valid_key == key){
                return true;
            }
        }
        return false;
    }

    public static isValidApplyKeyName(str:any):boolean{
        if(typeof str!="string"){
            return false
        }

        if((str as string).includes("_")){
            return false
        }

        return true;

    }

    public static isValidDateKeyInCourses(key:any):boolean{


         let valid_keys = ["courses_year","courses_id","courses_avg","courses_instructor","courses_dept","courses_title","courses_pass","courses_fail","courses_audit","courses_uuid"]


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
                    throw new Error('{"code":424,"body":{"missing":["rooms"]}}');
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

    public static adv_mergeSort(arr:any,dir:string,keys:any):any[]
    {
        if (arr.length < 2)
            return arr;

        let middle = arr.length / 2;
        let left   = arr.slice(0, middle);
        let right  = arr.slice(middle, arr.length);

        return this.merge(this.adv_mergeSort(left,dir,keys), this.adv_mergeSort(right,dir,keys),keys,dir);
    }

    private static merge(left:any, right:any,keys:any,dir:any)
    {
        let result:any = [];

        while (left.length && right.length) {

            if(dir=="UP") {

                let i = 0;
                while (left[0][keys[i]] == right[0][keys[i]]){
                    i++;
                    if(i==keys.length){
                        i=0;
                        break;
                    }
                }

                if (left[0][keys[i]] <= right[0][keys[i]]) {
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }
            }


            if(dir=="DOWN") {

                let i = 0;
                while (left[0][keys[i]] == right[0][keys[i]]){
                    i++;
                    if(i==keys.length){
                        i=0;
                        break;
                    }
                }

                if (left[0][keys[i]] >= right[0][keys[i]]) {
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }
            }
        }

        while (left.length)
            result.push(left.shift());

        while (right.length)
            result.push(right.shift());

        return result;
    }


    public static applyApplykey(token:string,datakey:string,datasets:any):number{

        let ans;
        let buffer:any;
        switch (token){
            case "MAX":
                ans = datasets[0][datakey];
                if(ans==null||!isNumber(ans)){
                    throw new Error;
                }
                for(let i=1;i<datasets.length;i++){
                    let temp = datasets[i][datakey];
                    if(temp==null||!isNumber(temp)){
                        throw new Error;
                    }
                    if(temp>ans){
                        ans = temp;
                    }
                }
                break;

            case "MIN":
                ans = datasets[0][datakey];
                if(ans==null||!isNumber(ans)){
                    throw new Error;
                }
                for(let i=1;i<datasets.length;i++){
                    let temp = datasets[i][datakey];
                    if(temp==null||!isNumber(temp)){
                        throw new Error;
                    }
                    if(temp<ans){
                        ans = temp;
                    }
                }
                break;

            case "COUNT":
                buffer = [];
                for(let i=0;i<datasets.length;i++){
                    let temp = datasets[i][datakey];
                    if(temp==null){
                        throw new Error;
                    }
                    if(!(buffer.includes(temp))){
                        buffer.push(temp);
                    }
                }
                ans = buffer.length;
                break;

            case "AVG":
                buffer = [];
                for(let i=0;i<datasets.length;i++){
                    let temp = datasets[i][datakey];
                    if(temp==null||!isNumber(temp)){
                        throw new Error;
                    }
                    buffer.push(temp);
                }
                buffer = buffer.map(function (n:number) {
                    n = n*10;
                    return  Number(n.toFixed(0));
                })
                ans = 0;
                for(let i=0;i<buffer.length;i++){
                    ans+= buffer[i];
                }
                ans = ans/buffer.length;
                ans = ans/10;
                ans = Number(ans.toFixed(2));

                break;
            case "SUM":
                buffer = [];
                for(let i=0;i<datasets.length;i++){
                    let temp = datasets[i][datakey];
                    if(temp==null||!isNumber(temp)){
                        throw new Error;
                    }
                    buffer.push(temp);
                }

                ans = 0;
                for(let i=0;i<buffer.length;i++){
                    ans+= buffer[i];
                }


                break;



            default: throw new Error;
        }
        return ans;
    }


}