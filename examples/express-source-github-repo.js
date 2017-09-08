var microcule = require('../');
var express = require('express');
var app = express();

var logger = require('../lib/plugins/logger');
var mschema = require('../lib/plugins/mschema');
var bodyParser = require('../lib/plugins/bodyParser');
var sourceGithubGist = require('../lib/plugins/sourceGithubGist');
var spawn = require('../lib/plugins/spawn');
var sourceGithubRepo = require('../lib/plugins/sourceGithubRepo');

app.use(logger());

// hello worlds
var lang = "python";
app.get('/' + lang, sourceGithubRepo({
  token: process.env.GIT_TOKEN,
  repo: "smapira/microcule-examples",
  branch: "master",
  main: lang + "/index.py"
}));
app.get('/' + lang, bodyParser());
app.get('/' + lang, spawn({
  language: lang
}));

lang = "ruby";
app.get('/' + lang, sourceGithubRepo({
  token: process.env.GIT_TOKEN,
  repo: "smapira/microcule-examples",
  branch: "master",
  main: lang + "/index.rb"
}));
app.get('/' + lang, bodyParser());
app.get('/' + lang, spawn({
  language: lang
}));

lang = "download";
app.get('/' + lang, sourceGithubRepo({
  token: process.env.GIT_TOKEN,
  repo: "smapira/microcule-examples",
  branch: "master",
  main: "python3-tensorflow/download.rb"
}));
app.get('/' + lang, bodyParser());
app.get('/' + lang, spawn({
  language: "ruby"
}));

lang = "ocaml";
app.get('/' + lang, sourceGithubRepo({
  token: process.env.GIT_TOKEN,
  repo: "smapira/microcule-examples",
  branch: "master",
  main: lang + "/index.ml"
}));
app.get('/' + lang, bodyParser());
app.get('/' + lang, spawn({
  language: lang
}));

lang = "tensorflow";
app.get('/' + lang, sourceGithubRepo({
  token: process.env.GIT_TOKEN,
  repo: "smapira/microcule-examples",
  branch: "master",
  main: "python3-tensorflow/mnist_softmax.py"
}));
app.get('/' + lang, bodyParser());
app.get('/' + lang, spawn({
  language: "python"
}));

lang = "tf_image";
app.get('/' + lang, sourceGithubRepo({
  token: process.env.GIT_TOKEN,
  repo: "smapira/microcule-examples",
  branch: "master",
  main: "python3-tensorflow/classify_image.py"
}));
app.get('/' + lang, bodyParser());
app.get('/' + lang, spawn({
  language: "python"
}));

var rust_service = {
  language: 'rust',
  code: require('fs').readFileSync(__dirname + '/services/hello-world/hello.rs').toString()
};
spawn = microcule.plugins.spawn(rust_service);
app.get('/' + rust_service.language, function(req, res, next){
  spawn(req, res, next);
});

app.use(function (req, res, next) {
  console.log('post process service');
  res.end();
});
app.listen(3000, function () {
  console.log('server started on port 3000');
});
