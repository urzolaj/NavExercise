/** Global variables */
container = document.getElementById('container');
offcanvas = document.getElementById('offcanvas');
overlay = document.getElementById('overlay');

/** Setting AJAX requests */
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
	try {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var data = JSON.parse(xmlhttp.responseText);
	        handleData(data);
	    }
	} catch(e) {
	    console.log('Opening new page');
	}
}
xmlhttp.open("GET", '/api/nav.json', true);
xmlhttp.send();

/** Populating data for navigation menus */
function handleData(navText) {

	function generateMenu(items) {
		var ul = document.createElement('ul');
		items.forEach(function(item) {

			var li = document.createElement('li');
		    var a = document.createElement('a');

		    a.title = item.label;
		    a.appendChild(document.createTextNode(item.label));

		    if (item.items && item.items.length > 0){
		    	a.href = item.url;
		    	li.className = 'dropdown';
		    	li.setAttribute('onclick','toggleOpen(this)');
		    	li.appendChild(a);
		    	li.appendChild(generateMenu(item.items));
		    }
		    else{
		    	if (item.url.substring(0, 1) == '#') { 
				  item.url = item.url.substring(1);
				}
				a.href = item.url;
		    	a.setAttribute('onclick','openNew(this)');
		    	li.appendChild(a);
		    }

		    ul.appendChild(li);
		});
		return ul;
	}
	var scroller = document.createElement('div');
	scroller.className = "scroller";
	menunav = generateMenu(navText.items);
	menunav.id = 'menunav';
	document.getElementById('menu').appendChild(menunav);
	scroller.appendChild(generateMenu(navText.items));
	var copyText = document.createElement('span');
	copyText.className = "copy";
	copyText.innerHTML = '&copy; 2014 Huge. All Rights Reserved.';
	scroller.appendChild(copyText);
	offcanvas.appendChild(scroller);
}

/** This function Closes menu dropdowns on header */
function closeDropdowns(){
	var dropdowns = document.getElementsByClassName('dropdown');
	for (var i=0; i < dropdowns.length; i++){
		if (dropdowns[i].classList.contains("open")) {
			dropdowns[i].classList.remove("open");
			break;
		}
	}
}

/** This function shows/hides the offcanvas menu */
function toggleMenu() {
	if (container.className == 'nav') {
		overlay.className = '';
		container.className = '';
		setTimeout(function () {
			offcanvas.className = '';
		}, 300);
	}
	else {
		closeDropdowns();
		overlay.className = 'visible';
		offcanvas.className = 'visible';
		container.className = 'nav';
	}	
}

/** This function shows/hides the secondary navigation menus */
function toggleOpen(item) {
	var className = ' ' + item.className + ' ';
	fromHeader = false;
	if (item.parentNode.id == 'menunav') {
		var fromHeader = true;
	}
    if ( ~className.indexOf(' open ') ) {
        item.className = className.replace(' open ', ' ');
        if (fromHeader) {
			overlay.className = '';
		}
    } else {
        if (fromHeader) {
        	closeDropdowns();
			overlay.className = 'visible';
		}
        item.className += ' open';
    }
}

/** This function listen click events on the traslucent overlay */
function maskClick(){
	if (offcanvas.className == 'visible') {
		toggleMenu();
	}
	else{
		closeDropdowns();
	}
	overlay.className = '';
}

/** This function sends an AJAX request when loading a new page */
function openNew(item) {
	console.log('Clicking on '+item.href+' page link');
	xmlhttp.open("GET",item.href, true);
	xmlhttp.send();
}