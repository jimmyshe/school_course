/**
 * Created by cq2essz on 2017/3/23.
 */
import { Component } from '@angular/core';
import {uiService} from './ui.service';
import { HttpModule }    from '@angular/http';
@Component({

    moduleId: module.id,
    selector: 'query-form',
    templateUrl: './query-form.component.html',
    providers:[uiService]
})

export class queryFormComponent {

    constructor(private UiService: uiService) { }

    module: string = "";


    submitted = false;

    get diagnostic() {
        return this.module;
    }

    result: any = null;

    getresult(query:any){
        this.UiService.performquery(query).then((ret:any) =>{
            this.result = ret;
        }).catch((e:any)=>{
            this.result = e.message;
        });

    }


    submit() {
        this.submitted = true;
        try {
            let query = JSON.parse(this.module);
            this.getresult(query);


        } catch (e) {
            this.result = e.message;
        }

    }
}