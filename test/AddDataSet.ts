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
    
    let voidContent : string = null;

    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        insight = new Insight();
        courseContent = new Buffer(fs.readFileSync('./courses.zip')).toString('base64');
        voidContent = new Buffer(fs.readFileSync('./no_real_data.zip')).toString('base64');
        // console.log(courseContent);
    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
        //insight = null;
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

        insight = new Insight;
        return insight.addDataset('courses',courseContent)
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect(response.code).equal(204);
            })
            .catch((err)=>{

                expect.fail();
            })
    });

    it("test1_1", function () {
        return insight.addDataset('courses',courseContent)
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect(response.code).equal(201);
            })
            .catch((err)=>{

                expect.fail();
            })
    });

    it("test1_2", function () {
        return insight.addDataset('cous.zip',"") //invalid ID
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect.fail();
                expect(response.code).equal(201);
            })
            .catch((err)=>{
                expect(err.code).equal(400);

            })
    });

    



    /*it("test2", function () {
        return insight.removeDataset('courses')
            .then((response:InsightResponse)=>{
                sanityCheck(response);
            })
            .catch((err)=>{
                expect.fail();
            })
    });*/
    
    it("test3", function () {
        return insight.addDataset('courses',voidContent) //invalid content
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect.fail();
            })
            .catch((err)=>{
                expect(err.code).equal(400);

            })
    });

    it("test4", function () {
        return insight.removeDataset("1.zip")
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect.fail();
            })
            .catch((err)=>{
                expect(err.code).equal(404);

            })
    });

    it("test5", function () {
        return insight.addDataset("courses","")
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect.fail();
            })
            .catch((err)=>{
                expect(err.code).equal(400);

            })
    });
});
