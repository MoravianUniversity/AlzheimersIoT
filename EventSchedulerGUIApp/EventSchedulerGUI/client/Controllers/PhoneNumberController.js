Template.phoneNumberTemplate.events({
    "submit #submitPhoneNumber": function (event){
        event.preventDefault();
        var Data ={
            url: event.target.url.value,
            PhoneNumber: event.target.PhoneNumber.value,
            services: event.target.services.value
        };
        Meteor.call('uploadPhoneNumbertoDatabase',Data, function(err, respJson){
            if(err){
                window.alert("Error: "+err.reason);
                console.log("error occured on sending data to server. ",err);
            }
            else{
                console.log("Response: ", response);
                window.alert(response);
            }
        })

    }
})