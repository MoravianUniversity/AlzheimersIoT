var request = require('request');
var expect = require('chai').expect;
var assert = require('chai').assert;
var hostname = process.env.API_URL || 'http://localhost:8080/api';

// this first describe should explain the overall purposes of the tests cases being preformed
describe('Test the journal Endpoint for data post and ensuring corrupt data does not get added', function(){

    //each it should describe the specific purpose of the test
    it("should post new data into Journal Endpoint", function(done){
        
     });
})