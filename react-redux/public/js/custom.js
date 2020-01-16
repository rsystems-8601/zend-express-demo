function getIframeData() {    
	var str = window.location;
    var url = str.protocol+"//"+str.host + str.pathname;
    return url;   
}
function getDefaultRoute(){
	return '/';
}