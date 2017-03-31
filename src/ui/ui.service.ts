/**
 * Created by cq2essz on 2017/3/23.
 */
import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class uiService{
        // performquery(query:any):any {
        //     return Promise.resolve( {"code":400,
        //             "body":{}});
        // }

    private dataUrl = "http://localhost:4321/"
    constructor(private http: Http) { }

    performquery(query:any):any {

        return this.http.post(this.dataUrl+"query",query).toPromise()
            .then(response => response.json().result)
            .catch(response => response.status);
    }

    addData(id:any, data:any):any{
        return this.http.put(this.dataUrl+"dataset/"+id, data).toPromise()
            .then(response => response.status)
            .catch(response => response.json());
    }

    removeData(id:any):any{
        return this.http.delete(this.dataUrl+"dataset/"+id).toPromise()
            .then(response => response.status)
            .catch(response => response.json());
    }





}

