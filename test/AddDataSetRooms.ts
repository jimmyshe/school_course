/**
 * Created by WilliamLiu1124 on 2017-02-07.
 */

import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";

var fs = require('fs');

describe("addDataSet", function () {

    let insight : Insight = null;

    let roomContent : string = null;

    let voidContent : string = null;

    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }



    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        insight = new Insight();
        roomContent = new Buffer(fs.readFileSync('./rooms.zip')).toString('base64');
        voidContent = new Buffer(fs.readFileSync('./no_real_data.zip')).toString('base64');
        // console.log(courseContent);
    });


    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
        //insight = null;
    });


    it("test1", function () {
        try {
            fs.unlinkSync("./data/rooms.zip.json")
        }catch (e){
            Log.info("It is ok, the file does not exist.")
        }
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

    /*it("test1_1", function () {
     return insight.addDataset('courses.zip',courseContent)
     .then((response:InsightResponse)=>{
     sanityCheck(response);
     expect(response.code).equal(201);
     })
     .catch((err)=>{

     expect.fail();
     })
     });

     it("test1_2", function () {
     return insight.addDataset('cous.zip',"")
     .then((response:InsightResponse)=>{
     sanityCheck(response);
     expect.fail();
     })
     .catch((err)=>{
     expect(err.code).equal(400);

     })
     });





     it("test2", function () {
     return insight.removeDataset('courses.zip')
     .then((response:InsightResponse)=>{
     sanityCheck(response);
     })
     .catch((err)=>{
     expect.fail();
     })
     });

     it("test3", function () {
     return insight.addDataset('no_real_data.zip',voidContent)
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
     });*/
});
