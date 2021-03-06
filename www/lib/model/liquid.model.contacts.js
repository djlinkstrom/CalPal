/**
 * Created with JetBrains WebStorm.
 * User: User
 * Date: 8/6/13
 * Time: 9:13 PM
 * To change this template use File | Settings | File Templates.
 */


(function(model) {

    model.contacts = {

        isGapiLoaded : false,
        gapiConfig: liquid.config.gapi,


        /**
         * Loads the Google API and then invokes the callback. It checks if the
         * library is already loaded or not. If its already loaded, it simply
         * invokes the callback, else, loads Google API and invokes the callback
         *
         * @param {Function} callback The callback function to be invoked after
         *                            loading of Google API is complete.
         */
        loadGapi : function(callback) {
            var $this = model.contacts;

            if ($this.isGapiLoaded) {
                callback();
            }
            else {
                /* load the google api and then invoke callback */
                gapi.client.load('contacts', 'v3', function() {
                        $this.isGapiLoaded = true;
                        if (callback) {
                            callback();
                        }
                    }
                );
            }
        },

        getList: function(callback) {
            var $this = model.contacts;

            liquid.helper.oauth.getAccessToken(function(tokenObj) {

                //console.log('Access Token >> ' + tokenObj.access_token);
                /* at first set the access Token */
                gapi.auth.setToken({
                    access_token: tokenObj.access_token
                });

                $this.loadGapi(function() {
                    var request = gapi.client.tasks.tasks.list({
                        tasklist: $this.tasklistId // tasklist id
                    });

                    request.execute(callback);
                });
            });

        }





    } // end of liquid.model.contacts

})(window.liquid.model);
