
import os
import sys
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
import base64
import requests
import pprint
from time import sleep
from pytube import YouTube
import os
from moviepy.editor import *
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *


logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = 'Content'
ALLOWED_EXTENSIONS = set(['mp4', 'mp3'])

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#prob wont need this
@app.route('/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER)
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)

    video = VideoFileClip(os.path.join(f'Content/{filename}'))
    video.audio.write_audiofile(os.path.join(f'Content/{filename}.mp3'))

    return {'message': f'Content/{filename}'}
@app.route('/upload/youtube', methods = ['POST'])
def ytMp3():
    '''
    link = request.json['link']
    yt = YouTube(link)
    video= yt.streams.first()
    # download the file
    out_file = video.download(output_path='./Content')
    
    # save the file
    new_file = 'Content/attachment.mp4'
    os.rename(out_file, new_file)

    video = VideoFileClip(os.path.join(new_file))
    video.audio.write_audiofile(os.path.join(f'Content/attachment.mp3'))
    '''
    return {'message' :'Content/test.mp3'}

@app.route('/assemblyAI', methods = ['POST'])
def assemblyAI():
    filename = "Content/test.mp3"
    print('filename:',filename)
    print(request.json)
    headers = {
    "authorization": os.getenv("ASSEMBLY_AI_KEY"),
    "content-type": "application/json"
    }
    transcript_endpoint = "https://api.assemblyai.com/v2/transcript"
    upload_endpoint = 'https://api.assemblyai.com/v2/upload'

    def read_file(filename):
        with open(filename, 'rb') as _file:
            while True:
                data = _file.read(5242880)
                if not data:
                    break
                yield data

    upload_response = requests.post(
        upload_endpoint,
        headers=headers, data=read_file(filename)
    )
    print('Audio file uploaded')
    print(upload_response)

    transcript_request = {'audio_url': upload_response.json()['upload_url'], "iab_categories": True, "auto_chapters": True, "sentiment_analysis": True}
    transcript_response = requests.post(transcript_endpoint, json=transcript_request, headers=headers)
    print('Transcription Requested')
    pprint.pprint(transcript_response.json())
    polling_response = requests.get(transcript_endpoint+"/"+transcript_response.json()['id'], headers=headers)

    filename = filename + '.txt'
    while polling_response.json()['status'] != 'completed':
        sleep(30)
        polling_response = requests.get(transcript_endpoint+"/"+transcript_response.json()['id'], headers=headers)
        print("File is", polling_response.json()['status'])

    with open(filename, 'w') as f:
        f.write( str(polling_response.json()))
    print('Transcript saved to', filename)

    return polling_response.json()

    
if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    CORS(app, expose_headers='Authorization')
    app.run(debug=False)