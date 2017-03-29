/**
 * Created by WilliamLiu1124 on 2017-02-23.
 */

import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";

let fs = require('fs');


describe("performQuery_rooms_not_added", function () {
    let insight:Insight = null;
    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }






    before(function () {
        Log.test('test Query for rooms');
        if(fs.existsSync("./data/courses.json")){
            fs.unlinkSync("./data/courses.json");
        }
        if(fs.existsSync("./data/rooms.json")){
            fs.unlinkSync("./data/rooms.json");
        }
        insight = new Insight();
        // nothing added
    })


    after(function () {
        Log.test('end test Query for rooms ');
    })


    it("test of a simple case A", function () {
        return insight.performQuery({
            "WHERE": {
                "IS": {
                    "rooms_name": "DMP_*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
                "FORM": "TABLE"
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect.fail();

            })
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect(err.code).equal(424);
            })
    });

    it("test of a simple case b", function () {
        return insight.performQuery({
            "WHERE": {
                "IS": {
                    "rooms_address": "*Agrono*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_address", "rooms_name"
                ],
                "ORDER":"rooms_name",
                "FORM": "TABLE"
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect.fail();

            })
            .catch( (err:InsightResponse)=>{
                Log.test(err.toString());
                expect(err.body).to.deep.equal({'missing':['rooms']})
            })
    });

});
