/**
 * Created by jimmyshe-ubuntu on 17-3-21.
 */
import { Component } from '@angular/core';


@Component({
    selector: 'my-app',
    template: '<h2>{{result.render}}</h2>' +
        '<p>result:</p>' +
    '<li *ngFor="let ret of result.result">' +
    '{{ret.rooms_name}}</li> '
})



export class AppComponent {

    result = {
    "render": "TABLE",
    "result": [
        {
            "rooms_name": "DMP_101"
        },
        {
            "rooms_name": "DMP_110"
        },
        {
            "rooms_name": "DMP_201"
        },
        {
            "rooms_name": "DMP_301"
        },
        {
            "rooms_name": "DMP_310"
        }
    ]
    }


}