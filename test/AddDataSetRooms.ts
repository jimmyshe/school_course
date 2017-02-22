/**
 * Created by WilliamLiu1124 on 2017-02-07.
 */

import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";

var fs = require('fs');

describe("addDataSet_rooms", function () {

    let insight : Insight = null;

    let roomContent : string = null;


    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }



    before(function () {
        Log.info("start add rooms")
        roomContent = new Buffer(fs.readFileSync('./rooms.zip')).toString('base64');
        insight = new Insight();
        Log.info("start add rooms")

    })

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);

    });


    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });


    it("test1", function () {
        insight = new Insight;
        return insight.addDataset('rooms',roomContent)
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect(response.code).equal(204);
            })
            .catch((err)=>{
                expect.fail();
            })
    });



    /*it("test2", function () {
        insight = new Insight;
        return insight.addDataset('rooms',roomContent)
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect(response.code).equal(201);
            })
            .catch((err)=>{
                expect.fail();
            })
    });*/

    /*it("test3", function () {
        insight = new Insight;
        return insight.removeDataset('courses')
            .then((response:InsightResponse)=>{
                sanityCheck(response);
                expect(response.code).equal(404);
            })
            .catch((err)=>{
                expect.fail();
            })
    });*/

});
