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
  ],
  [
    "question2",
    "Diga o nome de 3 planetas do sistema solar."
  ],
  [
    "question3",
    "Descreva uma ave."
  ]
];



var next = true;
// listen for speech
tj.listen(function(msg) {
    var containsTurn = msg.indexOf("turn") >= 0;
    var containsChange = msg.indexOf("change") >= 0;
    var containsSet = msg.indexOf("set") >= 0;
    var containsLight = msg.indexOf("the light") >= 0;
    var containsDisco = msg.indexOf("disco") >= 0;

    if ((containsTurn || containsChange || containsSet) && containsLight) {
        // was there a color uttered?
        var words = msg.split(" ");
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (colors[word] != undefined || word == "on" || word == "off") {
                // yes!
                tj.shine(word);
                break;
            }
        }
    } else if (containsDisco) {
        // discoParty();
    }
});

