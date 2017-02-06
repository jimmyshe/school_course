/**
 * Created by jimmyshe-ubuntu on 17-1-18.
 */

import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";


describe("performQuery", function () {

    let insight:Insight = null


    let testQuery_simple = {
        "WHERE":{
            "GT":{
                "courses_avg":0
            }
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        }
    };

    let testQuery_simple_invalid_1 = {
        "WHERE":{
            "GT":{
                "courses_avg":"a" // invalid
            }
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        }
    };

    let testQuery_simple_invalid_2 = {
        "WHERE":{
            "GT":{
                "courses_avg":"a"
            }
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_avg"
            ],
            "ORDER":"courses_id", // invalid   It can not order by some key that is not requested.
            "FORM":"TABLE"
        }
    };

    let testQuery_simple_invalid_3 = {
        "WHERE":{
            "GT":{
                "courses_avg":"a"
            }
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_av"  // invalid
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        }
    };

    let testQuery_simple_invalid_4 = {
        "WHERE":{
            "GT":{
                "courses_avg":0
            }
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"BOOK"
        }
    };




    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }


    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        insight = new Insight();
        insight.courseInformation = [
            {
                courses_id : "t1",
                courses_avg : 5,
                courses_dept : "cs",
                courses_title : "string",
                courses_pass : 1,
                courses_fail : 3,
                courses_audit : 1,
                courses_uuid:"0",
                year : "",
                sectionNum : "string",
                source : "string",},
            {
                courses_id : "t2",
                courses_avg : 4,
                courses_dept : "cs",
                courses_title : "string",
                courses_pass : 2,
                courses_fail : 3,
                courses_audit : 1,
                courses_uuid:"1",
                year : "",
                sectionNum : "string",
                source : "string",},
            {
                courses_id : "t3",
                courses_avg : 3,
                courses_dept : "art",
                courses_title : "string",
                courses_pass : 3,
                courses_fail : 3,
                courses_audit : 1,
                courses_uuid:"2",
                year : "",
                sectionNum : "string",
                source : "string",}]
    });


    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
        insight = null;
    });


    it("test of a simple case", function () {
        return insight.performQuery(testQuery_simple)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons).to.deep.equal({
                    "code": 200,
                    "body": {
                        "render": "TABLE",
                        "result": [
                            {
                                "courses_avg": 3,
                                "courses_dept": "art"
                            },
                            {
                                "courses_avg": 4,
                                "courses_dept": "cs"
                            },
                            {
                                "courses_avg": 5,
                                "courses_dept": "cs"
                            }
                        ]
                    }
                });

            })
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });



    let testQuery_simple_1 = {
        "WHERE":{
            "GT":{
                "courses_avg":0
            }
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_avg"
            ],
            "ORDER":"courses_dept",
            "FORM":"TABLE"
        }
    };

    it("test of a simple case_1", function () {
        return insight.performQuery(testQuery_simple_1)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons).to.deep.equal({
                    "code": 200,
                    "body": {
                        "render": "TABLE",
                        "result": [
                            {
                                "courses_avg": 3,
                                "courses_dept": "art"
                            },
                            {
                                "courses_avg": 5,
                                "courses_dept": "cs"
                            },
                            {
                                "courses_avg": 4,
                                "courses_dept": "cs"
                            }
                        ]
                    }
                });

            })
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });




    it("an invalid simple query_1", function () {
        return insight.performQuery(testQuery_simple_invalid_1)
            .then((respons:InsightResponse)=>{
                Log.test("Should not be there");
                expect.fail();
            })
            .catch( (err:InsightResponse)=>{

                expect(err).to.deep.equal({
                    "code": 400,
                    "body": {
                        "error": "the filter is not valid,since comparision valuse is not a number"
                    }
                });

            })
    });

    it("an invalid simple query_2", function () {
        return insight.performQuery(testQuery_simple_invalid_2)
            .then((respons:InsightResponse)=>{
                Log.test("Should not be there");
                expect.fail();
            })
            .catch( (err:InsightResponse)=>{

                expect(err).to.deep.equal({
                    "code": 400,
                    "body": {
                        "error": "the option of order has an invalid key"
                    }
                });
            })
    });

    it("an invalid simple query_3", function () {
        return insight.performQuery(testQuery_simple_invalid_3)
            .then((respons:InsightResponse)=>{
                Log.test("Should not be there");
                expect.fail();
            })
            .catch( (err:InsightResponse)=>{

                expect(err).to.deep.equal({
                    "code": 400,
                    "body": {
                        "error": "the option of columns has an invalid key"
                    }
                });
            })
    });


    it("an invalid simple query_4", function () {
        return insight.performQuery(testQuery_simple_invalid_4)
            .then((respons:InsightResponse)=>{
                Log.test("Should not be there");
                expect.fail();
            })
            .catch( (err:InsightResponse)=>{

                expect(err).to.deep.equal({
                    "code": 400,
                    "body": {
                        "error": "the option of view has an invalid key"
                    }
                });
            })
    });


    let testQuery_simple_invalid_5 = { // wrong format

        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        }
    };
    it("an invalid simple query_5", function () {
        return insight.performQuery(testQuery_simple_invalid_5)
            .then((respons:InsightResponse)=>{
                Log.test("Should not be there");
                expect.fail();
            })
            .catch( (err:InsightResponse)=>{

                expect(err).to.deep.equal({
                    "code": 400,
                    "body": {
                        "error": "the query format is wrong"
                    }
                });
            })
    });


    let testQuery_simple_invalid_6 = {
        "WHERE":{
            "GT":{
                "courses_avg":0
            }
        },
        "OPTIONS":{
            "COLUMNS":{},
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        }
    };
    it("an invalid simple query_6", function () {
        return insight.performQuery(testQuery_simple_invalid_6)
            .then((respons:InsightResponse)=>{
                Log.test("Should not be there");
                expect.fail();
            })
            .catch( (err:InsightResponse)=>{

                expect(err).to.deep.equal({
                    "code": 400,
                    "body": {"error": "the option of columns has a wrong format"}
                });
            })
    });



    let testQuery_simple_invalid_7 = {
        "WHERE":{
            "GT":{
                "courses_ag":0
            }
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        }
    };
    it("an invalid simple query_7", function () {
        return insight.performQuery(testQuery_simple_invalid_7)
            .then((respons:InsightResponse)=>{
                Log.test("Should not be there");
                expect.fail();
            })
            .catch( (err:InsightResponse)=>{

                expect(err).to.deep.equal(
                    {"code":400,
                        "body":
                            {"error":"the filter is not valid,since comparision key is not a valid key"}}
                    );
            })
    });



    let testQuery_simple_invalid_8 = {
        "WHERE":{
            "IS":{
                "courses_ag":"0"
            }
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        }
    };
    it("an invalid simple query_8", function () {
        return insight.performQuery(testQuery_simple_invalid_8)
            .then((respons:InsightResponse)=>{
                Log.test("Should not be there");
                expect.fail();
            })
            .catch( (err:InsightResponse)=>{

                expect(err).to.deep.equal(
                    {"code":400,
                        "body":
                            {"error":"the filter is not valid,since comparision key is not a valid key"}}
                );
            })
    });

});
