/**
 * Created by cq2essz on 2017/3/29.
 */
import { Component } from '@angular/core';
import {uiService} from './ui.service';

@Component({

    moduleId: module.id,
    selector: 'rooms-ui',
    templateUrl: './ui.rooms.component.html',
    providers:[uiService]
})

export class uiRoomsComponent{
    constructor(private UiService: uiService) { }

    found = false;
    result:any ="wait...";

    col:string[];

    logocalConnectionList:string[] = ['AND','OR'];
    filter_typeList:string[] = ["Building name","Room number","Room size","Room type","Furniture type"];

    logicConnection:string = "AND";
    filters:any[] = [];
    filterType:string = null;

    isLocation = false;

    comparisonKeyList:string[] = [">","<","="];
    comparisonKey:string = null;
    comparisonValue:any = null;

    targetBuilding:string = null;
    targetDistance:number = null;


    deleteFilters(){
        this.filters = [];
    }

    addFilter(){
        let temp_filter:any = {};
        if(this.filterType == "Room size"){
            if(this.comparisonKey == ">"){
                temp_filter["GT"] = {"rooms_seats":this.comparisonValue};
            }else if(this.comparisonKey == "="){
                temp_filter["EQ"] = {"rooms_seats":this.comparisonValue};
            }else if(this.comparisonKey == "<"){
                temp_filter["LT"] = {"rooms_seats":this.comparisonValue};
            }else {
                return;
            }
            if(!this.comparisonValue){
                return;
            }
        } else {
            if(!this.comparisonValue){
                return;
            }else {
                if(this.filterType == "Building name"){
                    temp_filter["IS"] = {"rooms_shortname":this.comparisonValue};
                }
                if(this.filterType == "Room number"){
                    temp_filter["IS"] = {"rooms_number":this.comparisonValue};
                }
                if(this.filterType == "Room type"){
                    temp_filter["IS"] = {"rooms_type":this.comparisonValue};
                }
                if(this.filterType == "Furniture type"){
                    temp_filter["IS"] = {"rooms_furniture":this.comparisonValue};                }
            }
        }
        if(this.filters.includes(JSON.stringify(temp_filter))){
            return;
        }
        this.filters.push(JSON.stringify(temp_filter));

    }

    find(){

        this.found = true;
        this.result = "wait...";
        let query:any = {};

        if(this.filters.length == 0) {
            query["WHERE"] = {};
        }else if(this.filters.length == 1) {
            query["WHERE"] = JSON.parse(this.filters[0]);
        }else {
            let temp = [];
            for (let i = 0;i< this.filters.length;i++){
                temp.push(JSON.parse(this.filters[i]));
            }
            query["WHERE"] = {};
            if(this.logicConnection=="AND"){
                query.WHERE["AND"] = temp;
            }else {
                query.WHERE["OR"] = temp;
            }
        }


        query["OPTIONS"] = {
            "COLUMNS": [
                "rooms_seats",
                "rooms_shortname",
                "rooms_number",
                "rooms_type",
                "rooms_furniture"
                ],
            "FORM": "TABLE"
        };

        if(this.isLocation){

            let temp = query.WHERE;
            if(JSON.stringify(temp)=="{}"){
                temp = {
                    //todo
                }
            }

        }




        console.log(JSON.stringify(query));


        this.UiService.performquery(query).then((ret:any)=>{
            this.result = ret;
            this.col = query.OPTIONS.COLUMNS;
        }).catch((e:any)=>{
            this.result = e;
        })


    }

    get ret_str(){
        return JSON.stringify(this.result);
    }


    get extracheck(){
        if(this.isLocation){
            if(this.targetDistance==null||this.targetBuilding==null){
                return false;
            }else {
                return true
            }
        }else {
            return true
        }
    }


}