/**
 * Created by jimmyshe-ubuntu on 17-1-18.
 */

import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";


describe("addDataSet", function () {

    let insight:Insight = null;

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
        return insight.addDataset("weqwe","wqrqw")
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect.fail();
            })
            .catch((err:InsightResponse)=>{
                sanityCheck(err);
                expect(err.code).to.equal(400);
            })
    });
});
