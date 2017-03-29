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
        return this.http.post(this.dataUrl+"query",query).toPromise();
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

        if (andorSelection === "and") {
            filterObj["AND"] = conditionArray;
        } else if (andorSelection === "or") {
            filterObj["OR"] = conditionArray;
        }

        if (roomSize != null) {
            let roomSizeCondition:any = {};
            roomSizeCondition["GT"] = {"rooms_size":roomSize};
            conditionArray.push(roomSizeCondition);
        }

        if (roomNumber != null) {
            let roomNumberCondition:any = {};
            roomNumberCondition["IS"] = {"rooms_number":roomNumber};
            conditionArray.push(roomNumberCondition);
        }

        if (buildingName != null) {
            let buildingNameCondition:any = {};
            buildingNameCondition["IS"] = {"rooms_shortname":buildingName};
            conditionArray.push(buildingNameCondition);
        }

        if (roomType != null) {
            let roomTypeCondition:any = {};
            roomTypeCondition["IS"] = {"rooms_type":roomType};
            conditionArray.push(roomTypeCondition);
        }

        if (furnitureType != null) {
            let furnitureTypeCondition:any = {};
            furnitureTypeCondition["IS"] = {"rooms_type":roomType};
            conditionArray.push(furnitureTypeCondition);
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

        if (filterObj != {}){
            query["WHERE"] = filterObj;
        }
        query["OPTIONS"] = optionObj;

        //return JSON.stringify(query);
        return this.http.post(this.dataUrl+ "query", query).toPromise();

    }




}

