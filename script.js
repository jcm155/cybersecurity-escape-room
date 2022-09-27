currentVideo = document.getElementById("current-video");

function updateVideo() {
    if (currentCode() == "secret") {
        currentVideo.src = "test-2.mp4";
    } else {
        currentVideo.src = "test.mp4";
    }
}

function currentCode() {
    return document.getElementById("code-entry").value;
}