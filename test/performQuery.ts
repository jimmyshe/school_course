/**
 * Created by jimmyshe-ubuntu on 17-1-18.
 */

import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import {fail} from "assert";


describe("performQuery", function () {

    let insight:Insight = null


    let testQuery_simple = {
        "WHERE":{
            "GT":{
                "courses_avg":97
            }
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        }
    }

    let testQuery_notObject = [1,2];


    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }


    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        insight = new Insight();
    });


    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
        insight = null;
    });


    it("test of test", function () {
        insight.performQuery(testQuery_notObject)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.code).to.equal(200);
            })
            .catch(function (err:InsightResponse){
                expect.fail(); //todo
            })
    });


    it("If the query invalid, it will return code 400", function () {
        insight.performQuery(testQuery_notObject)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect.fail();
            })
            .catch((err:InsightResponse)=>{
                sanityCheck(err);
                expect.fail();    //todo
                expect(err.code).to.equal(400);
                expect(err.body).to.equal("the query is not even a object");
            })
    });


});
