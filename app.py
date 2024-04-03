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
    elements = [
    {"type": "text", "text": "JavaScript is a programming language that enables interactive web pages. It is a part of most web browsers and allows for client-side script to interact with the user, control the browser, communicate asynchronously, and alter the document content that is displayed."},
    {"type": "radio", "question": "Which type of language is JavaScript?", "explanation": "JavaScript is a high-level, interpreted scripting language.", "choices": ["Compiled", "Interpreted", "Assembly"], "answer_idx": 1},
    {"type": "text", "text": "Variables in JavaScript can be declared using var, let, or const. 'let' allows you to declare variables that are limited in scope to the block, statement, or expression on which it is used. 'const' is a signal that the identifier won’t be reassigned."},
    {"type": "radio", "question": "Which keyword allows you to declare a block-scoped variable, optionally initializing it to a value?", "explanation": "'let' allows block-scoped variable declaration.", "choices": ["var", "let", "const"], "answer_idx": 1},
    {"type": "text", "text": "Functions in JavaScript are blocks of code designed to perform a particular task. A JavaScript function is executed when 'something' invokes it."},
    {"type": "radio", "question": "What syntax is used to declare a function in JavaScript?", "explanation": "Function declaration involves the function keyword, followed by a name, followed by parentheses.", "choices": ["Function myFunc(){}", "var myFunc = function(){}", "myFunc() function{}"], "answer_idx": 0},
    {"type": "image", "url": "javascript-event-loop.jpg", "alt": "Illustration of JavaScript Event Loop"},
    {"type": "checkbox", "question": "What are the features of the JavaScript Event Loop?", "explanation": "The Event Loop allows JavaScript to perform non-blocking operations, despite being single-threaded, through callback functions.", "choices": ["Single-threaded", "Asynchronous callbacks", "Multi-threaded"], "answer_idxs": [0, 1]},
    ]
    
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