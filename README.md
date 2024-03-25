
# Audio Synthesizer project
## Project IDEA
- We built a web app using html, css, and JavaScript to make a synthesizer. We used the web Audio library for working with sound. We have the functionality of choosing from four different types of waveforms, rect, sine, triangle, and sawtooth along with the option of uploading your own custom file. Then we have sliders for changing the value of the amplitude, pitch, attack, sustain, delay, lfo etc. It allows users to upload WAV files and view their corresponding audio waveforms plotted on a graphical interface. This project is ideal for audio analysis, educational purposes, or simply for those interested in visualizing audio signals.

## How to run the website on local
### First time
- To install the python dependencies: 
``pip install -r requirements.txt``
- To install the other dependencies:
``npm install``
### To Run
- make sure you're in the MMCT/pages directory and type ``python app.py``
- it should show ``Server running on http://localhost:9000`` copy the link and visit it in your web browser

### Project features
- Options to play sign, sawtooth, rectangle, triangle waves
- buttons/sliders for changing the signals(Ex: Amplitude change, pitch , attack, delay, sustain etc)
- Can upload a .wav file with any sound
- Generate sound and frequency graph for the file uploaded
### Approach1:
- Pure Javascript using WebAudio API
- Add a dropdown box to select the input files.
### Approach2:
- Use Librosa for audio analysis and flask for web application.
- Use matplotlib for figures/ videos(animation).
