var xmlhttp = new XMLHttpRequest();

function submitCode() {
	var data = new Array();
	//console.log(document.getElementsByName('code')[0].value)
	data[0] = document.getElementsByName('code')[0].value;
	data[1] = document.getElementsByName('filename')[0].value;
	data[2] = document.getElementsByName('folder')[0].value;
	console.log("Code:\n" + data[0] + "\nFile name:\n" + data[1] + "\nFolder:\n" + data[2]);
	postData('postcode', data);
}

function clearCode() {
	if (confirm("Warning: Your code will be cleared!")) {

	}
}

function postData(path, data) {
	var form = document.createElement("form");
	form.setAttribute('method', "post");
	form.setAttribute('action', path);
	var dataType = ['code', 'filename', 'folder'];
	for (var i = 0; i < 3; ++i) {
		var input = document.createElement("input");
		input.setAttribute(dataType[i], data[i]);
		form.appendChild(input);
	}
	document.body.appendChild(form);
	form.submit();
}

function showExistingFile() {

}

function loadExistingFileName() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		console.log("Get response.")
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			//document.getElementById("existingFileName").innerHTML = xmlhttp.responseText;
			var template = '<option value="example">example</option>\n';
			var generateHTML = "";
			var fileNameList = xmlhttp.responseText.split("\n");
			fileNameList.pop();
			console.log(fileNameList);
			for (var i = 0; i < fileNameList.length; i++) {
				generateHTML += template.replace(/example/g, fileNameList[i]);
			}
			console.log("generateHTML: " + generateHTML);

			document.getElementById('existingFileName').innerHTML = generateHTML;
		}
	}
	xmlhttp.open("GET", '/existingFile', true);
	xmlhttp.send();
}

window.onload = function () {
	this.console.log("All done.")
}