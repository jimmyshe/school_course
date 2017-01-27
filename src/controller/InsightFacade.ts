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

    private courseInformation: any[] = [] ;

    private infoID: string[] = [];


    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }

    addDataset(id: string, content: string): Promise<InsightResponse> {

        let that = this;

        return new Promise((fulfill, reject) => {

            // console.log('run here1');

            if ((id == null) || (content == null)) {
                let response = {code: 400, body: {error: 'Message not provided'}};
                // meaningless implementation just for testing
                reject(response);
            }

            fs.readFile(id, function (err: any, data: any) {

                that.infoID.push(id);

                // console.log('run here2');

                if (err) {
                    // console.log(err.message);
                    let response = {code: 400, body: {error: 'Message not provided'}};
                    // meaningless implementation just for testing
                    reject(response);
                }

                let myZip = new JSZip;

                myZip.loadAsync(data, {base64: true}).then(function (zip: JSZip) {

                    console.log('run here3');
                    let processList = <any>[];

                    zip.forEach(function (relativePath: any, file: any) {

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

                        console.log(courseList);

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
                        //that.save(id, that.courseInformation);
                        fulfill(response2);

                    });


                })
            })
        });
    }

    removeDataset(id: string): Promise<InsightResponse> {
        return new Promise((fulfill, reject) => {

            try {

                var response: InsightResponse;
                fs.statSync("./data" + id + ".json");
                fs.unlinkSync("./data" + id + ".json");
                response = {code: 204, body: {}};
                fulfill(response);

            } catch (err) {

                var response: InsightResponse
                response = {code: 400, body: {error: 'Message not provided'}};
                reject(response);
            }

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
