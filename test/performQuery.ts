/**
 * Created by jimmyshe-ubuntu on 17-1-18.
 */

import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";


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

    //
    // it("test of test", function () {
    //     return insight.performQuery(testQuery_simple)
    //         .then((respons:InsightResponse)=>{
    //             sanityCheck(respons);
    //             expect(respons.code).to.equal(200);
    //         })
    //         .catch( (err:InsightResponse)=>{
    //             expect.fail();
    //         })
    // });
    //

});
