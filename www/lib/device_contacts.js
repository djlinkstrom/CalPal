
$(document).ready(function() {
    $("#device-contacts").click(function(event) {
        findContacts();
        //liquid.helper.oauth.authorize(authorizeWindowChange);

    });

    function onSuccess(contacts) {
        alert('Found ' + contacts.length + ' contacts.');
        for (var i=0; i<5; i++) {
            alert("Display Name = " + contacts[i].displayName);
        }
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


