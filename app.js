﻿'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get("/existingFile", function (req, res) {
	console.log("Handle get request: request existing file name");
	var responceText = '';
	var targetDir = process.cwd() + '/public/data';
	console.log("Taregt dir: " + targetDir);
	fs.readdir(targetDir, (err, files) => {
		files.forEach(file => {
			var temp = file + '\n';
			responceText += temp;
			//console.log(file);
		})
		//console.log("Responce text: " + responceText);
		console.log("Responce request: existing files name list")
		res.send(responceText);
	});
	//console.log("Responce text: " + responceText);
	//res.send(responceText);
});


app.post('/getFile', function (req, res) {
	console.log("Handle post request: request file");
	var targetDir = process.cwd() + '/public/data/';
	var targetFile = targetDir + req.body.filename;
	console.log("Target file: " + targetFile);
	fs.readFile(targetFile, 'utf-8', function (err, data) {  //!
		if (err) {
			console.log("Read file: " + targetFile + " failed.");
		} else {
			console.log("Read file: " + targetFile + " successed.");
			res.send(data);
			console.log("data: " + data);
		}
	})
})


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.set('port', process.env.PORT || 3000);



var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
