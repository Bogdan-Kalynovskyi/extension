alert("hello");
var r = new XMLHttpRequest();
r.open("GET", "http://localhost/data.json")
r.onreadystatechange = function() {
if (r.readyState == 4 ) {
		document.getElementById("resp").innerText = r.responseText;
	}
}
r.send();