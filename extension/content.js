;(function() {

    'use strict';

    var api = 'http://nearbyfuture.com:7005/api/',
        userName = getLoggedUserName(),
        postAuthor = location.host.substr(0, location.host.indexOf('.')), //or document.querySelector('.ljuser')
        postId = parseInt(location.pathname.substr(1)),
        ratings = {},
        width = 100;

    function htmlEntities(str) {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }


    var isLoggedIn = !document.getElementById('login_user');
   

    function getLoggedUserName() {
        if (isLoggedIn) {
            return null;
        } else {
            return document.querySelector('.ljuser b').innerText;
        }
    }


    function doRate(event) {
        var el = this,
            url = api + 'rating/set/',
            commentId = parseInt(el.parentNode.id.substr(1)),
			clickX = event.pageX - el.getBoundingClientRect().left,
            rating = (clickX - width/2) / width/2 * 100,
            data = {
                    userName: userName,
                    postAuthor: postAuthor,
                    postId: postId,
                    commentId: commentId,
                    rating: rating
            };

        ajax.get(url, data, function(response) {

            debugger;
            response = JSON.parse(response);
            if (response.status == 'ok') {
            	
            } else {

            }
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

            (function() {
	        	var hover = clone.childNodes[0].childNodes[1],
	        		container = clone.childNodes[0];

	            comment.appendChild(clone);

	            clone.addEventListener('click', doRate);

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


    if (isLoggedIn) {
	    setTimeout(function() {
	    	createRatingBoxes();
	    	injectIntoExpand();
	    }, 2000);

	    ajax.get(api + 'rating/get/', {
	    		userName: userName,
	            postAuthor: postAuthor,
	            postId: postId
	    	}, function (response) {
		    	response = JSON.parse(response);
	            if (response.status == 'ok') {
	            	ratings = response.comments;
	            } else {

	            }
	    });
	}

})();