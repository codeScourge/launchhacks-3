CSS = """
    <!-- Quiz CSS -->
    <style>
        :root {
            --background: #f7f7f8;
            --selected_background: #d3d0d0;
            --accent: #818386;

            color: #000000;
            font-family: "Soleil",Arial,sans-serif;
            font-size: 16px;
            line-height: 1.6rem;
        }

        /* this is the main */
        #quiz { 
            width: min(600px, 50%);
            height: 100%;

            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: flex-start;

            overflow-x: hidden;
            overflow-y: scroll;

            padding-top: 1rem;
            padding-bottom: 1rem;
            box-sizing: border-box;
        }
        #quiz-content {
            width: 100%;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: flex-start;

            gap: 4rem;

            overflow-y:scroll;
            overflow-x: hidden;
        }

        #quiz-content > * {
            display: none;
            width: 100%;
        }

        /* images */
        .quiz_img {
            width: 100%;
            height: auto;
        }

        /* quiz questions */
        .quiz_question {
            width: 80% !important;

            background-color: var(--background);

            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-between;
            text-align: left;

            gap: 1rem;
            padding: 1rem;
            border-radius: 10px;
        }

        .quiz_question__upper {
            font-weight: bold;
        }

        .quiz_question__lower {
            width: 100%;

            display: flex;
            flex-flow: column;
            align-items: flex-start;
            justify-content: space-between;

            gap: 0.5rem;
        }

        /* buttons styling */
        .quiz_question__lower input {
            display: none;
        }

        .quiz_question__lower input + label { /* this targets the next sibling label */
            width: 100%;

            padding: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;

            box-sizing: border-box;

            border: 2px solid var(--accent);
            border-radius: 5px;

            text-align: left;
            cursor: pointer;

            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
        }

        .quiz_question__lower input:checked + label {
            background-color: var(--selected_background);
        }

        /* svgs */
        .quiz_svg, .quiz_svg--checked {
            width: 2rem;
            height: 2rem;
        }

        .quiz_svg image, .quiz_svg--checked image, .quiz_svg path, .quiz_svg--checked path {
            height: 2rem !important;
            width: 2rem !important;
            object-fit: contain;
            object-position: center;
        }

        .quiz_question__lower input:not(:checked) + label .quiz_svg {
            display: block;
        }

        .quiz_question__lower input:not(:checked) + label .quiz_svg--checked {
            display: none;
        }

        .quiz_question__lower input:checked + label .quiz_svg {
            display: none;
        }

        .quiz_question__lower input:checked + label .quiz_svg--checked {
            display: block;
        }

        /* hide explanation at first */
        .quiz_question__explanation {
            display: none;
        }

        /* others */
        .quiz_button {
            padding: 0.5rem;
            padding-left: 1.5rem;
            padding-right: 1.5rem;

            background-color: #4272d2;
            
            color: white !important;
            font-size: larger;
            font-weight: 500;

            border: none;
            border-radius: 8px;

            margin-top: 2rem;

            &:hover {
                background-color: rgb(36, 65, 127);
            }
        }

        .quiz_audio {
            display: none;
        }

        #quiz-title {
            width: 100%;
            text-align: left;
        }

    </style>
      """

# ------------------------------------------------------------------------------------------------------------
def create_js(array:list, completion_js:str):
    array_string = str(array)
    print(array_string)
    return JS.replace("####--QUIZ_ARRAY--####", array_string).replace("####--QUIT_COMPLETION_JS--####", completion_js)

