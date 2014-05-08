var express = require('express');

var server = new express();

server.use('/', express.static(__dirname+'/app'));

server.listen("4000");
