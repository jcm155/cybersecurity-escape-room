currentVideo = document.getElementById("current-video");
chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#0123456789{} "
/*allowedCodes = [
    '63-8-13-8-19-8-0-11-64',
    '10-8-13-6-65-15-0-22-13',
    '17-20-13-65-1-0-2-10-3-14-14-17',
    '15-20-17-17-18-22-14-17-3',
    '63-11-14-18-18-64'
];*/
allowedCodes = [
    '63-8-13-8-19-8-0-11-64',//initial video
    '1-14-19-13-4-19',//second video
    '18-4-2-20-17-8-19-24-65-16-20-4-18-19-8-14-13-18',//first question
    '1-17-20-19-4-65-5-14-17-2-4',//second question
    '18-19-4-6-0-13-14-6-17-0-15-7-24',//third question
    '14-15-4-13-65-18-14-20-17-2-4-65-8-13-19-4-11-11-8-6-4-13-2-4',//fourth question
    '15-7-8-18-7-8-13-6-65-0-19-19-0-2-10',//fifth question
    '17-0-13-18-14-12-22-0-17-4',//third video
    '18-4-13-3-2-0-18-7',//win video
    '63-11-14-18-18-64'//loss video
]
/*videoLinks = [
    'https://drive.google.com/file/d/1peqO1t_ldzy9vXB78e3mqyNcAvHRqPro/preview',
    'https://drive.google.com/file/d/1hs67zLjd9S5ph9CnE-SKR2g5xHVoIGI-/preview',
    'https://drive.google.com/file/d/1Omvv2PiYCI-yPa1kPjl0OXAuOsdk_HL9/preview',
    'https://drive.google.com/file/d/1GuMY7BTZQOUHO2vFz62DeIGOHQOFpkGr/preview',
    'https://drive.google.com/file/d/1hf40BGx3WgF2pb2P0PW0_jJ17RIkekS-/preview'
];*/
videoLinks = [
    'https://drive.google.com/file/d/1peqO1t_ldzy9vXB78e3mqyNcAvHRqPro/preview',//init
    'https://drive.google.com/file/d/1k1E8CnrM-GvojkChj-vWLVj1dYx6TjUg/preview',//second
    'https://drive.google.com/file/d/1NZqJuUhLe73pGDTT3n_sp6b_oAWbWQkZ/preview',//q1
    'https://drive.google.com/file/d/1XCQyPjJOnisU32F7emi4RenslUf69fZK/preview',//q2
    'https://drive.google.com/file/d/1cyD33ZO63QYtyJhxQLBh8riZYhAABmYe/preview',//q3
    'https://drive.google.com/file/d/1LRHMt6ER00aNPui9ruPODr-3rM0wL4Eq/preview',//q4
    'https://drive.google.com/file/d/1_q4frXp6dALjiXtw_PVNfCVM1nfQa4WN/preview',//q5
    'https://drive.google.com/file/d/1-edDwWaS87EzRg2Qf6C-ArULfDtiMHNG/preview',//third
    'https://drive.google.com/file/d/1Gt22SR84L-bW6EouKESdUeTHmZeOLjZC/preview',//win
    'https://drive.google.com/file/d/1Wubr9_BWhs6O-rkyC_Bh0tOz9GcFRQQY/preview',//loss
];
allSavedCodes = ['{INITIAL}'];
allCorrectCodes = [
    correctCode('initial'),
    correctCode('puzzle2'),
    correctCode('q1'),
    correctCode('q2'),
    correctCode('q3'),
    correctCode('q4'),
    correctCode('q5'),
    correctCode('puzzle3'),
    correctCode('win'),
    correctCode('loss'),
];
totalNumMinutes = 30;
endTime = new Date(new Date().getTime() + totalNumMinutes * 60000);
gameState = 'menu';
teamName = '';
clockShown = true;
defeatReason = 'unset';
numOfCodesEntered = 1;

