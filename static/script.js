text = document.getElementById('text'); // Button for creating text component
image = document.getElementById('image'); // Button for creating image component
radio = document.getElementById('radio'); // Button for creating radio component
checkbox = document.getElementById('checkbox'); // Button for creating checkbox

inner = document.getElementById('inner'); // Container for components
editor = document.getElementById('editor'); // Container for editing components

js_snippet = document.getElementById('js-snippet'); // Container for the js-snippet
css_snippet = document.getElementById('css-snippet'); // Container for the css-snippet
html_snippet = document.getElementById('html-snippet'); // Container for the html-snippet


let js_string;
let css_string;
let html_string;

document.getElementById("integrate").addEventListener("click", () => {
    for (const { type, text, fname } of [{ "type": "text/javascript", "text": js_string, "fname": "quiz.js" }, { "type": "text/css", "text": css_string, "fname": "quiz.css" }, { "type": "text/html", "text": html_string, "fname": "quiz.html" }]) {
        const blob = new Blob([text], { type: type });
        const blobUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fname;
        downloadLink.click();
    }
    //document.getElementById("banner").style.display = "flex";
})

// Load components from local storage
const storedComponents = localStorage.getItem('components')
if (storedComponents) {
    components = JSON.parse(storedComponents)
}
else {
    components = [
        {
            "type": "text", "text": `
        # An amazing lesson
        Try out the awesome features around here
        `},
        { "type": "checkbox", "question": "What colors do I like", "explanation": "All of em", "choices": ["Red", "Green", "Blue"], "answer_idxs": [0, 1, 2] },
        { "type": "image", "url": "https://media.istockphoto.com/id/949118068/photo/books.jpg?s=612x612&w=0&k=20&c=1vbRHaA_aOl9tLIy6P2UANqQ27KQ_gSF-BH0sUjQ730=", "alt": "some dumb ass library" },
        { "type": "text", "text": "Today is tuesday" },
        { "type": "radio", "question": "What day is today", "explanation": "It's Tuesday", "choices": ["Tuesday", "Friday", "Saturday"], "answer_idx": 0 },
    ]
}

