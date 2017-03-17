var request = require('request');
var expect = require('chai').expect;
var assert = require('chai').assert;
var hostname = process.env.API_URL || 'http://localhost:8080/api';
var mlURL = hostname + '/medicineLogger';

describe('Test the Medicine Logger Endpoint for data post and ensuring corrupt data does not get added', function(){
    it("should post new data into Medicine Logger Endpoint", function(done){
        var date = new Date();
        var postData = {"user": "testUser", "record":"testRecord", "date": date.toISOString()}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: mlURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(200);
            assert(response.body.message, 'MedicineLogger entry created!');
            return done();
        });
    });
})