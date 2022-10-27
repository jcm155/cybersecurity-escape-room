currentVideo = document.getElementById("current-video");
chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#0123456789{} "
allowedCodes = [
    '63-8-13-8-19-8-0-11-64',
    '10-8-13-6-65-15-0-22-13',
    '17-20-13-65-1-0-2-10-3-14-14-17',
    '15-20-17-17-18-22-14-17-3',
    '63-11-14-18-18-64'
];
videoLinks = [
    'https://drive.google.com/file/d/1Tqoq4XAELbKyUk8mfEYlByda3yjlZ8VX/preview',
    'https://drive.google.com/file/d/1hs67zLjd9S5ph9CnE-SKR2g5xHVoIGI-/preview',
    'https://drive.google.com/file/d/1Omvv2PiYCI-yPa1kPjl0OXAuOsdk_HL9/preview',
    'https://drive.google.com/file/d/1GuMY7BTZQOUHO2vFz62DeIGOHQOFpkGr/preview',
    'https://drive.google.com/file/d/1hf40BGx3WgF2pb2P0PW0_jJ17RIkekS-/preview'
];
allSavedCodes = ['{INITIAL}'];
allCorrectCodes = [
    correctCode('initial'),
    correctCode('puzzle2'),
    correctCode('puzzle3'),
    correctCode('win'),
    correctCode('loss'),
];
totalNumMinutes = 40;
endTime = new Date(new Date().getTime() + totalNumMinutes * 60000);
gameState = 'play';
teamName = '';

function updateVideo(code) {
    if (allCorrectCodes.includes(code) && gameState === 'play') {
        currentVideo.src = videoLinks[allCorrectCodes.indexOf(code)];
        if (code === allCorrectCodes[3]) {
            gameState = 'win';
            clearInterval(x);
        }
        if (code === allCorrectCodes[4]) {
            gameState = 'loss';
        }
    }
}

function currentCode() {
    if (!allSavedCodes.includes(document.getElementById("code-entry").value.toUpperCase()) && document.getElementById("code-entry").value.toUpperCase() !== '{default}' && allCorrectCodes.includes(document.getElementById("code-entry").value.toUpperCase())) {
        allSavedCodes.push(document.getElementById("code-entry").value.toUpperCase());
        //addElement('div', document.getElementById("code-entry").value.toUpperCase(), 'saved-codes', []);
        addVideoLink(document.getElementById("code-entry").value.toUpperCase());
    }
    return document.getElementById("code-entry").value.toUpperCase();
}

function addVideoLink(code) {
    addElement('button', code, 'saved-codes', [['class', 'saved-vid-link'], ['onclick', 'updateVideo("'+code+'")']]);
}

//adds an element into the DOM
function addElement(tag, content, parent, attributes) {
	// create a new element 
	var newElement = document.createElement(tag);
	for (var attr = 0; attr < attributes.length; attr++)
	{
		newElement.setAttribute(attributes[attr][0], attributes[attr][1])
	}
	newElement.innerHTML = content;
	// add the newly created element and its content into the DOM 
	var parentElement = document.getElementById(parent);
	parentElement.appendChild(newElement);
}

function correctCode(video) {
    if (video === 'initial') {
        charString = allowedCodes[0];
    }
    if (video === 'puzzle2') {
        charString = allowedCodes[1];
    }
    if (video === 'puzzle3') {
        charString = allowedCodes[2];
    }
    if (video === 'win') {
        charString = allowedCodes[3];
    }
    if (video === 'loss') {
        charString = allowedCodes[4];
    }
    correctSymbols = charString.split('-');
    result = '';
    for (let i = 0; i < correctSymbols.length; i++) {
        result += chars[parseInt(correctSymbols[i])];
    }
    return result;
}

function addDefault() {
    addVideoLink('{INITIAL}');
}

function padWithZero(num, targetLength) {
    return String(num).padStart(targetLength, '0');
}

function startEscapeRoom() {
    if (document.getElementById("pwd-entry").value.toUpperCase() === 'STARTCYBER') {
        teamName = document.getElementById("name-entry").value;
        endTime = new Date(new Date().getTime() + totalNumMinutes * 60000);
        document.getElementById('login').style.display = 'none';
        document.getElementById('main').style.visibility = 'visible';
        document.getElementById("clock").innerHTML = '40:00';
    } else {
        alert('Incorrect password. Please ask the escape room guide for the correct password.');
    }
}

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = endTime - now;

  // Time calculations for days, hours, minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("clock").innerHTML = padWithZero(minutes, 2) + ":" + padWithZero(seconds, 2);

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("clock").innerHTML = "00:00";
    updateVideo('{LOSS}');
  }
}, 500);