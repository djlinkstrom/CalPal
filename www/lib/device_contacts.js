
$(document).ready(function() {
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
        for (var i=0; i<25; i++) {
            var email=null;
            if(contacts[i].emails.length>0 && email!=null){
                var email = contacts[i].emails[0].value;
            }

           if(contacts[i].displayName!=null && contacts[i].phoneNumbers.length>0)  {
                var phoneNum =   contacts[i].phoneNumbers[0].value;
                if(phoneNum.indexOf("+")==-1){
                    phoneNum = "+" + phoneNum;
                }
                $('#contact-list').append('<li> <img src="img/default.png"> ' + contacts[i].displayName +
                    '<a href="sms://' + phoneNum +
                  '?body=CalPal"  data-role="button" data-inline="true" data-role="ui-li-aside">Text</a>' );
                if(email!=null){
                    $('#contact-list').append('<a href="mailto:>'  + email +
                        '?subject=CalPal"  data-role="button" data-inline="true" data-role="ui-li-aside">Email</a>');
                }

                $('#contact-list').append( '</li');

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




});


