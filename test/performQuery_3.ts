/**
 * Created by jimmyshe-ubuntu on 17-2-17.
 */
import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";

let fs = require('fs');
describe("performQuery_2", function () {
    let insight:Insight = null;
    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }

    before(function () {
        Log.test('test Query for rooms');
        insight = new Insight();

        let courseContent = new Buffer(fs.readFileSync('./rooms.zip')).toString('base64');
        return insight.addDataset('rooms',courseContent)

    })


    after(function () {
        Log.test('end test Query for rooms ');
        insight = null;
    })

});