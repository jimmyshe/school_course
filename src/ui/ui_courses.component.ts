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



    logocalConnectionList:string[] = ['AND','OR'];
    filter_typeList:string[] = ["Section size","Department","Course number","Instructor","Title"]

    logicConnection:string = null;
    filters:any[] = ["212342134","234234234"];


    filterType:string = null;

    //for section size
    comparisonKeyList:string[] = [">","<","="];
    comparisonKey:string = null;
    comparisonValue:any = null;




}