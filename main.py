import markdown


COMPLETION_JS = "console.log('Hello, World!');"

def main(data: list):
    # Temporary backend for testing
    full_html = ""
    for item in data:
        if item['type'] == 'text':
            full_html += "<span class=\"component text\">"+markdown.markdown(item['text'])+"</span>"
        if item['type'] == 'image':
            full_html += f"<span class=\"component image\"><img src='{item['url']}' alt='{item['alt']}'></span>"
    return full_html