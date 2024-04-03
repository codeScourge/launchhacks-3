text = document.getElementById('text'); // Button for creating text component
image = document.getElementById('image'); // Button for creating image component
question = document.getElementById('question'); // Button for creating question component

inner = document.getElementById('inner'); // Container for components
editor = document.getElementById('editor'); // Container for editing components

js_snippet = document.getElementById('js-snippet'); // Container for the js-snippet
css_snippet = document.getElementById('css-snippet'); // Container for the css-snippet
html_snippet = document.getElementById('html-snippet'); // Container for the html-snippet


let js_string;
let css_string;
let html_string;

document.getElementById("integrate").addEventListener("click", () => {
    for (const {type, text, fname} of [{"type": "text/javascript", "text": js_string, "fname": "quiz.js"}, {"type": "text/css", "text": css_string, "fname": "quiz.css"}, {"type": "text/html", "text": html_string, "fname": "quiz.html"}]) {
        const blob = new Blob([text], { type: type });
        const blobUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fname;
        downloadLink.click();
    }
    //document.getElementById("banner").style.display = "flex";
})

components = [
    {
        "type": "text", "text": `
# An amazing lesson
Try out the awesome features around here
`},
{"type": "checkbox", "question": "What colors do I like", "explanation": "All of em", "choices": ["Red", "Green", "Blue"], "answer_idxs": [0, 1, 2]},
    {"type": "image", "url": "https://media.istockphoto.com/id/949118068/photo/books.jpg?s=612x612&w=0&k=20&c=1vbRHaA_aOl9tLIy6P2UANqQ27KQ_gSF-BH0sUjQ730=", "alt": "some dumb ass library"},
    {"type": "text", "text": "Today is tuesday"},
    {"type": "radio", "question": "What day is today", "explanation": "It's Tuesday", "choices": ["Tuesday", "Friday", "Saturday"], "answer_idx": 0}, 
    
]

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

    fetch(constructUrl("/api"), {headers: {'Content-Type': 'application/json'}})
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

    editor.style.display = 'block'


    let component = components[index]

    editorUrl = document.createElement('input')
    editorUrl.placeholder = 'Image URL'
    editorUrl.value = component.url

    altText = document.createElement('input')
    altText.placeholder = 'Alt text'
    altText.value = component.alt

    deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'Delete'
    deleteButton.addEventListener('click', function () {
        components.splice(index, 1)
        updatePage()
        editor.replaceChildren() // Clear the editor
        editor.style.display = 'none'
    })

    editor.appendChild(editorUrl)
    editor.appendChild(altText)

    doneButton = document.createElement('button')
    doneButton.innerHTML = 'Done'

    doneButton.addEventListener('click', function () {
        components[index].url = editorUrl.value // Transfer new text to the component
        components[index].alt = altText.value
        updatePage()
        editor.replaceChildren() // Clear the editor
        editor.style.display = 'none'

    })


    editor.appendChild(doneButton)
    editor.appendChild(deleteButton)

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
}
// Component editor
function reattatchListeners() {
    // Wait for inner to load before reattaching listeners
    isElementLoaded(inner).then(() => {
        console.log('Reattaching listeners')

        // Reattach listeners to the components
        let documentComponents = document.getElementsByClassName('component')

        for (let i = 0; i < documentComponents.length; i++) {
            console.log('Adding listener to component ' + i)
            // Wait for element to load
            isElementLoaded(documentComponents[i]).then(() => {
                documentComponents[i].addEventListener('click', function () {
                    let index = i
                    editComponent(index)
                })
            })
        }
    }
    )
}


updatePage()