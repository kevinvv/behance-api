
(function() {
	var cb = "bh";
	for(var i=0; i<20; i++) {
		cb += Math.floor(Math.random()*10);	
	}
	window[cb] = function(e) {
		if(!window.BEHANCE_DOM) var d = document.querySelector("#behance");
		else var d = document.querySelector(window.BEHANCE_DOM);
		if(e.responseStatus === 200) {
			var title = e.responseData.feed.title;
 
			title = '<a href="http://be.net/' + BEHANCE_USER + '"><img src="http://assets.behance.net/img/portfolio/badges/badges/be-badge-small.png"></a>' + title;
 
			var link = e.responseData.feed.link;
			var body = "";
			for(var i=0; i<e.responseData.feed.entries.length; i++) {
				var entry = e.responseData.feed.entries[i];
				var content = entry.content.replace(/style=".*?"/, "");
                var arr = content.split('<br> ');
                var img = arr[0];
                var txt = "<div class='btext'>" + entry.contentSnippet + "</div>";  
                
				body += "<div class='col-lg-3 col-md-4 col-sm-6 behancea'><div class='holder'><a href='" + entry.link + "' class='titleLink'>" + entry.title + "</a><br/><a href='" + entry.link + "'><div class='behance_entry'><p>" + img + txt + "</p></div></a></div></div>";
			}
			var result = "<div class='behance_main'>";
				result += "<div class='behance_entries'>" + body + "</div></div>";
			d.innerHTML = result;
			
		} else {
			d.innerHTML = "<div class='behance_main'><p>Sorry, we couldn't load the Behance feed.</p></div>";
		}
	}
 
	if(!BEHANCE_USER) return;
 
 
	var url = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http%3A//www.behance.net/" + BEHANCE_USER + ".xml&num=10&v=1.0&callback="+cb;
    console.log(!window.BEHANCE_DOM);
	
	var script = document.createElement("script");
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
	
	//append CSS
	
	var css = document.createElement("style");
	css.type = "text/css";
	
	
}());