function updateVideo(code) {
    if (gameState === 'play' && (allSavedCodes.includes(code) || code === correctCode[numOfCodesEntered] || code === '{LOSS}')) {
        currentVideo.src = videoLinks[allCorrectCodes.indexOf(code)];
        if (allCorrectCodes.indexOf(code) >= numOfCodesEntered) {
            numOfCodesEntered = allCorrectCodes.indexOf(code)+1;
        }
        if (code === allCorrectCodes[8]) {
            gameState = 'win';
            clearInterval(x);
            playSound('win');
            document.getElementById('code-controls').style.display = 'none';
            document.getElementById('mission-controls').style.display = 'block';
            document.getElementById('clock').style.color = 'yellow';
            document.getElementById('clock').style.borderColor = 'yellow';
        } else if (code === allCorrectCodes[9]) {
            gameState = 'loss';
            clearInterval(x);
            playSound('loss');
            defeatReason = defeatReason === 'unset' ? 'being stupid' : defeatReason;
            document.getElementById('code-controls').style.display = 'none';
            document.getElementById('mission-controls').style.display = 'block';
            document.getElementById('clock').style.color = 'red';
            document.getElementById('clock').style.borderColor = 'red';
        } else if (allCorrectCodes.indexOf(code)+1 === numOfCodesEntered) {
            playSound('correct')
        }
    } else {
        playSound('incorrect');
    }
}

function currentCode() {
    if (document.getElementById("code-entry").value.toUpperCase() === allCorrectCodes[numOfCodesEntered] && !allSavedCodes.includes(document.getElementById("code-entry").value.toUpperCase()) && document.getElementById("code-entry").value.toUpperCase() !== '{default}' && allCorrectCodes.includes(document.getElementById("code-entry").value.toUpperCase())) {
        allSavedCodes.push(document.getElementById("code-entry").value.toUpperCase());
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
    if (video === 'q1') {
        charString = allowedCodes[2];
    }
    if (video === 'q2') {
        charString = allowedCodes[3];
    }
    if (video === 'q3') {
        charString = allowedCodes[4];
    }
    if (video === 'q4') {
        charString = allowedCodes[5];
    }
    if (video === 'q5') {
        charString = allowedCodes[6];
    }
    if (video === 'puzzle3') {
        charString = allowedCodes[7];
    }
    if (video === 'win') {
        charString = allowedCodes[8];
    }
    if (video === 'loss') {
        charString = allowedCodes[9];
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
        document.getElementById('main').style.display = 'block';
        document.getElementById("clock").innerHTML = '40:00';
        gameState = 'play';
    } else {
        alert('Incorrect password. Please ask the escape room guide for the correct password.');
    }
}

function playSound(sound) {
    if (sound === 'correct') {
        new Audio('sound-correct.wav').play();
    }
    if (sound === 'incorrect') {
        new Audio('sound-incorrect.wav').play();
    }
    if (sound === 'win') {
        new Audio('sound-win.wav').play();
    }
    if (sound === 'loss') {
        new Audio('sound-loss.wav').play();
    }
}

function showResultScreen() {
    var startNumSeconds = totalNumMinutes*60;
    var endTime = document.getElementById('clock').innerHTML.split(':');
    var endNumSeconds = parseInt(endTime[0])*60 + parseInt(endTime[1]);
    var totalSeconds = startNumSeconds - endNumSeconds;
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    document.getElementById('team-text').innerHTML = 'Team: ' + teamName;
    if (gameState === 'win') {
        document.getElementById('time-text').innerHTML = 'Final Time: ' + padWithZero(minutes, 2) + ':' + padWithZero(seconds, 2);
    } else {
        document.getElementById('time-text').innerHTML = 'Defeat Reason: ' + defeatReason;
    }
    document.getElementById('result-screen').style.borderColor = gameState === 'win' ? 'lime' : 'red';
    document.getElementById('result-screen').style.color = gameState === 'win' ? 'lime' : 'red';
    document.getElementById('result-text').style.borderColor = gameState === 'win' ? 'lime' : 'red';
    document.getElementById('result-text').innerHTML = gameState === 'win' ? 'SUCCESS' : 'FAILURE';
    document.getElementById('main').style.display = 'none';
    document.getElementById('result').style.display = 'block';
}

function returnToMain() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('main').style.display = 'block';
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
  if (distance < 0 && gameState === 'play') {
    clearInterval(x);
    document.getElementById("clock").innerHTML = "00:00";
    defeatReason = 'out of time';
    updateVideo('{LOSS}');
  }
}, 500);