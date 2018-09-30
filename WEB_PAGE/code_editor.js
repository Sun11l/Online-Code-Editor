
function submitCode(){
    var data = new Array();
    //console.log(document.getElementsByName('code')[0].value)
    data[0] = document.getElementsByName('code')[0].value;
    data[1] = document.getElementsByName('filename')[0].value;
    data[2] = document.getElementsByName('folder')[0].value;
    console.log("Code:\n"+data[0]+"\nFile name:\n"+data[1]+"\nFolder:\n"+data[2]);
    postData('postcode', data);
}

function clearCode(){
    if(confirm("Warning: Your code will be cleared!")){
        
    }
}

function postData(path, data){
    var form = document.createElement("form");
    form.setAttribute('method', "post");
    form.setAttribute('action', path);
    var dataType = ['code', 'filename', 'folder'];
    for(var i = 0;i<3;++i){
        var input = document.createElement("input");
        input.setAttribute(dataType[i], data[i]);
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}