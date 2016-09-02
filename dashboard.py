import json
from collections import OrderedDict

from flask import Flask, render_template, jsonify, request
from phue import Bridge

app = Flask(__name__)
b = Bridge('192.168.1.15')  # Enter IP here

b.connect()
groups = OrderedDict(sorted(b.get_group().items()))

@app.route('/')
def hello_world():
    return render_template('index.html', groups=groups, bridge=b)

@app.route('/togglelight', methods=["POST"])
def togglelamp():
    light = int(request.get_json()['name'])
    on = b.get_light(light,'on')
    print("Turning light {} {}".format(light, "off" if on else "on"))
    b.set_light(light, 'on', not on)
    return jsonify(success = True, on = not on, light = light)

if __name__ == '__main__':
    app.run()
