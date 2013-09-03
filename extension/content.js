;(function() {

    'use strict';

    // lines above are for incapsulation purposes only

    // this function is to prevent data be executed as HTML (unused now)
    /*function htmlEntities(str) {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }*/


    var serviceHost = 'http://example.com',
        serviceQuery = ':8080/api/?query=';

    $.ajax(serviceHost + serviceQuery + encodeURIComponent(location.href), {
        dataType: 'json',
        complete: function (json) {
            console.log(json);
        }
    });

})();