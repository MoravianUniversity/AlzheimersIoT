var request = require('request');
var expect = require('chai').expect;
var assert = require('chai').assert;
var hostname = process.env.API_URL || 'http://localhost:8080/api';
var wemoURL = hostname + '/wemo';

describe('Test the wemo Endpoint for data post and ensuring corrupt data does not get added.', function(){
    it("should post new data into Wemo Endpoint", function(done){
        var date = new Date();
        var postData = {"date":"2015-03-21","time": "15:11:36", "status": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: wemoURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(200);
            assert(response.body.message, 'Wemo entry created!');
            return done();
        });
    });

    it("should reject due to missing date value", function(done){
        var date = new Date();
        var postData = {"time": "15:11:36", "status": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: wemoURL
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

    it("should reject due to missing time value", function(done){
        var date = new Date();
        var postData = {"date": "2015-03-21", "status": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: wemoURL
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

    it("should reject due to missing status value", function(done){
        var date = new Date();
        var postData = {"date": "2015-03-21", "time": "15:11:36"}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: wemoURL
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
    it("should reject due to missing values for status and time", function(done){
        var date = new Date();
        var postData = {"date": "2015-03-21"}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: wemoURL
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
    it("should reject due to missing values for status and date", function(done){
        var date = new Date();
        var postData = {"time": "15:11:36"}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: wemoURL
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
    it("should reject due to missing values for date and time", function(done){
        var date = new Date();
        var postData = {"status": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: wemoURL
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
    it("should reject due to missing all 3 values", function(done){
        var date = new Date();
        var postData = {}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: wemoURL
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
    it("should reject due to incorrect type (number) for date", function(done){
        var date = new Date();
        var postData = {"date": 1, "time": "15:11:36", "status": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: wemoURL
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
    it("should reject due to incorrect type (number) for time", function(done){
        var date = new Date();
        var postData = {"date": "2015-1-23", "time": 4, "status": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: wemoURL
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
    it("should reject due to incorrect type (string) for status", function(done){
        var date = new Date();
        var postData = {"date": "2015-1-23", "time": "15:11:36", "status": "yes"}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: wemoURL
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
    it("should reject due to incorrect type (number) for status", function(done){
        var date = new Date();
        var postData = {"date": "2015-1-23", "time": "15:11:36", "status": 5}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: wemoURL
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