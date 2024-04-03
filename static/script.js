text = document.getElementById('text'); // Button for creating text component
image = document.getElementById('image'); // Button for creating image component
question = document.getElementById('question'); // Button for creating question component

inner = document.getElementById('inner'); // Container for components
editor = document.getElementById('editor'); // Container for editing components


components = [
    {
        "type": "text", "text": `
# An amazing lesson
Try out the awesome features around here
`},
    { "type": "image", "url": "https://via.placeholder.com/500", "alt": "placeholder image" },
]

// Utility functions
const isElementLoaded = async element => {
    while (element === null) {
        await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return element;
}; // Wait for an element to load

function updatePage() {
    let apiEndpoint = new URL(window.location.origin + '/api')
    // let params = { 'elements': JSON.stringify([{ "type": "text", "text": "wassup kids" }]) };
    let params = { 'elements': JSON.stringify(components) }; // Pass all components to the API
    Object.keys(params).forEach(key => apiEndpoint.searchParams.append(key, params[key]))

    fetch(apiEndpoint, {headers: {'Content-Type': 'application/json'}})
    .then(res => res.json())
    .then(data => {
        console.log(data)

        const old_button = document.getElementById('preview')
        const new_button = document.createElement('button')
        new_button.id = 'preview'
        new_button.innerText = 'Preview'
        new_button.className = "use__button"
        new_button.addEventListener('click', () => {
            window.location = apiEndpoint
        })
        old_button.replaceWith(new_button)


        // normally append css and html
        //inner.innerHTML = data.html + data.css

        // workaround to make script tag execute
        // const script_id = "quiz-script";

        // let old_script = document.getElementById(script_id);
        // if (old_script) {
        //     old_script.remove();
        // }


        // let script = document.createElement('script');
        // script.id = script_id;
        // script.textContent = data.js;
        // document.body.appendChild(script);


        // This is the js-snippet the USER will see
        //const user_js = 'document.addEventListener("DOMContentLoaded", () => {' + data.js + '});'


        // Will be called when DOM is loaded
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