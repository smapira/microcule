var microcule = require('../');
var express = require('express');
var app = express();

var logger = require('../lib/plugins/logger');
var mschema = require('../lib/plugins/mschema');
var bodyParser = require('../lib/plugins/bodyParser');
var sourceGithubGist = require('../lib/plugins/sourceGithubGist');
var spawn = require('../lib/plugins/spawn');
var sourceGithubRepo = require('../lib/plugins/sourceGithubRepo');

var handler = spawn({
  // code: nodeService,
  language: "python"
});

app.use(logger());


// source from github repo
app.use(sourceGithubRepo({
  token: process.env.GIT_TOKEN,
  repo: "smapira/microcule-examples",
  branch: "master",
  main: "python3-tensorflow/mnist_softmax.py"
}));

app.use(bodyParser());
app.use(mschema({
  "hello": {
    "type": "string",
    "required": true
  }
}));
app.use(handler);
app.use(function(req, res, next){
  console.log('post process service');
  res.end();
});

app.listen(3000, function () {
  console.log('server started on port 3000');
});