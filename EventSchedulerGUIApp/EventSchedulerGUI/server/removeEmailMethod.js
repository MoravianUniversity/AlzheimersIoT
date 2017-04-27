Meteor.methods({
   removeEmailfromDatabase: function(Data){
           var url = "http://localhost:8080/api/Email/:services";
           var result = HTTP.del(url,{
           data: {
               Email: Data.emailAddress,
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
