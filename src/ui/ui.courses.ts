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

    filters:any[] = ["212342134","234234234"];

    logocalConnectionList:string[] = ['AND','OR'];
    logicConnection:string = null;

    filter_types:string[] = ["Section size","Department","Course number","Instructor,Title"]





}