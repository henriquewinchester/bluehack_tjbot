var TJBot = require('tjbot'),
    config = require('./config'),
    request = require('request');

// obtain our credentials from config.js
var credentials = config.credentials;

// obtain user-specific config
const WORKSPACEID = config.conversationWorkspaceId;

// Base Api URL
const BASEURL = "https://tjhackers-rednode.mybluemix.net/";

// these are the hardware capabilities that TJ needs for this recipe
var hardware = ['microphone', 'speaker'];

// turn on debug logging to the console
var configuration = {
    verboseLogging: true,
    listen: {
        language: 'pt-BR'
    },
    speak: {
        language: 'pt-BR'
    },
    voice: 'pt-BR_IsabelaVoice'
};

// instantiate our TJBot!
var tj = new TJBot(hardware, configuration, credentials);
var questions = [
  [
    "question1",
    "Diga o nome de 3 animais marinhos."
  ]
];

tj.listen(function(msg) {
  tj.speak("Oi eu sou o TJBot(Voz Isabela). E estou escutando...");

  for (var i = 0; i < questions.length; i++) {
    tj.listen(function(msg) {
      if (msg.toLowerCase().startsWith("Okay")) {
        const ENDPOINT = element[i][0] + "?msg=" + msg;

        var fullUrl = BASEURL + ENDPOINT;

        request(fullUrl, function(error, response, body) {
          console.log(body);
          tj.speak("Voce: " + body);
        });

        console.log("HTTP Request: " + fullUrl + " \n");
      }
    });
  }
});

