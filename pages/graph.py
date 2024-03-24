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

def playAudio(audio_file): # Plays the Audio File
    ipd.Audio(audio_file)

def plotAudioFile(audio_file):
    y,sr = librosa.load(audio_file) # y is the array of discrete values; sr is the sample rate
    plt.figure(figsize=(10, 6))
    pd.Series(y).plot(lw=1)
    plt.xlabel('Time (seconds)')
    plt.ylabel('Amplitude')
    plt.title('Waveform Plot')
    plt.grid(True)
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plot_data = base64.b64encode(img.getvalue()).decode()
    plt.close() 
    return plot_data

#playAudio(audio_file)




