;(function() {

    'use strict';

    var popup,
        css = '_lj_popup' + Date.now();

<<<<<<< HEAD
    var serviceHost = 'http://nearbyfuture.com',
        serviceQuery = ':8080/api/?query=';
=======

    function htmlEntities(str) {
        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
>>>>>>> everything that is not needed must die

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


    function removePopup () {
        $(popup).fadeOut(400, function() {
            if (popup === this) {
                popup = null;
                document.body.removeChild(this);
            }
        });
    }


    addCSS('.' + css + '{\
        position: absolute;\
        padding: 5px 10px 3px 10px;\
        border-radius: 7px;\
        border: 1px solid #BFBFBF;\
        color: #444;\
        font-size: 16px;\
        text-shadow: 0 1px 0 #FFF; 0 -1px 0 rgba(0,0,0,.2);\
        box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, .1);\
        background-color: #EEE;\
        background-image: linear-gradient(bottom, #CCC 0%, #EEE 81%);\
        background-image: -moz-linear-gradient(bottom, #CCC 0%, #EEE 81%);\
        background-image: -webkit-linear-gradient(bottom, #CCC 0%, #EEE 81%);\
        background-image: -ms-linear-gradient(bottom, #CCC 0%, #EEE 81%);\
        background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0, #CCC),color-stop(0.81, #EEE));\
    }');


    document.body.addEventListener('mouseup', function (e) {

        if (popup !== e.target) {

            var selectionText = window.getSelection().toString().trim();

            if (selectionText) {
                $.ajax("http://timeapi.org/pdt/" + encodeURIComponent(selectionText), {
                    dataType: 'text',
                    complete: function (request) {
                        drawPopup(request, e);
                    }
                });
            }
        }
    });


    document.body.addEventListener('mousedown', function (e) {
        if (popup && popup !== e.target) {
            removePopup();
        }
    });

})();