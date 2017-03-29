/**
 * Created by cq2essz on 2017/3/26.
 */
import { Component } from '@angular/core';
import {uiService} from './ui.service';

@Component({

    moduleId: module.id,
    selector: 'courses-ui',
    templateUrl: './ui.courses.component.html',
    providers:[uiService]
})

export class uiCoursesComponent{
    constructor(private UiService: uiService) { }


    isCourses = false;

    found = false;

    result:any ="wait..."

    logocalConnectionList:string[] = ['AND','OR'];
    filter_typeList:string[] = ["Section size","Department","Course number","Instructor","Title"]

    logicConnection:string = null;
    filters:any[] = [];


    filterType:string = null;

    //for section size
    comparisonKeyList:string[] = [">","<","="];
    comparisonKey:string = null;
    comparisonValue:any = null;

    addFilter(){
        let temp_filter:any = {};
        if(this.filterType == "Section size"){
            if(this.comparisonKey == ">"){
                temp_filter["GT"] = {"courses_size":this.comparisonValue};
            }else if(this.comparisonKey == "="){
                temp_filter["EQ"] = {"courses_size":this.comparisonValue};
            }else if(this.comparisonKey == "<"){
                temp_filter["LT"] = {"courses_size":this.comparisonValue};
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
                if(this.filterType == "Department"){
                    temp_filter["IS"] = {"courses_dept":this.comparisonValue};
                }
                if(this.filterType == "Course number"){
                    temp_filter["IS"] = {"courses_id":this.comparisonValue};
                }
                if(this.filterType == "Instructor"){
                    temp_filter["IS"] = {"courses_instructor":this.comparisonValue};
                }
                if(this.filterType == "Title"){
                    temp_filter["IS"] = {"courses_title":this.comparisonValue};                }
            }
        }
        this.filters.push(JSON.stringify(temp_filter));

    }

    deleteFilters(){
        this.filters = [];
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

        if(this.isCourses) {
            query["OPTIONS"] = {
                "COLUMNS": [
                    "MostfailingStudents",
                    "MostPassingStudents",
                    "AvgGrade",
                    "courses_dept",
                    "courses_id",
                    "courses_title"
                ],
                "FORM": "TABLE"};

                query["TRANSFORMATIONS"] = {
                    "GROUP": ["courses_dept","courses_id","courses_title"],
                    "APPLY": [
                        {
                            "MostfailingStudents": {
                                "MAX": "courses_fail"
                            }
                        },
                        {
                            "MostPassingStudents": {
                                "MAX": "courses_pass"
                            }
                        },
                        {
                            "AvgGrade": {
                                "AVG": "courses_avg"
                            }
                        }
                    ]
                };
        }else {
            query["OPTIONS"] = {
                "COLUMNS": [
                    "courses_uuid",
                    "courses_dept",
                    "courses_id",
                    "courses_title"
                ],
                "FORM": "TABLE"
            };
        }

        console.log(JSON.stringify(query));


        this.UiService.performquery(query).then((ret:any)=>{
            this.result = ret;
        }).catch((e:any)=>{
            this.result = e;
        })


    }

    get ret_str(){
        return JSON.stringify(this.result);
    }

}