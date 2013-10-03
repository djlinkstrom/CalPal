var PARSE_APP = "8nkGkTHJFzaNp731ZsjpMlqIGhDuQnQRibNsbhWI";
var PARSE_JS = "9S6VHeESePTLxN3vfL7ZXOPU6CjsxlGa9rJn01iv";
$(document).ready(function() {
    Parse.initialize(PARSE_APP, PARSE_JS);
    var parseContacts = new Array();
    getParseContacts();


    function getParseContacts(){
        Parse.initialize(PARSE_APP, PARSE_JS);
        var UserObject = Parse.Object.extend("UserObject");
        alert("1");
        var query = new Parse.Query(UserObject);
        alert("2");
        query.find({
            success:function(results) {
                alert("success");
                for(var i=0; i<results.length; i++) {

                    var contact = results[i];
                    parseContacts.push(contact);

                    //$('#contact-list').append('<li>'+contact.get("phoneNumber")+' '+contact.get("Email")+'</li>');
                }
            },
            error:function(results,error) {
                alert("Error when getting users!");
                alert("results: "+results.length);
                alert(error.get("code")+" " + error.get("message"));
            }
        });
    }
    $("#list-device-contacts").click(function(event) {
        //findContacts();
        //liquid.helper.oauth.authorize(authorizeWindowChange);


        alert("length " + parseContacts.length);
        alert("done");
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

   /* function onSuccess(contacts) {
        for (var i=0; i<2; i++) {
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
          */
    function onSuccess(contacts){

        var myContacts = new Object();
        /*for(var i=0; i<15; i++){
            if(contacts[i].photos!= null && contacts[i].photos[0].value!= null){
                var img = contacts[i].photos[0].value;
                //alert("not null"+ img);
            }   else{
                var img = "default";
                //alert("null"+ img);
            }

            var email=null;
            if(contacts[i].emails!=null && contacts[i].emails.length>0){
                email = contacts[i].emails[0].value;
            }
            if(contacts[i]!=null && contacts[i].displayName!=null && contacts[i].phoneNumbers!=null)  {
                var name = contacts[i].displayName;
                if(contacts[i].phoneNumbers.length>0){
                    var phoneNum =   contacts[i].phoneNumbers[0].value;
                }
                var index = name.substring(0,1).toUpperCase();
                if (typeof myContacts[index] == 'undefined')
                {
                    myContacts[index] = new Array();
                }

                myContacts[index].push({"name":name, "phoneNum": phoneNum, "email": email, "img": img} );
            }
        }
        var arrayKeys = new Array();
        for (var key in myContacts )
        {
            arrayKeys.push( key );
        }

        arrayKeys = arrayKeys.sort();

        for( i = 0 ; i < arrayKeys.length ; i++ )
        {
            var records =  myContacts[ arrayKeys[i] ];

            // Sort each names
            records = records.sort( sortNames );
            for( var r_key in records  )
            {
                var phoneNum = records[r_key].phoneNum;
                var email = records[r_key].email;
                if(records[r_key]=="default"){
                    alert("default");
                }
                $('#contact-list').append('<li> <img src="' + records[r_key].img+'"  height="42" width="42"> ' + records[r_key].name);
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
                $('#contact-list').append( '</li>');

                $('#contact-list').append('<li>'+phoneNum+' '+email+'</li>');
            }

        }
        alert("break");
        $('#contact-list').append("<li>Break</li>");  */



        /*$.mobile.changePage("#contacts", {
            transition : "none",
            reverse: false,
            changeHash: false
        });
        $('#contact-list').listview('refresh');   */

    }

    function sortNames(a, b )
    {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
    }


    function onError(contactError) {
        alert('onError!');
    };

    function findContacts() {
        var options = new ContactFindOptions();
        options.filter="";
        options.multiple=true;
        var fields = ["displayName", "name", "phoneNumbers", "emails", "photos"];
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





















    function appendText(emailMatch, phoneMatch, email, phoneNum){
        if( emailMatch || phoneMatch ){
            alert("hit it");
            $('#contact-list').append('<img src="img/checkmark.png">');
        }
        else{
            alert("no hit");
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
     /*
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
        if(value2.indexOf("+")!=-1){
            value2 = value2.replace('+', '');
        }
        var UserObject = Parse.Object.extend("UserObject");
        var query = new Parse.Query(UserObject);
        if(emailMatch!=false){
            alert("email" + value1);
            query.equalTo("email", value1);
            query.find({
                success:function(results) {
                    alert(value1 + " " + results.length);
                    if( results!=null && results.length>0){
                        alert("hit " + value1);
                        callback(true, false, value1, value2);
                    }
                    else{
                        if(phoneMatch!=false){
                            alert("phoneNumber2" + value2);
                            query.equalTo("phoneNumber", value2);
                            query.find({
                                success:function(results) {
                                    alert(value2 + " " + results.length);
                                    if(results!=null && results.length>0){
                                        alert("hit " + value2);
                                        callback(false, true, value1, value2);
                                    }
                                    else{
                                        callback(false, false, value1, value2);
                                    }
                                },
                                error:function(results,error) {
                                    callback(false, false, value1, value2);
                                }
                            });
                        }
                    }

                },
                error:function(results,error) {
                    callback(false, false, value1, value2);
                }
            });
        }
        else{
            alert("phoneNumber" + value2);
            query.equalTo("phoneNumber", value2);
            query.find({
                success:function(results) {
                    alert(value2 + " " + results.length);
                    if(results!=null && results.length>0){
                        alert("hit " + value2);
                        callback(false, true, value1, value2);
                    }
                    else{
                        callback(false, false, value1, value2);
                    }
                },
                error:function(results,error) {
                    alert("error");
                    callback(false, false, value1, value2);
                }
            });
        }
    }

      */




});


