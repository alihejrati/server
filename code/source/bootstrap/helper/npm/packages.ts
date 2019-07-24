import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fileExists from 'file-exists';
import * as fileType from 'file-type';
import * as camelcase from 'camelcase';
import * as currentDir from 'current-dir';
import * as fs from 'fs';
import * as momentJalaali from 'moment-jalaali';
import * as persianjs from 'persianjs';
import * as objectHash from 'object-hash';
import * as cookieParser from 'cookie-parser';
import * as ejs from 'ejs';
import * as expressDevice from 'express-device';
import * as setCookie from 'set-cookie';
import * as simplePipeline from 'simple-pipeline';
import * as mongoose from 'mongoose';
import * as jsonStringifySafe from 'json-stringify-safe';
import * as redis from 'redis';
import * as mimeTypes from 'mime-types';
import * as isJson from 'is-json';
import * as jwtSimple from 'jwt-simple';
import * as expressip from 'express-ip';
import * as mongoErrorParser from 'mongo-error-parser';
import * as mongooseError from 'mongoose-error';
import * as objectPath from 'object-path';
import * as jsonPrettyHtml from 'json-pretty-html';
import * as uniqid from 'uniqid';
import * as directoryExists from 'directory-exists';
import * as svgCaptcha from 'svg-captcha';
import * as serveFavicon from 'serve-favicon';
import * as expressNoFavicons from 'express-no-favicons';
import * as http from 'http';
import * as socketIo from 'socket.io';
import * as ware from 'ware';
import * as asyncWare from 'async-ware';
import * as clientIp from 'client-ip';
import * as ipDeviceParser from 'ip-device-parser';
import * as nodeIpDetails from 'node-ip-details';

const app = express();
const server = require('http').createServer;
const socketioWildcard = require('socketio-wildcard');
const fastMongoose = require('fast-mongoose');

export {
    app,
    server,
    socketioWildcard,
    express,
    bodyParser,
    fileExists,
    fileType,
    camelcase,
    currentDir,
    fs,
    momentJalaali,
    persianjs,
    objectHash,
    cookieParser,
    ejs,
    expressDevice,
    setCookie,
    simplePipeline,
    mongoose,
    jsonStringifySafe,
    redis,
    mimeTypes,
    isJson,
    jwtSimple,
    expressip,
    mongoErrorParser,
    mongooseError,
    objectPath,
    jsonPrettyHtml,
    uniqid,
    directoryExists,
    svgCaptcha,
    serveFavicon,
    expressNoFavicons,
    http,
    socketIo,
    ware,
    asyncWare,
    fastMongoose,
    clientIp,
    ipDeviceParser,
    nodeIpDetails
};