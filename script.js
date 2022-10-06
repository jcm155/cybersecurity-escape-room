currentVideo = document.getElementById("current-video");
allowedCodes = ['{default}', 'SECRET'];
videoLinks = ['test.mp4', 'test-2.mp4'];
allSavedCodes = [];

function updateVideo() {
    if (allowedCodes.includes(currentCode())) {
        currentVideo.src = videoLinks[allowedCodes.indexOf(currentCode())];
    } else {
        currentVideo.src = videoLinks[0];
    }
}

function currentCode() {
    if (!allSavedCodes.includes(document.getElementById("code-entry").value.toUpperCase()) && document.getElementById("code-entry").value.toUpperCase() !== '{default}' && allowedCodes.includes(document.getElementById("code-entry").value.toUpperCase())) {
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

function updatePreviousCodes() {

}