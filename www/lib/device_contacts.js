

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


