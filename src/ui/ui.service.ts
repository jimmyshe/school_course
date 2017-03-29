/**
 * Created by cq2essz on 2017/3/23.
 */
import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
            .then(response => response.json().result)
            .catch(response => response.json());
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
            roomSizeCondition["GT"] = {"rooms_size":+roomSize};
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
            sbuildingNameCondition["GT"] = {"rooms_shortname":sbuildingName};
            conditionArray.push(sbuildingNameCondition);
        }

        if (sdistance!= "" && stargetBuilding != "") {
            let sdistanceCondition:any = {};
            sdistanceCondition["IS"] = {"courses_id":null};
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

    }




}

