/**
 * Created by jimmyshe-ubuntu on 17-3-21.
 */
import { Component } from '@angular/core';


@Component({
    selector: 'my-app',
    templateUrl: '/src/ui/ui.component.html'

})



export class UiComponent {

    active:boolean[] = [true,false,false]


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



