var request_queue0 = new Array();
var request_queue1 = new Array();

function recvXMLRequest()
{
	//alert('httpRequest.readyState===========:'+httpRequest.readyState+httpRequest.status);
	//iPanel.ioctlWrite('printf', 'httpRequest.readyState===========:'+httpRequest.readyState+httpRequest.status+'\n');
	if (httpRequest.readyState==4 && httpRequest.status==200) {
		request_queue1[0]();
		request_queue0.shift();
		request_queue1.shift();
		while (typeof(request_queue0[0])!='string') {
			request_queue0.shift();
			request_queue1.shift();
			if (request_queue0.length<=0) {
				break;
			}
		}
		if (request_queue0.length>=1) {
			setTimeout('sendXMLRequest()', 10);
		}
		else {
			request_queue0.length = 0;
			request_queue1.length = 0;
		}
	}
	return;
}

function sendXMLRequest()
{
	while (typeof(request_queue0[0])!='string') {
		request_queue0.shift();
		request_queue1.shift();
		if (request_queue0.length<=0) {
			break;
		}
	}
	if (request_queue0.length>=1 && typeof(request_queue0[0])=='string') {
		httpRequest.onreadystatechange = recvXMLRequest;
		httpRequest.open('GET', request_queue0[0], true);
		httpRequest.send(null);
	}
	else {
		request_queue0.length = 0;
		request_queue1.length = 0;
	}
	return;
}

function insert_into_queue(url_value, func_name)
{
	if (typeof(url_value)!='string' || typeof(func_name)!='function') {
		return false;
	}
	if (request_queue0.length<=10) {
		request_queue0[request_queue0.length] = url_value;
		request_queue1[request_queue1.length] = func_name;
	}
	else {
		return false;
	}
	if (typeof(request_queue0[request_queue0.length-1])!='string') {
		return false;
	}
	if (request_queue0.length==1 || request_queue0.length>=11) {
		setTimeout('sendXMLRequest()', 10);
	}
	return true;
}
