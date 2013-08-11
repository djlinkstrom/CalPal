
$(document).ready(function() {
    $("#device-contacts").click(function(event) {
        alert("clicked");
        findContacts();
        //liquid.helper.oauth.authorize(authorizeWindowChange);

    });

    function onSuccess(contacts) {
        alert('Found ' + contacts.length + ' contacts.');
    };

    function onError(contactError) {
        alert('onError!');
    };

    function findContacts() {
        alert("in contacts");
        var options = new ContactFindOptions();
        var fields = ["displayName", "name"];
        navigator.contacts.find(fields,onSuccess, onError, options);
    };


});


