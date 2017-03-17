var request = require('request');
var expect = require('chai').expect;
var assert = require('chai').assert;
var hostname = process.env.API_URL || 'http://localhost:8080/api';
var wemoURL = hostname + '/wemo';

describe('Test the wemo Endpoint for data post and ensuring corrupt data does not get added', function(){
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
})