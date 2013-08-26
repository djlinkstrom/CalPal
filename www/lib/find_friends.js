/**
 * Created with JetBrains WebStorm.
 * User: User
 * Date: 8/25/13
 * Time: 8:04 PM
 * To change this template use File | Settings | File Templates.
 */

var PARSE_APP = "8nkGkTHJFzaNp731ZsjpMlqIGhDuQnQRibNsbhWI";
var PARSE_JS = "9S6VHeESePTLxN3vfL7ZXOPU6CjsxlGa9rJn01iv";
$(document).ready(function() {
    Parse.initialize(PARSE_APP, PARSE_JS);

    function isUser(field, value) {
       if(value==null) {
           return false;
       }
        var TestObject = Parse.Object.extend("UserObject");
        var query = new Parse.Query(TestObject);
        query.equalTo(field,value);
        query.find({
            success:function(results) {
                return true;
            },
            error:function(results,error) {
                alert("Error when getting users!");
            }
        });
        return false;
    }


    function deviceFriends  (){

    }
});
