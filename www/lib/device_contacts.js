
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
        for (var i=0; i<contacts.length; i++) {
            if(contacts[i].displayName!=null)  {
                $('#contact-list').append('<li> <img src="img/default.png"> ' + contacts[i].displayName +'</li');
            }
            if(i<=5){
                alert("in contact");
                for (var j=0; j<contacts[i].phoneNumbers.length; j++) {
                    alert("Type: " + contacts[i].phoneNumbers[j].type + "\n" +
                        "Value: "  + contacts[i].phoneNumbers[j].value + "\n" +
                        "Preferred: "  + contacts[i].phoneNumbers[j].pref);
                }
            }

        }

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


