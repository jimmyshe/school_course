/**
 * Created by WilliamLiu1124 on 2017-01-19.
 */
export interface Section {

    courses_id : string;

    courses_avg : number;

    courses_instructor? : string;

    courses_dept : string;

    courses_title : string;

    courses_pass : number;

    courses_fail : number;

    courses_audit : number;

    courses_uuid: string;

    year : string;

    sectionNum : string;

    source : string;

}