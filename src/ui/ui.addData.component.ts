/**
 * Created by cq2essz on 2017/3/29.
 */
import { Component } from '@angular/core';
import {uiService} from './ui.service';

@Component({

    moduleId: module.id,
    selector: 'add_data',
    templateUrl: './ui.addData.component.html',
    providers:[uiService]
})

export class uiAddDataComponent {

    constructor(private UiService: uiService) { }

    dataSetID:string = null;
    submittedAdd = false;

    content:any = null;

    result:any = null;

    get ret_str(){
        return JSON.stringify(this.result)
    }


    get isokforadd(){
        if(this.dataSetID!=null&&this.content!=null){
            return true;
        }else {
            return false;
        }
    }


    fileChangeEvent(e:any){
        console.log("hi");
        let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        let reader = new FileReader();

        reader.onload = ((theFile:any)=>{
            return (e:any)=>{
                this.content =e.target.result;
            }
        })(file);

        reader.readAsArrayBuffer(file);

    }



    addDataSet() {

        this.submittedAdd = true;
        this.result = null;

        console.log(this.content.length);
        this.UiService.addData(this.dataSetID,this.content).then((ret:any)=>{

            if(ret == 204){
                this.result = "the operation was successful and the id was new"
            }

            if(ret == 201){
                this.result = "the operation was successful and the id already existed";
            }
            this.dataSetID = null;

        }).catch((e:any)=>{
            this.result = e;
        })
    }

    removeDataSet() {
        if(this.dataSetID == null){
            return;
        }
        this.submittedAdd = true;
        this.result = null;
        this.UiService.removeData(this.dataSetID).then((ret:any)=>{
            if(ret == 204){
                this.result = "the operation was successful"
            }
            this.dataSetID = null;
        }).catch((e:any)=>{
            this.result = e;
        });

    }


}