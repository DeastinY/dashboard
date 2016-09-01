import json
from collections import OrderedDict

from flask import Flask, render_template
from phue import Bridge

app = Flask(__name__)
b = Bridge('192.168.1.15')  # Enter IP here

b.connect()
groups = OrderedDict(sorted(b.get_group().items()))
print(json.dumps(groups, indent=4, sort_keys=True))

@app.route('/')
def hello_world():
    return render_template('index.html', groups=groups, bridge=b)


if __name__ == '__main__':
    app.run()
