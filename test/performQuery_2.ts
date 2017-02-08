/**
 * Created by cq2essz on 2017/1/26.
 */
import Insight from "../src/controller/InsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";

var fs = require('fs');
describe("performQuery_2", function () {

    let insight:Insight = null
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


    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        insight = new Insight();

        let courseContent = new Buffer(fs.readFileSync('./courses.zip')).toString('base64');
        return insight.addDataset('courses',courseContent)

    });


    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
        insight = null;
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
});