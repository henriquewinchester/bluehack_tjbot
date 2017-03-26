/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var TJBot = require('tjbot');
var config = require('./config');
var request = require("request");

// obtain our credentials from config.js
var credentials = config.credentials;

// obtain user-specific config
var WORKSPACEID = config.conversationWorkspaceId;

// these are the hardware capabilities that TJ needs for this recipe
var hardware = ['led', 'microphone', 'speaker'];

// turn on debug logging to the console
var tjConfig = {
    verboseLogging: true
};

// instantiate our TJBot!
var tj = new TJBot(hardware, tjConfig, credentials);


// full list of colors that TJ recognizes, e.g. ['red', 'green', 'blue']
var tjColors = tj.shineColors();


// listen for utterances with our attentionWord and send the result to
// the Conversation service
tj.speak("Diga o nome de 3 animais marinhos.");
console.log("Diga o nome de 3 animais marinhos.");

tj.sleep(3000);
console.log("Aguardando resposta...");
tj.listen(function(msg) {
//    console.log(msg);
    console.log("http://tjhackers-rednode.mybluemix.net/question1?msg=" + msg);
    // send to the conversation service
    request
        .get('http://tjhackers-rednode.mybluemix.net/question1?msg=' + msg)
        .on('response', function(response) {
            console.log(response.statusCode) // 200
            console.log(response.headers['content-type']) // 'image/png'
        })
});


tj.sleep(5000);
tj.speak("Diga o nome de 3 planetas do sistema solar.");
console.log("Diga o nome de 3 planetas do sistema solar.");

tj.sleep(4000);
console.log("Aguardando resposta...");
tj.listen(function(msg) {    
    console.log(msg);
    // send to the conversation service
    request("http://tjhackers-rednode.mybluemix.net/question2?msg=" + msg, function (error, response, body) {
        console.log(response);
        tj.speak(response);
    });
});

tj.sleep(5000);
tj.speak("Descreva uma ave.");
console.log("Descreva uma ave.");

tj.sleep(2000);
console.log("Aguardando resposta...");
tj.listen(function(msg) {
    console.log(msg);
    // send to the conversation service
    request("http://tjhackers-rednode.mybluemix.net/question3?msg=" + msg, function (error, response, body) {
        console.log(response);
        tj.speak(response);
    });
});

