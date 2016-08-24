import logging
import atexit
from flask import Flask, render_template, request, jsonify, redirect
from flask_nav import Nav
from flask_nav.elements import *
from lampcontrol import lampcontrol
from soundcontrol import soundcontrol

class Dashboard:
    def __init__(self, debug=False):
        if not debug:
            self.lights = lampcontrol.getlights()

dashboard = Dashboard(debug=True)

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)


@app.route('/')
def index():
    return render_template('index.html', lights=["Sample",True], scenes=["Test"], sounds=[])

@app.route('/youtubedl', methods=["POST"])
def youtubedl():
    soundcontrol.youtubedl(**request.form)
    phuesr.sounds = []
    return redirect('/')

@app.route('/togglelight',  methods=["POST"])
def togglelamp():
    lampcontrol.setlight(**request.get_json())
    return jsonify(success=True)


@app.route('/applyscene', methods=["POST"])
def applyscene():
    lampcontrol.setscene(phuesr.getscene(request.get_json()))
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
