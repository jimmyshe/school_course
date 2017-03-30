/**
 * Created by cq2essz on 2017/3/23.
 */
import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {treeAdapters} from "parse5";

@Injectable()
export class uiService{
        // performquery(query:any):any {
        //     return Promise.resolve( {"code":400,
        //             "body":{}});
        // }

    private dataUrl = "http://localhost:4321/"
    constructor(private http: Http) { }


    performquery(query:any):any {
        return this.http.post(this.dataUrl+"query",query).toPromise()

    }


    addData(id:any, data:any):any{
        return this.http.put(this.dataUrl+"dataset/"+id, data).toPromise();
    }

    removeData(id:any):any{
        return this.http.delete(this.dataUrl+"dataset/"+id).toPromise();
    }


    performRoomQuery(roomSize:string, roomNumber:string, buildingName:string, roomDistance:string, targetBuilding:string,
                     roomType:string, furnitureType:string, andorSelection:string) {

        let query:any = {};

        let filterObj:any = {};

        let conditionArray: any [] = [];

        if (roomSize != "") {
            let roomSizeCondition:any = {};
            roomSizeCondition["GT"] = {"rooms_seats":+roomSize};
            conditionArray.push(roomSizeCondition);
        }

        if (roomNumber != "") {
            let roomNumberCondition:any = {};
            roomNumberCondition["IS"] = {"rooms_number":roomNumber};
            conditionArray.push(roomNumberCondition);
        }

        if (buildingName != "") {
            let buildingNameCondition:any = {};
            buildingNameCondition["IS"] = {"rooms_shortname":buildingName};
            conditionArray.push(buildingNameCondition);
        }

        if (roomType != "--Any--") {
            let roomTypeCondition:any = {};
            roomTypeCondition["IS"] = {"rooms_type":roomType};
            conditionArray.push(roomTypeCondition);
        }

        if (furnitureType != "--Any--") {
            let furnitureTypeCondition:any = {};
            furnitureTypeCondition["IS"] = {"rooms_type":roomType};
            conditionArray.push(furnitureTypeCondition);
        }

        if (roomDistance != "" && targetBuilding != "") {
            let distanceCondition:any = {};
            let key = "rooms_distance_from_"+targetBuilding;
            let obj:any = {};
            obj[key] = +roomDistance;
            distanceCondition["LT"] = obj;
            conditionArray.push(distanceCondition);
        }


        let optionObj = {
            "COLUMNS": [
                "rooms_name",
                "rooms_address",
                "rooms_type",
                "rooms_href"
            ],
            "FORM": "TABLE"
        }

        if (andorSelection === "and") {
            filterObj["AND"] = conditionArray;
        } else if (andorSelection === "or") {
            filterObj["OR"] = conditionArray;
        } else {
            filterObj = conditionArray[0];
        }

        if (filterObj != {}){
            query["WHERE"] = filterObj;
        }
        query["OPTIONS"] = optionObj;

        //return JSON.stringify(query);
        return this.http.post(this.dataUrl+ "query", query).toPromise();

    }


    performCourseSchedule(sdepartment:string, scourseNumber:string, scourseandorSelection:string){
        let query:any = {};

        let filterObj:any = {};

        let resultArray:any[] = [];

        let conditionArray: any [] = [];

        if (sdepartment != "") {
            let sdepartmentCondition:any = {};
            sdepartmentCondition["IS"] = {"courses_dept":sdepartment};
            conditionArray.push(sdepartmentCondition);
        }

        if (scourseNumber!= "") {
            let scourseNumberCondition:any = {};
            scourseNumberCondition["IS"] = {"courses_id":scourseNumber};
            conditionArray.push(scourseNumberCondition);
        }

        let scourseYearCondition:any = {};
        scourseYearCondition["IS"] = {"courses_year": 2014};
        conditionArray.push(scourseYearCondition);


        let optionObj = {
            "COLUMNS": [
                "courses_title",
                "maxSize",
                "countSection"
            ],
            "FORM": "TABLE"
        }

        let transObj = {
            "GROUP": ["courses_title"],
            "APPLY": [{
                "maxSize": {
                    "MAX": "courses_size"
                }
            }, {
                "countSection": {
                    "COUNT": "courses_uuid"
                }
            }]
        }

        if (scourseandorSelection === "and") {
            filterObj["AND"] = conditionArray;
        } else if (scourseandorSelection === "or") {
            filterObj["OR"] = conditionArray;
        } else {
            filterObj = conditionArray[0];
        }

        if (filterObj != {}){
            query["WHERE"] = filterObj;
        }
        query["OPTIONS"] = optionObj;
        query["TRANSFORMATIONS"] = transObj;

        return JSON.stringify(query);

        //this.http.post(this.dataUrl+ "query", query).toPromise().then((ret:any)=>{
            //resultArray = ret.body["result"];
        //})

        //return resultArray;

    }

