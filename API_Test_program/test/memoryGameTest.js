var request = require('request');
var expect = require('chai').expect;
var hostname ='http://8887eddd.ngrok.io';

// this first describe should explain the overall purposes of the tests cases being preformed
describe('Test the memoryGame Endpoint for data post and ensuring corrupt data does not get added', function(){

    //each it should describe the specific purpose of the test
    it("should post new data into Memory Game Endpoint", function(done){
        var date = new Date();
        var postData = {"user":"User_Test","score": 1, "time": date}
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
            expect(response.body).to.be.a('string');
            return done();
        });
     });


    it("should fail to post to memoryGame due to user being wrong data type", function(done){
            var date = new Date();
            var postData = {"user": 1,"score": 1, "time": date}
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
                expect(response.statusCode).to.equal(404);
                expect(response.body).to.be.a('string');
                return done();
            });
    });

    it("should fail to post to memoryGame due to score being wrong data type", function(done){
            var date = new Date();
            var postData = {"user": 'User_Test',"score": "corrupted data", "time": date}
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
                expect(response.statusCode).to.equal(404);
                expect(response.body).to.be.a('string');
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
                    expect(response.statusCode).to.equal(404);
                    expect(response.body).to.be.a('string');
                    return done();
                });
        });
})