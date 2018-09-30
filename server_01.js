var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('WEB_PAGE/editor_page.html', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })
}).listen(7777); 