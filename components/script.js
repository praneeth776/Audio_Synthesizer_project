document.addEventListener('DOMContentLoaded', () => {
  console.log('Skeleton Website Loaded');
  // You can add more interactive elements here
  document.getElementById('playButton').addEventListener('click', function() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note

    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 2000); // Adjust duration as needed
});
 document.getElementById('playButton').addEventListener('click', function() {
    oscillator.stop();
});
 
});