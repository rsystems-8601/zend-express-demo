var express = require('express');
var router = express.Router();
var urlDD = require('url');
var request = require("request");
var moment = require('moment');

function oauth(){

  console.log('hello o auth');

}

function token(){

  console.log('token is important');

}

module.exports = {token,oauth,urlDD,request,moment,router};