/**
 * Created by cq2essz on 2017/1/25.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";
import {Section} from "../src/controller/CourseInformation";
import QH from "../src/controller/queryHelper";
import {expect} from 'chai';
import Log from "../src/Util";




describe("QH helper test", function () {

    let testData:Section[] = [
        {
        courses_id : "t1",
        courses_avg : 5,
        courses_dept : "cs",
        courses_title : "string",
        courses_pass : 2,
        courses_fail : 3,
        courses_audit : 1,
        year : "",
        sectionNum : "string",
        source : "string",},
        {
        courses_id : "t2",
        courses_avg : 4,
        courses_dept : "cs",
        courses_title : "string",
        courses_pass : 2,
        courses_fail : 3,
        courses_audit : 1,
        year : "",
        sectionNum : "string",
        source : "string",},
        {
            courses_id : "t3",
            courses_avg : 3,
            courses_dept : "cs",
            courses_title : "string",
            courses_pass : 2,
            courses_fail : 3,
            courses_audit : 1,
            year : "",
            sectionNum : "string",
            source : "string",}]

    before(function () {
        Log.test('Before: ' + (<any>this).test.parent.title);
    });

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });


    it("test filte out LT case", function () {
       let ret = QH.filterOut(testData,{'LT':{courses_avg:4}})
        expect(ret).to.deep.equal([false,false,true])
    });


});