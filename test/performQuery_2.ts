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
    }





    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }


    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
        insight = new Insight();

        let courseContent = new Buffer(fs.readFileSync('./courses.zip')).toString('base64');
        return insight.addDataset('courses.zip',courseContent)

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



});
