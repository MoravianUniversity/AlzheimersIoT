var request = require('request');
var expect = require('chai').expect;
var assert = require('chai').assert;
var hostname = process.env.API_URL || 'http://localhost:8080/api';
var gpsURL = hostname + '/gps';

describe('Test the GPS Endpoint for data post and ensuring corrupt data does not get added', function(){
/*
	//params
	//deviceID: string
	//time: date
	//lat: double
	//lon: double
	//address: string
*/

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
            assert(response.body.message, 'GPS entry created!');
            expect(response.statusCode).to.equal(200);
            return done();
        });
    });
    
    it("should reject this deviceID type (int)", function(done){
        var date = new Date();
        var postData = {"deviceID":12, "time":date.toISOString(), "lat":Math.random(), "lon":Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject this time type (int)", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time":12, "lat":Math.random(), "lon":Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject this time type (string)", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time": "test string", "lat":Math.random(), "lon":Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject this lat type (string)", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time": date.toISOString(), "lat": "test string", "lon":Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    

    it("should reject this lon type (string)", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time": date.toISOString(), "lat": Math.random(), "lon": "test message",
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    
    it("should reject this address type (int)", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time": date.toISOString(), "lat": Math.random(), "lon":Math.random(),
            "address": 12}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing deviceID", function(done){
        var date = new Date();
        var postData = {"time": date.toISOString(), "lat": Math.random(), "lon":Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing time", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "lat": Math.random(), "lon":Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing lat", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time": date.toISOString(), "lon":Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing lon", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time": date.toISOString(), "lat": Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing address", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time": date.toISOString(), "lat": Math.random(), "lon":Math.random()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing deviceID and time", function(done){
        var date = new Date();
        var postData = {"lat": Math.random(), "lon":Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing deviceID and lat", function(done){
        var date = new Date();
        var postData = {"time": date.toISOString(), "lon":Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing deviceID and lon", function(done){
        var date = new Date();
        var postData = {"time": date.toISOString(), "lat": Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing deviceID and address", function(done){
        var date = new Date();
        var postData = {"time": date.toISOString(), "lat": Math.random(), "lon":Math.random()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing time and lat", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "lon":Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing time and lon", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "lat": Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing time and address", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "lat": Math.random(), "lon":Math.random()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing lat and lon", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time": date.toISOString(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing lat and address", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time": date.toISOString(), "lon":Math.random()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing lon and address", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time": date.toISOString(), "lat": Math.random()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing deviceID, time, and lat", function(done){
        var date = new Date();
        var postData = {"lon":Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing deviceID, time, and lon", function(done){
        var date = new Date();
        var postData = {"lat": Math.random(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing deviceID, time, and address", function(done){
        var date = new Date();
        var postData = {"lat": Math.random(), "lon":Math.random()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing deviceID, lat, and lon", function(done){
        var date = new Date();
        var postData = {"time": date.toISOString(),
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing deviceID, lat and address", function(done){
        var date = new Date();
        var postData = {"time": date.toISOString(), "lon":Math.random()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing deviceID, lon, and address", function(done){
        var date = new Date();
        var postData = {"time": date.toISOString(), "lat": Math.random()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing time, lat, and lon", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice",
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing time, lat, and address", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "lon":Math.random()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing time, lon, and address", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "lat": Math.random()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing lat, lon, and address", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice", "time": date.toISOString()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing everything but address", function(done){
        var date = new Date();
        var postData = {"address": "1200 Main Street, Bethlehem, PA 18018"}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing everything but lon", function(done){
        var date = new Date();
        var postData = {"lon":Math.random()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing everything but lat", function(done){
        var date = new Date();
        var postData = {"lat": Math.random()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing everything but time", function(done){
        var date = new Date();
        var postData = {"time": date.toISOString()}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
    
    it("should reject for missing everything but deviceID", function(done){
        var date = new Date();
        var postData = {"deviceID":"testDevice"}
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
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
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
            url: gpsURL
        }
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                return
            }
            expect(response).to.exist;
            expect(response.statusCode).to.equal(400);
         //   assert(response.body.message, 'GPS entry created!');
            return done();
        });
    });
})