    performRoomSchedule(sbuildingName:string, sdistance:string, stargetBuilding:string, sroomandorSelection:string){

        let query:any = {};

        let filterObj:any = {};

        let resultArray:any[] = [];

        let conditionArray: any [] = [];

        if (sbuildingName != "") {
            let sbuildingNameCondition:any = {};
            sbuildingNameCondition["IS"] = {"rooms_shortname":sbuildingName};
            conditionArray.push(sbuildingNameCondition);
        }

        if (sdistance!= "" && stargetBuilding != "") {
            let sdistanceCondition:any = {};
            let key = "rooms_distance_from_" + stargetBuilding;
            let obj:any = {};
            obj[key] = +sdistance;
            sdistanceCondition["LT"] = obj;
            conditionArray.push(sdistanceCondition);
        }

        let optionObj = {
            "COLUMNS": [
                "rooms_name",
                "rooms_size"
            ],
            "FORM": "TABLE"
        }

        if (sroomandorSelection === "and") {
            filterObj["AND"] = conditionArray;
        } else if (sroomandorSelection === "or") {
            filterObj["OR"] = conditionArray;
        } else {
            filterObj = conditionArray[0];
        }

        if (filterObj != {}){
            query["WHERE"] = filterObj;
        }
        query["OPTIONS"] = optionObj;

        return JSON.stringify(query);

        //this.http.post(this.dataUrl+ "query", query).toPromise().then((ret:any)=>{
            //resultArray = ret.body["result"];
       // })

        //return resultArray;
    }

    scheduleSection(sroom:any, scourse:any){
        //filter out courses that are impossible to be scheduled
        let validCourse:any[] = []
        for (let i = 0; i < scourse.length; i++) {
            if (scourse[i]["maxSize"] <= this.findMaxRoomSize(sroom)["rooms_size"]) {
                //get the correct section number
                if (scourse[i]["countSection"] % 3 === 0){
                    scourse[i]["countSection"] = (scourse[i]["countSection"] / 3)
                } else {
                    scourse[i]["countSection"] = (scourse[i]["countSection"] / 3) + 1;
                }
                scourse[i]["timeSlot"] = [];
                scourse[i]["rooms"] = [];
                scourse[i]["roomSizes"] = [];
                validCourse.push(scourse[i]);
            }
        }

        for (let i = 0; i < sroom.length; i++) {
            sroom[i]["mwfList"] = [];
            sroom[i]["ttList"] = [];
        }

        //get all room slots to schedule
        let allRoomTimeSlot:any[] = [];
        for (let i = 0; i < sroom.length; i++) {
            for (let m = 8; m < 17; m++){

                let roomSlot:any = {};
                roomSlot["time"] = "MWF" + " " + m.toString() + ":00";
                roomSlot["location"] = sroom[i]["rooms_name"];
                roomSlot["size"] = sroom[i]["rooms_seats"];
                roomSlot["state"] = "not used";
                allRoomTimeSlot.push(roomSlot);
            }

            let roomSlot1:any = {};
            roomSlot1["time"] = "TT" + " " + "8:00";
            roomSlot1["location"] = sroom[i]["rooms_name"];
            roomSlot1["size"] = sroom[i]["rooms_size"];
            roomSlot1["state"] = "not used";
            allRoomTimeSlot.push(roomSlot1);
            let roomSlot2:any = {};
            roomSlot2["time"] = "TT" + " " + "9:30";
            roomSlot2["location"] = sroom[i]["rooms_name"];
            roomSlot2["size"] = sroom[i]["rooms_size"];
            roomSlot2["state"] = "not used";
            allRoomTimeSlot.push(roomSlot2);
            let roomSlot3:any = {};
            roomSlot3["time"] = "TT" + " " + "11:00";
            roomSlot3["location"] = sroom[i]["rooms_name"];
            roomSlot3["size"] = sroom[i]["rooms_size"];
            roomSlot3["state"] = "not used";
            allRoomTimeSlot.push(roomSlot3);
            let roomSlot4:any = {};
            roomSlot4["time"] = "TT" + " " + "12:30";
            roomSlot4["location"] = sroom[i]["rooms_name"];
            roomSlot4["size"] = sroom[i]["rooms_size"];
            roomSlot4["state"] = "not used";
            allRoomTimeSlot.push(roomSlot4);
            let roomSlot5:any = {};
            roomSlot5["time"] = "TT" + " " + "14:00";
            roomSlot5["location"] = sroom[i]["rooms_name"];
            roomSlot5["size"] = sroom[i]["rooms_size"];
            roomSlot5["state"] = "not used";
            allRoomTimeSlot.push(roomSlot5);
            let roomSlot6:any = {};
            roomSlot6["time"] = "TT" + " " + "15:30";
            roomSlot6["location"] = sroom[i]["rooms_name"];
            roomSlot6["size"] = sroom[i]["rooms_size"];
            roomSlot6["state"] = "not used";
            allRoomTimeSlot.push(roomSlot6);
        }

        let courseAddedSoFar = 0;
        let totalCourses = 0;
        for (let i = 0; i < validCourse.length; i++){
            totalCourses += validCourse[i]["countSection"];
        }

        let sectionNotAdded = 0;
        let sectionProceedSoFar = courseAddedSoFar + sectionNotAdded;

        let resultArray:any [] = []

        while(sectionProceedSoFar < totalCourses){
            let courseToAdd = this.findLargestCourse(validCourse);
            for (let i = 0; i < courseToAdd["countSection"]; i++) {
                if (allRoomTimeSlot.length > 0) {
                    if (this.getSlotForCourse(courseToAdd, allRoomTimeSlot != null)){
                        courseAddedSoFar += 1;
                    } else {
                        sectionNotAdded += 1;
                    }
                } else {
                    sectionNotAdded += 1;
                }
            }
            resultArray.push(courseToAdd);
        }

        let quality = courseAddedSoFar / totalCourses;


    }

