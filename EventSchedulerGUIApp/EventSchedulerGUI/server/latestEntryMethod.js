Meteor.methods({
    latestEntry: function(Data){
    var url = "http://localhost:5050/api/scheduler";
    var result = HTTP.post(url,{
        data: {
            medium: Data.medium,
            latestEntryOf: Data.latestEntryParameter,
            dest: Data.dest,
            time: Data.time
        },function(error,response){
            if(error){
                console.log(error);
            } else {
                console.log(response);
            }

        }
    })
    return result.content;
    }
})