JS = """
<!-- QUIZ JS -->
<script>
    console.log("Quiz JS is loaded")
    document.addEventListener("DOMContentLoaded", () => {
    let quizContent = document.getElementById('quiz-content');

    // Control of taking a step is built using events
    const next = new Event("next");
    document.getElementById('quiz-button').addEventListener("click", () => {
        console.log("initial click")
        document.getElementById('quiz-audio-blob').play()
        document.dispatchEvent(next);
    });


    // This will be generated by the backend
    let quizes = ####--QUIZ_ARRAY--####;
    const getQuizObj = (id) => {
        return quizes.find(quiz => quiz.id === id);
    }


    // This will be changed by the user depending on what he wants to do
    const endFunction = () => {
        console.log("You ended the quiz")
        ####--QUIT_COMPLETION_JS--####
    }


    // --- helpers to retrieve answer from quizes
    // return single int
    const getRadioAnswer = (content) => {
        const lower = content.querySelector(".quiz_question__lower");
        for (const input of lower.children) {
            if (input.checked) {
                return input.value;
            }
        }
    }


    // returns array of int
    const getCheckboxAnswer = (content) => {
        const lower = content.querySelector(".quiz_question__lower");
        let answers = [];
        for (const input of lower.children) {
            if (input.checked) {
                answers.push(input.value);
            }
        }
        return answers;
    }


    // --- helper to show explanation and block further input
    const finishQuestion  = (content, correctIdxs) => {
        content.querySelector(".quiz_question__explanation").style.display = "flex";

        if (typeof correctIdxs === "number") {
            correctIdxs = [correctIdxs];
        }

        // looping over children, disabling inputs, setting corresponding labels to their status
        let children = content.querySelector(".quiz_question__lower").children;
        let errors = 0;
        let corrects = 0;
        for (let i=0; i<children.length; i++) {
            let child = children[i];
            if (child.tagName === "INPUT") {
                child.disabled = true;  // retarded children lol

                if ((correctIdxs.includes(i) && child.checked)) {
                    children[i+1].style.borderColor = "green";
                    corrects++;
                } else if ((!correctIdxs.includes(i) && child.checked) || (correctIdxs.includes(i) && !child.checked)) {
                    children[i+1].style.borderColor = "red";
                    errors++;
                }

                i++
            } else if (child.tagName === "LABEL") {
                continue;
            } else {
                console.log("Error: Unknown tag")
            }
        }

        if (errors === 0 && corrects === correctIdxs.length) {
            document.getElementById('quiz-audio-blob').play()
        } else {
            document.getElementById('quiz-audio-error').play()
        }
    }


    // taking a step
    const revealOneAndBuildButton = () => {
        //console.log("Step function triggered")
        for (let i = 0; i < quizContent.children.length; i++) {
            const content = quizContent.children[i];
            if (window.getComputedStyle(content).display === "none") {
                //console.log("Display is none, revealing")
                console.log(content)

                // revealing one more content
                content.style.display = "block";

                // building the new button
                let button = document.createElement("button");
                button.className = "quiz_button"
                button.id = "quiz-button";


                if (i === quizContent.children.length - 1) {
                    button.innerHTML = "Finish Quiz";
                    button.addEventListener("click", () => {
                        document.getElementById('quiz-audio-win').play()
                        document.dispatchEvent(next);
                    });
                }  else {

                    // check if content is a p or img tag
                    if ((content.tagName === "P" && content.className === "quiz_text") || (content.tagName === "IMG" && content.className === "quiz_img")) {
                        console.log("Static Content")

                        button.addEventListener("click", () => {
                            document.getElementById('quiz-audio-blob').play()
                            document.dispatchEvent(next);
                        });

                        button.innerHTML = "Next";
                    } 

                    else if (content.tagName === "DIV" && content.className === "quiz_question") {
                        console.log("Question Content")
                        button.innerHTML = "Submit"
                        
                        button.addEventListener("click", () => {
                            const content_id = content.id;
                            const quiz_obj = getQuizObj(content_id);
                            let user_answer

                            
                            if (quiz_obj.type === "checkbox") {
                                user_answer = getCheckboxAnswer(content);
                            } else if (quiz_obj.type === "radio") {
                                user_answer = getRadioAnswer(content);
                            } else {
                                console.log("Error: Unknown type of quiz")
                            }


                            // TODO: only continue if correct
                            if (user_answer == quiz_obj.answer) {
                                console.log("Correct");
                            } else {
                                console.log("Incorrect");
                            }


                            finishQuestion(content, quiz_obj.answer);
                            document.dispatchEvent(next);
                        });
                    }
                }

                // replacing the button
                const quizButton = document.getElementById('quiz-button');
                quizButton.parentNode.replaceChild(button, quizButton);
                return;
            }
        }
        endFunction();
    }


    // listening for event
    document.addEventListener("next", () => {
        //console.log("Next event is triggered");
        revealOneAndBuildButton();
    });
    })
</script>
      """


