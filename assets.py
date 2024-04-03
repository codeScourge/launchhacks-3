with open("template.js", "r") as file:
    JS = file.read()

with open("template.css", "r") as file:
    CSS = file.read()

def create_js(array:list, completion_js:str):
    array_string = str(array)
    return JS.replace("####--QUIZ_ARRAY--####", array_string).replace("####--QUIT_COMPLETION_JS--####", completion_js)