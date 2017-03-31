/**
 * Created by jimmyshe-ubuntu on 17-3-21.
 */
import { Input,Component,EventEmitter,Output } from '@angular/core';


@Component({
    selector: 'my-app',
    templateUrl: '/src/ui/ui.component.html'

})



export class UiComponent {

    rooms_ret:JSON = null;
    courses_ret:JSON = null;
    coursesIChange(i:JSON){
        this.courses_ret = i;
        //console.log(JSON.stringify(this.courses_ret));
    }

    roomsIChange(i:JSON){
        this.rooms_ret = i;
        //console.log(JSON.stringify(this.rooms_ret));
    }


    active:boolean[] = [true,false,false,false]


    switchbt(n:number){
        for(let i = 0;i<this.active.length;i++){
            if(i==n){
                this.active[i] = true;
            }else {
                this.active[i] = false;
            }
        }
    }
}



