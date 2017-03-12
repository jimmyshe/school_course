/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";
import QH from "./queryHelper";
import Log from "../Util";

"use strict";

let fs = require("fs");
let JSZip = require("jszip");
let parse5 = require("parse5");
let http = require('http');

export default class InsightFacade implements IInsightFacade {

    //private dataSets: any;

    courseInformation: any[] = [] ;

    roomsInformation: any[] = [];

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
                    this.roomsInformation = file;
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

        if(fs.existsSync("./data/"+id+".json")){
            isadded = true;
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

            try {

                let myzip = new JSZip();
                let p = myzip.loadAsync(content, {base64: true})  // load content into myzip

                if (id === "rooms") {

                    p.then(function (zip: any) {
                        let processList = <any>[];
                        zip.forEach(function (relativePath: any, file: any) {

                            //console.log(relativePath);
                            let filePath = relativePath.split('/');
                            let fileName = filePath[filePath.length - 1];

                            if ((!file.dir) && (fileName[0] != ".")) {
                                //console.log(fileName);
                                if (fileName === "index.htm") {
                                    let building_promise = file.async("string").then(function (content: any) {

                                        let buildingNameList: any[] = [];

                                        let buildingHtml = parse5.parse(content);
                                        let buildingList = that.searchNode(buildingHtml, 'class', 'views-table cols-5 table');
                                        //console.log(buildingList);

                                        for (let i = 0; i < buildingList.childNodes[3].childNodes.length; i++) {

                                            if (i % 2 === 1) {
                                                let buildingInfo = buildingList.childNodes[3].childNodes[i];
                                                let buildingShortName = buildingInfo.childNodes[3].childNodes[0].value.trim();
                                                //console.log(buildingShortName);
                                                buildingNameList.push(buildingShortName);
                                            }
                                        }

                                        return buildingNameList;

                                    })
                                    processList.push(building_promise);
                                } else {
                                    let room_promise = file.async("string").then(function (content: any) {

                                        let roomList: any[] = [];

                                        let roomHtml = parse5.parse(content);

                                        let roomNameNode = that.searchNode(roomHtml, 'id', 'building-info');
                                        let roomListNode = that.searchNode(roomHtml, 'class', 'views-table cols-5 table');

                                        let buildingShortName = fileName;

                                        let buildingFullName = parse5.serialize(roomNameNode.childNodes[1].childNodes[0]);
                                        let buildingAddress = parse5.serialize(roomNameNode.childNodes[3].childNodes[0]);
                                        let buildingUrl = "http://skaha.cs.ubc.ca:11316/api/v1/team13/" + buildingAddress.trim().replace(/ /g,"%20");

                                        if (roomListNode != null) {

                                            if (roomListNode.childNodes[3] != null) {

                                                let roomsArray = roomListNode.childNodes[3].childNodes;
                                                    //console.log(roomsArray.length);
                                                for (let i = 1; i < roomsArray.length; i += 2) {

                                                    let room: any = {};

                                                    let singleRoomInformation = roomsArray[i];
                                                    room.rooms_number = parse5.serialize(singleRoomInformation.childNodes[1].childNodes[1]);
                                                    room.rooms_name = buildingShortName + "_" + room.rooms_number;
                                                    room.rooms_seats = parseInt(parse5.serialize(singleRoomInformation.childNodes[3]));
                                                    room.rooms_furniture = parse5.serialize(singleRoomInformation.childNodes[5]).trim().replace(/&amp;/g, "&");
                                                    room.rooms_type = parse5.serialize(singleRoomInformation.childNodes[7]).trim();

                                                    let href = singleRoomInformation.childNodes[1].childNodes[1];
                                                    for (let attr of href.attrs) {
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
                                                    return that.getLatLon(roomList[0].rooms_url, roomList).then(function (roomList: any) {
                                                     return roomList;
                                                    });
                                                }
                                            }
                                            //console.log(roomList.length);
                                            for (let room of roomList) {
                                                console.log(room);
                                            }
                                            return roomList;
                                        }

                                    }).catch (function (err:any) {
                                        Log.trace(err.message);
                                    });
                                    processList.push(room_promise);
                                }
                            }
                        });

                        Promise.all(processList).then(function (informationList: any) {



                            let temp_roomsinfo = that.roomsInformation;
                            that.roomsInformation = [];

                            let validNameList: any[] = [];
                            for (let info of informationList) {
                                if (typeof info != 'undefined') {
                                   // console.log(info.length);
                                }
                                //console.log(info);
                            }
                            for (let info of informationList) {
                                if (typeof info != 'undefined' && info.length === 74) {
                                    for (let i = 0; i < info.length; i++) {
                                        validNameList.push(info[i]);
                                    }
                                }
                            }
                            console.log(validNameList.length);

                            for (let info of informationList) {
                                if (typeof info != 'undefined' && info.length != 0 && info.length != 74) {
                                    //console.log(info.length);
                                    for (let j = 0; j < info.length; j++) {
                                        //console.log(info[j]);
                                        //console.log(info[j].rooms_shortname);
                                        for (let i = 0; i < validNameList.length; i++) {
                                            if (info[j].rooms_shortname === validNameList[i]) {
                                                that.roomsInformation.push(info[j])
                                            }
                                        }
                                    }
                                }
                            }
                            console.log(informationList.length);
                            let response2: InsightResponse = {code: 204, body: {}};
                            if (that.roomsInformation.length == 0) {
                                response2.code = 400;
                                response2.body = {"erro": "No valid room data added"};
                                that.roomsInformation = temp_roomsinfo;
                                reject(response2);
                                return;
                            }

                            if (isadded) {
                                response2.code = 201;
                                //fs.unlinkSync("./data/rooms.json")
                            }
                            that.saveRamOfIdToDisk(id);
                            fulfill(response2);

                        }).catch(function (e: any) {
                            Log.error(e.message)
                            Log.error("con not unzip")
                            let response = {code: 400, body: {"error": 'Message not provided1'}};
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
                            let temp_coursesinfo = that.courseInformation;
                            that.courseInformation = [];
                            for (let jsonObj_str of courseList) {
                                try {
                                    //console.log(courseObj);
                                    that.parseCourse(id, (jsonObj_str as string));
                                }
                                catch (err) {
                                    let response1: InsightResponse = {
                                        code: 400,
                                        body: {"error": "Message not provided"}
                                    };
                                    reject(response1);
                                }
                            }
                            let response2: InsightResponse = {code: 204, body: {}};
                            if (that.courseInformation.length == 0) {
                                response2.code = 400;
                                response2.body = {"erro": "No valid course data added"};
                                that.courseInformation = temp_coursesinfo;
                                reject(response2);
                                return;
                            }

                            if (isadded) {
                                response2.code = 201;
                                fs.unlinkSync("./data/courses.json")
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
            } catch(err) {
                let response = {code: 400, body: {"error": 'Message not provided'}};
                reject(response);
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
            }).on('err', function (err:any){
                console.log(err);
            });
        })
    }

    removeIdInRam(id:string) {

        //console.log('run there!!!');

        if(id=="courses"){
            this.courseInformation=[];
            return;
        }
        if(id=="rooms"){
            this.roomsInformation=[];
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
            data_selected = this.roomsInformation;
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

            let response: InsightResponse;

            if(id!="courses"&&id!="rooms"){
                response = {code: 404, body: {"error": 'Message not provided(Invalid ID)'}};
                reject(response);
                return;
            }

            if(fs.existsSync("./data/"+id+".json")){
                that.removeIdInRam(id);
                fs.unlinkSync("./data/"+id+".json");
                response = {code: 204, body: {}};
                fulfill(response);
                return ;
            }else {
                response = {code: 404, body: {"error": 'Message not provided'}};
                reject(response);
                return;
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

                            section.courses_year = 1900;

                        } else {

                            section.courses_year = Number(infoList[i].Year);
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
                let typeOfQuery = (response.body as any)["missing"][0];


                let information:any =[];
                if(typeOfQuery == "rooms" && fs.existsSync('./data/rooms.json')){
                    information = this.roomsInformation;
                } else if(typeOfQuery == "courses" && fs.existsSync('./data/courses.json')){
                    information = this.courseInformation;
                }
                console.log(information.length);
                if (information.length === 0) {
                    response.code = 424;
                    response.body = {'missing':[typeOfQuery]};
                    reject(response);

                } else {
                    if(JSON.stringify( query["WHERE"])== JSON.stringify(  {})){
                        selected = Array(information.length).fill(true);
                    } else {

                        if (typeOfQuery == "courses") {
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

                        if (typeOfQuery == "rooms") {
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
                    }


                    let body_pre:any = [];
                    let len = information.length;
                    for (let i = 0; i < len; i++) {
                        if (selected[i]) {
                            body_pre.push(information[i]);
                        }
                    }


                    if(query["TRANSFORMATIONS"]==null) {
                        //sort the output
                        len = body_pre.length;
                        //These are all sections selected
                        let order_key = query.OPTIONS.ORDER;  // sort the body_pre if it is necessary
                        if (order_key != null) {
                            if(typeof order_key == "string") {
                                body_pre.sort((n1:any, n2:any) => {

                                    if ((n1 as any)[order_key] > (n2 as any)[order_key]) {
                                        return 1;
                                    } else if ((n1 as any)[order_key] == (n2 as any)[order_key]) {
                                        return 0;
                                    } else {
                                        return -1;
                                    }
                                });
                            }
                            else {
                                let order_obj = query.OPTIONS.ORDER;
                                let dir = order_obj['dir'];
                                let keys =  order_obj['keys'];
                                body_pre = QH.adv_mergeSort(body_pre,dir,keys);
                            }
                        }

                        let results: {}[] = [];
                        for (let i = 0; i < body_pre.length; i++) {
                            let element: any = {};
                            for (let j = query.OPTIONS.COLUMNS.length - 1; j >= 0; j--) {
                                element[query.OPTIONS.COLUMNS[j]] = (body_pre[i] as any)[query.OPTIONS.COLUMNS[j]];
                            }
                            results.push(element);
                        }
                        response.code = 200;
                        response.body = {'render': query.OPTIONS.FORM, 'result': results};
                        fulfill(response);
                    }

                    else {  // here is the cases for query with TRANSFORMATIONS
                        let trans = query["TRANSFORMATIONS"];
                        let group = trans["GROUP"];
                        let apply = trans["APPLY"];

                        // data divided here
                        let data_grouped:any =[];
                        let data_grouped_raw:any = [];

                        let p_head:any = {};

                        body_pre = QH.adv_mergeSort(body_pre, "DOWN", group);

                        for (let key_index = 0; key_index < group.length; key_index++) {
                            p_head[group[key_index]] = body_pre[0][group[key_index]];
                        }

                        data_grouped.push(p_head);
                        data_grouped_raw.push([body_pre[0]]);

                        let counter = 0;

                        for(let i = 1;i<body_pre.length;i++){


                            let head:any ={};

                            for (let key_index = 0; key_index < group.length; key_index++) {
                                head[group[key_index]] = body_pre[i][group[key_index]];
                            }

                            if (JSON.stringify(head) != JSON.stringify(p_head)) {
                                counter++;
                                data_grouped.push(head);
                                p_head = head;
                                data_grouped_raw.push([body_pre[i]]);
                            } else {
                                data_grouped_raw[counter].push(body_pre[i]);
                            }

                            /*for(let j=0;j<group.length;j++){
                                head[group[j]]=body_pre[i][group[j]];
                            }

                            let index = data_grouped.map(function (d:any) {
                                return JSON.stringify(d);
                            }).indexOf(JSON.stringify(head));

                            if(index==-1){
                                data_grouped.push(head);
                                data_grouped_raw.push([body_pre[i]]);
                            }else {
                                data_grouped_raw[index].push(body_pre[i]);
                            }*/
                        }

                        //applay
                        for(let i=0;i<apply.length;i++){
                            let applykeyName = Object.keys(apply[i])[0];
                            let applykeyObj = apply[i][applykeyName];
                            let applyToken = Object.keys( applykeyObj)[0];
                            let applyDataKey = applykeyObj[applyToken];

                            for(let j=0;j<data_grouped.length;j++){
                                let applyValue:number;
                                try {
                                    applyValue = QH.applyApplykey(applyToken, applyDataKey, data_grouped_raw[j]);
                                }catch (e){
                                    response.code = 400;
                                    response.body = {"error": "the applykey obj is not valid"};
                                    reject(response);
                                }
                                data_grouped[j][applykeyName] = applyValue;
                            }
                        }

                        //todo sort the groups
                        len = data_grouped.length
                        let order_key = query.OPTIONS.ORDER;  // sort the body_pre if it is necessary
                        if (order_key != null) {
                            if(typeof order_key == "string") {
                                data_grouped.sort((n1:any, n2:any) => {
                                    if ((n1 as any)[order_key] > (n2 as any)[order_key]) {
                                        return 1;
                                    } else if ((n1 as any)[order_key] == (n2 as any)[order_key]) {
                                        return 0;
                                    } else {
                                        return -1;
                                    }
                                });
                            }
                            else {
                                let order_obj = query.OPTIONS.ORDER;
                                let dir = order_obj['dir'];
                                let keys =  order_obj['keys'];
                                data_grouped = QH.adv_mergeSort(data_grouped,dir,keys);
                            }
                        }


                        response.code = 200;
                        response.body = {'render': query.OPTIONS.FORM, 'result': data_grouped}
                        fulfill(response);

                    }
                }
            }
        })
    }
}