    findMaxRoomSize(sroom:any){
        //find the largest room size
        let largestSize = sroom[0]["rooms_size"];
        let largestRoom = sroom[0];
        for (let i = 0; i < sroom.length; i++) {
            if (sroom[i]["rooms_size"] > largestSize) {
                largestSize = sroom[i]["rooms_size"];
                largestRoom = sroom[i];
            }
        }
        return largestRoom;
    }

    findLargestCourse(allSection:any){
        let largestSize = allSection[0]["maxSize"];
        let largestSection = allSection[0];
        for (let i = 0; i < allSection.length; i++) {
            if (allSection[i]["maxSize"] > largestSize) {
                largestSize = allSection[i]["maxSize"];
                largestSection = allSection[i];
            }
        }
        return largestSection;
    }

    getSlotForCourse(course:any, allRoomTimeSlot:any) {
        for (let i = 0; i < allRoomTimeSlot.length; i++){
            if (allRoomTimeSlot[i]["size"] >= course["maxSize"]
                && !course["timeSlot"].include(allRoomTimeSlot[i]["time"])
                && allRoomTimeSlot[i]["state"] === "not used"){

                allRoomTimeSlot[i]["state"] = "used";
                allRoomTimeSlot[i]["course"] = course["title"];
                allRoomTimeSlot[i]["course_size"] = course["maxSize"];

                course["timeSlot"].push(allRoomTimeSlot[i]["time"]);
                course["rooms"].push(allRoomTimeSlot[i]["location"]);
                course["roomSizes"].push(allRoomTimeSlot[i]["size"]);

                return allRoomTimeSlot[i];
            }
        }
        return null;
    }

    getDinning(fbuildingName:string, fdistance:string){
        let query:any = {};

        let fdistanceCondition:any = {};

        if (fdistance!= "" && fbuildingName != "") {
            let key1 = "rooms_distance_from_" + fbuildingName;
            let obj:any = {};
            obj[key1] = +fdistance;
            fdistanceCondition["LT"] = obj;
        }

        let optionObj = {
            "COLUMNS": [
                "rooms_name",
                "rooms_din"
            ],
            "FORM": "TABLE"
        }


        query["WHERE"] = fdistanceCondition;
        query["OPTIONS"] = optionObj;

        return JSON.stringify(query);
    }
}

