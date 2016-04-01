/**
 * @fileoverview
 * Provides methods for the CV ui and the interactions with the CV api backend.
 */

/** google global namespace for Google projects. */
var rguillome = rguillome || {};

/** appengine namespace for Google Developer Relations projects. */
rguillome.appengine = rguillome.appengine || {};

/** cv namespace for the js api. */
rguillome.appengine.cv = rguillome.appengine.cv || {};

/**
 * Gets a CV via the API.
 * @param {string} id ID of the cv.
 */
rguillome.appengine.cv.get = function(id) {
  gapi.client.cv.get({'cvid': id}).execute(
      function(resp) {
        if (!resp.code) {
            $.get('templates/cv.mst', function(template) {
                var rendered = Mustache.render(template, resp);
                $('#target').html(rendered);
                $('#target').trigger('cvloaded');
              });
        }
      });
};

/**
 * Initializes the application.
 * @param {string} apiRoot Root of the API's path.
 */
rguillome.appengine.cv.init = function(apiRoot) {
  // Loads the OAuth and CV APIs asynchronously, and triggers login
  // when they have completed.
  var apisToLoad;
  var callback = function() {
    if (--apisToLoad == 0) {
       //Get the cv id from domain name
       var matcher = location.hostname.match('cv\.(.*)\.com');
       var cvid;
       if(matcher != null){
           cvid = matcher[1];
       }else {
           cvid = "anonymous";
       }
       rguillome.appengine.cv.get(cvid);
    }
  }

  apisToLoad = 1; // must match number of calls to gapi.client.load()
  gapi.client.load('cv', 'v1', callback, apiRoot);
};




