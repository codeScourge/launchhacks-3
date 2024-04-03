from flask import Flask, render_template, request, jsonify
import json
from main import main

app = Flask(__name__)


# --- HTML
@app.route('/')
def indexRoute():
    return render_template('index.html')

    
@app.get("/preview")
def previewRoute():
    # TODO: fix this
    elements = json.loads(request.args.get('elements'))
    html, js, css = main(elements, "My Quiz", "", f"{request.environ.get('HTTP_ORIGIN', 'http://127.0.0.1:5000')}/static")
    return render_template('preview.html', html_code=html, js_code=js, css_code=css)


# --- JSON
@app.route('/api')
def apiRoute():
    
    elements = json.loads(request.args.get('elements'))
    html, js, css = main(elements, "My Quiz", "", f"{request.environ.get('HTTP_ORIGIN', 'http://127.0.0.1:5000')}/static")
    return {
        "html": html,
        "js": js,
        "css": css
    }


# --- main
if __name__ == '__main__':
    app.run(debug=True)