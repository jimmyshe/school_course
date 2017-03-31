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

    get rooms_str(){
        return JSON.stringify(this.rooms);
    }

    get courses_str(){
        return JSON.stringify(this.courses);
    }


}