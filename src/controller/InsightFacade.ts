/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";

import Log from "../Util";


"use strict";

var fs = require("fs");
var JSZip = require("jszip");

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

                var myZip = new JSZip;

                myZip.loadAsync(data, {base64: true}).then(function (zip: JSZip) {

                    console.log('run here3');
                    var processList = <any>[];

                    zip.forEach(function (relativePath: any, file: any) {

                        // var a1 = relativePath.split('/');
                        // var filename = a1[a1.length-1];
                        // console.log(filename);
                        if (!file.dir) {
                            var course_promise = file.async("string");
                            processList.push(course_promise);
                        }
                    });

                    console.log(processList);

                    Promise.all(processList).then(function (courseList) {

                        console.log(courseList);

                        for (var jsonObj in courseList) {
                            try {
                                var courseObj = JSON.parse(jsonObj);
                                //console.log(courseObj);
                            }
                            catch (err) {
                                var response1: InsightResponse = {code: 400, body: {error: "Message not provided"}};
                                reject(response1);
                            }
                            this.parseCourse(id, courseObj);
                        }

                        var response2: InsightResponse = {code: 204, body: {}};
                        fulfill(response2);

                    });

                    that.save(id, that.courseInformation);
                })
            })
        });
    }

    public parseCourse(id: string, courseObj : any) {

        for (var key in courseObj) {
            if (key === "result") {

                var infoList = courseObj[key];

                for (var i = 0; i < infoList.length; i++) {

                    var section : any = {};

                    section.course_dept = infoList[i].Subject;
                    section.course_id = infoList[i].Course;
                    section.course_avg = infoList[i].Avg;
                    section.course_instructor = infoList[i].Professor;
                    section.course_title = infoList[i].Title;
                    section.course_pass = infoList[i].Pass;
                    section.course_fail = infoList[i].Fail;
                    section.course_audit = infoList[i].Audit;
                    section.course_uuid = infoList[i].id.toString;
                }

                if (section.course_dept != null && typeof section.course_dept != 'undefined' &&
                    section.course_id != null && typeof section.course_id != 'undefined' &&
                    section.course_avg != null && typeof section.course_avg != 'undefined' &&
                    section.course_instructor != null && typeof section.course_instructor != 'undefined' &&
                    section.course_title != null && typeof section.course_title != 'undefined' &&
                    section.course_pass != null && typeof section.course_title != 'undefined' &&
                    section.course_fail != null && typeof section.course_fail != 'undefined' &&
                    section.course_audit != null && typeof section.course_audit != 'undefined' &&
                    section.course_uuid != null && typeof section.course_uuid != 'undefined') {

                    this.courseInformation.push(section);
                }
            }
        }
    }

    public save(id: string, data: any) {

        this.dataSets[id] = data;

        var dataToSave = JSON.stringify(data);

        try {

            fs.statSync('./data');

        } catch (err) {

            fs.mkdir('./data');
        }

        fs.writeFileSync('./data' + id + '.json', dataToSave);


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
        return new Promise((fulfill, reject) => {
            let response: InsightResponse = null;

            response = this.isValidQuery(query);

            if (response.code == 400) {
                reject(response);
            } else {

                response.code = 200;

                fulfill(response);
            }
        })
    }

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

    isValidQuery(query: any): InsightResponse {


        let ret = {code: 199, body: {}}


        if (query['WHERE'] == null) {
            ret.code = 400;
            ret.body = {"error": "the query is not have 'WHERE'"}
            return ret;
        }

        // if the query is valid.
        return ret;
    }
}
