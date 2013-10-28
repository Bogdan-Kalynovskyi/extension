;(function() {

    'use strict';

    // lines above are for incapsulation purposes only


    var serviceURL = 'http://nearbyfuture.com:8080/api/?query=';

    $.ajax(serviceURL + encodeURIComponent(location.href), {
        dataType: 'json',
        complete: function (json) {
            console.log(json);
        },
        error: function () {

        }
    });

})();