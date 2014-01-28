;(function() {

    'use strict';

	var host = 'http://192.168.1.72:8080/api/rating/',
		userName = getLoggedUserName(),
		author = location.host.substr(0, location.host.indexOf('.')),
		postId = parseInt(location.pathname.substr(1));


	function htmlEntities(str) {
		return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}


    function getLoggedUserName() {
    	var hiddenInput = document.querySelector('#Greeting input[name=user]');

    	if (hiddenInput) {
    		return hiddenInput.value;
    	} else {
    		return null;
    	}
    }


	function doRate(event) {
		var el = this,
			url = host + 'set/',
			commentId = parseInt(el.parentNode.id.substr(1)),
			elementData = el.getBoundingClientRect(),
			width = elementData.width,
			clickX = event.pageX - elementData.left,
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
	}


    function createRatingBoxes() {
    	var commentHeaderCssQuery = '.commentHeader',	// we inject rating bar in comment header
    		allHeaders = document.querySelectorAll(commentHeaderCssQuery),
    		ratingBarPrototype = document.createDocumentFragment(),
    		clone,
    		header,
    		commentId;

		ratingBarPrototype.innerHTML =  '<div class="rating"></div>';

		for (var i = 0, l = allHeaders.length; i < l; i++) {
			clone = ratingBarPrototype.cloneNode(true);
			clone.childNodes[0].addEventListener('click', doRate);

			header = allHeaders[i];
			commentId = parseInt(header.parentNode.id.substr(1)),
			header.appendChild(clone);
		}

    }


    ajax.get(host, {
	    	author: author,
	    	postId: postId
	    }, function() {
	    	//
    });

})();