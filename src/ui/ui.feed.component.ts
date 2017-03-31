/**
 * Created by cq2essz on 2017/3/30.
 */
import {Component} from '@angular/core';
import {uiService} from './ui.service';


@Component({
    moduleId: module.id,
    selector: 'feed-ui',
    templateUrl: './ui.feed.component.html',
    providers:[uiService]
})

export class uiFeedComponent{
    constructor(private UiService: uiService) { }

    fbuildingName:string = null;
    fdistance:number = null;

    result:JSON = null;


    get resultFeedMe_str{
        return JSON.stringify(this.result);
    }

    submitFeedRequest(){
        this.getDinning(this.fbuildingName,this.fdistance)

    }

    getDinning(fbuildingName:string, fdistance:number){
        let query:any = {};

        let fdistanceCondition:any = {};


        let key1 = "rooms_distance_from_" + fbuildingName;
        let obj:any = {};
        obj[key1] = fdistance;
        fdistanceCondition["LT"] = obj;

        let optionObj = {
            "COLUMNS": [
                "rooms_shortname",
                "rooms_din"
            ],
            "FORM": "TABLE"
        }

        let transObj:any = {
            "GROUP": ["rooms_shortname","rooms_din"],
            "APPLY": []
        }


        query["WHERE"] = fdistanceCondition;
        query["OPTIONS"] = optionObj;
        query["TRANSFORMATIONS"] = transObj;

        return this.UiService.performquery(query).then((ret:any)=>{

            console.log(JSON.stringify(ret));

            this.result = ret.filter((e:any)=>{
               return e.rooms_din != "No cafe inside this building";
            })
        });
    }

}