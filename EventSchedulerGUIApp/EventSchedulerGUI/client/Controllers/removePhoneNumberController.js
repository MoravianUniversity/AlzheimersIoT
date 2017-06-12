Template.removePhoneNumberTemplate.events({
    "submit #removePhoneNumber": function (event){
        event.preventDefault();
        var Data ={
            PhoneNumber: event.target.PhoneNumber.value,
        };
        Meteor.call('removePhoneNumberfromDatabase',Data, function(err, respJson){
            if(err){
                window.alert("Error: "+err.reason);
                console.log("error occured on sending data to server. ",err);
            }
            else{
                console.log("Response: ", respJson);
                window.alert("Successfully deleted your phone number");
            }
        })

    }
})