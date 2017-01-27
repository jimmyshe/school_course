/**
 * Created by jimmyshe-ubuntu on 17-1-18.
 */

import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";

var fs = require('fs');

describe("addDataSet", function () {

    let insight : Insight = null;

    let courseContent : string = null;

    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }


    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        insight = new Insight();
        courseContent = new Buffer(fs.readFileSync('./courses.zip')).toString('base64');
        // console.log(courseContent);
    });


    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
        insight = null;
    });


    // it("test of test", function () {
    //     return insight.addDataset("weqwe","wqrqw")
    //         .then((respons:InsightResponse)=>{
    //             sanityCheck(respons);
    //             expect.fail();
    //         })
    //         .catch((err)=>{
    //             sanityCheck(err);
    //             expect(err.code).to.equal(400);
    //         })
    // });

    it("test1", function () {
        return insight.addDataset('courses.zip',courseContent)
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect.fail();
            })
            .catch((err)=>{
                sanityCheck(err);
                expect(err.code).to.equal(400);
            })
    });
});
