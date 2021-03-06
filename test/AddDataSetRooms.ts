/**
 * Created by WilliamLiu1124 on 2017-02-07.
 */

import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";

let fs = require('fs');

describe("addDataSet_rooms", function () {

    let insight : Insight = null;

    let roomContent : string = null;

    let courseContent:string = null;

    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }



    before(function () {
        Log.info("start add rooms");
        roomContent = new Buffer(fs.readFileSync('./test/rooms.zip')).toString('base64');
        courseContent = new Buffer(fs.readFileSync('./test/courses.zip')).toString('base64');

        if(fs.existsSync("./data/courses.json")){
            fs.unlinkSync("./data/courses.json");
        }
        if(fs.existsSync("./data/rooms.json")){
            fs.unlinkSync("./data/rooms.json");
        }

        insight = new Insight();
        Log.info("start add rooms")

    });

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);

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
    });

    it("test1", function () {
        insight = new Insight;
        return insight.addDataset('rooms',roomContent)
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect(response.code).equal(204);
                expect(insight.roomsInformation.length).equal(364);
                expect(fs.existsSync("./data/rooms.json")).equal(true);
            })
            .catch((err)=>{
                expect.fail();
            })
    });

    it("test2", function () {
        insight = new Insight;
        return insight.addDataset('rooms',roomContent)
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect(response.code).equal(201);
                expect(insight.roomsInformation.length).equal(364);
                expect(fs.existsSync("./data/rooms.json")).equal(true);
            })
            .catch((err)=>{
                expect.fail();
            })
    });

    it("test3", function () {
        insight = new Insight;
        expect(insight.roomsInformation.length).equal(364);
        expect(fs.existsSync("./data/rooms.json")).equal(true);
    });

    it("test3_1", function () {
        insight = new Insight;
        return insight.addDataset('courses',courseContent)
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect(response.code).equal(204);
                expect(insight.roomsInformation.length).equal(364);
                expect(fs.existsSync("./data/rooms.json")).equal(true);
                expect(insight.courseInformation.length).equal(64612);
                expect(fs.existsSync("./data/courses.json")).equal(true);
            })
            .catch((err)=>{
                expect.fail();
            })
    });



    it("test3_2", function () {
        insight = new Insight;
        return insight.removeDataset('courses')
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect(insight.roomsInformation.length).equal(364);
                expect(fs.existsSync("./data/rooms.json")).equal(true);
                expect(insight.courseInformation.length).equal(0);
                expect(fs.existsSync("./data/courses.json")).equal(false);
            })
            .catch((err)=>{
                expect.fail();
            })
    });


    it("test4", function () {
        insight = new Insight;
        return insight.removeDataset("rooms").then(function () {
            expect(insight.roomsInformation.length).equal(0);
            expect(fs.existsSync("./data/rooms.json")).equal(false);
        }).catch(function (e) {
            expect.fail();
        })

    });



});
