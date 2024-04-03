import flask
import json
from main import main

app = flask.Flask(__name__)

@app.route('/')
def index():
    return flask.render_template('index.html')

@app.route('/api')
def api():
    
    elements = json.loads(flask.request.args.get('elements'))
    #print(elements, main(elements))
    return main(elements, "My Quiz", "", f"{flask.request.environ.get('HTTP_ORIGIN', 'http://127.0.0.1:5000')}/static")

if __name__ == '__main__':
    app.run(debug=True)