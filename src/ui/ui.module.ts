/**
 * Created by jimmyshe-ubuntu on 17-3-21.
 */
import {FormsModule}     from '@angular/forms';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiComponent }   from './ui.component';
import {queryFormComponent} from "./query-form.component";
import { HttpModule }    from '@angular/http';
import {uiService} from './ui.service';
import {uiCoursesComponent} from './ui_courses.component'

@NgModule({
    imports:      [
        FormsModule,
        HttpModule,
        BrowserModule ],
    declarations: [
        UiComponent,
        queryFormComponent,
        uiCoursesComponent
    ],
    providers:[uiService],
    bootstrap:    [ UiComponent ]
})
export class UiModule { }