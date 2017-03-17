var request = require('request');
var expect = require('chai').expect;
var assert = require('chai').assert;
var hostname = process.env.API_URL || 'http://localhost:8080/api';

// this first describe should explain the overall purposes of the tests cases being preformed
describe('Test the memoryGame Endpoint for data post and ensuring corrupt data does not get added', function(){

    //each it should describe the specific purpose of the test
    it("should post new data into Memory Game Endpoint", function(done){
        var date = new Date();
        var postData = {"user":"User_Test","score": 1, "time": date.toISOString()}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: hostname+'/memoryGame'
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(200);
            assert(response.body.message, 'MemoryGame entry created!');
            return done();
        });
     });

    it("should fail to post to memoryGame due to user being a number rather than a String value", function(done){
            var date = new Date();
            var postData = {"user": 1,"score": 1, "time": date.toISOString()}
            var options = {
                method: 'POST',
                body: postData,
                json: true,
                url: hostname+'/memoryGame'
            }
            request(options, function(err, response, body){
                if(err){
                   console.log(err)
                    return
                }
                expect(response).to.exist;
                expect(response.statusCode).to.equal(400);
                assert(response.body.error, 'There are missing or invalid parameters in the request.');
                return done();
            });
    });

    it("should fail to post to memoryGame due to score being a String rather than a number value", function(done){
            var date = new Date();
            var postData = {"user": 'User_Test',"score": "corrupted data", "time": date.toISOString()}
            var options = {
                method: 'POST',
                body: postData,
                json: true,
                url: hostname+'/memoryGame'
            }
            request(options, function(err, response, body){
                if(err){
                    console.log(err)
                    return
                }
                expect(response).to.exist;
                expect(response.statusCode).to.equal(400);
                assert(response.body.error, 'There are missing or invalid parameters in the request.');
                return done();
            });
    });

    it("should fail to post to memoryGame due to date being an incorrectly formatted String", function(done){
                var date = new Date();
                var postData = {"user": 'User_Test',"score": 5, "time": "corrupted data"}
                var options = {
                    method: 'POST',
                    body: postData,
                    json: true,
                    url: hostname+'/memoryGame'
                }
                request(options, function(err, response, body){
                    if(err){
                        console.log(err)
                        return
                    }
                    expect(response).to.exist;
                    expect(response.statusCode).to.equal(400);
                    assert(response.body.error, 'There are missing or invalid parameters in the request.');
                    return done();
                });
        });

    it("should fail to post to memoryGame due to time having a number type instead of a time", function(done){
        var date = new Date();
        var postData = {"user": "USER_TEST","score":1, "time": 1}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: hostname+'/memoryGame'
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
            assert(response.body.error, 'There are missing or invalid parameters in the request.');
            return done();
        });
    });

    it("should fail to post to memoryGame due to missing username", function(done){
        var date = new Date();
        var postData = {"score": 5, "time": date.toISOString()}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: hostname+'/memoryGame'
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
            assert(response.body.error, 'There are missing or invalid parameters in the request.');
            return done();
        });
    });

    it("should fail to post to memoryGame due to missing score value", function(done){
        var date = new Date();
        var postData = {"user": "User_Test", "time": date.toISOString()}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: hostname+'/memoryGame'
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
            assert(response.body.error, 'There are missing or invalid parameters in the request.');
            return done();
        });
    });

    it("should fail to post to memoryGame due to missing time value", function(done){
        var date = new Date();
        var postData = {"user": "User_Test", "score": 1}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: hostname+'/memoryGame'
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
            assert(response.body.error, 'There are missing or invalid parameters in the request.');
            return done();
        });
    });

    it("should fail to post to memoryGame due to missing both user and score values", function(done){
        var date = new Date();
        var postData = {"time": date.toISOString()}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: hostname+'/memoryGame'
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
            assert(response.body.error, 'There are missing or invalid parameters in the request.');
            return done();
        });
    });

    it("should fail to post to memoryGame due to missing user and time values", function(done){
        var date = new Date();
        var postData = {"score": 1}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: hostname+'/memoryGame'
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
            assert(response.body.error, 'There are missing or invalid parameters in the request.');
            return done();
        });
    });

    it("should fail to post to memoryGame due to missing score and time values", function(done){
        var date = new Date();
        var postData = {"user": "User_Test"}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: hostname+'/memoryGame'
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
            assert(response.body.error, 'There are missing or invalid parameters in the request.');
            return done();
        });
    });

    it("should fail to post to memoryGame due to missing all values", function(done){
        var date = new Date();
        var postData = {}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: hostname+'/memoryGame'
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
            assert(response.body.error, 'There are missing or invalid parameters in the request.');
            return done();
        });
    });

})