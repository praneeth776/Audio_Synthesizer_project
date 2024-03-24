import matplotlib

# Set the backend to a non-GUI one
matplotlib.use('Agg')

from graph import playAudio
from flask import Flask, render_template, request, Response, jsonify
from glob import glob
import librosa
import matplotlib.pyplot as plt
import pandas as pd
import os
import io
import base64
import threading
import warnings
from werkzeug.serving import run_simple


#template_dir = os.path.abspath('../pages')
app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/plot_audio', methods=['POST'])
def plot_audio():
    print('Request Received')
    print(request.files)

    if 'audio_file' not in request.files:
        print('Audio File not uploaded')
        return jsonify({'error': 'Audio File not uploaded'}), 400
    
    audio_file = request.files['audio_file']
    
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

    return jsonify({'plot_base64': plot_base64})

def run_flask_app():
    run_simple('localhost', 8000, app)

if __name__ == '__main__':
    flask_thread = threading.Thread(target=run_flask_app)
    flask_thread.start()
