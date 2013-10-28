;(function() {

    'use strict';

    // lines above are for incapsulation purposes only


    var serviceHost = 'http://example.com',


    function htmlEntities(str) {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }


    console.log(location.href);

    function addCSS (code) {
         var s = document.createElement('style');
         s.innerHTML = code;
         document.getElementsByTagName('head')[0].appendChild(s);
    }


    function drawPopup (request, e) {

        if (popup) {
            removePopup();
        }

        popup = document.createElement('div');
        popup.className = css;
        popup.innerHTML = htmlEntities(new Date(request.responseText));
        popup.style.left = e.pageX - 5 + 'px';
        popup.style.top  = e.pageY - 5 + 'px';

        document.body.appendChild(popup);
    }


    var serviceHost = 'http://example.com',
        serviceQuery = ':8080/api/?query=';

    $.ajax(serviceURL + encodeURIComponent(location.href), {
        dataType: 'json',
        complete: function (json) {
            console.log(json);
        },
        error: function () {

        }
    });

})();
