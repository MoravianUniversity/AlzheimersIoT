Template.SchedulerTemplate.events({
    "submit #submitScheduler": function (event){
        event.preventDefault();
        var Data ={
            medium: event.target.medium.value,
            msg: event.target.msg.value,
            dest: event.target.dest.value,
            time: event.target.time.value,
            Choice: event.target.queryLatestEntry.value,
            latestEntryParameter: event.target.services.value
        };
        if(Data.Choice =="No"){
            Meteor.call('Scheduler',Data, function(err, respJson){
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
        else{
        Meteor.call('latestEntry',Data, function(err, respJson){
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

    }
})