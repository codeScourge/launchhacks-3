from assets import create_js, CSS
import markdown

# The first component HAS to be a static introducing this quiz
# The last should also be a static


# --- old
# def main(data: list):
#     # Temporary backend for testing
#     full_html = ""
#     for item in data:
#         if item['type'] == 'text':
#             full_html += "<span class=\"component text\">"+markdown.markdown(item['text'])+"</span>"
#         if item['type'] == 'image':
#             full_html += f"<span class=\"component image\"><img src='{item['url']}' alt='{item['alt']}'></span>"
#     return full_html



# --- components
def create_title(title:str):
    return f"""<h1 id="quiz-title">{title}</h1>"""

def create_text(text:str, revealed:bool):
    # TODO: add markdown (need change in frontend)
    return f"""<p class="quiz_text" {'style="display: block"' if revealed else ''}>{text}</p>"""

def create_image(url:str, alt:str, revealed:bool):
    return f"""<img class="quiz_img" src="{url}" alt="{alt}" {'style="display: block"' if revealed else ''}>"""

def create_radio(question:str, choices:list, answer_idx:int, explanation:str, quiz_number:int):
    return_obj = {"id": f"quiz_{str(quiz_number)}", "type": "radio", "answer": answer_idx}


    inner_html = ""
    for i, choice in enumerate(choices):
        inner_html += f"""

<input type="radio" name="quiz_{str(quiz_number)}" value="{str(i)}" id="quiz_{str(quiz_number)}_{str(i)}">
<label for="quiz_{str(quiz_number)}_{str(i)}">
    <svg class="quiz_svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Radio_Unchecked"> <path id="Vector" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
    <svg class="quiz_svg--checked"viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Radio_Fill"> <g id="Vector"> <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>
    {choice}
</label>

                       """


    outer_html = f"""

<div class="quiz_question" id="quiz_{str(quiz_number)}">
    <h4 class="quiz_question__upper">{question} (choose one)</h4>
    <div class="quiz_question__lower">
        {inner_html}
    </div>
    <div class="quiz_question__explanation">
        <p>{explanation}</p>
    </div>
</div>

                  """
    

    return outer_html, return_obj


def create_checkbox(question:str, choices:list, answer_idxs:list, explanation:str, quiz_number:int):
    return_obj = {"id": f"quiz_{str(quiz_number)}", "type": "checkbox", "answer": answer_idxs}


    inner_html = ""
    for i, choice in enumerate(choices):
        inner_html += f"""

<input type="checkbox" name="quiz_{str(quiz_number)}" value="{str(i)}" id="quiz_{str(quiz_number)}_{str(i)}">
<label for="quiz_{str(quiz_number)}_{str(i)}">
    <svg class="quiz_svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Checkbox_Unchecked"> <path id="Vector" d="M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
    <svg class="quiz_svg--checked" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Checkbox_Check"> <path id="Vector" d="M8 12L11 15L16 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
    {choice}
</label>
                       """


    outer_html = f"""

<div class="quiz_question" id="quiz_{quiz_number}">
    <h4 class="quiz_question__upper">{question} (choose all that apply)</h4>
    <div class="quiz_question__lower">
        {inner_html}
    </div>

    <div class="quiz_question__explanation">
        <p>{explanation}</p>
    </div>
</div>

                  """
    
    return outer_html, return_obj



# --- workflows
def generate_html(data:list, title:str, introduction:str, goodbye:str, static_url:str):
    quiz_data = [{"type": "text", "text": introduction}]
    quiz_data.extend(data)
    quiz_data.append({"type": "text", "text": goodbye})
    inner_html = ""
    js_array = []

    for i, item in enumerate(quiz_data):
        #print(item)

        # the first static one is automatically revealed
        if item["type"] == "text":
            inner_html += create_text(item["text"], i==0)

        elif item["type"] == "image":
            inner_html += create_image(item["url"], item["alt"], i==0)

        elif item["type"] == "radio":
            radio_html, return_obj = create_radio(item["question"], item["choices"], item["answer_idx"], item["explanation"], i)
            inner_html += radio_html
            js_array.append(return_obj)

        elif item["type"] == "checkbox":
            checkbox_html, return_obj = create_checkbox(item["question"], item["choices"], item["answer_idxs"], item["explanation"], i)
            inner_html += checkbox_html
            js_array.append(return_obj)


        #print(js_array)

        
    outer_html = f"""
<!-- Quiz HTML -->
<main id="quiz">
    {create_title(title)}
    <div id="quiz-content">
        {inner_html}
    </div>

    <button id="quiz-button" class="quiz_button">
        Start Quiz
    </button>

    <audio src="{static_url}/blob.mp3" id="quiz-audio-blob" class="quiz_audio"></audio>
    <audio src="{static_url}/error.mp3" id="quiz-audio-error" class="quiz_audio"></audio>
    <audio src="{static_url}/win.mp3" id="quiz-audio-win" class="quiz_audio"></audio>
</main>
                 """ 
    
    return outer_html, js_array



# --- assembler
def main(data: list, title:str, introduction:str, goodbye:str, completion_js:str, static_url:str):
    outer_html, js_array = generate_html(data, title, introduction, goodbye, static_url)
    js = create_js(js_array, completion_js)

    return outer_html, js, CSS
    
    

# --- main
if __name__ == "__main__":
    completion_js = "console.log('Hello, World!');"
    introduction = "Welcome to my quiz!"
    quiz_array = [
        {"type": "text", "text": "Today is tuesday"},    # str, str
        {"type": "radio", "question": "What day is today", "explanation": "It's Tuesday", "choices": ["Tuesday", "Friday", "Saturday"], "answer_idx": 0}, # str, str, str, list, int
        {"type": "image", "url": "image.jpg", "alt": "alt text"}, # str, str, str
        {"type": "checkbox", "question": "What colors are in the image", "explanation": "All of em", "choices": ["Red", "Green", "Blue"], "answer_idxs": [0, 1, 2]}, # str, str, str, list, list
    ]

    html, js, css = main(quiz_array, input("name your quiz"), introduction, completion_js)

    for item in [html, css, js]:
        print(item)
        print ("\n\n\n########################################\n\n\n")
