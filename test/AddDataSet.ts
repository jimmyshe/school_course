/**
 * Created by jimmyshe-ubuntu on 17-1-18.
 */

import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";

let fs = require('fs');

describe("addDataSet", function () {

    let insight : Insight = null;

    let courseContent : string = null;
    
    let voidContent : string = null;

    let roomContent : string = null;

    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }

    before(function () {
        courseContent = new Buffer(fs.readFileSync('./test/courses.zip')).toString('base64');
        roomContent = new Buffer(fs.readFileSync('./test/rooms.zip')).toString('base64');
        voidContent = new Buffer(fs.readFileSync('./test/no_real_data.zip')).toString('base64');
        if(fs.existsSync("./data/courses.json")){
            fs.unlinkSync("./data/courses.json");
        }
        if(fs.existsSync("./data/rooms.json")){
            fs.unlinkSync("./data/rooms.json");
        }
    })

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        insight = new Insight();

    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });


    after(function () {
        if(fs.existsSync("./data/courses.json")){
            fs.unlinkSync("./data/courses.json");
        }
        if(fs.existsSync("./data/rooms.json")){
            fs.unlinkSync("./data/rooms.json");
        }
    })


    it("test1", function () {
        insight = new Insight;
        return insight.addDataset('courses',courseContent)
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect(response.code).equal(204);
                expect(insight.courseInformation.length).equal(64612);
                expect(fs.existsSync("./data/courses.json")).equal(true);
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

                expect(insight.courseInformation.length).equal(64612);
                expect(fs.existsSync("./data/courses.json")).equal(true);
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
            })
            .catch((err)=>{
                expect(err.code).equal(400);

            })
    });

    



    it("test2", function () {
        return insight.removeDataset('courses')
            .then((response:InsightResponse)=>{
                sanityCheck(response);
            })
            .catch((err)=>{
                expect.fail();
            })
    });
    
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
