/**
 * Created by cq2essz on 2017/3/30.
 */
import {Input, Component } from '@angular/core';
import {uiService} from './ui.service';


@Component({

    moduleId: module.id,
    selector: 'schedule-ui',
    templateUrl: './ui.schedule.component.html',
    providers:[uiService]
})

export class uiScheduleComponent{

    @Input() rooms:JSON = null;
    @Input()courses:JSON = null;

    result:any = null;

   // result = [{"mwf":[{"name":"hist music ii","size":93,"time":"MWF 8:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 9:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 10:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 11:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 12:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 13:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 14:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 15:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 16:00","roomSize":120},{"name":"fndtns rl es mth","size":127,"time":"MWF 8:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 9:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 10:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 11:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 12:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 13:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 14:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 15:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 16:00","roomSize":160}],"tt":[{"name":"integral calculu","size":48,"time":"TT 8:00","roomSize":120},{"name":"integral calculu","size":48,"time":"TT 9:30","roomSize":120},{"name":"integral calculu","size":48,"time":"TT 11:00","roomSize":120},{"name":"fndtns rl es mth","size":127,"time":"TT 8:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 9:30","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 11:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 12:30","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 14:00","roomSize":160}]},{"mwf":[{"name":"hist music ii","size":93,"time":"MWF 8:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 9:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 10:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 11:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 12:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 13:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 14:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 15:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 16:00","roomSize":120},{"name":"fndtns rl es mth","size":127,"time":"MWF 8:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 9:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 10:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 11:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 12:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 13:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 14:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 15:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 16:00","roomSize":160}],"tt":[{"name":"integral calculu","size":48,"time":"TT 8:00","roomSize":120},{"name":"integral calculu","size":48,"time":"TT 9:30","roomSize":120},{"name":"integral calculu","size":48,"time":"TT 11:00","roomSize":120},{"name":"fndtns rl es mth","size":127,"time":"TT 8:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 9:30","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 11:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 12:30","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 14:00","roomSize":160}]},{"mwf":[{"name":"hist music ii","size":93,"time":"MWF 8:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 9:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 10:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 11:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 12:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 13:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 14:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 15:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 16:00","roomSize":120},{"name":"fndtns rl es mth","size":127,"time":"MWF 8:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 9:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 10:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 11:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 12:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 13:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 14:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 15:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 16:00","roomSize":160}],"tt":[{"name":"integral calculu","size":48,"time":"TT 8:00","roomSize":120},{"name":"integral calculu","size":48,"time":"TT 9:30","roomSize":120},{"name":"integral calculu","size":48,"time":"TT 11:00","roomSize":120},{"name":"fndtns rl es mth","size":127,"time":"TT 8:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 9:30","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 11:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 12:30","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 14:00","roomSize":160}]},{"mwf":[{"name":"hist music ii","size":93,"time":"MWF 8:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 9:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 10:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 11:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 12:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 13:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 14:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 15:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 16:00","roomSize":120},{"name":"fndtns rl es mth","size":127,"time":"MWF 8:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 9:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 10:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 11:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 12:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 13:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 14:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 15:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 16:00","roomSize":160}],"tt":[{"name":"integral calculu","size":48,"time":"TT 8:00","roomSize":120},{"name":"integral calculu","size":48,"time":"TT 9:30","roomSize":120},{"name":"integral calculu","size":48,"time":"TT 11:00","roomSize":120},{"name":"fndtns rl es mth","size":127,"time":"TT 8:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 9:30","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 11:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 12:30","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 14:00","roomSize":160}]},{"mwf":[{"name":"hist music ii","size":93,"time":"MWF 8:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 9:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 10:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 11:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 12:00","roomSize":120},{"name":"hist music ii","size":93,"time":"MWF 13:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 14:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 15:00","roomSize":120},{"name":"integral calculu","size":48,"time":"MWF 16:00","roomSize":120},{"name":"fndtns rl es mth","size":127,"time":"MWF 8:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 9:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 10:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 11:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 12:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 13:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 14:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 15:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"MWF 16:00","roomSize":160}],"tt":[{"name":"integral calculu","size":48,"time":"TT 8:00","roomSize":120},{"name":"integral calculu","size":48,"time":"TT 9:30","roomSize":120},{"name":"integral calculu","size":48,"time":"TT 11:00","roomSize":120},{"name":"fndtns rl es mth","size":127,"time":"TT 8:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 9:30","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 11:00","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 12:30","roomSize":160},{"name":"fndtns rl es mth","size":127,"time":"TT 14:00","roomSize":160}]}]


    quality:number;

    col =["Monday","Tuesday","Wednesday","Thursday","Friday"];
    longer(a1:any,a2:any){
        if(a1.length>a2.length){
            return a1;
        }else {
            return a2;
        }
    }

    get rooms_str(){
        return JSON.stringify(this.rooms);
    }

    get courses_str(){
        return JSON.stringify(this.courses);
    }

    get ret_str(){
        return JSON.stringify(this.result);
    }


    schedule(){
        this.scheduleSection(this.rooms,this.courses);
    }



