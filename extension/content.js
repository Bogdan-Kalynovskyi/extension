;(function() {

    'use strict';

    var host = 'http://192.168.1.72:8080/api/rating/',
        userName = getLoggedUserName(),
        author = location.host.substr(0, location.host.indexOf('.')),
        postId = parseInt(location.pathname.substr(1)),
        ratings = {},
        width = 200;

    function htmlEntities(str) {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }


    function getLoggedUserName() {
        var el = document.querySelector('.ljuser b');

        if (el) {
                return el.innerText;
        } else {
                return null;
        }
    }


    function doRate(event) {
        var el = this,
            url = host + 'set/',
            commentId = parseInt(el.parentNode.id.substr(1)),
            clickX = getEventRelativeX(event),
            rating = (clickX - width/2) / width/2 * 100,
            data = {
                    userName: userName,
                    author: author,
                    postId: postId,
                    commentId: commentId,
                    rating: rating
            };

        ajax.get(url, data, function() {
                //
        });

        return false;
    }


    function createRatingBoxes() {
        var commentSelector = '.b-leaf',
            comments = document.querySelectorAll(commentSelector),
            ratingBarPrototype = document.createElement('div'),
            clone,
            hover,
            comment,
            commentId,
            rating;

		ratingBarPrototype.innerHTML =  '<div class="rating">' +
											'<a href=# class="plus"></a>' +
											'<div class="hover"></div>' +
										'</div>';

        for (var i = 0, l = comments.length; i < l; i++) {
            clone = ratingBarPrototype.cloneNode(true);

            comment = comments[i];
            commentId = parseInt(comment.parentNode.id.substr(1)),
            rating = ratings[commentId];
            if (rating !== undefined) {
				clone.childNodes[0].style.background = 'red';
            	clone.childNodes[0].childNodes[0].style.left = (rating - 100) / 200 * width + 'px';
            }
            clone.addEventListener('click', doRate);

            (function() {
	        	var hover = clone.childNodes[0].childNodes[1],
	        		container = clone;

	            clone.addEventListener('mouseenter', function() {
	            	hover.style.display = 'block';
	            });
	            clone.addEventListener('mouseleave', function() {
	            	hover.style.display = 'none';
	            });
	            clone.addEventListener('mousemove', function(event) {
	                var elementPos = container.getBoundingClientRect(),
						eventX = event.clientX - elementPos.left;
	            	hover.style.left = (eventX - 12) + 'px';
	            });

	            comment.appendChild(clone);
	        })();
        }

    }


    setTimeout(createRatingBoxes, 2000);

    ajax.get(host, {
            author: author,
            postId: postId
    	}, function() {
            //
    });

})();