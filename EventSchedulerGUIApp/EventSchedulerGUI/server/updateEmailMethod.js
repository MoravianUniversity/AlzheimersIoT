Meteor.methods({
    uploadEmailtoDatabase: function(Data){
           var url = "localhost:8080/api/Email";
           var result = HTTP.post(url,{
           data: {
               CurrentEmail: Data.emailAddress,
               services: Data.services
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
