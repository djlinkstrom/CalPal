
$(document).ready(function() {
    $("#device-contacts").click(function(event) {
        findContacts();
        //liquid.helper.oauth.authorize(authorizeWindowChange);

    });

    $("#synch-device").click(function(event) {
        var deviceName = device.name;
        alert("Device Platform" + device.platform +
            " Device Model:" + device.model +
            " Device Version" + device.version);


        //liquid.helper.oauth.authorize(authorizeWindowChange);

    });

    function onSuccess(contacts) {
        alert('Found ' + contacts.length + ' contacts.');
        for (var i=0; i<5; i++) {
            $('#list-contacts').append('<div>' +contacts[i].displayName +'</div')
        }

        $.mobile.changePage("#contacts", {
            transition : "none",
            reverse: false,
            changeHash: false
        });
    };

    function onError(contactError) {
        alert('onError!');
    };

    function findContacts() {
        var options = new ContactFindOptions();
        options.filter="";
        options.multiple=true;
        var fields = ["displayName", "name"];
        navigator.contacts.find(fields,onSuccess, onError, options);
    };


});


