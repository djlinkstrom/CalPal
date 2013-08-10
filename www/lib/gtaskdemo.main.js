/*
   Event Handler HOOKS and Implementations.
   
   =================================================================================================
   BEGIN EVENT HOOK & HANDLING USING JS
   =================================================================================================
   
   Demo showing how to implement Google API with oAuth.
   
   Disclaimer: The code below is just another Javascript Spaghetti code. To avoid such spaghetti code, please look into 
   something like backbone.js to make the actual App :)! 
 */


$(document).ready(function() {
	/* startApp after device ready */
	//document.addEventListener("deviceready", startApp, false);

    document.addEventListener("onLoad", startApp, false);

    var oAuth = liquid.helper.oauth;
    $("#access-code").click(function(event) {
        liquid.helper.oauth.authorize(goHome);
        //liquid.helper.oauth.authorize(authorizeWindowChange);
        event.preventDefault();
    });


    if (oAuth.isAuthorized()) {
        /* Start Page TaskList */
        alert("authorized1");

        /*
        $('#token').html("Your Google Token is "+ oAuth.authCode);
        $('#salutation').html("Welcome Back, You have already authorized this app");
        //getEmail();
        $.mobile.changePage("#contacts", {
            transition : "none",
            reverse: false,
            changeHash: false
        });
        //getEmail();
        //startPageTaskList();
          */
    }
});


/**
 * Start the App
 */
function startApp() {
	var oAuth = liquid.helper.oauth;
    $("#access-code").click(function(event) {
        liquid.helper.oauth.authorize(goHome);
        //liquid.helper.oauth.authorize(authorizeWindowChange);
        event.preventDefault();
    });

    
    if (oAuth.isAuthorized()) {
    	/* Start Page TaskList */
        alert("authorized");
        var oAuth = liquid.helper.oauth;
        //$('#token').innerHTML = "Your Google Token is "+ oAuth.authCode;
    	//startPageTaskList();
    }
}


function startPageTaskList() {
    $.mobile.changePage("#page-tasklist", {
        transition : "none"
    });
}


/**
 * Populates the list of Tasks
 */
function populateTaskList() {
	$.mobile.showPageLoadingMsg("a", "Loading Tasks...");
	
	/* hide all the request Info blocks/divs */
	$('.request-info').hide();
	
	liquid.model.tasks.getList(function(data) {
        $('#qt-listview-tasks').empty();
        
        console.log(JSON.stringify(data)); // debug JSON response data
        
        /* check if there's an error from server, then display
         * error and retry
         */
        if (data.error) {
        	console.log('Unable to load Task List >> ' + data.error.message);
        	$.mobile.hidePageLoadingMsg();   
            return;        	
        }
        
        /* if there are no elements in it, then
         * display the info message, and return */
        if (!data.items) {
        	$('#qt-listview-info').show();
            $.mobile.hidePageLoadingMsg();        	
            return;
        }
        
        
        for (var i = 0; i < data.items.length; i++) {
        	
        	var item = data.items[i];
        	
        	$('#qt-listview-tasks')
        		.append('<li><h5>' 
        					+ item.title +
        				'</h5></li>');
        }
        
        $('#qt-listview-tasks').listview('refresh');
        $.mobile.hidePageLoadingMsg();   
	});
}


function goHome() {
    var oAuth = liquid.helper.oauth;
    alert("Your Google Token is "+ oAuth.authCode);
   // $('#token').html("Your Google Token is "+ oAuth.authCode);
    //$('#salutation').html("Thanks for authorizing this app");
   // getEmail();
    /*$.mobile.changePage("#contacts", {
        transition : "none",
        reverse: false,
        changeHash: false
    });     */
    getCalendarList();

}

function getCalendarList(){
    alert("getting calendar");

    liquid.helper.oauth.getAccessToken(function(tokenObj) {

        alert('Access Token is >> ' + tokenObj.access_token);

        /*gapi.auth.setToken({
            access_token: tokenObj.access_token
        });
        gapi.auth.setToken(tokenObj);

        alert("token is" + tokenObj.access_token);
        alert("skipped");
        alert("token set " + gapi.auth.getToken()); */

        gapi.client.load('plus', 'v1', function() {
                alert("api loaded");

                alert("request loaded");
            gapi.client.plus.people.get( {'userId' : 'me'} ).execute(function(obj){
                    alert("Darren");

                });
            });

       // var request = gapi.client.calendar.events.list();
       /* alert("request set");
        request.execute(function(resp) {
            alert("response: " +JSON.stringify(resp));
            for (var i = 0; i < resp.items.length; i++) {
               alert(i);
            }
        });   */
    });

    /*liquid.model.calendar.getList(function(data) {
        alert("got list");
        if (data.error) {
            alert("error");
            return;
        }
        alert("no error");
        for (var i = 0; i < data.items.length; i++) {

            var item = data.items[i];
            alert("item "+i);
            alert(item.title)  ;
        }


    });   */
}

function getCalendarCallback(obj){
alert("in callback");
}


function getEmail(){
    // Load the oauth2 libraries to enable the userinfo methods.
    alert("getting email");

   /* liquid.helper.oauth.getAccessToken(function(tokenObj) {

        alert('Access Token >> ' + tokenObj.access_token);
        gapi.auth.setToken({
            access_token: tokenObj.access_token
        });
        alert("token set");


        gapi.client.load('userinfo', 'v3', function() {
            alert("api set");
            var request = gapi.client.userinfo.get();
            alert("request set");
            request.execute(getEmailCallback);
        });

    });  */
}

function getEmailCallback(obj){
    alert("request loaded");
    //var el = document.getElementById('email');
    var email = '';

    if (obj['email']) {
        email = 'Email: ' + obj['email'];
    }

    //console.log(obj);   // Uncomment to inspect the full object.

    alert( email);

}



(function() {

	$('#page-tasklist').live('pageshow', function(event) {
		
		if (!liquid.helper.oauth.isAuthorized()) {
			goHome();
			return;
		}
		
		$('#btn-refresh').click(function(event) {
			populateTaskList();
			event.preventDefault();
		});
		
		$('#btn-hide-error').click(function(event) {
			
			$('#qt-listview-error').hide();			
			event.preventDefault();
		});
		
		/* populateTaskList on page init */
		populateTaskList();
	
		/**
		 * Add the listeners for each of the components
		 * 	Listeners are for:
		 * - Title bar refresh btn (#head-menu-refresh)
		 */
		$('#head-menu-refresh').click(function(event) {
		    populateTaskList();
		    event.preventDefault();
		});
		
		
		$('#head-menu-signout').click(function(event) {
		    liquid.helper.oauth.unAuthorize();
		    goHome();
		    event.preventDefault();
		});
	
	});
})();