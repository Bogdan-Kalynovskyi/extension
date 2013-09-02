    document.body.addEventListener('mouseup', function (e) {

        function htmlEntities(str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&quot;');
        }

        function drawPopup (json) {
            var s = document.createElement('div');
            s.className = 'btn123';
            s.innerHTML = htmlEntities(new Date(json.responseText));
            s.style.left = e.pageX - 5;
            s.style.top  = e.pageY - 5;

            document.body.appendChild(s);
        }


        var selectionText = window.getSelection().toString();

        if (selectionText) {

            $.ajax("http://timeapi.org/pdt/" + encodeURIComponent(selectionText), {
                dataType: 'text',
                complete: drawPopup
            });

        }
    });


    document.body.addEventListener('mousedown', function (e) {

        var s = document.getElementsByClassName('btn123')[0];

        if (s && e.target !== s) {
            document.removeChild(s);
        }
    });
