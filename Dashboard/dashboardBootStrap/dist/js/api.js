// General Use Variables
var data;

// GPS Variables
var lati;
var long;

$(function() {

// Local Storage Variables to check whether new entries exist
var localGps = localStorage.getItem("gpsEntries");
var localJourn = localStorage.getItem("journalEntries");
var localWemo = localStorage.getItem("wemoEntries");
var localMem = localStorage.getItem("memtestEntries");
    
// Request info from API
    
// GPS
$.ajax({
        url: "https://07a83708.ngrok.io/api/gps",
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
        url: "https://07a83708.ngrok.io/api/memoryGame",
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
        url: "https://07a83708.ngrok.io/api/journal",
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
        url: "https://07a83708.ngrok.io/api/wemo",
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

$(document).ready(function(){
    
    var x = document.getElementById("mapholder");
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        latlon = new google.maps.LatLng(lati, long);
        mapholder = document.getElementById("mapholder");
        //mapholder.style.height = '250px';
        //mapholder.style.width = '500px';

        var myOptions = {
        center:latlon,zoom:15,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:false,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
        };

        var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
        var marker = new google.maps.Marker({position:latlon,map:map,title:"Last location update was here!"});
    }

    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred.";
                break;
        }
    }
});