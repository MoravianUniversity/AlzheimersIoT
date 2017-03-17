var request = require('request');
var expect = require('chai').expect;
var assert = require('chai').assert;
var hostname = process.env.API_URL || 'http://localhost:8080/api';
var gpsURL = hostname + '/gps';

describe('Test the GPS Endpoint for data post and ensuring corrupt data does not get added', function(){
    it("should post new data into GPS Endpoint", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time":date.toISOString(), "lat":Math.random(), "lon":Math.random(),
            "address": "1200 Main Street, Bethlehem, PA 18018"}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: gpsURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(200);
            assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
})