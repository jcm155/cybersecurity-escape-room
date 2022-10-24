currentVideo = document.getElementById("current-video");
chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#0123456789{} "
allowedCodes = [
    '63-29-30-31-26-46-37-45-64',
    '10-8-13-6-65-15-0-22-13',
    '17-20-13-65-1-0-2-10-3-14-14-17',
    '15-20-17-17-18-22-14-17-3',
    '63-11-14-18-18-64'
];
videoLinks = [
    'https://drive.google.com/file/d/1Tqoq4XAELbKyUk8mfEYlByda3yjlZ8VX/preview',
    'https://drive.google.com/file/d/1hs67zLjd9S5ph9CnE-SKR2g5xHVoIGI-/preview',
    'https://drive.google.com/file/d/13AFNJVUF3DwRk-k9GbRM_XnGaD3W4_RY/preview',
    'https://drive.google.com/file/d/1GuMY7BTZQOUHO2vFz62DeIGOHQOFpkGr/preview',
    'https://drive.google.com/file/d/1hf40BGx3WgF2pb2P0PW0_jJ17RIkekS-/preview'
];
allSavedCodes = [];
allCorrectCodes = [
    correctCode('initial'),
    correctCode('puzzle2'),
    correctCode('puzzle3'),
    correctCode('win'),
    correctCode('loss'),
]

function updateVideo() {
    if (allCorrectCodes.includes(currentCode())) {
        currentVideo.src = videoLinks[allCorrectCodes.indexOf(currentCode())];
    }
}

function currentCode() {
    if (!allSavedCodes.includes(document.getElementById("code-entry").value.toUpperCase()) && document.getElementById("code-entry").value.toUpperCase() !== '{default}' && allCorrectCodes.includes(document.getElementById("code-entry").value.toUpperCase())) {
        allSavedCodes.push(document.getElementById("code-entry").value.toUpperCase());
        addElement('div', document.getElementById("code-entry").value.toUpperCase(), 'saved-codes', []);
    }
    return document.getElementById("code-entry").value.toUpperCase();
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