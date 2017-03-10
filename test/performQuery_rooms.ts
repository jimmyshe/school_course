/**
 * Created by jimmyshe-ubuntu on 17-2-17.
 */
import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";

let fs = require('fs');

describe("performQuery_rooms", function () {
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
        // make sure the cache file is there
        let content = new Buffer(fs.readFileSync('./rooms.zip')).toString('base64');
        return insight.addDataset('rooms',content)
    })


    after(function () {

        if(fs.existsSync("./data/courses.json")){
            fs.unlinkSync("./data/courses.json");
        }
        if(fs.existsSync("./data/rooms.json")){
            fs.unlinkSync("./data/rooms.json");
        }
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
                expect(respons.body).to.deep.equal({
                    "render": "TABLE",
                    "result": [
                        {
                            "rooms_name": "DMP_101"
                        },
                        {
                            "rooms_name": "DMP_110"
                        },
                        {
                            "rooms_name": "DMP_201"
                        },
                        {
                            "rooms_name": "DMP_301"
                        },
                        {
                            "rooms_name": "DMP_310"
                        }
                    ]
                })

            })
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
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
                expect(respons.body).to.deep.equal({
                    "render": "TABLE",
                    "result": [
                        {
                            "rooms_address": "6245 Agronomy Road V6T 1Z4",
                            "rooms_name": "DMP_101"
                        },
                        {
                            "rooms_address": "6245 Agronomy Road V6T 1Z4",
                            "rooms_name": "DMP_110"
                        },
                        {
                            "rooms_address": "6245 Agronomy Road V6T 1Z4",
                            "rooms_name": "DMP_201"
                        },
                        {
                            "rooms_address": "6245 Agronomy Road V6T 1Z4",
                            "rooms_name": "DMP_301"
                        },
                        {
                            "rooms_address": "6245 Agronomy Road V6T 1Z4",
                            "rooms_name": "DMP_310"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_1001"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_3002"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_3004"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_3016"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_3018"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_3052"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_3058"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_3062"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_3068"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_3072"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_3074"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_4002"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_4004"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_4016"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_4018"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_4052"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_4058"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_4062"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_4068"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_4072"
                        },
                        {
                            "rooms_address": "6363 Agronomy Road",
                            "rooms_name": "ORCH_4074"
                        }
                    ]
                })

            })
            .catch( (err:InsightResponse)=>{
                Log.test(err.toString());
                expect.fail();
            })
    });



    it("test of a simple case c", function () {
        return insight.performQuery({
            "WHERE": {

                "AND": [{
                    "GT": {
                        "rooms_lat": 49.2612
                    }
                },
                    {
                        "LT": {
                            "rooms_lat": 49.26129
                        }
                    },
                    {
                        "LT": {
                            "rooms_lon": -123.2480
                        }
                    },
                    {
                        "GT": {
                            "rooms_lon": -123.24809
                        }
                    }
                ]

            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name",
                    "rooms_seats"
                ],
                "ORDER": "rooms_name",
                "FORM": "TABLE"
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal({"render":"TABLE","result":[
                    {"rooms_name":"DMP_101","rooms_seats":40},
                    {"rooms_name":"DMP_110","rooms_seats":120},
                    {"rooms_name":"DMP_201","rooms_seats":40},
                    {"rooms_name":"DMP_301","rooms_seats":80},
                    {"rooms_name":"DMP_310","rooms_seats":160}]})

            })
            .catch( (err:InsightResponse)=>{
                Log.test(err.toString());
                expect.fail();
            })
    });

});