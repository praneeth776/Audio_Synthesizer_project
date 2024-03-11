
# Audio Synthesizer project
## Project IDEA
- Build basic music tools and generate our own music using these tools.
## How to run the website on local
### First time
`` npm install ``
- To install all the dependencies from the package.json
- Install live - server extension on VS code and use it to open the website on your browser.
### Graph features
- Have a graph
- buttons/sliders for changing the signals(Ex: Amplitude change, pitch , attack, delay, sustain etc)
- Can add multiple audio signals. (Provided by us like some basic sine waves and square waves to maybe musical notes)
- Generate the notes.(Piano notes, Sitar)
- Maybe add low pass filters and high pass filters
### Approach1:
- Pure Javascript using WebAudio API
- Add a dropdown box to select the input files.
### Approach2:
- Use Librosa for audio analysis and flask for web application.
- Use matplotlib for figures/ videos(animation).
