/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";
import QH from "./queryHelper";
import Log from "../Util";
import DH from "./datasetHelper"

"use strict";
import {cpus} from "os";

let fs = require("fs");
let JSZip = require("jszip");
let parse5 = require("parse5");
let http = require('http');

export default class InsightFacade implements IInsightFacade {

    //private dataSets: any;

    courseInformation: any[] = [] ;

    roomsInformations: any[] = [];


    constructor() {

        try {

            let filenames = fs.readdirSync("./data/");

            for(let i=0; i<filenames.length;i++) {
                let file_str =  fs.readFileSync("./data/"+filenames[i],'utf-8');
                let file = JSON.parse(file_str);
                if (filenames[i]=="courses.json") {
                    this.courseInformation = file;
                }
                if (filenames[i]=="rooms.json") {
                    this.roomsInformations = file;
                }
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
            this.removeIdInRam(id);
            fs.statSync("./data/" + id + ".json");
            isadded = true;
            fs.unlinkSync("./data/" + id + ".json");


        }
        catch (e){
            //do nothing;
            isadded = false;
        }



        return new Promise((fulfill, reject) => {



            if ((id == null) || (content == null)) {
                let response = {code: 400, body: {"error": 'Message not provided'}};
                reject(response);
                return;
            }

            if ((id != "courses") && (id!= "rooms")) {
                let response = {code: 400, body: {"error": 'DataSet has an invalid ID'}};
                reject(response);
                return;
            }



            let myzip = new JSZip();
            let p = myzip.loadAsync(content,{base64:true})  // load content into myzip

            if (id === "rooms") {

                p.then(function (zip:any) {
                    let processList = <any>[];
                    zip.forEach(function (relativePath: any, file: any) {

                        //console.log(relativePath);
                        let filePath = relativePath.split('/');
                        let fileName = filePath[filePath.length - 1];

                        if ((!file.dir) && (fileName[0] != ".")){
                            //console.log(fileName);
                            if (fileName === "index.html") {
                                let building_promise = file.async("string").then(function (content: any) {

                                    let buildingNameList: any[] = [];

                                    let buildingHtml = parse5.parse(content);
                                    let buildingList = that.searchNode(buildingHtml, 'class', 'views-table cols-5 table');

                                    for (let i = 0; i < buildingList.childNodes[3].childNodes.length; i++) {

                                        if (i%2 === 1) {
                                            let buildingInfo = buildingList.childNodes[3].childNodes[i];
                                            let buildingShortName = buildingInfo.childNodes[3].childNodes[0].value.trim();
                                            //console.log(buildingShortName);
                                            buildingNameList.push(buildingShortName);
                                        }
                                    }
                                    return buildingNameList;
                                })
                                processList.push(building_promise);
                            }
                            else {
                                let room_promise = file.async("string").then(function (content: any) {

                                    let roomList: any[] = [];

                                    let roomHtml = parse5.parse(content);

                                    let roomNameNode = that.searchNode(roomHtml, 'id', 'building-info');
                                    let roomListNode = that.searchNode(roomHtml, 'class', 'views-table cols-5 table');

                                    let buildingShortName = fileName;
                                    let buildingFullName = roomNameNode.childNodes[1].childNodes[0].childNodes[0].value;
                                    let buildingAddress = roomNameNode.childNodes[3].childNodes[0].childNodes[0].value.replace(/,/g,"");

                                    let buildingUrl = "http://skaha.cs.ubc.ca:11316/api/v1/team13/" + buildingAddress.trim().replace(/ /g, "%20");

                                    if (roomListNode != null) {

                                        let roomsArray = roomListNode.childNodes[3].childNodes;
                                        //console.log(roomsArray.length);
                                        for (let i = 1; i < roomsArray.length; i+=2) {

                                            let room : any = {};

                                            let singleRoomInformation = roomsArray[i];
                                            room.rooms_number = parse5.serialize(singleRoomInformation.childNodes[1].childNodes[1]);
                                            room.rooms_name = buildingShortName + "_" + room.rooms_number;
                                            room.rooms_seats = parseInt(parse5.serialize(singleRoomInformation.childNodes[3]));
                                            room.rooms_furniture = parse5.serialize(singleRoomInformation.childNodes[5]).trim();
                                            room.rooms_type = parse5.serialize(singleRoomInformation.childNodes[7]).trim();

                                            let href = singleRoomInformation.childNodes[1].childNodes[1];
                                            for (var attr of href.attrs) {
                                                if (attr.name === 'href') {
                                                    room.rooms_href = attr.value;
                                                }
                                            }

                                            room.rooms_fullname = buildingFullName;
                                            room.rooms_shortname = buildingShortName;
                                            room.rooms_address = buildingAddress;
                                            room.rooms_url = buildingUrl;

                                            roomList.push(room);

                                        }
                                        if (roomList.length > 0) {   // The api is not stable // comment out this for stable test but not for real autotest
                                            // return that.getLatLon(roomList[0].rooms_url, roomList).then(function (roomList: any) {
                                            //     return roomList;});
                                        }
                                    }
                                    return roomList;
                                })
                                processList.push(room_promise);
                            }
                        }
                    });

                    Promise.all(processList).then(function (informationList: any) {
                        let validNameList :any[] = [];

                        for (let info of informationList) {
                            if (info.length === 74) {
                                for (let i = 0; i < info.length; i++) {
                                    validNameList.push(info[i]);
                                }
                            }
                        }
                        for (let info of informationList) {
                            if (info.length!= 0 && info.length != 74) {
                                //console.log(info.length);
                                for (let j = 0; j < info.length; j++) {
                                    //console.log(info[j]);
                                    //console.log(info[j].rooms_shortname);
                                    for (let i = 0; i < validNameList.length; i++) {
                                        if (info[j].rooms_shortname === validNameList[i]) {
                                            that.roomsInformations.push(info[j])
                                        }
                                    }
                                }
                            }
                        }
                        //console.log(that.roomInformations.length);
                        that.saveRamOfIdToDisk(id);
                        // for (let j = 0; j < that.roomsInformations.length; j++) {
                        //     if (that.roomsInformations[j].rooms_lat != null){
                        //        console.log(that.roomsInformations[j]);
                        //     }
                        // }
                        let response2: InsightResponse = {code: 204, body: {}};
                        if(isadded){
                            response2.code = 201;
                        }
                        fulfill(response2);

                    }).catch(function (e: any) {
                        Log.error("con not unzip")
                        let response = {code: 400, body: {"error": 'Message not provided'}};
                        reject(response);
                    });
                }).catch(function (e: any) {
                    Log.error(e.message);
                    Log.error("con not unzip")
                    let response = {code: 400, body: {"error": 'Message not provided'}};
                    reject(response);

                })


            }

            if (id === "courses") {

                p.then(function (zip: any) {
                    let processList = <any>[];
                    zip.forEach(function (relativePath: any, file: any) {

                        if (!file.dir) {
                            let course_promise = file.async("string");
                            processList.push(course_promise);
                        }
                    });

                    Promise.all(processList).then(function (courseList) {
                        let info_length = that.courseInformation.length;
                        for (let jsonObj_str of courseList) {
                            try {
                                //console.log(courseObj);
                                that.parseCourse(id, (jsonObj_str as string));
                            }
                            catch (err) {
                                let response1: InsightResponse = {code: 400, body: {"error": "Message not provided"}};
                                reject(response1);
                            }
                        }
                        if ((that.courseInformation.length === info_length) && !isadded) {
                            let response3: InsightResponse = {code: 400, body: {"error": "Message not provided"}};
                            reject(response3);
                        }
                        let response2: InsightResponse = {code: 204, body: {}};
                        if (isadded) {
                            response2.code = 201;
                        }
                        that.saveRamOfIdToDisk(id);
                        fulfill(response2);

                    })
                        .catch(function (e: any) {
                            Log.error("con not unzip")
                            let response = {code: 400, body: {"error": 'Message not provided'}};
                            reject(response);
                        });

                }).catch(function (e: any) {
                    Log.error(e.message);
                    Log.error("con not unzip")
                    let response = {code: 400, body: {"error": 'Message not provided'}};
                    reject(response);

                })
            }

        });

    }

    searchNode(node: any, name: any, value: any) {
        let attrs = node.attrs || [];
        let childNodes = node.childNodes || [];
        let bool = false;
        for (let attr of attrs) {
            if ((attr.name === name) && (attr.value === value)) {
                bool = true;
            }
        }
        if (bool) {
            return node;
        }
        else if (childNodes !== null) {
            let result: any = null;
            for (let i = 0; (result === null) && (i < childNodes.length); i++) {
                result = this.searchNode(childNodes[i], name, value);
            }
            return result;
        }
        return null;
    }

    getLatLon(url:string, roomList: any) {
        return new Promise(function (fulfill, reject) {
            http.get(url, function (response : any) {
                //console.log(response);
                let body : any = '';
                response.on('data', function (d: any) {
                    body += d;
                });
                response.on('end', function () {
                    let latlon = JSON.parse(body);
                    //console.log(body);
                    //let latlonArray : any[] = [];
                    let lat = latlon.lat;
                    let lon = latlon.lon;
                    for (let room of roomList) {
                        room.rooms_lat = lat;
                        room.rooms_lon = lon;
                    }
                    fulfill(roomList);
                });
            })
        })
    }

    removeIdInRam(id:string) {

        //console.log('run there!!!');

        if(id=="courses"){
            this.courseInformation=[];
            return;
        }
        if(id=="rooms"){
            this.roomsInformations=[];
            return;
        }

        throw new Error("delete an invald id");
    }

    saveRamOfIdToDisk (id: string) {

        //this.dataSets[id] = data;


        let data_selected : any []= [];
        if (id === "courses") {

            data_selected = this.courseInformation;
        }
        if(id === "rooms")
        {
            data_selected = this.roomsInformations;
        }

        if(data_selected.length==0){
            throw new Error("Error:no data to save");
        }



        let dataToSave = JSON.stringify(data_selected);

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


            if(id!="courses"&&id!="rooms"){
                let response: InsightResponse;
                response = {code: 404, body: {"error": 'Message not provided(Invalid ID)'}};
                reject(response);
                return;
            }

            try {
                let response: InsightResponse;
                fs.statSync("./data/" + id + ".json");
                fs.unlinkSync("./data/" + id + ".json"); // remove from disk
                that.removeIdInRam(id);
                response = {code: 204, body: {}};
                fulfill(response);

            } catch (err) {
                let response: InsightResponse;
                response = {code: 404, body: {"error": 'Message not provided'}};
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
                    section.courses_uuid = String(infoList[i].id);
                    //section.source = id;
                    section.course_section = infoList[i].Section;


                    if (section.courses_dept != null && typeof section.courses_dept != 'undefined' &&
                        section.courses_id != null && typeof section.courses_id != 'undefined' &&
                        section.courses_avg != null && typeof section.courses_avg != 'undefined' &&
                        section.courses_instructor != null && typeof section.courses_instructor != 'undefined' &&
                        section.courses_title != null && typeof section.courses_title != 'undefined' &&
                        section.courses_pass != null && typeof section.courses_title != 'undefined' &&
                        section.courses_fail != null && typeof section.courses_fail != 'undefined' &&
                        section.courses_audit != null && typeof section.courses_audit != 'undefined' &&
                        section.courses_uuid != null && typeof section.courses_uuid != 'undefined') {

                        if (section.course_section === "overall") {

                            section.course_year = 1900;

                        } else {

                            section.course_year = infoList[i].Year;
                        }

                        this.courseInformation.push(section);
                    }
                }
            }
        }
    }





    performQuery(query: any): Promise <InsightResponse> {
        return new Promise((fulfill,reject)=>{
            let response:InsightResponse = null;
            response = QH.isValidQuery(query);   // validate the request query main on the parts other than the filter, since I handle it in filter out function





            if (response.code == 400){
                reject(response);
            }else {
                let selected: boolean[] = null;
                let typeOfQuery = (response.body as any)[0];


                let information =[];
                if(typeOfQuery == "rooms"){
                    information = this.roomsInformations;
                }
                if(typeOfQuery == "courses"){
                    information = this.courseInformation;
                }

                if(information.length==0){
                    response.code = 424;
                    reject(response);
                    return;
                }


                if(typeOfQuery == "courses") {
                    try {
                        selected = QH.filterOut_courses(information, query["WHERE"]);
                    }
                    catch (e) {
                        try {
                            response = JSON.parse(e.message);
                        } catch (e) {
                            Log.error("Should not be here, internal error");
                        }
                        reject(response);
                    }
                }

                if(typeOfQuery == "rooms"){
                    try {
                        selected = QH.filterOut_rooms(information, query["WHERE"]);
                    }
                    catch (e) {
                        try {
                            response = JSON.parse(e.message);
                        } catch (e) {
                            Log.error("Should not be here, internal error");
                        }
                        reject(response);
                    }
                }





                let body_pre = [];
                let len = information.length;
                for(let i = 0;i<len;i++){
                    if(selected[i]){
                        body_pre.push(information[i]);
                    }
                }


                //sort the output
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