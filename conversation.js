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
var hardware = ['servo', 'microphone', 'speaker'];

// turn on debug logging to the console
var configuration = {
    robot: {
	gender: 'female',
        name: 'Isabela'
    },
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

var id = 0;
tj.wave();
tj.listen(function(msg) {
	console.log(msg);
	if(msg.startsWith("olá")) {
		tj.speak(questions[id][1]);
	}

	if(msg.toLowerCase().startsWith("isabella")) {
		console.log("Isabella");
		const ENDPOINT = questions[id][0] + "?msg=" + msg;

        	var fullUrl = BASEURL + ENDPOINT;

       		request(fullUrl, function(error, response, body) {
          		console.log(body);
			if(body.startsWith("Acertou")) {
				tj.wave();
			}
          		tj.speak(body).then(function() {
				id++;
				if(id == questions.length) {
					tj.speak("Muito bem, até mais!").then(function() {
					tj.stopListening();
					});
				}
			});
		});
	}
});
