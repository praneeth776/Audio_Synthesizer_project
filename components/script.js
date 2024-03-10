document.addEventListener('DOMContentLoaded', () => {
  console.log('Skeleton Website Loaded');
  // You can add more interactive elements here
  let audioContext;
  let oscillator;
  document.getElementById('playButton').addEventListener('click', function() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioContext.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note

    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 2000); // Adjust duration as needed
    
});
  document.getElementById('stopButton').addEventListener('click',function() {
    if(oscillator){
        oscillator.stop();
        oscillator.disconnect();
        audioContext.close();
        oscillator = null;
        audioContext=null;
    }
  });

var amplitude = document.getElementById("amp");
var ampVal = document.getElementById("ampVal");
ampVal.innerHTML = amplitude.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
amplitude.oninput = function() {
  ampVal.innerHTML = this.value;
}

var pitch = document.getElementById("pitch");
var pitchVal = document.getElementById("pitchVal");
pitchVal.innerHTML = pitch.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
pitch.oninput = function() {
  pitchVal.innerHTML = this.value;
}

var delay = document.getElementById("delay");
var delayVal = document.getElementById("delayVal");
delayVal.innerHTML = delay.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
delay.oninput = function() {
  delayVal.innerHTML = this.value;
}

});