import socket
import colorsys
from collections import OrderedDict

from flask import Flask, render_template, jsonify, request
from phue import Bridge
import json
import os

app = Flask(__name__)
b = Bridge('192.168.1.15')  # Enter IP here

b.connect()
groups = OrderedDict(sorted(b.get_group().items()))
global_lights = b.get_light_objects('id')

scenesdir = os.path.join(os.path.dirname(__file__), 'scenes')


def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]


@app.route('/')
def hello_world():
    return render_template('index.html', groups=groups, bridge=b, ip=get_ip_address())


@app.route('/togglelight', methods=["POST"])
def togglelamp():
    light = int(request.get_json()['name'][1:])
    on = b.get_light(light,'on')
    print("Turning light {} {}".format(light, "off" if on else "on"))
    b.set_light(light, 'on', not on)
    return jsonify(success = True, on = not on, light = light)


@app.route('/lighton', methods=["POST"])
def lighton():
    groupid = int(request.get_json()['name'])
    lights = b.get_group(groupid, 'lights')
    lights = [int(l) for l in lights]
    print("Turning lights {} on".format([l for l in lights]))
    b.set_light(lights, 'on', True)
    return jsonify(success = True, lights=lights)


@app.route('/lightoff', methods=["POST"])
def lightoff():
    groupid = int(request.get_json()['name'])
    lights = b.get_group(groupid, 'lights')
    lights = [int(l) for l in lights]
    print("Turning lights {} off".format([l for l in lights]))
    b.set_light(lights, 'on', False)
    return jsonify(success=True, lights=lights)


@app.route('/lightcolor', methods=["POST"])
def lightcolor():
    return jsonify(success=True)
    # WIP
    lights = request.get_json()['lights']
    lights = [int(l) for l in lights]
    color = request.get_json()['color']
    color = colorsys.hls_to_rgb(int(color[0:1], 16), int(color[2:3], 16), int(color[4:5], 16))
    h, l, s = int(color[0]), int(color[1]), int(color[2])
    color = colorsys.hls_to_rgb(h, l, s)
    r, g, b = int(color[0]), int(color[1]), int(color[2])
    color = colorsys.rgb_to_hsv(r, g, b)
    h, s, v = int(color[0]), int(color[1]), int(color[2])

    print(color)
    print(h, s, v)

    for l in lights:
        global_lights[l].hue = h
        global_lights[l].saturation = s
        global_lights[l].value = v


@app.route('/scenecreator_savebtn', methods=["POST"])
def scenecreator_savebtn():
    r = request.get_json()
    lights, name = r['lights'], r['name'].lower()
    if len(name) == 0:
        return jsonify(success=False)
    lights = [int(l) for l in lights]
    scene = []
    for l in lights:
        gl = global_lights[l]
        scene.append({
            "lamp": gl.name,
            "hue": gl.hue,
            "saturation": gl.saturation,
            "brightness": gl.brightness
        })

    fn = os.path.join(scenesdir, name+'.json')
    with open(fn, 'w+') as f:
            json.dump(scene, f, indent=4, sort_keys=True)
    return jsonify(success=True)


@app.route('/scenecreator_showbtn', methods=["POST"])
def scenecreator_showbtn():
    scenes = [f.split('.')[:-1] for f in os.listdir(scenesdir) if os.path.isfile(os.path.join(scenesdir, f))]
    return jsonify(success=True, scenes=scenes)


@app.route('/audiograbber_savebtn', methods=["POST"])
def audiograbber_savebtn():
    print("audiograbber_savebtn")
    return jsonify(success=True)


@app.route('/audiograbber_showbtn', methods=["POST"])
def audiograbber_showbtn():
    print("audiograbber_showbtn")
    return jsonify(success=True)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
