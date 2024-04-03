import markdown


COMPLETION_JS = "console.log('Hello, World!');"
# The first component HAS to be a static introducing this quiz
# The last should also be a static

title = "My Quiz Title"
quiz_array = [
    {"type": "text", "text": "..."},    # str, str
    {"type": "image", "fname": "image.jpg", "alt": "alt text"}, # str, str, str
    {"type": "radio", "question": "...", "choices": ["...", "...", "..."], "answer_idx": 0}, # str, str, list, int
    {"type": "checkbox", "question": "...", "choices": ["...", "...", "..."], "answer_idxs": [0, 1]}, # str, str, list, list
]

def main(data: list):
    # Temporary backend for testing
    full_html = ""
    for item in data:
        if item['type'] == 'text':
            full_html += "<span class=\"component text\">"+markdown.markdown(item['text'])+"</span>"
        if item['type'] == 'image':
            full_html += f"<span class=\"component image\"><img src='{item['url']}' alt='{item['alt']}'></span>"
    return full_html