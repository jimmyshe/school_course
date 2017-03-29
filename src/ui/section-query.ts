/**
 * Created by WilliamLiu1124 on 2017-03-26.
 */
import { Component } from '@angular/core';
import {uiService} from './ui.service';
import { HttpModule }    from '@angular/http';


@Component({

    moduleId: module.id,
    selector: 'room-form',
    templateUrl: './index.html',
    providers:[uiService]
})

export class roomQueryComponent {

    constructor(private UiService: uiService) { }

    dataSetID: string = "";

    dataSetContent: any;

    submittedAdd = false;

    submittedRemove = false;

    submittedRoomQuery = false;

    submittedscourse = false;

    submittedsroom = false;

    submittedSchedule = false;

    roomSize: string = "";

    roomNumber: string = "";

    buildingName: string = "";

    roomDistance: string = "";

    targetBuilding: string = "";

    roomTypes: string[] = ["--Any--", "Tiered Large Group", "Case Style", "Small Group", "Open Design General Group"];

    roomType: string = this.roomTypes[0];

    furnitureTypes: string[] = ["--Any--","Classroom-Fixed Tablets", "Classroom-Fixed Tables/Movable Chairs", "Classroom-Movable Tables & Chairs", "Classroom-Movable Tablets", "Classroom-Fixed Tables/Fixed Chairs", "Classroom-Learn Lab", "Classroom-Hybrid Furniture"];

    furnitureType:string = this.furnitureTypes[0];

    andorSelection: string = "";

    sdepartment:string = "";

    scourseNumber:string = "";

    scourseandorSelection:string = "";

    sbuildingName:string = "";

    sdistance:string = "";

    stargetBuilding:string = "";

    sroomandorSelection:string = "";


    get diagnostic() {
        return this.dataSetID;
    }

    resultAdd: any = null;

    resultRemove: any = null;

    resultRoomQuery:any = null;

    resultscourse:any = null;

    resultsroom:any = null;

    resultSchedule:any = null;

    addDataSet(id:any, data:any) {

        this.UiService.addData(id,data).then((r:any)=>{
            this.resultAdd = r;
        })
    }

    removeDataSet(id: any) {
        this.UiService.removeData(id).then((ret:any)=>{
            this.resultRemove = JSON.stringify(ret);
        }).catch((e:any)=>{
            this.resultRemove = e.message;
        });
    }

    performRoomQuery(roomSize:string, roomNumber:string, buildingName:string, roomDistance:string, targetBuilding:string,
                     roomType:string, furnitureType:string, andorSelection:string){
        this.resultRoomQuery = this.UiService.performRoomQuery(roomSize, roomNumber, buildingName, roomDistance, targetBuilding,
                                        roomType, furnitureType, andorSelection).then((ret:any)=>{
            this.resultRoomQuery = JSON.stringify(ret);
        })
    }

    getCourseForScheduling(sdepartment:string, scourseNumber:string, scourseandorSelection:string) {
        this.resultscourse = this.UiService.performCourseSchedule(sdepartment, scourseNumber, scourseandorSelection);
    }

    getRoomForScheduling(sbuildingName:string, sdistance:string, stargetBuilding:string, sroomandorSelection:string) {
        this.resultsroom = this.UiService.performRoomSchedule(sbuildingName, sdistance, stargetBuilding, sroomandorSelection);
    }

    scheduleSection(sroom:any, scourse:any){
        this.resultSchedule = this.UiService.scheduleSection(sroom, scourse);
    }

    submitAddID() {
        this.submittedAdd = true;
        try{
            this.addDataSet(this.dataSetID, this.dataSetContent);
        } catch(e) {
            this.resultAdd = e.message;
        }

    }
    submitRemoveID() {
        this.submittedRemove = true;
        try {
            //let query = JSON.parse(this.module);
            this.removeDataSet(this.dataSetID);
        } catch (e) {
            this.resultRemove = e.message;
        }
    }

    submitRoomQuery() {
        this.submittedRoomQuery = true;
        try{
            this.performRoomQuery(this.roomSize, this.roomNumber, this.buildingName, this.roomDistance, this.targetBuilding,
                                  this.roomType, this.furnitureType, this.andorSelection);
        } catch (e) {
            this.resultRoomQuery = e.message;
        }
    }

    submitScheduleCourse(){
        this.submittedscourse = true;
        try{
            this.getCourseForScheduling(this.sdepartment, this.scourseNumber, this.scourseandorSelection);
        } catch(e){
            this.resultscourse = e.message;
        }
    }

    submitScheduleRoom(){
        this.submittedsroom = true;
        try{
            this.getRoomForScheduling(this.sbuildingName, this.sdistance, this.stargetBuilding, this.sroomandorSelection);
        } catch(e){

        }
    }

    submitSchedule(){
        this.submittedSchedule = true;
        try{
            this.scheduleSection(this.resultsroom, this.resultscourse);
        } catch(e) {
            this.resultSchedule = e.message;
        }

    }

}