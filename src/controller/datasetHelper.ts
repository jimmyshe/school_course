/**
 * Created by cq2essz on 2017/2/7.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";
import {Section} from "./CourseInformation";
import Log from "../Util";


export default class DH{

    public static isValidDataID(id:string){
        let validIDList = ['courses']

        for(let i =0;i<validIDList.length;i++){
            if (id==validIDList[i]){
                return true;
            }
        }
        return false;
    }






}