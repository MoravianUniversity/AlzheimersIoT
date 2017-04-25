// General Use Variables
var data;

// GPS Variables
var lati;
var long;

var ngrokAddress = "https://20d0fc48.ngrok.io/api/"; 

$(function() {

    // Local Storage Variables to check whether new entries exist
    var localGps = localStorage.getItem("gpsEntries");
    var localJourn = localStorage.getItem("journalEntries");
    var localWemo = localStorage.getItem("wemoEntries");
    var localMem = localStorage.getItem("memtestEntries");

    // Request info from API

    // GPS
    $.ajax({
            url: ngrokAddress + "gps",
            dataType: 'json',
            data: data
        })
        .done(function(data) {
            console.log("Acquired GPS");
            console.log(data[0]);
            var numEntries = data.length;
            lati = data[0].lat;
            long = data[0].lon;
            var timeD = data[0].time;
            var devID = data[0].deviceID;
            $(".gpsLat").html(lati);
            $(".gpsLon").html(long);
            $(".gpsTime").html(timeD);
            $(".gpsDevid").html(devID);
            $(".gpsEntries").html(numEntries);
            $(".gpsTotal").html(numEntries);

            if (numEntries>=localGps) {
                $(".gpsEntries").html(numEntries-localGps);
                localStorage.setItem("gpsEntries", numEntries);
            }
            if (numEntries<localGps) {
                /*This shouldn't happen*/
            }
        })
        .fail(function(data) {
            console.log("Failed GPS Retrieval");
        });

    // MMSE
    $.ajax({
            url: ngrokAddress + "memoryGame",
            dataType: 'json',
            data: data
        })
        .done(function(data) {
            console.log("Acquired MMSE");
            console.log(data[0]);
            var numEntries = data.length;
            var score = data[0].score;
            var user = data[0].user;
            var timeD = data[0].time;
            $(".memScore").html(score);
            $(".memUser").html(user);
            $(".memTime").html(timeD);
            $(".memEntries").html(numEntries);
            $(".memTotal").html(numEntries);

            if (numEntries>=localMem) {
                $(".memEntries").html(numEntries-localMem);
                localStorage.setItem("memtestEntries", numEntries);
            }
            if (numEntries<localMem) {
                /*This shouldn't happen*/
            }
        })
        .fail(function(data) {
            console.log("Failed MMSE Retrieval");
        });

    // Journal
    $.ajax({
            url: ngrokAddress + "journal",
            dataType: 'json',
            data: data
        })
        .done(function(data) {
            console.log("Acquired Journal");
            console.log(data[0]);
            var numEntries = data.length;
            var medicationTaken = data[0].medication;
            var message = data[0].message;
            var timeD = data[0].datetime;
            var activities = data[0].activities;
            $(".jMed").html(medicationTaken);
            $(".jMessage").html(message);
            $(".jTime").html(timeD);
            $(".jActivities").html(activities);
            $(".jEntries").html(numEntries);
            $(".jTotal").html(numEntries);

            if (numEntries>=localJourn) {
                $(".jEntries").html(numEntries-localJourn);
                localStorage.setItem("journalEntries", numEntries);
            }
            if (numEntries<localJourn) {
                /*This shouldn't happen*/
            }
        })
        .fail(function(data) {
            console.log("Failed Journal Retrieval");
        });

    // WeMo
    $.ajax({
            url: ngrokAddress + "wemo",
            dataType: 'json',
            data: data
        })
        .done(function(data) {
            console.log("Acquired WeMo");
            console.log(data[0]);
            var numEntries = data.length;
            var prevEntries = localStorage.getItem("wemoEntries");
            var status = data[0].status;
            var time = data[0].time;
            var date = data[0].date;
            $(".wemoStatus").html(status);
            $(".wemoTime").html(time);
            $(".wemoDate").html(date);
            $(".wemoEntries").html(numEntries);
            $(".wemoTotal").html(numEntries);

            if (numEntries>=localWemo) {
                $(".wemoEntries").html(numEntries-localWemo);
                localStorage.setItem("wemoEntries", numEntries);
            }
            if (numEntries<localWemo) {
                /*This shouldn't happen*/
            }
        })
        .fail(function(data) {
            console.log("Failed WeMo Retrieval");
        });
});

var watchId = null;
function geoloc() {
    if (navigator.geolocation) {
        var optn = {
                enableHighAccuracy : true,
                timeout : Infinity,
                maximumAge : 0
        };
    watchId = navigator.geolocation.watchPosition(showPosition, showError, optn);
    } 
    else {
            alert('Geolocation is not supported in your browser');
    }
}

function showPosition(position) {
    var googlePos = new google.maps.LatLng(lati, long);
    var mapOptions = {
        zoom : 15,
        center : googlePos,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    var mapObj = document.getElementById('map');
    var googleMap = new google.maps.Map(mapObj, mapOptions);
    var markerOpt = {
        map : googleMap,
        position : googlePos,
        title : 'Hi , I am here',
        animation : google.maps.Animation.DROP
    };
    var googleMarker = new google.maps.Marker(markerOpt);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'latLng' : googlePos
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                var popOpts = {
                    content : results[1].formatted_address,
                    position : googlePos
                };
                $("#location").text(results[1].formatted_address);
                var popup = new google.maps.InfoWindow(popOpts);
                google.maps.event.addListener(googleMarker, 'click', function() {
                    popup.open(googleMap);
                });
            } 
            else {
                alert('No results found');
            }
        } 
        else {
            alert('Geocoder failed due to: ' + status);
        }
    });
}

function stopWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function showError(error) {
    var err = document.getElementById('map');
    switch(error.code) {
        case error.PERMISSION_DENIED:
        err.innerHTML = "User denied the request for Geolocation."
        break;
        case error.POSITION_UNAVAILABLE:
        err.innerHTML = "Location information is unavailable."
        break;
        case error.TIMEOUT:
        err.innerHTML = "The request to get user location timed out."
        break;
        case error.UNKNOWN_ERROR:
        err.innerHTML = "An unknown error occurred."
        break;
    }
}