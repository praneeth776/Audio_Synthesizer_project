document.addEventListener('DOMContentLoaded', () => {
  console.log('Skeleton Website Loaded');
  // You can add more interactive elements here
  let audioContext;
  let oscillator;
  let lfo;
  let lfoGain;
  const canvas = document.getElementById('Canvas')
  var frequency = 440;
  var gainValue = 0.2;

  var attackTime = 0.3;
  var releaseTime = 0.8;
  var sustainLevel = 0.3;
  var decayTime = 0.3;
  var vibratoAmount = 0.5
  var vibratoSpeed = 10

  var waveform = 'sine'

 

  var selector = document.getElementById('waveforms');

  selector.oninput = function() {
  
    waveform = selector.value;
    console.logs("selected Wave Form" + waveform);
  }

  
 



  document.getElementById('playButton').addEventListener('click', function() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

   

    oscillator = audioContext.createOscillator();
    let analyser = audioContext.createAnalyser();
    oscillator.connect(analyser);
    analyser.connect(audioContext.destination);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

function visualize() {
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    analyser.fftSize = 2048; // Must be a power of 2 Range - [32, 32768]
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const draw = () => {
        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(0, 0, 100)';

        ctx.beginPath();

        let sliceWidth = WIDTH * 1.0 / bufferLength;
        let x = 0;

        for(let i = 0; i < bufferLength; i++) {

            let v = dataArray[i] / 128.0; // byte / 2 || 256/2
            let y = v * HEIGHT/2;

            if(i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height/2);
        ctx.stroke();
    };

    draw();
}
    gainNode = audioContext.createGain();

    lfo = audioContext.createOscillator();
    lfoGain = audioContext.createGain();

    oscillator.connect(gainNode);


    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // A4 note
    
     
    gainNode.value = gainValue;
    console.log("Gain value set to "+gainValue);
    gainNode.gain.setValueAtTime(gainValue, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0, 0);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, audioContext.currentTime + attackTime);
    gainNode.gain.setValueAtTime(sustainLevel, audioContext.currentTime + 1 - releaseTime);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);


    lfo.frequency.setValueAtTime(vibratoSpeed, 0);
    lfo.connect(lfoGain);
    lfo.start(0);
    lfo.stop(audioContext.currentTime + 1);
    
    lfoGain.gain.setValueAtTime(vibratoAmount, 0)
    lfoGain.connect(oscillator.frequency)

    oscillator.connect(audioContext.destination);
    oscillator.start();
    visualize();
    gainNode.connect(audioContext.destination);

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
  
  gainValue = (this.value/100)*(gainValue);
  console.log('gainValue changed to '+gainValue);

  
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

var attack = document.getElementById("attack");
var attackVal = document.getElementById("attackVal");
attackVal.innerHTML = attack.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
attack.oninput = function() {
  attackVal.innerHTML = this.value;
  attackTime = (this.value/100)*attackTime;
  console.log('attack Time changed to '+ attackTime);
}


var decay = document.getElementById("decay");
var decayVal = document.getElementById("decayVal");
decayVal.innerHTML = decay.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
decay.oninput = function() {
  decayVal.innerHTML = this.value;
}


var sustain = document.getElementById("sustain");
var sustainVal = document.getElementById("sustainVal");
sustainVal.innerHTML = sustain.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
sustain.oninput = function() {
  sustainVal.innerHTML = this.value;
  sustainLevel = (this.value/100)*sustainLevel;
  console.log('sustainLevel changed to '+ sustainLevel);

}

var release = document.getElementById("release");
var releaseVal = document.getElementById("releaseVal");
releaseVal.innerHTML = release.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
release.oninput = function() {
  releaseVal.innerHTML = this.value;
  releaseTime = (this.value/100)*releaseTime;
  console.log('release Time changed to '+ releaseTime);
}

var vibAmount = document.getElementById("vibAmount");
var vibAmountVal = document.getElementById("vibAmountVal");
vibAmountVal.innerHTML = vibAmount.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
vibAmount.oninput = function() {
  vibAmountVal.innerHTML = this.value;
   vibratoAmount= (this.value/100)*vibratoAmount;
   console.log('vibAmount changed to '+ vibratoAmount);
}

var vibSpeed = document.getElementById("vibSpeed");
var vibSpeedVal = document.getElementById("vibSpeedVal");
vibSpeedVal.innerHTML = vibSpeed.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
vibSpeed.oninput = function() {
    vibSpeedVal.innerHTML = this.value;
    vibratoSpeed = (this.value/100)*vibratoSpeed;
    console.log('vibSpeed changed to '+ vibratoSpeed);}
    document.getElementById('uploadForm').addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission
  
      const formData = new FormData();
const fileInput = document.getElementById('fileUpload');
formData.append('file', fileInput.files[0]);

fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formData,
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
  });
   
     
});