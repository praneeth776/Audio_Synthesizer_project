document.addEventListener('DOMContentLoaded', () => {
  console.log('Skeleton Website Loaded');
  // You can add more interactive elements here
  let audioContext;
  let oscillator;
  var frequency = 440;
  document.getElementById('playButton').addEventListener('click', function() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioContext.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // A4 note

    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 2000); // Adjust duration as needed
    console.log("Sine wave generated with frequency "+frequency);
    
});
  document.getElementById('stopButton').addEventListener('click',function() {
    if(oscillator){
        oscillator.stop();
        oscillator.disconnect();
        audioContext.close();
        oscillator = null;
        audioContext=null;
        console.log('Stopped the sine wave.');
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

  frequency = (this.value/100)*(440);
  console.log('frequency changed to '+this.value);
}

var delay = document.getElementById("delay");
var delayVal = document.getElementById("delayVal");
delayVal.innerHTML = delay.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
delay.oninput = function() {
  delayVal.innerHTML = this.value;
}

});