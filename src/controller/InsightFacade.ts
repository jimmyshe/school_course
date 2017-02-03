/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";
import QH from "./queryHelper";
import Log from "../Util";
import {queryParser} from "restify";


"use strict";
import {cpus} from "os";

let fs = require("fs");
let JSZip = require("jszip");

export default class InsightFacade implements IInsightFacade {

    private dataSets: any;

     courseInformation: any[] = [] ;

    private infoID: string[] = [];


    constructor() {

        try {

            let filenames = fs.readdirSync("./data/");

            for(let i=0; i<filenames.length;i++) {
                let file_str =  fs.readFileSync("./data/"+filenames[i],'utf-8');
                let file = JSON.parse(file_str);
                this.courseInformation = this.courseInformation.concat(file);
            }
        }
        catch (e){

            Log.error(e.message);
        }

        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {

        let that = this;
        let isadded:boolean;
        try{

            fs.statSync("./data/" + id + ".json");
            isadded = true;
            this.removeCourses(id);
            fs.unlinkSync("./data/" + id + ".json");


        }
        catch (e){
            //do nothing;
            isadded = false;
        }



        return new Promise((fulfill, reject) => {

            // console.log('run here1');

            if ((id == null) || (content == null)) {
                let response = {code: 400, body: {error: 'Message not provided'}};
                reject(response);
            }




            let myZip = new JSZip;
           //let data = JSZip.base64.decode(content);



                //console.log('run here3');
            let processList = <any>[];

            myZip.forEach(function (relativePath: any, file: any) {

                        // var a1 = relativePath.split('/');
                        // var filename = a1[a1.length-1];
                        // console.log(filename);
                        if (!file.dir) {
                            let course_promise = file.async("string");
                            processList.push(course_promise);
                        }
                    });

                    //console.log(processList);

            Promise.all(processList).then(function (courseList) {

                        //console.log(courseList);

                        for (let jsonObj_str of courseList) {
                            try {
                                //console.log(courseObj);
                                that.parseCourse(id, (jsonObj_str as string));
                            }
                            catch (err) {
                                let response1: InsightResponse = {code: 400, body: {error: "Message not provided"}};
                                reject(response1);
                            }

                        }




                        let response2: InsightResponse = {code: 204, body: {}};

                        if (isadded){
                            response2.code = 201;
                        }

                        that.save(id, that.courseInformation);
                        fulfill(response2);

                    });

        });

    }

    removeCourses(id:string) {

        console.log('run there!!!');

        let that = this;

        for (let i = 0; i < that.courseInformation.length; i++) {

            if (that.courseInformation[i].source === id) {

                that.courseInformation.splice(i,1);
            }

        }

    }

    save (id: string, data: any) {

        //this.dataSets[id] = data;


        let data_selected = [];
        for(let i = 0;i<length;i++){
            if(data[i].source===id){
                data_selected.push(data[i]);
            }
        }


        var dataToSave = JSON.stringify(data_selected);

        try {

            fs.statSync('./data');

        } catch (err) {

            fs.mkdir('./data');
        }

        fs.writeFileSync('./data/' + id + '.json', dataToSave);

    }

    removeDataset(id: string): Promise<InsightResponse> {
        let that = this;
        return new Promise((fulfill, reject) => {
            try {

                var response: InsightResponse;
                fs.statSync("./data/" + id + ".json");
                fs.unlinkSync("./data/" + id + ".json");
                that.removeCourses(id);
                response = {code: 204, body: {}};
                fulfill(response);

            } catch (err) {

                var response: InsightResponse
                response = {code: 400, body: {error: 'Message not provided'}};
                reject(response);
            }

        })
    }

     parseCourse(id: string, courseObj_s :string) {

        let courseObj = JSON.parse(courseObj_s);
        for (let key of  Object.keys(courseObj)) {
            if (key === "result") {

                let infoList = courseObj[key];


                for (let i = 0; i < infoList.length; i++) {

                    let section : any={};

                    section.courses_dept = infoList[i].Subject;
                    section.courses_id = infoList[i].Course;
                    section.courses_avg = infoList[i].Avg;
                    section.courses_instructor = infoList[i].Professor;
                    section.courses_title = infoList[i].Title;
                    section.courses_pass = infoList[i].Pass;
                    section.courses_fail = infoList[i].Fail;
                    section.courses_audit = infoList[i].Audit;
                    section.courses_uuid = infoList[i].id.toString;
                    section.source = id;


                    if (section.courses_dept != null && typeof section.courses_dept != 'undefined' &&
                        section.courses_id != null && typeof section.courses_id != 'undefined' &&
                        section.courses_avg != null && typeof section.courses_avg != 'undefined' &&
                        section.courses_instructor != null && typeof section.courses_instructor != 'undefined' &&
                        section.courses_title != null && typeof section.courses_title != 'undefined' &&
                        section.courses_pass != null && typeof section.courses_title != 'undefined' &&
                        section.courses_fail != null && typeof section.courses_fail != 'undefined' &&
                        section.courses_audit != null && typeof section.courses_audit != 'undefined' &&
                        section.courses_uuid != null && typeof section.courses_uuid != 'undefined') {

                        this.courseInformation.push(section);
                    }
                }
            }
        }
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
