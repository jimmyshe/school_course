/**
 * Created by cq2essz on 2017/1/26.
 */
import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import {AssertionError} from "assert";


let fs = require('fs');

describe("performQuery_courses", function () {

    let insight:Insight = null;
    let testQuery_simple = {
        "WHERE":{
            "GT":{
                "courses_avg":97
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




    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }

    before(function () {
        Log.info("before query courses test")

        if(fs.existsSync("./data/courses.json")){
            fs.unlinkSync("./data/courses.json");
        }
        if(fs.existsSync("./data/rooms.json")){
            fs.unlinkSync("./data/rooms.json");
        }

        insight = new Insight();
        let courseContent = new Buffer(fs.readFileSync('./courses.zip')).toString('base64');
        return insight.addDataset('courses',courseContent);
    });

    after(function () {
        if(fs.existsSync("./data/courses.json")){
            fs.unlinkSync("./data/courses.json");
        }
        if(fs.existsSync("./data/rooms.json")){
            fs.unlinkSync("./data/rooms.json");
        }
    })


    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });


    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });


    it("test of a simple case", function () {
        return insight.performQuery(testQuery_simple)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal({ render: 'TABLE',
                    result:
                        [ { courses_dept: 'epse', courses_avg: 97.09 },
                            { courses_dept: 'math', courses_avg: 97.09 },
                            { courses_dept: 'math', courses_avg: 97.09 },
                            { courses_dept: 'epse', courses_avg: 97.09 },
                            { courses_dept: 'math', courses_avg: 97.25 },
                            { courses_dept: 'math', courses_avg: 97.25 },
                            { courses_dept: 'epse', courses_avg: 97.29 },
                            { courses_dept: 'epse', courses_avg: 97.29 },
                            { courses_dept: 'nurs', courses_avg: 97.33 },
                            { courses_dept: 'nurs', courses_avg: 97.33 },
                            { courses_dept: 'epse', courses_avg: 97.41 },
                            { courses_dept: 'epse', courses_avg: 97.41 },
                            { courses_dept: 'cnps', courses_avg: 97.47 },
                            { courses_dept: 'cnps', courses_avg: 97.47 },
                            { courses_dept: 'math', courses_avg: 97.48 },
                            { courses_dept: 'math', courses_avg: 97.48 },
                            { courses_dept: 'educ', courses_avg: 97.5 },
                            { courses_dept: 'nurs', courses_avg: 97.53 },
                            { courses_dept: 'nurs', courses_avg: 97.53 },
                            { courses_dept: 'epse', courses_avg: 97.67 },
                            { courses_dept: 'epse', courses_avg: 97.69 },
                            { courses_dept: 'epse', courses_avg: 97.78 },
                            { courses_dept: 'crwr', courses_avg: 98 },
                            { courses_dept: 'crwr', courses_avg: 98 },
                            { courses_dept: 'epse', courses_avg: 98.08 },
                            { courses_dept: 'nurs', courses_avg: 98.21 },
                            { courses_dept: 'nurs', courses_avg: 98.21 },
                            { courses_dept: 'epse', courses_avg: 98.36 },
                            { courses_dept: 'epse', courses_avg: 98.45 },
                            { courses_dept: 'epse', courses_avg: 98.45 },
                            { courses_dept: 'nurs', courses_avg: 98.5 },
                            { courses_dept: 'nurs', courses_avg: 98.5 },
                            { courses_dept: 'epse', courses_avg: 98.58 },
                            { courses_dept: 'nurs', courses_avg: 98.58 },
                            { courses_dept: 'nurs', courses_avg: 98.58 },
                            { courses_dept: 'epse', courses_avg: 98.58 },
                            { courses_dept: 'epse', courses_avg: 98.7 },
                            { courses_dept: 'nurs', courses_avg: 98.71 },
                            { courses_dept: 'nurs', courses_avg: 98.71 },
                            { courses_dept: 'eece', courses_avg: 98.75 },
                            { courses_dept: 'eece', courses_avg: 98.75 },
                            { courses_dept: 'epse', courses_avg: 98.76 },
                            { courses_dept: 'epse', courses_avg: 98.76 },
                            { courses_dept: 'epse', courses_avg: 98.8 },
                            { courses_dept: 'spph', courses_avg: 98.98 },
                            { courses_dept: 'spph', courses_avg: 98.98 },
                            { courses_dept: 'cnps', courses_avg: 99.19 },
                            { courses_dept: 'math', courses_avg: 99.78 },
                            { courses_dept: 'math', courses_avg: 99.78 } ] })

            })
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });


    it("test of a simple case form disk", function () {
        insight = new Insight();
        let s = insight.courseInformation.length;

        Log.test(s.toString());
        return insight.performQuery(testQuery_simple)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal({ render: 'TABLE',
                    result:
                        [ { courses_dept: 'epse', courses_avg: 97.09 },
                            { courses_dept: 'math', courses_avg: 97.09 },
                            { courses_dept: 'math', courses_avg: 97.09 },
                            { courses_dept: 'epse', courses_avg: 97.09 },
                            { courses_dept: 'math', courses_avg: 97.25 },
                            { courses_dept: 'math', courses_avg: 97.25 },
                            { courses_dept: 'epse', courses_avg: 97.29 },
                            { courses_dept: 'epse', courses_avg: 97.29 },
                            { courses_dept: 'nurs', courses_avg: 97.33 },
                            { courses_dept: 'nurs', courses_avg: 97.33 },
                            { courses_dept: 'epse', courses_avg: 97.41 },
                            { courses_dept: 'epse', courses_avg: 97.41 },
                            { courses_dept: 'cnps', courses_avg: 97.47 },
                            { courses_dept: 'cnps', courses_avg: 97.47 },
                            { courses_dept: 'math', courses_avg: 97.48 },
                            { courses_dept: 'math', courses_avg: 97.48 },
                            { courses_dept: 'educ', courses_avg: 97.5 },
                            { courses_dept: 'nurs', courses_avg: 97.53 },
                            { courses_dept: 'nurs', courses_avg: 97.53 },
                            { courses_dept: 'epse', courses_avg: 97.67 },
                            { courses_dept: 'epse', courses_avg: 97.69 },
                            { courses_dept: 'epse', courses_avg: 97.78 },
                            { courses_dept: 'crwr', courses_avg: 98 },
                            { courses_dept: 'crwr', courses_avg: 98 },
                            { courses_dept: 'epse', courses_avg: 98.08 },
                            { courses_dept: 'nurs', courses_avg: 98.21 },
                            { courses_dept: 'nurs', courses_avg: 98.21 },
                            { courses_dept: 'epse', courses_avg: 98.36 },
                            { courses_dept: 'epse', courses_avg: 98.45 },
                            { courses_dept: 'epse', courses_avg: 98.45 },
                            { courses_dept: 'nurs', courses_avg: 98.5 },
                            { courses_dept: 'nurs', courses_avg: 98.5 },
                            { courses_dept: 'epse', courses_avg: 98.58 },
                            { courses_dept: 'nurs', courses_avg: 98.58 },
                            { courses_dept: 'nurs', courses_avg: 98.58 },
                            { courses_dept: 'epse', courses_avg: 98.58 },
                            { courses_dept: 'epse', courses_avg: 98.7 },
                            { courses_dept: 'nurs', courses_avg: 98.71 },
                            { courses_dept: 'nurs', courses_avg: 98.71 },
                            { courses_dept: 'eece', courses_avg: 98.75 },
                            { courses_dept: 'eece', courses_avg: 98.75 },
                            { courses_dept: 'epse', courses_avg: 98.76 },
                            { courses_dept: 'epse', courses_avg: 98.76 },
                            { courses_dept: 'epse', courses_avg: 98.8 },
                            { courses_dept: 'spph', courses_avg: 98.98 },
                            { courses_dept: 'spph', courses_avg: 98.98 },
                            { courses_dept: 'cnps', courses_avg: 99.19 },
                            { courses_dept: 'math', courses_avg: 99.78 },
                            { courses_dept: 'math', courses_avg: 99.78 } ] })

            })
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });


    let testQuery_complex = {
        "WHERE":{
            "OR":[
                {
                    "AND":[
                        {
                            "GT":{
                                "courses_avg":90
                            }
                        },
                        {
                            "IS":{
                                "courses_dept":"adhe"
                            }
                        }
                    ]
                },
                {
                    "EQ":{
                        "courses_avg":95
                    }
                }
            ]
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_id",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        }
    };
    it("test of a complex case", function () {
        return insight.performQuery(testQuery_complex)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal({ render: 'TABLE',
                    result:
                        [ { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.02 },
                            { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.16 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.17 },
                            { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.18 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.5 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.72 },
                            { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.82 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.85 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.29 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.48 },
                            { courses_dept: 'adhe', courses_id: '329', courses_avg: 92.54 },
                            { courses_dept: 'adhe', courses_id: '329', courses_avg: 93.33 },
                            { courses_dept: 'rhsc', courses_id: '501', courses_avg: 95 },
                            { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
                            { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
                            { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
                            { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
                            { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
                            { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'sowk', courses_id: '570', courses_avg: 95 },
                            { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
                            { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
                            { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
                            { courses_dept: 'epse', courses_id: '606', courses_avg: 95 },
                            { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
                            { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
                            { courses_dept: 'kin', courses_id: '499', courses_avg: 95 },
                            { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
                            { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
                            { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
                            { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
                            { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
                            { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
                            { courses_dept: 'mtrl', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
                            { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
                            { courses_dept: 'obst', courses_id: '549', courses_avg: 95 },
                            { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
                            { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
                            { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
                            { courses_dept: 'adhe', courses_id: '329', courses_avg: 96.11 } ] })})
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });

    let testQuery_complex_doubleNegation = {
        "WHERE":{
            "NOT": {
                "NOT": {
                    "OR": [
                        {
                            "AND": [
                                {
                                    "GT": {
                                        "courses_avg": 90
                                    }
                                },
                                {
                                    "IS": {
                                        "courses_dept": "adhe"
                                    }
                                }
                            ]
                        },
                        {
                            "EQ": {
                                "courses_avg": 95
                            }
                        }
                    ]
                }
            }
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_id",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        }
    };
    it("test of a complex case_doubleNegation", function () {
        return insight.performQuery(testQuery_complex_doubleNegation)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal({ render: 'TABLE',
                    result:
                        [ { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.02 },
                            { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.16 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.17 },
                            { courses_dept: 'adhe', courses_id: '412', courses_avg: 90.18 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.5 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.72 },
                            { courses_dept: 'adhe', courses_id: '329', courses_avg: 90.82 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 90.85 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.29 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.33 },
                            { courses_dept: 'adhe', courses_id: '330', courses_avg: 91.48 },
                            { courses_dept: 'adhe', courses_id: '329', courses_avg: 92.54 },
                            { courses_dept: 'adhe', courses_id: '329', courses_avg: 93.33 },
                            { courses_dept: 'rhsc', courses_id: '501', courses_avg: 95 },
                            { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
                            { courses_dept: 'bmeg', courses_id: '597', courses_avg: 95 },
                            { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
                            { courses_dept: 'cnps', courses_id: '535', courses_avg: 95 },
                            { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
                            { courses_dept: 'cpsc', courses_id: '589', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'crwr', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'sowk', courses_id: '570', courses_avg: 95 },
                            { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
                            { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
                            { courses_dept: 'edcp', courses_id: '473', courses_avg: 95 },
                            { courses_dept: 'epse', courses_id: '606', courses_avg: 95 },
                            { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
                            { courses_dept: 'epse', courses_id: '682', courses_avg: 95 },
                            { courses_dept: 'kin', courses_id: '499', courses_avg: 95 },
                            { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
                            { courses_dept: 'kin', courses_id: '500', courses_avg: 95 },
                            { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
                            { courses_dept: 'math', courses_id: '532', courses_avg: 95 },
                            { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
                            { courses_dept: 'mtrl', courses_id: '564', courses_avg: 95 },
                            { courses_dept: 'mtrl', courses_id: '599', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'musc', courses_id: '553', courses_avg: 95 },
                            { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
                            { courses_dept: 'nurs', courses_id: '424', courses_avg: 95 },
                            { courses_dept: 'obst', courses_id: '549', courses_avg: 95 },
                            { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
                            { courses_dept: 'psyc', courses_id: '501', courses_avg: 95 },
                            { courses_dept: 'econ', courses_id: '516', courses_avg: 95 },
                            { courses_dept: 'adhe', courses_id: '329', courses_avg: 96.11 } ] })})
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });


    let testQuery_instructor_name = {
        "WHERE":{
            "IS":{
                "courses_instructor":"brew, nancy"
            }
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_id",
                "courses_instructor",
                "courses_avg"
            ],
            "ORDER":"courses_instructor",
            "FORM":"TABLE"
        }
    };
    it("test using instructor names", function () {
        return insight.performQuery(testQuery_instructor_name)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal(
                    {
                            "render": "TABLE",
                            "result": [
                                {
                                    "courses_avg": 98.71,
                                    "courses_instructor": "brew, nancy",
                                    "courses_id": "509",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 95.43,
                                    "courses_instructor": "brew, nancy",
                                    "courses_id": "509",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 89.43,
                                    "courses_instructor": "brew, nancy",
                                    "courses_id": "570",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 88.57,
                                    "courses_instructor": "brew, nancy",
                                    "courses_id": "570",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 94.47,
                                    "courses_instructor": "brew, nancy",
                                    "courses_id": "591",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 91.5,
                                    "courses_instructor": "brew, nancy",
                                    "courses_id": "591",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 97.33,
                                    "courses_instructor": "brew, nancy",
                                    "courses_id": "591",
                                    "courses_dept": "nurs"
                                }
                            ]

                    }
                            )})
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });


    let testQuery_auditor = {
        "WHERE":{
            "GT":{
                "courses_audit":20
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
    it("test using auditor", function () {
        return insight.performQuery(testQuery_auditor)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons).to.deep.equal(
                    {
                        "code": 200,
                        "body": {
                            "render": "TABLE",
                            "result": [
                                {
                                    "courses_avg": 86.89,
                                    "courses_dept": "rhsc"
                                },
                                {
                                    "courses_avg": 88.79,
                                    "courses_dept": "rhsc"
                                },
                                {
                                    "courses_avg": 90.53,
                                    "courses_dept": "cpsc"
                                }
                            ]
                        }
                    }
                )})
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });


    let testQuery_title = {
        "WHERE":{

            "AND":[
                {"IS":{"courses_title":"curric issu"}},
                {"GT":{"courses_avg":95}}
            ]
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_title",
                "courses_avg"
            ],
            "ORDER":"courses_avg",
            "FORM":"TABLE"
        }
    };

    it("test using title", function () {
        return insight.performQuery(testQuery_title)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons).to.deep.equal(
                    {
                        "code": 200,
                        "body": {
                            "render": "TABLE",
                            "result": [
                                {
                                    "courses_avg": 95.33,
                                    "courses_title": "curric issu"
                                },
                                {
                                    "courses_avg": 95.63,
                                    "courses_title": "curric issu"
                                }
                            ]
                        }
                    }
                )})
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });

    let testQuery_partial_str={
        "WHERE":{
            "OR":[
                {
                    "AND":[
                        {
                            "GT":{
                                "courses_avg":90
                            }
                        },
                        {
                            "IS":{
                                "courses_dept":"math"
                            }
                        },
                        {
                            "IS":{
                                "courses_id":"4*"
                            }
                        }
                    ]
                },
                {
                    "GT":{
                        "courses_avg":98
                    }
                }
            ]
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_id",
                "courses_avg"
            ],
            "ORDER":"courses_id",
            "FORM":"TABLE"
        }
    }
    it("test using partial str", function () {
        return insight.performQuery(testQuery_partial_str)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons).to.deep.equal(
                    {
                        "code": 200,
                        "body": {
                            "render": "TABLE",
                            "result": [
                                {
                                    "courses_avg": 98.98,
                                    "courses_id": "300",
                                    "courses_dept": "spph"
                                },
                                {
                                    "courses_avg": 98.98,
                                    "courses_id": "300",
                                    "courses_dept": "spph"
                                },
                                {
                                    "courses_avg": 90.57,
                                    "courses_id": "420",
                                    "courses_dept": "math"
                                },
                                {
                                    "courses_avg": 90.57,
                                    "courses_id": "420",
                                    "courses_dept": "math"
                                },
                                {
                                    "courses_avg": 98.08,
                                    "courses_id": "421",
                                    "courses_dept": "epse"
                                },
                                {
                                    "courses_avg": 98.7,
                                    "courses_id": "421",
                                    "courses_dept": "epse"
                                },
                                {
                                    "courses_avg": 98.36,
                                    "courses_id": "421",
                                    "courses_dept": "epse"
                                },
                                {
                                    "courses_avg": 91.38,
                                    "courses_id": "421",
                                    "courses_dept": "math"
                                },
                                {
                                    "courses_avg": 91.38,
                                    "courses_id": "421",
                                    "courses_dept": "math"
                                },
                                {
                                    "courses_avg": 91.33,
                                    "courses_id": "425",
                                    "courses_dept": "math"
                                },
                                {
                                    "courses_avg": 90.29,
                                    "courses_id": "425",
                                    "courses_dept": "math"
                                },
                                {
                                    "courses_avg": 90.29,
                                    "courses_id": "425",
                                    "courses_dept": "math"
                                },
                                {
                                    "courses_avg": 91.33,
                                    "courses_id": "425",
                                    "courses_dept": "math"
                                },
                                {
                                    "courses_avg": 90.43,
                                    "courses_id": "440",
                                    "courses_dept": "math"
                                },
                                {
                                    "courses_avg": 90.43,
                                    "courses_id": "440",
                                    "courses_dept": "math"
                                },
                                {
                                    "courses_avg": 98.8,
                                    "courses_id": "449",
                                    "courses_dept": "epse"
                                },
                                {
                                    "courses_avg": 98.76,
                                    "courses_id": "449",
                                    "courses_dept": "epse"
                                },
                                {
                                    "courses_avg": 98.58,
                                    "courses_id": "449",
                                    "courses_dept": "epse"
                                },
                                {
                                    "courses_avg": 98.58,
                                    "courses_id": "449",
                                    "courses_dept": "epse"
                                },
                                {
                                    "courses_avg": 98.76,
                                    "courses_id": "449",
                                    "courses_dept": "epse"
                                },
                                {
                                    "courses_avg": 98.21,
                                    "courses_id": "509",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 98.21,
                                    "courses_id": "509",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 98.71,
                                    "courses_id": "509",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 98.71,
                                    "courses_id": "509",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 98.45,
                                    "courses_id": "519",
                                    "courses_dept": "epse"
                                },
                                {
                                    "courses_avg": 98.45,
                                    "courses_id": "519",
                                    "courses_dept": "epse"
                                },
                                {
                                    "courses_avg": 99.78,
                                    "courses_id": "527",
                                    "courses_dept": "math"
                                },
                                {
                                    "courses_avg": 99.78,
                                    "courses_id": "527",
                                    "courses_dept": "math"
                                },
                                {
                                    "courses_avg": 98.75,
                                    "courses_id": "541",
                                    "courses_dept": "eece"
                                },
                                {
                                    "courses_avg": 98.75,
                                    "courses_id": "541",
                                    "courses_dept": "eece"
                                },
                                {
                                    "courses_avg": 99.19,
                                    "courses_id": "574",
                                    "courses_dept": "cnps"
                                },
                                {
                                    "courses_avg": 98.5,
                                    "courses_id": "578",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 98.5,
                                    "courses_id": "578",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 98.58,
                                    "courses_id": "578",
                                    "courses_dept": "nurs"
                                },
                                {
                                    "courses_avg": 98.58,
                                    "courses_id": "578",
                                    "courses_dept": "nurs"
                                }
                            ]
                        }
                    }
                )})
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });


    let testQuery_parial_inOneDept ={
        "WHERE":{
            "AND":[
                {"IS":{
                    "courses_dept":"*psc"
                }},
                {"IS":{
                    "courses_instructor":"woodham*"
                }}
            ]
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_instructor"
            ],
            "ORDER":"courses_instructor",
            "FORM":"TABLE"
        }
    };
    it("test using partial str with and str", function () {
        return insight.performQuery(testQuery_parial_inOneDept)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons).to.deep.equal(
                    {
                        "code": 200,
                        "body": {
                            "render": "TABLE",
                            "result": [
                                {
                                    "courses_instructor": "woodham, robert",
                                    "courses_dept": "cpsc"
                                },
                                {
                                    "courses_instructor": "woodham, robert",
                                    "courses_dept": "cpsc"
                                },
                                {
                                    "courses_instructor": "woodham, robert",
                                    "courses_dept": "cpsc"
                                },
                                {
                                    "courses_instructor": "woodham, robert",
                                    "courses_dept": "cpsc"
                                },
                                {
                                    "courses_instructor": "woodham, robert",
                                    "courses_dept": "cpsc"
                                },
                                {
                                    "courses_instructor": "woodham, robert",
                                    "courses_dept": "cpsc"
                                }
                            ]
                        }
                    }
                )})
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });

    let testQuery_course_year = {
        "WHERE":{
            "AND":[
                {"IS":{
                    "courses_dept":"*psc"
                }},
                {"IS":{
                    "courses_instructor":"woodham*"
                }}
            ]
        },
        "OPTIONS":{
            "COLUMNS":[
                "courses_dept",
                "courses_instructor",
                "courses_year"
            ],
            "ORDER":"courses_instructor",
            "FORM":"TABLE"
        }
    }
    it("test using course year", function () {
        return insight.performQuery(testQuery_course_year)
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons).to.deep.equal(
                    {
                        "code": 200,
                        "body": {
                            "render": "TABLE",
                            "result": [
                                {
                                    "courses_instructor": "woodham, robert",
                                    "courses_dept": "cpsc",
                                    "courses_year": 2009
                                },
                                {
                                    "courses_instructor": "woodham, robert",
                                    "courses_dept": "cpsc",
                                    "courses_year": 2014
                                },
                                {
                                    "courses_instructor": "woodham, robert",
                                    "courses_dept": "cpsc",
                                    "courses_year": 2011
                                },
                                {
                                    "courses_instructor": "woodham, robert",
                                    "courses_dept": "cpsc",
                                    "courses_year": 2010
                                },
                                {
                                    "courses_instructor": "woodham, robert",
                                    "courses_dept": "cpsc",
                                    "courses_year": 2012
                                },
                                {
                                    "courses_instructor": "woodham, robert",
                                    "courses_dept": "cpsc",
                                    "courses_year": 2007
                                }
                            ]
                        }
                    }
                )})
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });


    it("test the new order format", function () {
        return insight.performQuery(
            {
                "WHERE":{
                    "GT":{
                        "courses_avg":97
                    }
                },
                "OPTIONS":{
                    "COLUMNS":[
                        "courses_avg",
                        "courses_dept"

                    ],
                    "ORDER": {
                        "dir": "DOWN",
                        "keys": ["courses_dept","courses_avg"]
                    },
                    "FORM":"TABLE"
                }
            }
        )
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons).to.deep.equal(
                    {
                        "code": 200,
                        "body": {
                            "render": "TABLE",
                            "result": [
                                {
                                    "courses_dept": "spph",
                                    "courses_avg": 98.98
                                },
                                {
                                    "courses_dept": "spph",
                                    "courses_avg": 98.98
                                },
                                {
                                    "courses_dept": "nurs",
                                    "courses_avg": 98.71
                                },
                                {
                                    "courses_dept": "nurs",
                                    "courses_avg": 98.71
                                },
                                {
                                    "courses_dept": "nurs",
                                    "courses_avg": 98.58
                                },
                                {
                                    "courses_dept": "nurs",
                                    "courses_avg": 98.58
                                },
                                {
                                    "courses_dept": "nurs",
                                    "courses_avg": 98.5
                                },
                                {
                                    "courses_dept": "nurs",
                                    "courses_avg": 98.5
                                },
                                {
                                    "courses_dept": "nurs",
                                    "courses_avg": 98.21
                                },
                                {
                                    "courses_dept": "nurs",
                                    "courses_avg": 98.21
                                },
                                {
                                    "courses_dept": "nurs",
                                    "courses_avg": 97.53
                                },
                                {
                                    "courses_dept": "nurs",
                                    "courses_avg": 97.53
                                },
                                {
                                    "courses_dept": "nurs",
                                    "courses_avg": 97.33
                                },
                                {
                                    "courses_dept": "nurs",
                                    "courses_avg": 97.33
                                },
                                {
                                    "courses_dept": "math",
                                    "courses_avg": 99.78
                                },
                                {
                                    "courses_dept": "math",
                                    "courses_avg": 99.78
                                },
                                {
                                    "courses_dept": "math",
                                    "courses_avg": 97.48
                                },
                                {
                                    "courses_dept": "math",
                                    "courses_avg": 97.48
                                },
                                {
                                    "courses_dept": "math",
                                    "courses_avg": 97.25
                                },
                                {
                                    "courses_dept": "math",
                                    "courses_avg": 97.25
                                },
                                {
                                    "courses_dept": "math",
                                    "courses_avg": 97.09
                                },
                                {
                                    "courses_dept": "math",
                                    "courses_avg": 97.09
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 98.8
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 98.76
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 98.76
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 98.7
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 98.58
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 98.58
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 98.45
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 98.45
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 98.36
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 98.08
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 97.78
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 97.69
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 97.67
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 97.41
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 97.41
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 97.29
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 97.29
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 97.09
                                },
                                {
                                    "courses_dept": "epse",
                                    "courses_avg": 97.09
                                },
                                {
                                    "courses_dept": "eece",
                                    "courses_avg": 98.75
                                },
                                {
                                    "courses_dept": "eece",
                                    "courses_avg": 98.75
                                },
                                {
                                    "courses_dept": "educ",
                                    "courses_avg": 97.5
                                },
                                {
                                    "courses_dept": "crwr",
                                    "courses_avg": 98
                                },
                                {
                                    "courses_dept": "crwr",
                                    "courses_avg": 98
                                },
                                {
                                    "courses_dept": "cnps",
                                    "courses_avg": 99.19
                                },
                                {
                                    "courses_dept": "cnps",
                                    "courses_avg": 97.47
                                },
                                {
                                    "courses_dept": "cnps",
                                    "courses_avg": 97.47
                                }
                            ]
                        }
                    }
                )})
            .catch( (err:InsightResponse)=>{
                if(err.constructor == AssertionError){
                    throw err;
                }else {
                    Log.test('Error: query request not success ');
                    expect.fail();
                }
            })
    });

    it.skip("test group", function () {
        return insight.performQuery(
            {
                "WHERE": {},
                "OPTIONS": {
                    "COLUMNS": [
                        "courses_dept"
                    ],
                    "ORDER": "courses_dept",
                    "FORM": "TABLE"
                },
                "TRANSFORMATIONS": {
                    "GROUP": ["courses_dept"],
                    "APPLY": []
                }
            }
        )
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons).to.deep.equal(
                    {
                        "code": 200,
                        "body": {"render":"TABLE","result":[{"courses_dept":"aanb"},{"courses_dept":"adhe"},{"courses_dept":"anat"},{"courses_dept":"anth"},{"courses_dept":"apbi"},{"courses_dept":"appp"},{"courses_dept":"apsc"},{"courses_dept":"arbc"},{"courses_dept":"arch"},{"courses_dept":"arcl"},{"courses_dept":"arst"},{"courses_dept":"arth"},{"courses_dept":"asia"},{"courses_dept":"asic"},{"courses_dept":"astr"},{"courses_dept":"astu"},{"courses_dept":"atsc"},{"courses_dept":"audi"},{"courses_dept":"ba"},{"courses_dept":"baac"},{"courses_dept":"babs"},{"courses_dept":"baen"},{"courses_dept":"bafi"},{"courses_dept":"bahr"},{"courses_dept":"bait"},{"courses_dept":"bala"},{"courses_dept":"bama"},{"courses_dept":"bams"},{"courses_dept":"bapa"},{"courses_dept":"basc"},{"courses_dept":"basm"},{"courses_dept":"baul"},{"courses_dept":"bioc"},{"courses_dept":"biof"},{"courses_dept":"biol"},{"courses_dept":"bmeg"},{"courses_dept":"bota"},{"courses_dept":"busi"},{"courses_dept":"caps"},{"courses_dept":"ccst"},{"courses_dept":"ceen"},{"courses_dept":"cell"},{"courses_dept":"cens"},{"courses_dept":"chbe"},{"courses_dept":"chem"},{"courses_dept":"chil"},{"courses_dept":"chin"},{"courses_dept":"cics"},{"courses_dept":"civl"},{"courses_dept":"clch"},{"courses_dept":"clst"},{"courses_dept":"cnps"},{"courses_dept":"cnrs"},{"courses_dept":"cnto"},{"courses_dept":"coec"},{"courses_dept":"cogs"},{"courses_dept":"cohr"},{"courses_dept":"comm"},{"courses_dept":"cons"},{"courses_dept":"cpen"},{"courses_dept":"cpsc"},{"courses_dept":"crwr"},{"courses_dept":"dani"},{"courses_dept":"dent"},{"courses_dept":"dhyg"},{"courses_dept":"eced"},{"courses_dept":"econ"},{"courses_dept":"edcp"},{"courses_dept":"edst"},{"courses_dept":"educ"},{"courses_dept":"eece"},{"courses_dept":"elec"},{"courses_dept":"ends"},{"courses_dept":"engl"},{"courses_dept":"enph"},{"courses_dept":"envr"},{"courses_dept":"eosc"},{"courses_dept":"epse"},{"courses_dept":"etec"},{"courses_dept":"fhis"},{"courses_dept":"fipr"},{"courses_dept":"fish"},{"courses_dept":"fist"},{"courses_dept":"fmst"},{"courses_dept":"fnel"},{"courses_dept":"fnh"},{"courses_dept":"fnis"},{"courses_dept":"food"},{"courses_dept":"fopr"},{"courses_dept":"fre"},{"courses_dept":"fren"},{"courses_dept":"frst"},{"courses_dept":"gbpr"},{"courses_dept":"geob"},{"courses_dept":"geog"},{"courses_dept":"germ"},{"courses_dept":"gpp"},{"courses_dept":"grek"},{"courses_dept":"grsj"},{"courses_dept":"gsat"},{"courses_dept":"hebr"},{"courses_dept":"hgse"},{"courses_dept":"hinu"},{"courses_dept":"hist"},{"courses_dept":"hunu"},{"courses_dept":"iar"},{"courses_dept":"igen"},{"courses_dept":"info"},{"courses_dept":"isci"},{"courses_dept":"ital"},{"courses_dept":"itst"},{"courses_dept":"iwme"},{"courses_dept":"japn"},{"courses_dept":"jrnl"},{"courses_dept":"kin"},{"courses_dept":"korn"},{"courses_dept":"lais"},{"courses_dept":"larc"},{"courses_dept":"laso"},{"courses_dept":"last"},{"courses_dept":"latn"},{"courses_dept":"law"},{"courses_dept":"lfs"},{"courses_dept":"libe"},{"courses_dept":"libr"},{"courses_dept":"ling"},{"courses_dept":"lled"},{"courses_dept":"math"},{"courses_dept":"mdvl"},{"courses_dept":"mech"},{"courses_dept":"medg"},{"courses_dept":"medi"},{"courses_dept":"micb"},{"courses_dept":"midw"},{"courses_dept":"mine"},{"courses_dept":"mrne"},{"courses_dept":"mtrl"},{"courses_dept":"musc"},{"courses_dept":"name"},{"courses_dept":"nest"},{"courses_dept":"nrsc"},{"courses_dept":"nurs"},{"courses_dept":"obst"},{"courses_dept":"onco"},{"courses_dept":"path"},{"courses_dept":"pcth"},{"courses_dept":"pers"},{"courses_dept":"phar"},{"courses_dept":"phil"},{"courses_dept":"phrm"},{"courses_dept":"phth"},{"courses_dept":"phys"},{"courses_dept":"plan"},{"courses_dept":"poli"},{"courses_dept":"pols"},{"courses_dept":"port"},{"courses_dept":"psyc"},{"courses_dept":"punj"},{"courses_dept":"relg"},{"courses_dept":"rgla"},{"courses_dept":"rhsc"},{"courses_dept":"rmes"},{"courses_dept":"rmst"},{"courses_dept":"rsot"},{"courses_dept":"russ"},{"courses_dept":"sans"},{"courses_dept":"scan"},{"courses_dept":"scie"},{"courses_dept":"soci"},{"courses_dept":"soil"},{"courses_dept":"sowk"},{"courses_dept":"span"},{"courses_dept":"spha"},{"courses_dept":"spph"},{"courses_dept":"stat"},{"courses_dept":"sts"},{"courses_dept":"surg"},{"courses_dept":"swed"},{"courses_dept":"test"},{"courses_dept":"thtr"},{"courses_dept":"udes"},{"courses_dept":"ufor"},{"courses_dept":"urst"},{"courses_dept":"ursy"},{"courses_dept":"vant"},{"courses_dept":"visa"},{"courses_dept":"wood"},{"courses_dept":"wrds"},{"courses_dept":"zool"}]}
                    }
                )})
            .catch( (err:InsightResponse)=>{
                if(err.constructor.name == "AssertionError"){
                    throw err;
                }else {
                    Log.test('Error: query request not success ');
                    expect.fail();
                }
            })
    });

});