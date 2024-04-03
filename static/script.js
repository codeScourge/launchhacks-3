text = document.getElementById('text'); // Button for creating text component
image = document.getElementById('image'); // Button for creating image component
quiz = document.getElementById('quiz'); // Button for creating quiz component

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

    let response;
    fetch(apiEndpoint).then(res => res.text().then(text => {
        response = text
        // console.log(response)
        inner.innerHTML = response

        // Will be called when DOM is loaded
        reattatchListeners()
    }))
}

// Toolbar
text.addEventListener('click', function () {
    editText(null) // Open the editor with a new text component
})

function editText(index) {
    editor.replaceChildren() // Clear the editor

    if (index == null) {
        // Create a new text component
        components.push({ "type": "text", "text": "" })
        index = components.length - 1
    }

    let component = components[index]
    editorText = document.createElement('textarea')
    editorText.value = component.text
    editor.appendChild(editorText)

    doneButton = document.createElement('button')
    doneButton.innerHTML = 'Done'

    doneButton.addEventListener('click', function () {
        components[index].text = editorText.value // Transfer new text to the component
        updatePage()
        editor.replaceChildren() // Clear the editor
    })

    editor.appendChild(doneButton)

    // updatePage()
}

function editComponent(index) {
    let component = components[index]
    if (component.type == 'text') {
        // Open the text editor and retrieve text from 
        editText(index)
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
                documentComponents[i].style.color = 'red'
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