# launchhacks-3

### Motivation
The current trend in UX is gamifying your learning experiences, brilliant doesn't have a revenue of 10.6Million for no reason, they are where our inspiration came from. To allow anyone to build their own quizzes without writing tedios frontend code. 


### Plan and Execution
The two main objectives were: 
1. build a backend tool taking an array in a specific format and spit out the corresponding CSS, HTML, and JS files
2. build a frontend to let a user easily build these array in a GUI and receive this files

### techstack
Since we both are 

### ChatGPT Prompt for generating Quizzes
Obv

```
Here you can see an array:     
quiz_array = [
    {"type": "text", "text": "Today is tuesday"},    # str, str
    {"type": "radio", "question": "What day is today", "explanation": "It's Tuesday", "choices": ["Tuesday", "Friday", "Saturday"], "answer_idx": 0}, # str, str, str, list, int
    {"type": "image", "url": "image.jpg", "alt": "alt text"}, # str, str, str
    {"type": "checkbox", "question": "What colors are in the image", "explanation": "All of em", "choices": ["Red", "Green", "Blue"], "answer_idxs": [0, 1, 2]}, # str, str, str, list, list
] 
This array has 4 different building blocks and can be used to build quizzes on my platform. Following the same types of building blocks (text, image, radio, checkbox) build me a quiz on {topic}, where you cover things such as {subtopics}. 
In the text blocks explain a topic. In the radio or checkbox one, ask the user question do further test his understanding. Do you understand?`
```

