var PARSE_APP = "8nkGkTHJFzaNp731ZsjpMlqIGhDuQnQRibNsbhWI";
var PARSE_JS = "9S6VHeESePTLxN3vfL7ZXOPU6CjsxlGa9rJn01iv";
$(document).ready(function() {
    Parse.initialize(PARSE_APP, PARSE_JS);
    $("#list-device-contacts").click(function(event) {
        findContacts();
        //liquid.helper.oauth.authorize(authorizeWindowChange);

    });

    $("#synch-device").click(function(event) {
        var deviceName = device.name;
        alert("Device Platform" + device.platform +
            " Device Model:" + device.model +
            " Device Version" + device.version);

        $('#device-model').append(device.model);
        contactCount();
        //liquid.helper.oauth.authorize(authorizeWindowChange);

    });

    function onSuccess(contacts) {
        for (var i=0; i<5; i++) {
            var email=null;
            if(contacts[i].emails!=null && contacts[i].emails.length>0){
                email = contacts[i].emails[0].value;
            }
           if(contacts[i]!=null && contacts[i].displayName!=null && contacts[i].phoneNumbers!=null)  {
               $('#contact-list').append('<li> <img src="img/default.png"> ' + contacts[i].displayName);

               if(contacts[i].phoneNumbers.length>0){
                    var phoneNum =   contacts[i].phoneNumbers[0].value;
                }
               isUser(email, phoneNum, appendText);

            }

        }
        alert("done");

        $.mobile.changePage("#contacts", {
            transition : "none",
            reverse: false,
            changeHash: false
        });
        $('#contact-list').listview('refresh');
    };

    function appendText(emailMatch, phoneMatch, email, phoneNum){
        if( emailMatch || phoneMatch ){
            alert("hit it");
            $('#contact-list').append('<img src="img/checkmark.png">');
        }
        else{
            alert("no hit it");
            if(phoneNum.indexOf("+")==-1){
                phoneNum = "+" + phoneNum;
            }
            $('#contact-list').append(
                ' <a href="sms://' + phoneNum +
                '?body=CalPal"  data-role="button" data-inline="true" data-role="ui-li-aside">Text</a>' );
            if(email!=null){
                $('#contact-list').append('<a href="mailto:'  + email +
                    '?subject=CalPal"  data-role="button" data-inline="true" data-role="ui-li-aside">Email</a>');
            }
        }
        $('#contact-list').append( '</li>');
    }

    function onError(contactError) {
        alert('onError!');
    };

    function findContacts() {
        var options = new ContactFindOptions();
        options.filter="";
        options.multiple=true;
        var fields = ["displayName", "name", "phoneNumbers", "emails"];
        navigator.contacts.find(fields,onSuccess, onError, options);
    };

    function contactCount(){
        var options = new ContactFindOptions();
        options.filter="";
        options.multiple=true;
        var fields = ["displayName", "name"];
        navigator.contacts.find(fields,returnCount, onError, options);
    }
    function returnCount(contacts) {
        $('#device-contact-count').append(contacts.length);
    }


    function isUser(value1, value2, callback) {
       var emailMatch=true;
       var phoneMatch=true;
        if(value1==null ) {
            emailMatch=false;
        }
        if(value2==null ) {
            phoneMatch=false;
        }
        if(!emailMatch && !phoneMatch){
            callback(false, false, value1, value2);
        }

        var UserObject = Parse.Object.extend("UserObject");
        var query = new Parse.Query(UserObject);
        if(emailMatch!=false){
            query.equalTo("email", value1);
            query.find({
                success:function(results) {
                    alert("hit " + value1);
                    callback(true, false, value1, value2);
                },
                error:function(results,error) {
                    if(phoneMatch!=false){
                        query.equalTo("phoneNumber", value2);
                        query.find({
                            success:function(results) {
                                alert("hit " + value2);
                                callback(false, true, value1, value2);
                            },
                            error:function(results,error) {
                                callback(false, false, value1, value2);
                            }
                        });
                    }
                }
            });
        }
        else{
            query.equalTo("phoneNumber", value2);
            query.find({
                success:function(results) {
                    alert("hit " + value2);
                    callback(true, false, value1, value2);
                },
                error:function(results,error) {
                    callback(false, false, value1, value2);
                }
            });
        }
    }






});


