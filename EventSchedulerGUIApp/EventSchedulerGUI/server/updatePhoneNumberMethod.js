Meteor.methods({
    uploadPhoneNumbertoDatabase: function(Data){
        var url = "http://localhost:8080/api/PhoneNumber";
        var result = HTTP.post(url,{
        data: {
            PhoneNumber: Data.PhoneNumber,
            services: Data.services
        },function(error,response){
        if(error){
            console.log(error);
        } else {
            console.log(response);
        }

        }
    })
    return result;
    }
})