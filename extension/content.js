;(function() {

    'use strict';

    function getData() {
	    var href = location.href.substr(7);

    	if (href.substr(-1) === '/') {
    		href = href.substr(0, href.length - 1);
    	}

    	href = href.replace('/', '.').split('.');

    	return {
    		userName: getLoggedUserName(),
	        postAuthor: href[0],
	        postId: parseInt(href[3])
	    }
    }


    function expand(o1, o2) {
    	for (var p2 in o2) {
    		o1[p2] = o2[p2];
    	}
    	return o1;
    }


    var api = 'http://nearbyfuture.com:7005/api/',
        ratings,
        width = 100;


    function htmlEntities(str) {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }



    function getLoggedUserName() {
        if (isLoggedIn) {
            return document.querySelector('.ljuser b').innerText;
        } else {
            return null;
        }
    }


    function doRate(event) {
        var el = this,
            url = api + 'rating/set/',
            commentId = parseInt(el.parentNode.parentNode.id.substr(5)),
			clickX = event.pageX - el.childNodes[0].getBoundingClientRect().left,
            rating = Math.round((clickX - width/2) / width/2 * 100),
            data = expand(pageData, {
                    commentId: commentId,
                    rating: rating
            });

        ajax.get(url, data, function(response) {

            response = JSON.parse(response);
            if (response.status == 'ok') {
				el.childNodes[0].style.background = 'red';
            	el.childNodes[0].childNodes[0].style.left = (100 - rating) / 200 * width + 'px';
            } else {

            }
        });

        return false;
    }


    function createRatingBoxes() {
        var commentSelector = '.comment-head',
            comments = document.querySelectorAll(commentSelector),
            ratingBarPrototype = document.createElement('div'),
            clone,
            hover,
            comment,
            commentId,
            rating;

		ratingBarPrototype.innerHTML =  '<div class="rating">' +
											'<div class="plus"></div>' +
											'<div class="hover"></div>' +
											'<div class="rate_message">Click to rate</div>' +
										'</div>';

        for (var i = 0, l = comments.length; i < l; i++) {
            clone = ratingBarPrototype.cloneNode(true);

            comment = comments[i];
            comment.style.position = 'relative';
            commentId = parseInt(comment.parentNode.id.substr(5)),
            rating = ratings[commentId];
            if (rating !== undefined) {
				clone.childNodes[0].style.background = 'red';
            	clone.childNodes[0].childNodes[0].style.left = (100 - rating.rating) / 200 * width + 'px';
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


    function main() {
	    	createRatingBoxes();
	    	injectIntoExpand();
    }


    function doTimeout() {
		setTimeout(function() {
			var commentsLoaded = document.querySelector('.entry-comments-text').childNodes.length;

			console.log(commentsLoaded);

	    	if (ratings && commentsLoaded > 20) {
	    		main();
	    	} else {
	    		doTimeout();
	    	}
	    }, 200);

    }


    var isLoggedIn = !document.getElementById('login_user');
   
    var pageData = getData();


    if (isLoggedIn && pageData.postId) {
	 
	    doTimeout();

	    ajax.get(api + 'rating/get/', pageData, function (response) {
		    	response = JSON.parse(response);
	            if (response.status == 'ok') {
	            	ratings = response.comments;
	            } else {

	            }
	    });
	}

})();