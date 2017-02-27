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

    it("should fail to post to memoryGame due to user being wrong data type", function(done){
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

    it("should fail to post to memoryGame due to score being wrong data type", function(done){
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

    it("should fail to post to memoryGame due to date being wrong data type", function(done){
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
})