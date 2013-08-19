
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
        for (var i=0; i<5; i++){//} i<contacts.length; i++) {
            if(contacts[i].displayName!=null && contacts[i].phoneNumbers.length>0)  {
                if(i<=5){
                    alert("displaying all");
                    alert(contacts[i].displayName + contacts[i].phoneNumbers[0].value);
                    alert( '<a href="sms://' + contacts[i].phoneNumbers[0].value +
                        '"  data-role="button" data-inline="true"> Invite via SMS </a>');
                    $('#contact-list').append('<li> <img src="img/default.png"> ' + contacts[i].displayName +
                        '<a href="sms://' + "+19144757385" +
                        '"  data-role="button" data-inline="true"> Invite via SMS </a>' + '</li');

                } /* else{
                    $('#contact-list').append('<li> <img src="img/default.png"> ' + contacts[i].displayName +'</li');

                }     */
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


