Meteor.methods({
    removePhoneNumberfromDatabase: function(Data){
        var url = "http://localhost:8080/api/PhoneNumber/:services";
        var result = HTTP.del(url,{
        data: {
            PhoneNumber: Data.PhoneNumber,
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