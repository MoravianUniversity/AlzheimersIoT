Template.emailTemplate.events({
    "submit #submitEmail": function (event){
        event.preventDefault();
        var email ={
            emailAddress: event.target.Email.value,
            services: event.target.services.value
        };
        Meteor.call('uploadEmailtoDatabase',email, function(err, respJson){
            if(err){
                window.alert("Error: "+err.reason);
                console.log("error occured on sending data to server. ",err);
            }
            else{
                console.log("Response: ", respJson);
                window.alert("successfully added your email");
            }
        })

    }
})