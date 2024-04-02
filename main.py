


COMPLETION_JS = "console.log('Hello, World!');"
# The first component HAS to be a static introducing this quiz
# The last should also be a static

quiz_array = [
    {"type": "text", "text": "..."},    # str, str
    {"type": "image", "fname": "image.jpg", "alt": "alt text"}, # str, str, str
    {"type": "radio", "question": "...", "choices": ["...", "...", "..."], "answer_idx": 0}, # str, str, list, int
    {"type": "checkbox", "question": "...", "choices": ["...", "...", "..."], "answer_idxs": [0, 1]}, # str, str, list, list
]