// Utility functions
const isElementLoaded = async element => {
    while (element === null) {
        await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return element;
}; // Wait for an element to load

function updatePage() {
    const constructUrl = (subroute) => {
        let apiEndpoint = new URL(window.location.origin + subroute)
        let params = { 'elements': JSON.stringify(components) }; // Pass all components to the API
        Object.keys(params).forEach(key => apiEndpoint.searchParams.append(key, params[key]))
        return apiEndpoint
    }

    fetch(constructUrl("/api"), { headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(data => {

            // update button to link to the correct preview page
            const new_button = document.createElement("button")
            new_button.innerText = "Preview"
            new_button.id = "preview"
            new_button.className = "use__button"
            new_button.addEventListener("click", () => {
                window.location.href = constructUrl("/preview")
            })
            document.getElementById("preview").replaceWith(new_button)

            js_string = data.js;
            css_string = data.css;
            html_string = data.html;

            reattatchListeners()
        })
}

// Toolbar
text.addEventListener('click', function () {
    editText(null) // Open the editor with a new text component
})
image.addEventListener('click', function () {
    editImage(null) // Open the editor with a new image component
})

radio.addEventListener('click', function () {
    editRadio(null) // Open the editor with a new radio component
})

checkbox.addEventListener('click', function () {
    editCheckbox(null) // Open the editor with a new checkbox component
})

function editText(index) {
    editor.replaceChildren() // Clear the editor

    if (index == null) {
        // Create a new text component
        components.push({ "type": "text", "text": "" })
        index = components.length - 1
    }

    editor.style.display = 'block'

    let component = components[index]
    editorText = document.createElement('textarea')
    editorText.value = component.text
    editor.appendChild(editorText)

    doneButton = document.createElement('button')
    // doneButton.innerHTML = 'Done'
    doneButton.classList.add('done')
    doneButton.innerHTML = '<img src="/static/done.svg">'

    doneButton.addEventListener('click', function () {
        components[index].text = editorText.value // Transfer new text to the component
        updatePage()
        editor.replaceChildren() // Clear the editor
        editor.style.display = 'none'
    })

    editor.appendChild(doneButton)

    deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')
    deleteButton.innerHTML = '<img src="/static/delete.svg">'
    editor.className = "text-editor"
    // deleteButton.innerHTML = 'Delete'
    deleteButton.addEventListener('click', function () {
        components.splice(index, 1)
        updatePage()
        editor.replaceChildren() // Clear the editor
        editor.style.display = 'none'
    })
    editor.appendChild(deleteButton)

    // updatePage()
}

function editImage(index) {
    editor.replaceChildren() // Clear the editor

    if (index == null) {
        // Create a new text component
        components.push({ "type": "image", "url": "https://via.placeholder.com/500", "alt": "placeholder image" })
        index = components.length - 1
    }

    editor.style.display = 'flex'
    editor.className = "image-editor"


    let component = components[index]

    editorUrl = document.createElement('input')
    editorUrl.placeholder = 'Image URL'
    editorUrl.value = component.url

    altText = document.createElement('input')
    altText.placeholder = 'Alt text'
    altText.value = component.alt

    deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')
    deleteButton.innerHTML = '<img src="/static/delete.svg">'
    deleteButton.addEventListener('click', function () {
        components.splice(index, 1)
        editor.replaceChildren() // Clear the editor
        editor.style.display = 'none'
        updatePage()

    })

    editor.appendChild(editorUrl)
    editor.appendChild(altText)

    optionWrapper = document.createElement('span')
    optionWrapper.classList.add('option-wrapper')
    doneButton = document.createElement('button')
    doneButton.classList.add('done')
    doneButton.innerHTML = '<img src="/static/done.svg">'

    doneButton.addEventListener('click', function () {
        components[index].url = editorUrl.value // Transfer new text to the component
        components[index].alt = altText.value
        updatePage()
        editor.replaceChildren() // Clear the editor
        editor.style.display = 'none'

    })


    optionWrapper.appendChild(doneButton)
    optionWrapper.appendChild(deleteButton)
    editor.appendChild(optionWrapper)

}

function editRadio(index) {
    editor.replaceChildren() // Clear the editor

    if (index == null) {
        // Create a new text component
        components.push({ "type": "radio", "question": "", "explanation": "", "choices": [], "answer_idx": 0 })
        index = components.length - 1
    }

    editor.style.display = 'flex'
    editor.className = "radio-editor"



    let component = components[index]

    // { "type": "radio", "question": "What day is today", "explanation": "It's Tuesday", "choices": ["Tuesday", "Friday", "Saturday"], "answer_idx": 0 },
    editorQuestion = document.createElement('input')
    editorQuestion.placeholder = 'Question'
    editorQuestion.value = component.question

    editorExplanation = document.createElement('input')
    editorExplanation.placeholder = 'Explanation'
    editorExplanation.value = component.explanation

    editorChoices = document.createElement('textarea')
    editorChoices.placeholder = 'Choices'
    editorChoices.value = component.choices.join('\n')

    editorAnswer = document.createElement('input')
    editorAnswer.placeholder = 'Answer Index'
    editorAnswer.value = component.answer_idx

    editor.appendChild(editorQuestion)
    editor.appendChild(editorExplanation)
    editor.appendChild(editorChoices)
    editor.appendChild(editorAnswer)

    optionWrapper = document.createElement('span')
    optionWrapper.classList.add('option-wrapper')

    deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')
    deleteButton.innerHTML = '<img src="/static/delete.svg">'
    deleteButton.addEventListener('click', function () {
        components.splice(index, 1)
        updatePage()
        editor.replaceChildren() // Clear the editor
        editor.style.display = 'none'
    })


    doneButton = document.createElement('button')
    doneButton.classList.add('done')
    doneButton.innerHTML = '<img src="/static/done.svg">'

    doneButton.addEventListener('click', function () {
        // components[index].url = editorUrl.value // Transfer new text to the component
        // components[index].alt = altText.value
        components[index].question = editorQuestion.value
        components[index].explanation = editorExplanation.value
        components[index].choices = editorChoices.value.split('\n')
        components[index].answer_idx = parseInt(editorAnswer.value)

        updatePage()
        editor.replaceChildren() // Clear the editor
        editor.style.display = 'none'

    })


    optionWrapper.appendChild(doneButton)
    optionWrapper.appendChild(deleteButton)
    editor.appendChild(optionWrapper)
}

function editCheckbox(index) {
    editor.replaceChildren() // Clear the editor

    if (index == null) {
        // Create a new text component
        components.push({ "type": "checkbox", "question": "", "explanation": "", "choices": [], "answer_idxs": [] })
        index = components.length - 1
    }

    editor.style.display = 'flex'
    editor.className = "check-editor"



    let component = components[index]

    editorQuestion = document.createElement('input')
    editorQuestion.placeholder = 'Question'
    editorQuestion.value = component.question

    editorExplanation = document.createElement('input')
    editorExplanation.placeholder = 'Explanation'
    editorExplanation.value = component.explanation

    editorChoices = document.createElement('textarea')
    editorChoices.placeholder = 'Choices'
    editorChoices.value = component.choices.join('\n')

    editorAnswer = document.createElement('input')
    editorAnswer.placeholder = 'Answer Indices'
    editorAnswer.value = component.answer_idxs.join(',')

    editor.appendChild(editorQuestion)
    editor.appendChild(editorExplanation)
    editor.appendChild(editorChoices)
    editor.appendChild(editorAnswer)

    optionWrapper = document.createElement('span')
    optionWrapper.classList.add('option-wrapper')
    deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')
    deleteButton.innerHTML = '<img src="/static/delete.svg">'
    deleteButton.addEventListener('click', function () {
        components.splice(index, 1)
        updatePage()
        editor.replaceChildren() // Clear the editor
        editor.style.display = 'none'
    })

    doneButton = document.createElement('button')
    doneButton.classList.add('done')
    doneButton.innerHTML = '<img src="/static/done.svg">'

    doneButton.addEventListener('click', function () {
        // components[index].url = editorUrl.value // Transfer new text to the component
        // components[index].alt = altText.value
        components[index].question = editorQuestion.value
        components[index].explanation = editorExplanation.value
        components[index].choices = editorChoices.value.split('\n')
        components[index].answer_idxs = editorAnswer.value.split(',').map(x => parseInt(x))

        updatePage()
        editor.replaceChildren() // Clear the editor
        editor.style.display = 'none'

    })

    optionWrapper.appendChild(doneButton)
    optionWrapper.appendChild(deleteButton)
    editor.appendChild(optionWrapper)
}

function editComponent(index) {
    let component = components[index]
    if (component.type == 'text') {
        // Open the text editor and retrieve text from 
        editText(index)
    }
    else if (component.type == 'image') {
        // Open the image editor
        editImage(index)
    }

    else if (component.type == 'radio') {
        editRadio(index)
    }
    else if (component.type == 'checkbox') {
        editCheckbox(index)
    }
}
// Component editor
function reattatchListeners() {
    // Builds the editor and click listeners
    // OLD ----
    // Wait for inner to load before reattaching listeners
    // isElementLoaded(inner).then(() => {
    //     console.log('Reattaching listeners')

    //     // Reattach listeners to the components
    //     let documentComponents = document.getElementsByClassName('component')

    //     for (let i = 0; i < documentComponents.length; i++) {
    //         console.log('Adding listener to component ' + i)
    //         // Wait for element to load
    //         isElementLoaded(documentComponents[i]).then(() => {
    //             documentComponents[i].addEventListener('click', function () {
    //                 let index = i
    //                 editComponent(index)
    //             })
    //         })
    //     }
    // }
    // )

    // NEW ----
    // Save the components to local storage
    localStorage.setItem('components', JSON.stringify(components))
    // inner.appendChild(document.createTextNode('hi there'))
    // inner.style.backgroundColor = 'red'
    inner.innerHTML = ''
    console.log('Reattaching listeners')
    for (let i = 0; i < components.length; i++) {
        
        component = components[i]
        console.log(component.type)
        // Add to DOM
        if (component.type == 'text') {
            componentElement = document.createElement('div')

            componentElement.classList.add('component')
            componentElement.classList.add('text')
            componentElement.appendChild(document.createTextNode(component.text))
            inner.appendChild(componentElement)
        }
        if (component.type == 'image') {
            componentElement = document.createElement('div')
            imgElement = document.createElement('img')
            imgElement.src = component.url
            imgElement.alt = component.alt
            componentElement.appendChild(imgElement)

            componentElement.classList.add('component')
            componentElement.classList.add('image')
            inner.appendChild(componentElement)
        }
        if (component.type == 'radio') {
            // Single-choice quiz
            componentElement = document.createElement('div')
            componentElement.classList.add('component')
            componentElement.classList.add('radio')
            componentElement.appendChild(document.createTextNode(component.question))

            for (let j = 0; j < component.choices.length; j++) {
                choiceSpan = document.createElement('span')

                choice = document.createElement('input')
                choice.classList.add('choice')
                choice.id = 'choice' + j + '_' + i
                choice.type = 'radio'
                choice.name = i.toString()

                label = document.createElement('label')
                label.for = 'choice' + j + '_' + i
                label.appendChild(document.createTextNode(component.choices[j]))
                label.appendChild(choice)

                choiceSpan.appendChild(choice)
                choiceSpan.appendChild(label)
                componentElement.appendChild(choiceSpan)

            }
            inner.appendChild(componentElement)
        }
        if (component.type == 'checkbox') {
            componentElement = document.createElement('div')
            componentElement.classList.add('component')
            componentElement.classList.add('checkbox')
            componentElement.appendChild(document.createTextNode(component.question))

            for (let j = 0; j < component.choices.length; j++) {
                choiceSpan = document.createElement('span')

                choice = document.createElement('input')
                choice.classList.add('choice')
                choice.id = 'choice' + j + '_' + i
                choice.type = 'checkbox'
                // choice.name = i.toString()

                label = document.createElement('label')
                label.for = 'choice' + j + '_' + i
                label.appendChild(document.createTextNode(component.choices[j]))
                label.appendChild(choice)

                choiceSpan.appendChild(choice)
                choiceSpan.appendChild(label)
                componentElement.appendChild(choiceSpan)

            }
            inner.appendChild(componentElement)
        }

        componentElement.addEventListener('click', function () {
            editComponent(i)
        })
        
        // Drag and drop

        componentElement.draggable = true
        componentElement.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', i)
        }

        let dragTarget = document.createElement('div')
        dragTarget.classList.add('drag-target')
        dragTarget.style.height = '20px'
        dragTarget.id = "drag-target-" + i

        dragTarget.ondragover = (e) => {
            e.preventDefault()
        }
        dragTarget.ondragleave = (e) => {
            dragTarget.innerHTML = ""
        }
        dragTarget.ondrop = (e) => {
            e.preventDefault()
            let data = e.dataTransfer.getData("text");
            console.log(data)
            let draggedComponent = components[data]
            components.splice(data, 1)
            components.splice(i+1, 0, draggedComponent)
            updatePage()

        }
        inner.appendChild(dragTarget)
    }
}

updatePage()