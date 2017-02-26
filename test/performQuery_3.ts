/**
 * Created by jimmyshe-ubuntu on 17-2-17.
 */
import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";

let fs = require('fs');

let deleteFolderRecursive = function(path:string) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file:string) {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};


describe.only("performQuery_rooms", function () {
    let insight:Insight = null;
    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }






    before(function () {
        Log.test('test Query for rooms');
        deleteFolderRecursive("./data");
        insight = new Insight();
        // make sure the cache file is there
        let content = new Buffer(fs.readFileSync('./rooms.zip')).toString('base64');
        return insight.addDataset('rooms',content)

    })


    after(function () {
        Log.test('end test Query for rooms ');
        deleteFolderRecursive("./data");
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


    it("test of a simple case type", function () {
        return insight.performQuery({
            "WHERE": {
                "IS": {
                    "rooms_type": "Small*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_type", "rooms_name"
                ],
                "ORDER": "rooms_name",
                "FORM": "TABLE"
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal({"render":"TABLE","result":[{"rooms_type":"Small Group","rooms_name":"ANGU_232"},{"rooms_type":"Small Group","rooms_name":"ANGU_292"},{"rooms_type":"Small Group","rooms_name":"ANGU_332"},{"rooms_type":"Small Group","rooms_name":"ANGU_339"},{"rooms_type":"Small Group","rooms_name":"ANSO_202"},{"rooms_type":"Small Group","rooms_name":"ANSO_203"},{"rooms_type":"Small Group","rooms_name":"ANSO_205"},{"rooms_type":"Small Group","rooms_name":"AUDX_142"},{"rooms_type":"Small Group","rooms_name":"AUDX_157"},{"rooms_type":"Small Group","rooms_name":"BIOL_1503"},{"rooms_type":"Small Group","rooms_name":"BIOL_2519"},{"rooms_type":"Small Group","rooms_name":"BUCH_B216"},{"rooms_type":"Small Group","rooms_name":"BUCH_B302"},{"rooms_type":"Small Group","rooms_name":"BUCH_B304"},{"rooms_type":"Small Group","rooms_name":"BUCH_B306"},{"rooms_type":"Small Group","rooms_name":"BUCH_B307"},{"rooms_type":"Small Group","rooms_name":"BUCH_B308"},{"rooms_type":"Small Group","rooms_name":"BUCH_B310"},{"rooms_type":"Small Group","rooms_name":"BUCH_B312"},{"rooms_type":"Small Group","rooms_name":"BUCH_B316"},{"rooms_type":"Small Group","rooms_name":"BUCH_B319"},{"rooms_type":"Small Group","rooms_name":"BUCH_D205"},{"rooms_type":"Small Group","rooms_name":"BUCH_D207"},{"rooms_type":"Small Group","rooms_name":"BUCH_D209"},{"rooms_type":"Small Group","rooms_name":"BUCH_D213"},{"rooms_type":"Small Group","rooms_name":"BUCH_D214"},{"rooms_type":"Small Group","rooms_name":"BUCH_D216"},{"rooms_type":"Small Group","rooms_name":"BUCH_D221"},{"rooms_type":"Small Group","rooms_name":"BUCH_D228"},{"rooms_type":"Small Group","rooms_name":"BUCH_D229"},{"rooms_type":"Small Group","rooms_name":"BUCH_D304"},{"rooms_type":"Small Group","rooms_name":"BUCH_D306"},{"rooms_type":"Small Group","rooms_name":"BUCH_D307"},{"rooms_type":"Small Group","rooms_name":"BUCH_D313"},{"rooms_type":"Small Group","rooms_name":"BUCH_D315"},{"rooms_type":"Small Group","rooms_name":"BUCH_D319"},{"rooms_type":"Small Group","rooms_name":"BUCH_D323"},{"rooms_type":"Small Group","rooms_name":"BUCH_D325"},{"rooms_type":"Small Group","rooms_name":"CEME_1206"},{"rooms_type":"Small Group","rooms_name":"CEME_1210"},{"rooms_type":"Small Group","rooms_name":"DMP_101"},{"rooms_type":"Small Group","rooms_name":"DMP_201"},{"rooms_type":"Small Group","rooms_name":"FNH_20"},{"rooms_type":"Small Group","rooms_name":"FNH_30"},{"rooms_type":"Small Group","rooms_name":"FNH_320"},{"rooms_type":"Small Group","rooms_name":"FORW_317"},{"rooms_type":"Small Group","rooms_name":"FORW_519"},{"rooms_type":"Small Group","rooms_name":"FSC_1002"},{"rooms_type":"Small Group","rooms_name":"FSC_1402"},{"rooms_type":"Small Group","rooms_name":"FSC_1611"},{"rooms_type":"Small Group","rooms_name":"FSC_1613"},{"rooms_type":"Small Group","rooms_name":"FSC_1615"},{"rooms_type":"Small Group","rooms_name":"FSC_1617"},{"rooms_type":"Small Group","rooms_name":"GEOG_214"},{"rooms_type":"Small Group","rooms_name":"GEOG_242"},{"rooms_type":"Small Group","rooms_name":"HENN_301"},{"rooms_type":"Small Group","rooms_name":"HENN_302"},{"rooms_type":"Small Group","rooms_name":"HENN_304"},{"rooms_type":"Small Group","rooms_name":"IBLC_156"},{"rooms_type":"Small Group","rooms_name":"IBLC_157"},{"rooms_type":"Small Group","rooms_name":"IBLC_158"},{"rooms_type":"Small Group","rooms_name":"IBLC_185"},{"rooms_type":"Small Group","rooms_name":"IBLC_191"},{"rooms_type":"Small Group","rooms_name":"IBLC_192"},{"rooms_type":"Small Group","rooms_name":"IBLC_193"},{"rooms_type":"Small Group","rooms_name":"IBLC_194"},{"rooms_type":"Small Group","rooms_name":"IBLC_195"},{"rooms_type":"Small Group","rooms_name":"IBLC_263"},{"rooms_type":"Small Group","rooms_name":"IBLC_264"},{"rooms_type":"Small Group","rooms_name":"IBLC_265"},{"rooms_type":"Small Group","rooms_name":"IBLC_266"},{"rooms_type":"Small Group","rooms_name":"IBLC_460"},{"rooms_type":"Small Group","rooms_name":"IBLC_461"},{"rooms_type":"Small Group","rooms_name":"LASR_211"},{"rooms_type":"Small Group","rooms_name":"LASR_5C"},{"rooms_type":"Small Group","rooms_name":"MATH_102"},{"rooms_type":"Small Group","rooms_name":"MATH_202"},{"rooms_type":"Small Group","rooms_name":"MATH_225"},{"rooms_type":"Small Group","rooms_name":"MCLD_220"},{"rooms_type":"Small Group","rooms_name":"MCML_256"},{"rooms_type":"Small Group","rooms_name":"MCML_260"},{"rooms_type":"Small Group","rooms_name":"MCML_358"},{"rooms_type":"Small Group","rooms_name":"MCML_360A"},{"rooms_type":"Small Group","rooms_name":"MCML_360B"},{"rooms_type":"Small Group","rooms_name":"MCML_360C"},{"rooms_type":"Small Group","rooms_name":"MCML_360D"},{"rooms_type":"Small Group","rooms_name":"MCML_360E"},{"rooms_type":"Small Group","rooms_name":"MCML_360F"},{"rooms_type":"Small Group","rooms_name":"MCML_360G"},{"rooms_type":"Small Group","rooms_name":"MCML_360H"},{"rooms_type":"Small Group","rooms_name":"MCML_360J"},{"rooms_type":"Small Group","rooms_name":"MCML_360K"},{"rooms_type":"Small Group","rooms_name":"MCML_360L"},{"rooms_type":"Small Group","rooms_name":"MCML_360M"},{"rooms_type":"Small Group","rooms_name":"OSBO_203A"},{"rooms_type":"Small Group","rooms_name":"OSBO_203B"},{"rooms_type":"Small Group","rooms_name":"PCOH_1008"},{"rooms_type":"Small Group","rooms_name":"PCOH_1009"},{"rooms_type":"Small Group","rooms_name":"PCOH_1011"},{"rooms_type":"Small Group","rooms_name":"PCOH_1215"},{"rooms_type":"Small Group","rooms_name":"PCOH_1302"},{"rooms_type":"Small Group","rooms_name":"PHRM_3112"},{"rooms_type":"Small Group","rooms_name":"PHRM_3114"},{"rooms_type":"Small Group","rooms_name":"PHRM_3115"},{"rooms_type":"Small Group","rooms_name":"PHRM_3116"},{"rooms_type":"Small Group","rooms_name":"PHRM_3118"},{"rooms_type":"Small Group","rooms_name":"PHRM_3120"},{"rooms_type":"Small Group","rooms_name":"PHRM_3122"},{"rooms_type":"Small Group","rooms_name":"PHRM_3124"},{"rooms_type":"Small Group","rooms_name":"SCRF_1003"},{"rooms_type":"Small Group","rooms_name":"SCRF_1004"},{"rooms_type":"Small Group","rooms_name":"SCRF_1005"},{"rooms_type":"Small Group","rooms_name":"SCRF_1020"},{"rooms_type":"Small Group","rooms_name":"SCRF_1021"},{"rooms_type":"Small Group","rooms_name":"SCRF_1022"},{"rooms_type":"Small Group","rooms_name":"SCRF_1023"},{"rooms_type":"Small Group","rooms_name":"SCRF_1024"},{"rooms_type":"Small Group","rooms_name":"SCRF_1328"},{"rooms_type":"Small Group","rooms_name":"SCRF_200"},{"rooms_type":"Small Group","rooms_name":"SCRF_201"},{"rooms_type":"Small Group","rooms_name":"SCRF_202"},{"rooms_type":"Small Group","rooms_name":"SCRF_203"},{"rooms_type":"Small Group","rooms_name":"SCRF_204"},{"rooms_type":"Small Group","rooms_name":"SCRF_204A"},{"rooms_type":"Small Group","rooms_name":"SCRF_205"},{"rooms_type":"Small Group","rooms_name":"SCRF_206"},{"rooms_type":"Small Group","rooms_name":"SCRF_207"},{"rooms_type":"Small Group","rooms_name":"SCRF_208"},{"rooms_type":"Small Group","rooms_name":"SCRF_209"},{"rooms_type":"Small Group","rooms_name":"SCRF_210"},{"rooms_type":"Small Group","rooms_name":"SOWK_122"},{"rooms_type":"Small Group","rooms_name":"SOWK_324"},{"rooms_type":"Small Group","rooms_name":"SOWK_326"},{"rooms_type":"Small Group","rooms_name":"SPPH_143"},{"rooms_type":"Small Group","rooms_name":"SPPH_B108"},{"rooms_type":"Small Group","rooms_name":"SPPH_B112"},{"rooms_type":"Small Group","rooms_name":"SPPH_B136"},{"rooms_type":"Small Group","rooms_name":"SPPH_B138"},{"rooms_type":"Small Group","rooms_name":"SWNG_106"},{"rooms_type":"Small Group","rooms_name":"SWNG_108"},{"rooms_type":"Small Group","rooms_name":"SWNG_110"},{"rooms_type":"Small Group","rooms_name":"SWNG_306"},{"rooms_type":"Small Group","rooms_name":"SWNG_308"},{"rooms_type":"Small Group","rooms_name":"SWNG_310"},{"rooms_type":"Small Group","rooms_name":"SWNG_406"},{"rooms_type":"Small Group","rooms_name":"SWNG_408"},{"rooms_type":"Small Group","rooms_name":"SWNG_410"},{"rooms_type":"Small Group","rooms_name":"UCLL_101"},{"rooms_type":"Small Group","rooms_name":"WOOD_B75"},{"rooms_type":"Small Group","rooms_name":"WOOD_B79"},{"rooms_type":"Small Group","rooms_name":"WOOD_G41"},{"rooms_type":"Small Group","rooms_name":"WOOD_G44"},{"rooms_type":"Small Group","rooms_name":"WOOD_G53"},{"rooms_type":"Small Group","rooms_name":"WOOD_G55"},{"rooms_type":"Small Group","rooms_name":"WOOD_G57"},{"rooms_type":"Small Group","rooms_name":"WOOD_G59"},{"rooms_type":"Small Group","rooms_name":"WOOD_G65"},{"rooms_type":"Small Group","rooms_name":"WOOD_G66"}]})

            })
            .catch( (err:InsightResponse)=>{
                Log.test(err.toString());
                expect.fail();
            })
    });

    it("test of a simple case type_1", function () {
        return insight.performQuery({
            "WHERE": {
                "IS": {
                    "rooms_type": "**"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_type", "rooms_name"
                ],
                "ORDER": "rooms_name",
                "FORM": "TABLE"
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal(
                    {"render":"TABLE","result":[{"rooms_type":"Tiered Large Group","rooms_name":"AERL_120"},{"rooms_type":"Case Style","rooms_name":"ALRD_105"},{"rooms_type":"Open Design General Purpose","rooms_name":"ALRD_112"},{"rooms_type":"Open Design General Purpose","rooms_name":"ALRD_113"},{"rooms_type":"Case Style","rooms_name":"ALRD_121"},{"rooms_type":"Open Design General Purpose","rooms_name":"ALRD_B101"},{"rooms_type":"Case Style","rooms_name":"ANGU_037"},{"rooms_type":"Case Style","rooms_name":"ANGU_039"},{"rooms_type":"Tiered Large Group","rooms_name":"ANGU_098"},{"rooms_type":"Small Group","rooms_name":"ANGU_232"},{"rooms_type":"Case Style","rooms_name":"ANGU_234"},{"rooms_type":"Case Style","rooms_name":"ANGU_235"},{"rooms_type":"Case Style","rooms_name":"ANGU_237"},{"rooms_type":"Tiered Large Group","rooms_name":"ANGU_241"},{"rooms_type":"Tiered Large Group","rooms_name":"ANGU_243"},{"rooms_type":"Open Design General Purpose","rooms_name":"ANGU_254"},{"rooms_type":"Open Design General Purpose","rooms_name":"ANGU_291"},{"rooms_type":"Small Group","rooms_name":"ANGU_292"},{"rooms_type":"TBD","rooms_name":"ANGU_293"},{"rooms_type":"Open Design General Purpose","rooms_name":"ANGU_295"},{"rooms_type":"Open Design General Purpose","rooms_name":"ANGU_296"},{"rooms_type":"Small Group","rooms_name":"ANGU_332"},{"rooms_type":"Case Style","rooms_name":"ANGU_334"},{"rooms_type":"Case Style","rooms_name":"ANGU_335"},{"rooms_type":"Small Group","rooms_name":"ANGU_339"},{"rooms_type":"Tiered Large Group","rooms_name":"ANGU_343"},{"rooms_type":"Tiered Large Group","rooms_name":"ANGU_345"},{"rooms_type":"Tiered Large Group","rooms_name":"ANGU_347"},{"rooms_type":"Tiered Large Group","rooms_name":"ANGU_350"},{"rooms_type":"Tiered Large Group","rooms_name":"ANGU_354"},{"rooms_type":"Open Design General Purpose","rooms_name":"ANGU_432"},{"rooms_type":"Case Style","rooms_name":"ANGU_434"},{"rooms_type":"Open Design General Purpose","rooms_name":"ANGU_435"},{"rooms_type":"Open Design General Purpose","rooms_name":"ANGU_437"},{"rooms_type":"Small Group","rooms_name":"ANSO_202"},{"rooms_type":"Small Group","rooms_name":"ANSO_203"},{"rooms_type":"Small Group","rooms_name":"ANSO_205"},{"rooms_type":"Open Design General Purpose","rooms_name":"ANSO_207"},{"rooms_type":"Small Group","rooms_name":"AUDX_142"},{"rooms_type":"Small Group","rooms_name":"AUDX_157"},{"rooms_type":"Small Group","rooms_name":"BIOL_1503"},{"rooms_type":"Tiered Large Group","rooms_name":"BIOL_2000"},{"rooms_type":"Tiered Large Group","rooms_name":"BIOL_2200"},{"rooms_type":"Small Group","rooms_name":"BIOL_2519"},{"rooms_type":"Tiered Large Group","rooms_name":"BRKX_2365"},{"rooms_type":"Open Design General Purpose","rooms_name":"BRKX_2367"},{"rooms_type":"Tiered Large Group","rooms_name":"BUCH_A101"},{"rooms_type":"Tiered Large Group","rooms_name":"BUCH_A102"},{"rooms_type":"Tiered Large Group","rooms_name":"BUCH_A103"},{"rooms_type":"Tiered Large Group","rooms_name":"BUCH_A104"},{"rooms_type":"Tiered Large Group","rooms_name":"BUCH_A201"},{"rooms_type":"Case Style","rooms_name":"BUCH_A202"},{"rooms_type":"Case Style","rooms_name":"BUCH_A203"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_B141"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_B142"},{"rooms_type":"Case Style","rooms_name":"BUCH_B208"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_B209"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_B210"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_B211"},{"rooms_type":"Case Style","rooms_name":"BUCH_B213"},{"rooms_type":"Case Style","rooms_name":"BUCH_B215"},{"rooms_type":"Small Group","rooms_name":"BUCH_B216"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_B218"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_B219"},{"rooms_type":"Small Group","rooms_name":"BUCH_B302"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_B303"},{"rooms_type":"Small Group","rooms_name":"BUCH_B304"},{"rooms_type":"Small Group","rooms_name":"BUCH_B306"},{"rooms_type":"Small Group","rooms_name":"BUCH_B307"},{"rooms_type":"Small Group","rooms_name":"BUCH_B308"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_B309"},{"rooms_type":"Small Group","rooms_name":"BUCH_B310"},{"rooms_type":"Small Group","rooms_name":"BUCH_B312"},{"rooms_type":"Tiered Large Group","rooms_name":"BUCH_B313"},{"rooms_type":"Tiered Large Group","rooms_name":"BUCH_B315"},{"rooms_type":"Small Group","rooms_name":"BUCH_B316"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_B318"},{"rooms_type":"Small Group","rooms_name":"BUCH_B319"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_D201"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_D204"},{"rooms_type":"Small Group","rooms_name":"BUCH_D205"},{"rooms_type":"Small Group","rooms_name":"BUCH_D207"},{"rooms_type":"Small Group","rooms_name":"BUCH_D209"},{"rooms_type":"Small Group","rooms_name":"BUCH_D213"},{"rooms_type":"Small Group","rooms_name":"BUCH_D214"},{"rooms_type":"Small Group","rooms_name":"BUCH_D216"},{"rooms_type":"Tiered Large Group","rooms_name":"BUCH_D217"},{"rooms_type":"Tiered Large Group","rooms_name":"BUCH_D218"},{"rooms_type":"Tiered Large Group","rooms_name":"BUCH_D219"},{"rooms_type":"Small Group","rooms_name":"BUCH_D221"},{"rooms_type":"Case Style","rooms_name":"BUCH_D222"},{"rooms_type":"Small Group","rooms_name":"BUCH_D228"},{"rooms_type":"Small Group","rooms_name":"BUCH_D229"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_D301"},{"rooms_type":"Small Group","rooms_name":"BUCH_D304"},{"rooms_type":"Small Group","rooms_name":"BUCH_D306"},{"rooms_type":"Small Group","rooms_name":"BUCH_D307"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_D312"},{"rooms_type":"Small Group","rooms_name":"BUCH_D313"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_D314"},{"rooms_type":"Small Group","rooms_name":"BUCH_D315"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_D316"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_D317"},{"rooms_type":"Small Group","rooms_name":"BUCH_D319"},{"rooms_type":"Open Design General Purpose","rooms_name":"BUCH_D322"},{"rooms_type":"Small Group","rooms_name":"BUCH_D323"},{"rooms_type":"Small Group","rooms_name":"BUCH_D325"},{"rooms_type":"Tiered Large Group","rooms_name":"CEME_1202"},{"rooms_type":"Case Style","rooms_name":"CEME_1204"},{"rooms_type":"Small Group","rooms_name":"CEME_1206"},{"rooms_type":"Small Group","rooms_name":"CEME_1210"},{"rooms_type":"Case Style","rooms_name":"CEME_1212"},{"rooms_type":"Case Style","rooms_name":"CEME_1215"},{"rooms_type":"Tiered Large Group","rooms_name":"CHBE_101"},{"rooms_type":"Tiered Large Group","rooms_name":"CHBE_102"},{"rooms_type":"Open Design General Purpose","rooms_name":"CHBE_103"},{"rooms_type":"Tiered Large Group","rooms_name":"CHEM_B150"},{"rooms_type":"Tiered Large Group","rooms_name":"CHEM_B250"},{"rooms_type":"Tiered Large Group","rooms_name":"CHEM_C124"},{"rooms_type":"Tiered Large Group","rooms_name":"CHEM_C126"},{"rooms_type":"Tiered Large Group","rooms_name":"CHEM_D200"},{"rooms_type":"Tiered Large Group","rooms_name":"CHEM_D300"},{"rooms_type":"Tiered Large Group","rooms_name":"CIRS_1250"},{"rooms_type":"Small Group","rooms_name":"DMP_101"},{"rooms_type":"Tiered Large Group","rooms_name":"DMP_110"},{"rooms_type":"Small Group","rooms_name":"DMP_201"},{"rooms_type":"Tiered Large Group","rooms_name":"DMP_301"},{"rooms_type":"Tiered Large Group","rooms_name":"DMP_310"},{"rooms_type":"Open Design General Purpose","rooms_name":"EOSM_135"},{"rooms_type":"Tiered Large Group","rooms_name":"ESB_1012"},{"rooms_type":"Tiered Large Group","rooms_name":"ESB_1013"},{"rooms_type":"Tiered Large Group","rooms_name":"ESB_2012"},{"rooms_type":"Small Group","rooms_name":"FNH_20"},{"rooms_type":"Small Group","rooms_name":"FNH_30"},{"rooms_type":"Small Group","rooms_name":"FNH_320"},{"rooms_type":"Open Design General Purpose","rooms_name":"FNH_40"},{"rooms_type":"Open Design General Purpose","rooms_name":"FNH_50"},{"rooms_type":"Tiered Large Group","rooms_name":"FNH_60"},{"rooms_type":"Open Design General Purpose","rooms_name":"FORW_303"},{"rooms_type":"Small Group","rooms_name":"FORW_317"},{"rooms_type":"Small Group","rooms_name":"FORW_519"},{"rooms_type":"Tiered Large Group","rooms_name":"FRDM_153"},{"rooms_type":"Case Style","rooms_name":"FSC_1001"},{"rooms_type":"Small Group","rooms_name":"FSC_1002"},{"rooms_type":"Case Style","rooms_name":"FSC_1003"},{"rooms_type":"Tiered Large Group","rooms_name":"FSC_1005"},{"rooms_type":"Tiered Large Group","rooms_name":"FSC_1221"},{"rooms_type":"Small Group","rooms_name":"FSC_1402"},{"rooms_type":"Small Group","rooms_name":"FSC_1611"},{"rooms_type":"Small Group","rooms_name":"FSC_1613"},{"rooms_type":"Small Group","rooms_name":"FSC_1615"},{"rooms_type":"Small Group","rooms_name":"FSC_1617"},{"rooms_type":"Tiered Large Group","rooms_name":"GEOG_100"},{"rooms_type":"Open Design General Purpose","rooms_name":"GEOG_101"},{"rooms_type":"Open Design General Purpose","rooms_name":"GEOG_147"},{"rooms_type":"Open Design General Purpose","rooms_name":"GEOG_200"},{"rooms_type":"Open Design General Purpose","rooms_name":"GEOG_201"},{"rooms_type":"Open Design General Purpose","rooms_name":"GEOG_212"},{"rooms_type":"Small Group","rooms_name":"GEOG_214"},{"rooms_type":"Small Group","rooms_name":"GEOG_242"},{"rooms_type":"Open Design General Purpose","rooms_name":"HEBB_10"},{"rooms_type":"Tiered Large Group","rooms_name":"HEBB_100"},{"rooms_type":"Open Design General Purpose","rooms_name":"HEBB_12"},{"rooms_type":"Open Design General Purpose","rooms_name":"HEBB_13"},{"rooms_type":"Tiered Large Group","rooms_name":"HENN_200"},{"rooms_type":"Tiered Large Group","rooms_name":"HENN_201"},{"rooms_type":"Tiered Large Group","rooms_name":"HENN_202"},{"rooms_type":"Small Group","rooms_name":"HENN_301"},{"rooms_type":"Small Group","rooms_name":"HENN_302"},{"rooms_type":"Small Group","rooms_name":"HENN_304"},{"rooms_type":"Case Style","rooms_name":"IBLC_155"},{"rooms_type":"Small Group","rooms_name":"IBLC_156"},{"rooms_type":"Small Group","rooms_name":"IBLC_157"},{"rooms_type":"Small Group","rooms_name":"IBLC_158"},{"rooms_type":"Tiered Large Group","rooms_name":"IBLC_182"},{"rooms_type":"Small Group","rooms_name":"IBLC_185"},{"rooms_type":"Small Group","rooms_name":"IBLC_191"},{"rooms_type":"Small Group","rooms_name":"IBLC_192"},{"rooms_type":"Small Group","rooms_name":"IBLC_193"},{"rooms_type":"Small Group","rooms_name":"IBLC_194"},{"rooms_type":"Small Group","rooms_name":"IBLC_195"},{"rooms_type":"Open Design General Purpose","rooms_name":"IBLC_261"},{"rooms_type":"Small Group","rooms_name":"IBLC_263"},{"rooms_type":"Small Group","rooms_name":"IBLC_264"},{"rooms_type":"Small Group","rooms_name":"IBLC_265"},{"rooms_type":"Small Group","rooms_name":"IBLC_266"},{"rooms_type":"Small Group","rooms_name":"IBLC_460"},{"rooms_type":"Small Group","rooms_name":"IBLC_461"},{"rooms_type":"Case Style","rooms_name":"IONA_301"},{"rooms_type":"Open Design General Purpose","rooms_name":"IONA_633"},{"rooms_type":"Tiered Large Group","rooms_name":"LASR_102"},{"rooms_type":"Tiered Large Group","rooms_name":"LASR_104"},{"rooms_type":"","rooms_name":"LASR_105"},{"rooms_type":"Open Design General Purpose","rooms_name":"LASR_107"},{"rooms_type":"Small Group","rooms_name":"LASR_211"},{"rooms_type":"Small Group","rooms_name":"LASR_5C"},{"rooms_type":"Tiered Large Group","rooms_name":"LSC_1001"},{"rooms_type":"Tiered Large Group","rooms_name":"LSC_1002"},{"rooms_type":"Tiered Large Group","rooms_name":"LSC_1003"},{"rooms_type":"Tiered Large Group","rooms_name":"LSK_200"},{"rooms_type":"Tiered Large Group","rooms_name":"LSK_201"},{"rooms_type":"Open Design General Purpose","rooms_name":"LSK_460"},{"rooms_type":"Open Design General Purpose","rooms_name":"LSK_462"},{"rooms_type":"Tiered Large Group","rooms_name":"MATH_100"},{"rooms_type":"Small Group","rooms_name":"MATH_102"},{"rooms_type":"Open Design General Purpose","rooms_name":"MATH_104"},{"rooms_type":"Open Design General Purpose","rooms_name":"MATH_105"},{"rooms_type":"Small Group","rooms_name":"MATH_202"},{"rooms_type":"Open Design General Purpose","rooms_name":"MATH_203"},{"rooms_type":"Open Design General Purpose","rooms_name":"MATH_204"},{"rooms_type":"Small Group","rooms_name":"MATH_225"},{"rooms_type":"Tiered Large Group","rooms_name":"MATX_1100"},{"rooms_type":"Tiered Large Group","rooms_name":"MCLD_202"},{"rooms_type":"Open Design General Purpose","rooms_name":"MCLD_214"},{"rooms_type":"Small Group","rooms_name":"MCLD_220"},{"rooms_type":"Tiered Large Group","rooms_name":"MCLD_228"},{"rooms_type":"Open Design General Purpose","rooms_name":"MCLD_242"},{"rooms_type":"Open Design General Purpose","rooms_name":"MCLD_254"},{"rooms_type":"Open Design General Purpose","rooms_name":"MCML_154"},{"rooms_type":"Tiered Large Group","rooms_name":"MCML_158"},{"rooms_type":"Case Style","rooms_name":"MCML_160"},{"rooms_type":"Tiered Large Group","rooms_name":"MCML_166"},{"rooms_type":"Small Group","rooms_name":"MCML_256"},{"rooms_type":"Small Group","rooms_name":"MCML_260"},{"rooms_type":"Small Group","rooms_name":"MCML_358"},{"rooms_type":"Small Group","rooms_name":"MCML_360A"},{"rooms_type":"Small Group","rooms_name":"MCML_360B"},{"rooms_type":"Small Group","rooms_name":"MCML_360C"},{"rooms_type":"Small Group","rooms_name":"MCML_360D"},{"rooms_type":"Small Group","rooms_name":"MCML_360E"},{"rooms_type":"Small Group","rooms_name":"MCML_360F"},{"rooms_type":"Small Group","rooms_name":"MCML_360G"},{"rooms_type":"Small Group","rooms_name":"MCML_360H"},{"rooms_type":"Small Group","rooms_name":"MCML_360J"},{"rooms_type":"Small Group","rooms_name":"MCML_360K"},{"rooms_type":"Small Group","rooms_name":"MCML_360L"},{"rooms_type":"Small Group","rooms_name":"MCML_360M"},{"rooms_type":"Open Design General Purpose","rooms_name":"MGYM_206"},{"rooms_type":"Open Design General Purpose","rooms_name":"MGYM_208"},{"rooms_type":"Active Learning","rooms_name":"ORCH_1001"},{"rooms_type":"Open Design General Purpose","rooms_name":"ORCH_3002"},{"rooms_type":"Open Design General Purpose","rooms_name":"ORCH_3004"},{"rooms_type":"Active Learning","rooms_name":"ORCH_3016"},{"rooms_type":"Studio Lab","rooms_name":"ORCH_3018"},{"rooms_type":"Open Design General Purpose","rooms_name":"ORCH_3052"},{"rooms_type":"Open Design General Purpose","rooms_name":"ORCH_3058"},{"rooms_type":"Open Design General Purpose","rooms_name":"ORCH_3062"},{"rooms_type":"Open Design General Purpose","rooms_name":"ORCH_3068"},{"rooms_type":"Open Design General Purpose","rooms_name":"ORCH_3072"},{"rooms_type":"Open Design General Purpose","rooms_name":"ORCH_3074"},{"rooms_type":"Active Learning","rooms_name":"ORCH_4002"},{"rooms_type":"Active Learning","rooms_name":"ORCH_4004"},{"rooms_type":"Active Learning","rooms_name":"ORCH_4016"},{"rooms_type":"Active Learning","rooms_name":"ORCH_4018"},{"rooms_type":"Open Design General Purpose","rooms_name":"ORCH_4052"},{"rooms_type":"Open Design General Purpose","rooms_name":"ORCH_4058"},{"rooms_type":"Active Learning","rooms_name":"ORCH_4062"},{"rooms_type":"Active Learning","rooms_name":"ORCH_4068"},{"rooms_type":"Active Learning","rooms_name":"ORCH_4072"},{"rooms_type":"Studio Lab","rooms_name":"ORCH_4074"},{"rooms_type":"Small Group","rooms_name":"OSBO_203A"},{"rooms_type":"Small Group","rooms_name":"OSBO_203B"},{"rooms_type":"Open Design General Purpose","rooms_name":"OSBO_A"},{"rooms_type":"Open Design General Purpose","rooms_name":"PCOH_1001"},{"rooms_type":"Open Design General Purpose","rooms_name":"PCOH_1002"},{"rooms_type":"Open Design General Purpose","rooms_name":"PCOH_1003"},{"rooms_type":"Small Group","rooms_name":"PCOH_1008"},{"rooms_type":"Small Group","rooms_name":"PCOH_1009"},{"rooms_type":"Small Group","rooms_name":"PCOH_1011"},{"rooms_type":"Small Group","rooms_name":"PCOH_1215"},{"rooms_type":"Small Group","rooms_name":"PCOH_1302"},{"rooms_type":"Tiered Large Group","rooms_name":"PHRM_1101"},{"rooms_type":"Tiered Large Group","rooms_name":"PHRM_1201"},{"rooms_type":"Small Group","rooms_name":"PHRM_3112"},{"rooms_type":"Small Group","rooms_name":"PHRM_3114"},{"rooms_type":"Small Group","rooms_name":"PHRM_3115"},{"rooms_type":"Small Group","rooms_name":"PHRM_3116"},{"rooms_type":"Small Group","rooms_name":"PHRM_3118"},{"rooms_type":"Small Group","rooms_name":"PHRM_3120"},{"rooms_type":"Small Group","rooms_name":"PHRM_3122"},{"rooms_type":"Small Group","rooms_name":"PHRM_3124"},{"rooms_type":"Open Design General Purpose","rooms_name":"PHRM_3208"},{"rooms_type":"Tiered Large Group","rooms_name":"SCRF_100"},{"rooms_type":"Small Group","rooms_name":"SCRF_1003"},{"rooms_type":"Small Group","rooms_name":"SCRF_1004"},{"rooms_type":"Small Group","rooms_name":"SCRF_1005"},{"rooms_type":"Small Group","rooms_name":"SCRF_1020"},{"rooms_type":"Small Group","rooms_name":"SCRF_1021"},{"rooms_type":"Small Group","rooms_name":"SCRF_1022"},{"rooms_type":"Small Group","rooms_name":"SCRF_1023"},{"rooms_type":"Small Group","rooms_name":"SCRF_1024"},{"rooms_type":"Small Group","rooms_name":"SCRF_1328"},{"rooms_type":"Small Group","rooms_name":"SCRF_200"},{"rooms_type":"Small Group","rooms_name":"SCRF_201"},{"rooms_type":"Small Group","rooms_name":"SCRF_202"},{"rooms_type":"Small Group","rooms_name":"SCRF_203"},{"rooms_type":"Small Group","rooms_name":"SCRF_204"},{"rooms_type":"Small Group","rooms_name":"SCRF_204A"},{"rooms_type":"Small Group","rooms_name":"SCRF_205"},{"rooms_type":"Small Group","rooms_name":"SCRF_206"},{"rooms_type":"Small Group","rooms_name":"SCRF_207"},{"rooms_type":"Small Group","rooms_name":"SCRF_208"},{"rooms_type":"Small Group","rooms_name":"SCRF_209"},{"rooms_type":"Small Group","rooms_name":"SCRF_210"},{"rooms_type":"Small Group","rooms_name":"SOWK_122"},{"rooms_type":"Open Design General Purpose","rooms_name":"SOWK_124"},{"rooms_type":"Open Design General Purpose","rooms_name":"SOWK_222"},{"rooms_type":"Open Design General Purpose","rooms_name":"SOWK_223"},{"rooms_type":"Open Design General Purpose","rooms_name":"SOWK_224"},{"rooms_type":"Small Group","rooms_name":"SOWK_324"},{"rooms_type":"Small Group","rooms_name":"SOWK_326"},{"rooms_type":"Small Group","rooms_name":"SPPH_143"},{"rooms_type":"Small Group","rooms_name":"SPPH_B108"},{"rooms_type":"Small Group","rooms_name":"SPPH_B112"},{"rooms_type":"Small Group","rooms_name":"SPPH_B136"},{"rooms_type":"Small Group","rooms_name":"SPPH_B138"},{"rooms_type":"Open Design General Purpose","rooms_name":"SPPH_B151"},{"rooms_type":"TBD","rooms_name":"SRC_220A"},{"rooms_type":"TBD","rooms_name":"SRC_220B"},{"rooms_type":"TBD","rooms_name":"SRC_220C"},{"rooms_type":"Open Design General Purpose","rooms_name":"SWNG_105"},{"rooms_type":"Small Group","rooms_name":"SWNG_106"},{"rooms_type":"Open Design General Purpose","rooms_name":"SWNG_107"},{"rooms_type":"Small Group","rooms_name":"SWNG_108"},{"rooms_type":"Open Design General Purpose","rooms_name":"SWNG_109"},{"rooms_type":"Small Group","rooms_name":"SWNG_110"},{"rooms_type":"Tiered Large Group","rooms_name":"SWNG_121"},{"rooms_type":"Tiered Large Group","rooms_name":"SWNG_122"},{"rooms_type":"Tiered Large Group","rooms_name":"SWNG_221"},{"rooms_type":"Tiered Large Group","rooms_name":"SWNG_222"},{"rooms_type":"Open Design General Purpose","rooms_name":"SWNG_305"},{"rooms_type":"Small Group","rooms_name":"SWNG_306"},{"rooms_type":"Open Design General Purpose","rooms_name":"SWNG_307"},{"rooms_type":"Small Group","rooms_name":"SWNG_308"},{"rooms_type":"Open Design General Purpose","rooms_name":"SWNG_309"},{"rooms_type":"Small Group","rooms_name":"SWNG_310"},{"rooms_type":"Open Design General Purpose","rooms_name":"SWNG_405"},{"rooms_type":"Small Group","rooms_name":"SWNG_406"},{"rooms_type":"Open Design General Purpose","rooms_name":"SWNG_407"},{"rooms_type":"Small Group","rooms_name":"SWNG_408"},{"rooms_type":"Open Design General Purpose","rooms_name":"SWNG_409"},{"rooms_type":"Small Group","rooms_name":"SWNG_410"},{"rooms_type":"Small Group","rooms_name":"UCLL_101"},{"rooms_type":"Open Design General Purpose","rooms_name":"UCLL_103"},{"rooms_type":"Open Design General Purpose","rooms_name":"UCLL_107"},{"rooms_type":"Studio Lab","rooms_name":"UCLL_109"},{"rooms_type":"Tiered Large Group","rooms_name":"WESB_100"},{"rooms_type":"Tiered Large Group","rooms_name":"WESB_201"},{"rooms_type":"Tiered Large Group","rooms_name":"WOOD_1"},{"rooms_type":"Tiered Large Group","rooms_name":"WOOD_2"},{"rooms_type":"Tiered Large Group","rooms_name":"WOOD_3"},{"rooms_type":"Tiered Large Group","rooms_name":"WOOD_4"},{"rooms_type":"Tiered Large Group","rooms_name":"WOOD_5"},{"rooms_type":"Tiered Large Group","rooms_name":"WOOD_6"},{"rooms_type":"Small Group","rooms_name":"WOOD_B75"},{"rooms_type":"Small Group","rooms_name":"WOOD_B79"},{"rooms_type":"Small Group","rooms_name":"WOOD_G41"},{"rooms_type":"Small Group","rooms_name":"WOOD_G44"},{"rooms_type":"Small Group","rooms_name":"WOOD_G53"},{"rooms_type":"Small Group","rooms_name":"WOOD_G55"},{"rooms_type":"Small Group","rooms_name":"WOOD_G57"},{"rooms_type":"Small Group","rooms_name":"WOOD_G59"},{"rooms_type":"Small Group","rooms_name":"WOOD_G65"},{"rooms_type":"Small Group","rooms_name":"WOOD_G66"}]}
                    )

            })
            .catch( (err:InsightResponse)=>{
                Log.test(err.toString());
                expect.fail();
            })
    });

    it("test of a simple case type_2", function () {
        return insight.performQuery({
            "WHERE": {
                "IS": {
                    "rooms_type": "TB*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_type", "rooms_name"
                ],
                "ORDER": "rooms_name",
                "FORM": "TABLE"
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal(
                    {"render":"TABLE","result":[{"rooms_type":"TBD","rooms_name":"ANGU_293"},{"rooms_type":"TBD","rooms_name":"SRC_220A"},{"rooms_type":"TBD","rooms_name":"SRC_220B"},{"rooms_type":"TBD","rooms_name":"SRC_220C"}]}
                )

            })
            .catch( (err:InsightResponse)=>{
                Log.test(err.toString());
                expect.fail();
            })
    });

    it("test of a simple case type_3", function () {
        return insight.performQuery({
            "WHERE": {
                "IS": {
                    "rooms_type": "*B*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_type", "rooms_name"
                ],
                "ORDER": "rooms_name",
                "FORM": "TABLE"
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal(
                    {"render":"TABLE","result":[{"rooms_type":"TBD","rooms_name":"ANGU_293"},{"rooms_type":"TBD","rooms_name":"SRC_220A"},{"rooms_type":"TBD","rooms_name":"SRC_220B"},{"rooms_type":"TBD","rooms_name":"SRC_220C"}]}
                )

            })
            .catch( (err:InsightResponse)=>{
                Log.test(err.toString());
                expect.fail();
            })
    });
});