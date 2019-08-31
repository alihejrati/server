"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
exports.express = express;
var bodyParser = require("body-parser");
exports.bodyParser = bodyParser;
var fileExists = require("file-exists");
exports.fileExists = fileExists;
var fileType = require("file-type");
exports.fileType = fileType;
var camelcase = require("camelcase");
exports.camelcase = camelcase;
var currentDir = require("current-dir");
exports.currentDir = currentDir;
var fs = require("fs");
exports.fs = fs;
var momentJalaali = require("moment-jalaali");
exports.momentJalaali = momentJalaali;
var persianjs = require("persianjs");
exports.persianjs = persianjs;
var objectHash = require("object-hash");
exports.objectHash = objectHash;
var cookieParser = require("cookie-parser");
exports.cookieParser = cookieParser;
var ejs = require("ejs");
exports.ejs = ejs;
var expressDevice = require("express-device");
exports.expressDevice = expressDevice;
var setCookie = require("set-cookie");
exports.setCookie = setCookie;
var simplePipeline = require("simple-pipeline");
exports.simplePipeline = simplePipeline;
var mongoose = require("mongoose");
exports.mongoose = mongoose;
var jsonStringifySafe = require("json-stringify-safe");
exports.jsonStringifySafe = jsonStringifySafe;
var redis = require("redis");
exports.redis = redis;
var mimeTypes = require("mime-types");
exports.mimeTypes = mimeTypes;
var isJson = require("is-json");
exports.isJson = isJson;
var jwtSimple = require("jwt-simple");
exports.jwtSimple = jwtSimple;
var expressip = require("express-ip");
exports.expressip = expressip;
var mongoErrorParser = require("mongo-error-parser");
exports.mongoErrorParser = mongoErrorParser;
var mongooseError = require("mongoose-error");
exports.mongooseError = mongooseError;
var objectPath = require("object-path");
exports.objectPath = objectPath;
var jsonPrettyHtml = require("json-pretty-html");
exports.jsonPrettyHtml = jsonPrettyHtml;
var uniqid = require("uniqid");
exports.uniqid = uniqid;
var directoryExists = require("directory-exists");
exports.directoryExists = directoryExists;
var svgCaptcha = require("svg-captcha");
exports.svgCaptcha = svgCaptcha;
var serveFavicon = require("serve-favicon");
exports.serveFavicon = serveFavicon;
var expressNoFavicons = require("express-no-favicons");
exports.expressNoFavicons = expressNoFavicons;
var http = require("http");
exports.http = http;
var socketIo = require("socket.io");
exports.socketIo = socketIo;
var ware = require("ware");
exports.ware = ware;
var asyncWare = require("async-ware");
exports.asyncWare = asyncWare;
var clientIp = require("client-ip");
exports.clientIp = clientIp;
var ipDeviceParser = require("ip-device-parser");
exports.ipDeviceParser = ipDeviceParser;
var nodeIpDetails = require("node-ip-details");
exports.nodeIpDetails = nodeIpDetails;
var ejsMate = require("ejs-mate");
exports.ejsMate = ejsMate;
var expressExceptionHandler = require("express-exception-handler");
exports.expressExceptionHandler = expressExceptionHandler;
var methodOverride = require("method-override");
exports.methodOverride = methodOverride;
var dateTimestampDiff = require("date-timestamp-diff");
exports.dateTimestampDiff = dateTimestampDiff;
var socketIoCookie = require("socket.io-cookie");
exports.socketIoCookie = socketIoCookie;
var cookie = require("cookie");
exports.cookie = cookie;
var request = require("request");
exports.request = request;
var nexmo = require("nexmo");
exports.nexmo = nexmo;
var kavenegar = require("kavenegar");
exports.kavenegar = kavenegar;
var app = express();
exports.app = app;
var server = require('http').createServer;
exports.server = server;
var socketioWildcard = require('socketio-wildcard');
exports.socketioWildcard = socketioWildcard;
var fastMongoose = require('fast-mongoose');
exports.fastMongoose = fastMongoose;
var expressUrlrewrite = require('express-urlrewrite');
exports.expressUrlrewrite = expressUrlrewrite;
var isPlainObject = require('is-plain-object');
exports.isPlainObject = isPlainObject;
expressExceptionHandler.handle();
