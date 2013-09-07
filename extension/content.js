;(function() {

    'use strict';

    // lines above are for incapsulation purposes only


    var serviceHost = 'http://nearbyfuture.com',
        serviceQuery = ':8080/api/?query=';

    console.log(location.href);

    $.ajax(serviceHost + serviceQuery + encodeURIComponent(location.href), {
        dataType: 'json',
        complete: function (json) {
            console.log(json);
        }
    });

})();