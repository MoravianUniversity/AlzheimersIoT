var request = require('request');
var expect = require('chai').expect;
var assert = require('chai').assert;
var hostname = process.env.API_URL || 'http://localhost:8080/api';
var journalURL = hostname + '/journal';

// this first describe should explain the overall purposes of the tests cases being preformed
describe('Test the journal Endpoint for data post and ensuring corrupt data does not get added', function(){
/* 
	//params
	//datetime: date
	//message: String
	//Activities: string array
	//meds: bool
*/

    it("should post new data into Journal Endpoint", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString(),"message": "test message", "Activities": ["test array member"], "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(200);
            assert(response.body.message, 'Journal entry created!');
            return done();
        });
     });
     
    it("should reject this date format (String)", function(done){
        var date = new Date();
        var postData = {"datetime": "October","message": "test message", "Activities": ["test array member"], "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject this date format (int)", function(done){
        var date = new Date();
        var postData = {"datetime": 12 ,"message": "test message", "Activities": ["test array member"], "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject integer for message", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString(),"message": 12, "Activities": ["test array member"], "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject single String for activities", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString(),"message": "test message", "Activities": "test string", "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject integer for activities", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString(),"message": "test message", "Activities": 12, "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject String for medication", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString(),"message": "test message", "Activities": ["test array member"], "medication": "test"}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject integer for medication", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString(),"message": "test message", "Activities": ["test array member"], "medication": 12}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing date", function(done){
        var date = new Date();
        var postData = {"message": "test message", "Activities": ["test array member"], "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing message", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString(), "Activities": ["test array member"], "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });

    it("should reject for missing Activities", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString(),"message": "test message", "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });


    it("should reject for missing medication", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString(),"message": "test message", "Activities": ["test array member"]}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing date and message", function(done){
        var date = new Date();
        var postData = {"Activities": ["test array member"], "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing date and Activities", function(done){
        var date = new Date();
        var postData = {"message": "test message", "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing date and medication", function(done){
        var date = new Date();
        var postData = {"message": "test message", "Activities": ["test array member"]}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing message and Activities", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString(), "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing message and medication", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString(), "medication": true}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing Activities and medication", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString(),"message": "test message"}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing everything but date", function(done){
        var date = new Date();
        var postData = {"datetime": date.toISOString()}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing everything but message", function(done){
        var date = new Date();
        var postData = {"message": "test message"}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing everything but Activities", function(done){
        var date = new Date();
        var postData = {"Activities": ["test array member"]}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing everything but medication", function(done){
        var date = new Date();
        var postData = {"medication": 12}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
     
    it("should reject for missing every parameter", function(done){
        var date = new Date();
        var postData = {}
        var options = {
            method: 'POST',
            body: postData,
            json: true,
            url: journalURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
//            assert(response.body.message, 'There are missing or invalid parameters in the request');
            return done();
        });
     });
})