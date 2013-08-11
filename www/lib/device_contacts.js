

function onSuccess(contacts) {
    alert('Found ' + contacts.length + ' contacts.');
};

function onError(contactError) {
    alert('onError!');
};

function findContacts() {
    var options = new ContactFindOptions();
    var fields = ["displayName", "name"];
    var contact = navigator.contacts.create(fields,onSuccess, onError, options);
};


