/**
 * Created by cq2essz on 2017/1/25.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";
import {Section} from "../src/controller/CourseInformation";
import QH from "../src/controller/queryHelper";
import {expect} from 'chai';
import Log from "../src/Util";

describe("QH helper test", function () {

    let testData:Section[] = [
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

    before(function () {
        Log.info("This is the test for QH helpers");
        Log.warn("HI");
        Log.error("error test")
        Log.test('Before: ' + (<any>this).test.parent.title);
    });

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });


    it("test filter out LT case", function () {
       let ret = QH.filterOut_courses(testData,{'LT':{courses_avg:4}})
        expect(ret).to.deep.equal([false,false,true]);
        Log.test("filtered out LT case");
    });

    it("test filter out GT case", function () {
        let ret = QH.filterOut_courses(testData,{'GT':{courses_avg:4}})
        expect(ret).to.deep.equal([true,false,false]);
        Log.test("filtered out LT case");
    });

    it("test filter out EQ case", function () {
        let ret = QH.filterOut_courses(testData,{'EQ':{courses_avg:4}})
        expect(ret).to.deep.equal([false,true,false]);
        Log.test("filtered out LT case");
    });

    it("test filter out IS case", function () {
        let ret = QH.filterOut_courses(testData,{'IS':{courses_dept : "cs"}})
        expect(ret).to.deep.equal([true,true,false]);
        Log.test("filtered out LT case");
    });

    it("test filter out NOT case", function () {
        let ret = QH.filterOut_courses(testData,{'NOT':{'IS':{courses_dept : "cs"}}})
        expect(ret).to.deep.equal([false,false,true]);
        Log.test("filtered out LT case");
    });

    it("test filter out AND case", function () {
        let ret = QH.filterOut_courses(testData,{'AND':[{'IS':{courses_dept : "cs"}},{'NOT':{'IS':{courses_dept : "cs"}}}]})
        expect(ret).to.deep.equal([false,false,false]);
        Log.test("filtered out LT case");
    });

    it("test filter out OR case", function () {
        let ret = QH.filterOut_courses(testData,{'OR':[{'IS':{courses_dept : "cs"}},{'NOT':{'IS':{courses_dept : "cs"}}}]})
        expect(ret).to.deep.equal([true,true,true]);
        Log.test("filtered out LT case");
    });


    it("test filter out double NOT case", function () {
        let ret = QH.filterOut_courses(testData,{'NOT':{'NOT':{'IS':{courses_dept : "cs"}}}})
        expect(ret).to.deep.equal([true,true,false]);
        Log.test("filtered out LT case");
    });


// test invalid filter

    it("test filter with invalid operation", function () {
        try {
            let ret = QH.filterOut_courses(testData, {
                'OHNO': [{'IS': {courses_dept: "cs"}}, {'NOT': {'IS': {courses_dept: "cs"}}}]

            });
            expect.fail();

        }catch (e){
            expect(JSON.parse(e.message)).to.deep.equal({"code":400,"body":{"error":"the filter is not valid,since there is no valid operation"}});
        }

    });




    it("test filter with multiple operations at the same level", function () {
        try {
            let ret = QH.filterOut_courses(testData, {
                'AND': [{'IS': {courses_dept: "cs"}}, {'NOT': {'IS': {courses_dept: "cs"}}}],
                'NOT': {}  // the extra one
            });
            expect.fail();

        }catch (e){
            expect(JSON.parse(e.message)).to.deep.equal({"code":400,"body":{"error":"the filter is not valid,since it has more than 1 comparision at the same time"}});
        }

    });

    it("test simple rex checker1",function () {
        let key = "*A*"
        let str = "asfdasfAsd"
        expect(QH.simple_regx_equal(key,str)).equal(true);
    })

    it("test simple rex checker2",function () {
        let key = "A"
        let str = "asfdasfAsd"
        expect(QH.simple_regx_equal(key,str)).equal(false);
    })

    it("test simple rex checker3",function () {
        let key = "*A"
        let str = "asfdasfA"
        expect(QH.simple_regx_equal(key,str)).equal(true);
    })

    it("test simple rex checker4",function () {
        let key = "A*"
        let str = "asfdasfA"
        expect(QH.simple_regx_equal(key,str)).equal(false);
    })

    it("test simple rex checker4",function () {
        let key = "A*"
        let str = "Aasfdasf"
        expect(QH.simple_regx_equal(key,str)).equal(true);
    })




    it("test invalid operation d3", function () {
         let test_query:any ={
             "WHERE": {},
             "OPTIONS": {
                 "COLUMNS": [
                     "rooms_furniture"
                 ],
                 "ORDER": "rooms_furniture",
                 "FORM": "TABLE"
             },
             "TRANSFORMATIONS": {
                 "GROUP": ["rooms_furniture"],
                 "APPLY": [{
                     "maxSeats": {
                         "MAX": "rooms_seats"
                     }
                 }]
             }
         }
         expect(QH.isValidQuery(test_query).code).equal(400);

    });





});