    scheduleSection(sroom:any, scourse:any){
        //filter out courses that are impossible to be scheduled
        let validCourse:any[] = []
        for (let i = 0; i < scourse.length; i++) {
            if (scourse[i]["maxSize"] <= this.findMaxRoomSize(sroom)["rooms_seats"]) {
                //get the correct section number
                if (scourse[i]["countSection"] % 3 === 0){
                    scourse[i]["countSection"] = (scourse[i]["countSection"] / 3)
                } else {
                    scourse[i]["countSection"] = Math.floor(scourse[i]["countSection"] / 3) + 1;
                }
                scourse[i]["timeSlot"] = [];
                scourse[i]["rooms"] = [];
                scourse[i]["roomSizes"] = [];
                scourse[i]["proceeded"] = "no";
                validCourse.push(scourse[i]);
            }
        }


        for (let i = 0; i < sroom.length; i++) {
                        sroom[i]["sections"] = [];
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
            roomSlot1["size"] = sroom[i]["rooms_seats"];
            roomSlot1["state"] = "not used";
            allRoomTimeSlot.push(roomSlot1);
            let roomSlot2:any = {};
            roomSlot2["time"] = "TT" + " " + "9:30";
            roomSlot2["location"] = sroom[i]["rooms_name"];
            roomSlot2["size"] = sroom[i]["rooms_seats"];
            roomSlot2["state"] = "not used";
            allRoomTimeSlot.push(roomSlot2);
            let roomSlot3:any = {};
            roomSlot3["time"] = "TT" + " " + "11:00";
            roomSlot3["location"] = sroom[i]["rooms_name"];
            roomSlot3["size"] = sroom[i]["rooms_seats"];
            roomSlot3["state"] = "not used";
            allRoomTimeSlot.push(roomSlot3);
            let roomSlot4:any = {};
            roomSlot4["time"] = "TT" + " " + "12:30";
            roomSlot4["location"] = sroom[i]["rooms_name"];
            roomSlot4["size"] = sroom[i]["rooms_seats"];
            roomSlot4["state"] = "not used";
            allRoomTimeSlot.push(roomSlot4);
            let roomSlot5:any = {};
            roomSlot5["time"] = "TT" + " " + "14:00";
            roomSlot5["location"] = sroom[i]["rooms_name"];
            roomSlot5["size"] = sroom[i]["rooms_seats"];
            roomSlot5["state"] = "not used";
            allRoomTimeSlot.push(roomSlot5);
            let roomSlot6:any = {};
            roomSlot6["time"] = "TT" + " " + "15:30";
            roomSlot6["location"] = sroom[i]["rooms_name"];
            roomSlot6["size"] = sroom[i]["rooms_seats"];
            roomSlot6["state"] = "not used";
            allRoomTimeSlot.push(roomSlot6);
        }

        let courseAddedSoFar = 0;
        let totalCourses = 0;
        for (let i = 0; i < validCourse.length; i++){
            totalCourses += validCourse[i]["countSection"];
        }


        let sectionNotAdded = 0;

        for (let i = 0; i < validCourse.length; i++){

            let courseToAdd = this.findLargestCourse(validCourse);
            if(courseToAdd!=null) {
                for (let j = 0; j < courseToAdd["countSection"]; j++) {
                    if (this.getSlotForCourse(courseToAdd, allRoomTimeSlot) != null) {
                        courseAddedSoFar += 1;
                    } else {
                        sectionNotAdded += 1;
                    }
                }
                courseToAdd["proceeded"] = "yes";
            }

        }

        this.quality = courseAddedSoFar / totalCourses;



        let resultArray:any[] = [];

        for (let i = 0; i < validCourse.length; i++){
            for (let j = 0; j < validCourse[i]["timeSlot"].length; j++) {
                let section:any = {};
                section["name"] = validCourse[i]["courses_title"];
                section["size"] = validCourse[i]["maxSize"];
                section["room"] = validCourse[i]["rooms"][j];
                section["time"] = validCourse[i]["timeSlot"][j];
                section["roomSize"] = validCourse[i]["roomSizes"][j];
                resultArray.push(section);
            }
        }
        let scheduleArray:any[] = [];

        for (let i = 0; i < sroom.length; i++){
            let schedule :any= {};
            schedule["room"] = sroom[i]["rooms_name"];
            schedule["mwf"] = [];
            schedule["tt"] = [];
            scheduleArray.push(schedule)
        }

        for (let j = 0; j < scheduleArray.length; j++) {
            for (let i = 0; i < resultArray.length; i++) {
                if (resultArray[i]["room"] === scheduleArray[j]["room"]) {
                    if (resultArray[i]["time"].includes("MWF")) {
                        scheduleArray[j]["mwf"].push(resultArray[i]);
                    } else {
                        scheduleArray[j]["tt"].push(resultArray[i]);
                    }
                }
            }
        }
        this.result = scheduleArray;
    }

    findMaxRoomSize(sroom:any){
        //find the largest room size
        let largestSize = sroom[0]["rooms_seats"];
        let largestRoom = sroom[0];
        for (let i = 0; i < sroom.length; i++) {
            if (sroom[i]["rooms_seats"] > largestSize) {
                largestSize = sroom[i]["rooms_seats"];
                largestRoom = sroom[i];
            }
        }
        return largestRoom;
    }

    findLargestCourse(allSection:any){
        let largestCrouse:any = null;
        let largestSize = 0
        for (let i = 0; i < allSection.length; i++) {
            if (allSection[i]["maxSize"] > largestSize && allSection[i]["proceeded"] === "no") {
                largestSize = allSection[i]["maxSize"];
                largestCrouse = allSection[i];
            }
        }
        return largestCrouse;
    }


    getSlotForCourse(course:any, allRoomTimeSlot:any) {
        for (let i = 0; i < allRoomTimeSlot.length; i++){
            if (allRoomTimeSlot[i]["size"] >= course["maxSize"]
                && !this.checkContains(course["timeSlot"], allRoomTimeSlot[i]["time"])
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


    checkContains(a:any, b:any){
        for (let i = 0; i < a.length; i++) {
            if (a[i] === b) {
                return true;
            }
        }
        return false;
    }


}