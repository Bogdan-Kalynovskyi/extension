;(function() {

    'use strict';

    var host = 'http://192.168.1.72:8080/api/rating/',
        userName = getLoggedUserName(),
        author = location.host.substr(0, location.host.indexOf('.')),
        postId = parseInt(location.pathname.substr(1)),
        ratings = {},
        width = 100;

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
			clickX = event.pageX - el.getBoundingClientRect().left,
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
        var commentSelector = '.b-leaf:not(.b-leaf-collapsed)',
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
											'<div class="rate_message">Click to rate</div>' +
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
	        		container = clone.childNodes[0];

	            clone.addEventListener('mouseleave', function() {
	            	hover.style.display = 'none';
	            	container.childNodes[2].style.color = '';
	            });

	            clone.addEventListener('mousemove', function(event) {
	                var elementPos = container.getBoundingClientRect(),
						eventX = event.pageX - elementPos.left;
					if (eventX < 1 || eventX > width - 1) {
		            	hover.style.display = 'none';
		            	container.childNodes[2].style.color = '';
					} else {
		            	hover.style.display = 'block';
		            	container.childNodes[2].style.color = '#eee';
	            		hover.style.left = (eventX - 8) + 'px';
	            	}
	            });

	            comment.appendChild(clone);
	        })();
        }

    }


    function injectIntoExpand() {
    	var expandLinkSelector = '.b-leaf-actions-expand > a, .b-leaf-actions-expandchilds > a',
    		expandLinks = document.querySelectorAll(expandLinkSelector);

        for (var i = 0, l = expandLinks.length; i < l; i++) {
    		expandLinks[i].addEventListener('click', function() {
    			alert();
    		});
		}
    }


    setTimeout(function() {
    	createRatingBoxes();
    	injectIntoExpand();
    }, 1000);

    ajax.get(host, {
            author: author,
            postId: postId
    	}, function() {
            //
    });

})();