Template.removeEmailTemplate.events({
    "submit #removeEmail": function (event){
        event.preventDefault();
        var email ={
            emailAddress: event.target.Email.value,
        };
        Meteor.call('removeEmailfromDatabase',email, function(err, respJson){
            if(err){
                window.alert("Error: "+err.reason);
                console.log("error occured on sending data to server. ",err);
            }
            else{
                console.log("Response: ", respJson);
                window.alert("successfully deleted your email");
            }
        })

    }
})