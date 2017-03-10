/**
 * Created by WilliamLiu1124 on 2017-03-09.
 */

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
        fs.mkdir(path);
    }
};


describe("performQuery_rooms_d3", function () {
    let insight:Insight = null;
    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }




    before(function () {
        Log.test('test Query for rooms');
        //deleteFolderRecursive("./data");
        insight = new Insight();
        // make sure the cache file is there
        let content = new Buffer(fs.readFileSync('./rooms.zip')).toString('base64');
        return insight.addDataset('rooms',content)

    })


    after(function () {
        Log.test('end test Query for rooms ');
        //deleteFolderRecursive("./data");
        try {
            fs.unlinkSync('./data/rooms.json');
        } catch (err) {

        }
    })


    it("test of a simple case A", function () {
        return insight.performQuery({
            "WHERE": {
                "AND": [{
                    "IS": {
                        "rooms_furniture": "*Tables*"
                    }
                }, {
                    "GT": {
                        "rooms_seats": 300
                    }
                }]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_shortname",
                    "maxSeats"
                ],
                "ORDER": {
                    "dir": "DOWN",
                    "keys": ["maxSeats"]
                },
                "FORM": "TABLE"
            },
            "TRANSFORMATIONS": {
                "GROUP": ["rooms_shortname"],
                "APPLY": [{
                    "maxSeats": {
                        "MAX": "rooms_seats"
                    }
                }]
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal({
                    "render": "TABLE",
                    "result": [{
                        "rooms_shortname": "OSBO",
                        "maxSeats": 442
                    }, {
                        "rooms_shortname": "HEBB",
                        "maxSeats": 375
                    }, {
                        "rooms_shortname": "LSC",
                        "maxSeats": 350
                    }]
                })

            })
            .catch( (err:InsightResponse)=>{
                Log.test('Error: query request not success ');
                expect.fail();
            })
    });

    it("test of a simple case b", function () {
        return insight.performQuery({
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
                "APPLY": []
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal({
                    "render": "TABLE",
                    "result": [{
                        "rooms_furniture": "Classroom-Fixed Tables/Fixed Chairs"
                    }, {
                        "rooms_furniture": "Classroom-Fixed Tables/Movable Chairs"
                    }, {
                        "rooms_furniture": "Classroom-Fixed Tables/Moveable Chairs"
                    }, {
                        "rooms_furniture": "Classroom-Fixed Tablets"
                    }, {
                        "rooms_furniture": "Classroom-Hybrid Furniture"
                    }, {
                        "rooms_furniture": "Classroom-Learn Lab"
                    }, {
                        "rooms_furniture": "Classroom-Movable Tables & Chairs"
                    }, {
                        "rooms_furniture": "Classroom-Movable Tablets"
                    }, {
                        "rooms_furniture": "Classroom-Moveable Tables & Chairs"
                    }, {
                        "rooms_furniture": "Classroom-Moveable Tablets"
                    }]
                })

            })
            .catch( (err:InsightResponse)=>{
                Log.test(err.toString());
                expect.fail();
            })
    });

    it("test of only grouping", function () {
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
/*
    it("test of min", function () {
        return insight.performQuery({
            "WHERE": {
                "AND": [{
                    "IS": {
                        "rooms_furniture": "*Tables*"
                    }
                }, {
                    "GT": {
                        "rooms_seats": 150
                    }
                }, {
                    "LT":{
                        "rooms_seats":200
                    }
                }]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_shortname",
                    "minSeats"
                ],
                "ORDER": {
                    "dir": "DOWN",
                    "keys": ["minSeats"]
                },
                "FORM": "TABLE"
            },
            "TRANSFORMATIONS": {
                "GROUP": ["rooms_shortname"],
                "APPLY": [{
                    "minSeats": {
                        "MIN": "rooms_seats"
                    }
                }]
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                expect(respons.body).to.deep.equal({
                    "render": "TABLE",
                    "result": [
                        {
                            "rooms_shortname": "SWNG",
                            "minSeats": 187
                        }, {
                            "rooms_shortname": "LSK",
                            "minSeats": 183
                        }, {
                            "rooms_shortname": "PHRM",
                            "minSeats": 167
                        }, {
                            "rooms_shortname": "FRDM",
                            "minSeats": 160
                        }, {
                            "rooms_shortname": "DMP",
                            "minSeats": 160
                        }, {
                            "rooms_shortname": "IBLC",
                            "minSeats": 154
                        }]
                })

            })
            .catch( (err:InsightResponse)=>{
                if(err.constructor.name == "AssertionError"){
                    throw err;
                }else {
                    Log.test(err.toString());
                    expect.fail();
                }
            })
    });

    it("test of avg", function () {
        return insight.performQuery({
            "WHERE": {
                "AND": [{
                    "IS": {
                        "rooms_furniture": "*Tables*"
                    }
                }, {
                    "GT": {
                        "rooms_seats": 150
                    }
                }, {
                    "LT":{
                        "rooms_seats":200
                    }
                }]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_shortname",
                    "avgSeats"
                ],
                "ORDER": {
                    "dir": "DOWN",
                    "keys": ["avgSeats"]
                },
                "FORM": "TABLE"
            },
            "TRANSFORMATIONS": {
                "GROUP": ["rooms_shortname"],
                "APPLY": [{
                    "avgSeats": {
                        "AVG": "rooms_seats"
                    }
                }]
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                console.log(respons.body);
                expect(respons.body).to.deep.equal({
                    "render": "TABLE",
                    "result": [
                        {
                            "rooms_shortname": "SWNG",
                            "avgSeats": 188.75
                        }, {
                            "rooms_shortname": "LSK",
                            "avgSeats": 183
                        }, {
                            "rooms_shortname": "PHRM",
                            "avgSeats": 167
                        }, {
                            "rooms_shortname": "FRDM",
                            "avgSeats": 160
                        }, {
                            "rooms_shortname": "DMP",
                            "avgSeats": 160
                        }, {
                            "rooms_shortname": "IBLC",
                            "avgSeats": 154
                        }                       ]
                })

            })
            .catch( (err:InsightResponse)=>{
                if(err.constructor.name == "AssertionError"){
                    throw err;
                }else {
                    Log.test(err.toString());
                    expect.fail();
                }
            })
    });

    it("test of sum", function () {
        return insight.performQuery({
            "WHERE": {
                "AND": [{
                    "IS": {
                        "rooms_furniture": "*Tables*"
                    }
                }, {
                    "GT": {
                        "rooms_seats": 150
                    }
                }, {
                    "LT":{
                        "rooms_seats":200
                    }
                }]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_shortname",
                    "sumSeats"
                ],
                "ORDER": {
                    "dir": "DOWN",
                    "keys": ["sumSeats"]
                },
                "FORM": "TABLE"
            },
            "TRANSFORMATIONS": {
                "GROUP": ["rooms_shortname"],
                "APPLY": [{
                    "sumSeats": {
                        "SUM": "rooms_seats"
                    }
                }]
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                console.log(respons.body);
                expect(respons.body).to.deep.equal({
                    "render": "TABLE",
                    "result": [
                        {
                            "rooms_shortname": "SWNG",
                            "sumSeats": 755
                        }, {
                            "rooms_shortname": "LSK",
                            "sumSeats": 183
                        }, {
                            "rooms_shortname": "PHRM",
                            "sumSeats": 167
                        }, {
                            "rooms_shortname": "FRDM",
                            "sumSeats": 160
                        }, {
                            "rooms_shortname": "DMP",
                            "sumSeats": 160
                        }, {
                            "rooms_shortname": "IBLC",
                            "sumSeats": 154
                        }                       ]
                })

            })
            .catch( (err:InsightResponse)=>{
                if(err.constructor.name == "AssertionError"){
                    throw err;
                }else {
                    Log.test(err.toString());
                    expect.fail();
                }
            })
    });

    it("test of count", function () {
        return insight.performQuery({
            "WHERE": {
                "AND": [{
                    "IS": {
                        "rooms_furniture": "*Tables*"
                    }
                }, {
                    "GT": {
                        "rooms_seats": 150
                    }
                }, {
                    "LT":{
                        "rooms_seats":200
                    }
                }]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_shortname",
                    "countSeats"
                ],
                "ORDER": {
                    "dir": "DOWN",
                    "keys": ["countSeats"]
                },
                "FORM": "TABLE"
            },
            "TRANSFORMATIONS": {
                "GROUP": ["rooms_shortname"],
                "APPLY": [{
                    "countSeats": {
                        "COUNT": "rooms_seats"
                    }
                }]
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                console.log(respons.body);
                expect(respons.body).to.deep.equal({
                    "render": "TABLE",
                    "result": [
                        {
                            "rooms_shortname": "SWNG",
                            "countSeats": 3
                        }, {
                            "rooms_shortname": "FRDM",
                            "countSeats": 1
                        }, {
                            "rooms_shortname": "DMP",
                            "countSeats": 1
                        }, {
                            "rooms_shortname": "IBLC",
                            "countSeats": 1
                        }, {
                            "rooms_shortname": "LSK",
                            "countSeats": 1
                        }, {
                            "rooms_shortname": "PHRM",
                            "countSeats": 1
                        }                       ]
                })

            })
            .catch( (err:InsightResponse)=>{
                if(err.constructor.name == "AssertionError"){
                    throw err;
                }else {
                    Log.test(err.toString());
                    expect.fail();
                }
            })
    });

    it("test of count and sum", function () {
        return insight.performQuery({
            "WHERE": {
                "AND": [{
                    "IS": {
                        "rooms_furniture": "*Tables*"
                    }
                }, {
                    "GT": {
                        "rooms_seats": 150
                    }
                }, {
                    "LT":{
                        "rooms_seats":200
                    }
                }]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_shortname",
                    "countSeats",
                    "sumSeats"
                ],
                "ORDER": {
                    "dir": "DOWN",
                    "keys": ["countSeats"]
                },
                "FORM": "TABLE"
            },
            "TRANSFORMATIONS": {
                "GROUP": ["rooms_shortname"],
                "APPLY": [{
                    "countSeats": {
                        "COUNT": "rooms_seats"
                    }
                }, {
                    "sumSeats": {
                        "SUM": "rooms_seats"
                    }
                }]
            }
        })
            .then((respons:InsightResponse)=>{
                sanityCheck(respons);
                console.log(respons.body);
                expect(respons.body).to.deep.equal({
                    "render": "TABLE",
                    "result": [
                        {
                            "rooms_shortname": "SWNG",
                            "countSeats": 3,
                            "sumSeats": 755
                        }, {
                            "rooms_shortname": "FRDM",
                            "countSeats": 1,
                            "sumSeats": 160
                        }, {
                            "rooms_shortname": "DMP",
                            "countSeats": 1,
                            "sumSeats": 160
                        }, {
                            "rooms_shortname": "IBLC",
                            "countSeats": 1,
                            "sumSeats": 154
                        }, {
                            "rooms_shortname": "LSK",
                            "countSeats": 1,
                            "sumSeats": 183
                        }, {
                            "rooms_shortname": "PHRM",
                            "countSeats": 1,
                            "sumSeats": 167
                        }                       ]
                })

            })
            .catch( (err:InsightResponse)=>{
                if(err.constructor.name == "AssertionError"){
                    throw err;
                }else {
                    Log.test(err.toString());
                    expect.fail();
                }
            })
    });
*/




});
