from flask import Flask, render_template, request, jsonify
import json
from main import main

app = Flask(__name__)


# --- HTML
@app.route('/')
def indexRoute():
    return render_template('index.html')


@app.route("/example")
def exampleRoute():
    elements = []
    title = "My Quiz"
    end_js = ""
    introduction = "Welcome to my quiz!"
    goodbye = "Goodbye!"
    static_url = f"http://{request.host}/static"

    html, js, css = main(elements, title, introduction, goodbye, end_js, static_url)
    return render_template('preview.html', html_code=html, js_code=js, css_code=css)

@app.route("/preview")
def previewRoute():
    elements = json.loads(request.args.get('elements'))
    title = "My Quiz"
    end_js = ""
    introduction = "Welcome to my quiz!"
    goodbye = "Goodbye!"
    static_url = f"http://{request.host}/static"

    html, js, css = main(elements, title, introduction, goodbye, end_js, static_url)
    return render_template('preview.html', html_code=html, js_code=js, css_code=css)
    

# --- JSON
@app.route('/api')
def apiRoute():
    elements = json.loads(request.args.get('elements'))
    title = "My Quiz"
    end_js = ""
    introduction = "Welcome to my quiz!"
    goodbye = "Goodbye!"
    static_url = f"http://{request.host}/static"

    html, js, css = main(elements, title, introduction, goodbye, end_js, static_url)
    return {
        "html": html,
        "js": js,
        "css": css
    }


# --- main
if __name__ == '__main__':
    app.run(debug=True, port=8080)