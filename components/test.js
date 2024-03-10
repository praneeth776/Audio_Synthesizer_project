

document.getElementById("PlayButton").addEventListener("click", function() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const o = audiocontext.createOscillator();
    o.type = "sine";
    o.connect(audiocontext.destination);
    o.frequency.setValueAtTime(440, audioContext.currentTime);
    o.start();
    console.log("audio played");
    setTimeout(() => {
        oscillator.stop();
        // Close the audio context to release resources and allow it to be garbage collected.
        audioContext.close();
    }, 1000);
})



