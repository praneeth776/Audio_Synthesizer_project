document.addEventListener('DOMContentLoaded', () => {
    console.log('Skeleton Website Loaded');
    // You can add more interactive elements here
    let audioContext;
    let oscillator;
    let lfo;
    let lfoGain;
    const canvas = document.getElementById('Canvas')
    var frequency = 220;
    var gainValue = 0.1;
    var decayTime = 0.3;
    var attackTime = 0.5;
    var releaseTime = 0.5;
    var sustainLevel = 0.8;
    var vibratoAmount = 0.5;
    var vibratoSpeed = 10;
   
   
    var noteLength = 1.0;
   
   
    var waveform = 'sine';
   
   
   
   
    var selector = document.getElementById('waveforms');
   
   
    selector.oninput = function() {
       waveform = selector.value;
      console.logs("selected Wave Form" + waveform);
    }
   
   
   
   
   
   
   
   
   var amplitude = document.getElementById("amp");
   var ampVal = document.getElementById("ampVal");
   ampVal.innerHTML = (amplitude.value * 100); // Display the default slider value
   // Update the current slider value (each time you drag the slider handle)
   amplitude.oninput = function() {
    ampVal.innerHTML = (this.value * 100);
     gainValue = this.value;
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
    attackTime = parseFloat(this.value);
    console.log('attack Time changed to '+ attackTime);
   }
   
   
   
   
   var sustain = document.getElementById("sustain");
   var sustainVal = document.getElementById("sustainVal");
   sustainVal.innerHTML = sustain.value; // Display the default slider value
   // Update the current slider value (each time you drag the slider handle)
   sustain.oninput = function() {
    sustainVal.innerHTML = this.value;
    sustainLevel = parseFloat(this.value);
    console.log('sustainLevel changed to '+ sustainLevel);
   
   
   }
   
   
   var release = document.getElementById("release");
   var releaseVal = document.getElementById("releaseVal");
   releaseVal.innerHTML = release.value; // Display the default slider value
   // Update the current slider value (each time you drag the slider handle)
   release.oninput = function() {
    releaseVal.innerHTML = this.value;
    releaseTime = parseFloat(this.value);
    console.log('release Time changed to '+ releaseTime);
   }
   
   
   var decay = document.getElementById("decay");
   var decayVal = document.getElementById("decayVal");
   decayVal.innerHTML = decay.value; // Display the default slider value
   // Update the current slider value (each time you drag the slider handle)
   decay.oninput = function() {
    decayVal.innerHTML = this.value;
    decayTime = this.value;
   }
   
   
   var note = document.getElementById("noteLength");
   var noteLengthVal = document.getElementById("noteLengthVal");
   noteLengthVal.innerHTML = note.value; // Display the default slider value
   // Update the current slider value (each time you drag the slider handle)
   note.oninput = function() {
    noteLengthVal.innerHTML = this.value;
    noteLength = parseFloat(this.value);
    console.log('notelength changed to '+ noteLength);
   }
   
   
   var vibAmount = document.getElementById("vibAmount");
   var vibAmountVal = document.getElementById("vibAmountVal");
   vibAmountVal.innerHTML = vibAmount.value; // Display the default slider value
   // Update the current slider value (each time you drag the slider handle)
   vibAmount.oninput = function() {
    vibAmountVal.innerHTML = this.value;
     vibratoAmount= parseFloat(this.value);
     console.log('vibAmount changed to '+ vibratoAmount);
   }
   
   
   var vibSpeed = document.getElementById("vibSpeed");
   var vibSpeedVal = document.getElementById("vibSpeedVal");
   vibSpeedVal.innerHTML = vibSpeed.value; // Display the default slider value
   // Update the current slider value (each time you drag the slider handle)
   vibSpeed.oninput = function() {
      vibSpeedVal.innerHTML = this.value;
      vibratoSpeed =  parseFloat(this.value);
      console.log('vibSpeed changed to '+ vibratoSpeed);}
   
   
   
   
   function visualize(analyser) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    analyser.fftSize = 2048; // Must be a power of 2 Range - [32, 32768]
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
   
   
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
   
   
    const draw = () => {
        requestAnimationFrame(draw);
   
   
        analyser.getByteTimeDomainData(dataArray);
   
   
        ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
   
   
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(0, 0, 0)';
   
   
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
   
   
   
   
   audioContext = new (window.AudioContext || window.webkitAudioContext)();
   
   
   const audio =  new Audio("cant.wav");
   
   
   track = audioContext.createMediaElementSource(audio);
   
   
   
   
   track.connect(audioContext.destination);
   
   
   gainNode = audioContext.createGain();
   
   
   
   
   gainNode.connect(audioContext.destination);
   
   
   console.log('gainValue is'+ gainValue);
   gainNode.gain.value = gainValue;
   
   
   document.getElementById('playButton').addEventListener('click', function() {
   
   
    audio.play();
   
   
   
   
    gainNode.gain.value = gainValue;
      
    const oscillator = audioContext.createOscillator();
   
   
   
   
    noteGain = audioContext.createGain();
    let analyser = audioContext.createAnalyser();
    oscillator.connect(analyser);
    //analyser.connect(audioContext.destination)
    
   
   
    //gainNode.gain.setValueAtTime(gainValue, audioContext.currentTime);
    console.log("attackTime is"+ attackTime);
     console.log("releaseTime is"+ releaseTime);
    console.log("sustain is"+ sustainLevel);
    console.log("notelength is" + noteLength);
    noteGain.gain.setValueAtTime(0, 0);
    noteGain.gain.linearRampToValueAtTime(sustainLevel, audioContext.currentTime + (noteLength*attackTime));
    noteGain.gain.setValueAtTime(sustainLevel, audioContext.currentTime + noteLength - (noteLength*releaseTime));
    noteGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength);
   
   
   
   
    noteGain.gain.setValueAtTime(0, 0);
    noteGain.gain.linearRampToValueAtTime(1, audioContext.currentTime + (noteLength*attackTime));
    noteGain.gain.setValueAtTime(1, audioContext.currentTime + noteLength - (noteLength*decayTime));
    noteGain.gain.linearRampToValueAtTime(sustainLevel, audioContext.currentTime + noteLength);
    noteGain.gain.setValueAtTime(sustainLevel, audioContext.currentTime + noteLength - (noteLength*releaseTime));
    noteGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength);
   
   
   
   
   
   
    lfoGain = audioContext.createGain();
   
   
    lfoGain.gain.setValueAtTime(vibratoAmount, 0)
    //lfoGain.connect(oscillator.frequency)
    lfoGain.connect(oscillator.frequency)
   
   
    lfo = audioContext.createOscillator();
    lfo.frequency.setValueAtTime(vibratoSpeed, 0);
    lfo.start(0);
    lfo.stop(audioContext.currentTime + noteLength);
    lfo.connect(lfoGain);
    
     oscillator.type = waveform;
   
   
    oscillator.frequency.setValueAtTime(frequency, 0); // A4 note
   
   
   
   
    
    
   
   
    oscillator.connect(audioContext.destination);
    oscillator.start(0);
   // audio.play()
    track.connect(noteGain)
   // oscillator.stop(audioContext.currentTime + noteLength);
    oscillator.connect(noteGain);
    noteGain.connect(gainNode);
    visualize(analyser);
    console.log("gainValue "+ gainNode.gain.value);
   
   
   
   
    console.log("Sine wave generated with frequency "+frequency);
    console.log("Sine wave generated with volume "+ gainNode.gain.value);
   
   
    document.getElementById('stopButton').addEventListener('click',function() {
    
          oscillator.stop(0);
         // audio.pause()
   
   
   
   
          delete oscillator;
          delete audioContext;
     
          console.log('Stopped the sine wave.');
     
    });
   
   
    });
   });
   
   