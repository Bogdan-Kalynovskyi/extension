var ajax = {};

ajax.send = function(url, method, data, callback, error) {
    var x = new XMLHttpRequest();
    x.open(method, url);
    x.onreadystatechange = function() {
        if (x.readyState === 4) {
	        if (x.status === 200) {
	            callback && callback(x.responseText);
	        } else {
	        	error && error(x.responseText);
	        }
        }
    };
    if (method === 'POST') {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    if (data !== undefined) {
    	x.send(data);
    }
};

ajax.get = function(url, data, callback, error) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + '?' + query.join('&'), 'GET', undefined, callback, error);
};

ajax.post = function(url, data, callback, error) {
	if (typeof data === 'object' && data !== null) {
		data = JSON.stringify(data);
	}
    ajax.send(url, 'POST', data, callback, error);
};
