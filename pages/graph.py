import pandas as pd 
import numpy as np 
import matplotlib.pylab as plt
import seaborn as sns
from glob import glob
import librosa
import librosa.display
import itertools
import io
import base64

import IPython.display as ipd

sns.set_theme(style='white',palette=None)
color_pal = plt.rcParams["axes.prop_cycle"].by_key()["color"]
color_cycle =  itertools.cycle(plt.rcParams["axes.prop_cycle"].by_key()["color"])

audio_file = glob('../audiofiles/StarWars60.wav')

def playAudio(audio_file,sr): # Plays the Audio File
    audio_data = audio_file.read()  # Read the binary data of the file
    ipd.display(ipd.Audio(audio_data, rate=sr))

def plotAudioFile(audio_file):
    # Load the audio file
    y, sr = librosa.load(audio_file)
    
    # Plot the waveform
    plt.figure(figsize=(6, 4)) # (width,height)
    pd.Series(y).plot()  # Using pd.Series(y).plot() to plot the graph
    plt.xlabel('Time (samples)')
    plt.ylabel('Amplitude')
    plt.title('Waveform')
    
    # Convert plot to base64 string
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plot_base64 = base64.b64encode(img.getvalue()).decode()
    plt.close()
    return plot_base64

def ftgraph(audio_file):
    y, sr = librosa.load(audio_file)
    D = librosa.stft(y)
    S_db = librosa.amplitude_to_db(np.abs(D), ref = np.max)

#playAudio(audio_file)




