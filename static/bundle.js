// static/script.js
var updatePage = function() {
  const constructUrl = (subroute) => {
    let apiEndpoint = new URL(window.location.origin + subroute);
    let params = { elements: JSON.stringify(components) };
    Object.keys(params).forEach((key) => apiEndpoint.searchParams.append(key, params[key]));
    return apiEndpoint;
  };
  fetch(constructUrl("/api"), { headers: { "Content-Type": "application/json" } }).then((res) => res.json()).then((data) => {
    const new_button = document.createElement("button");
    new_button.innerText = "Preview";
    new_button.id = "preview";
    new_button.className = "use__button";
    new_button.addEventListener("click", () => {
      window.location.href = constructUrl("/preview");
    });
    document.getElementById("preview").replaceWith(new_button);
    js_string = data.js;
    css_string = data.css;
    html_string = data.html;
    reattatchListeners();
  });
};
var editText = function(index) {
  editor.replaceChildren();
  if (index == null) {
    components.push({ type: "text", text: "" });
    index = components.length - 1;
  }
  editor.style.display = "block";
  let component2 = components[index];
  editorText = document.createElement("textarea");
  editorText.value = component2.text;
  editor.appendChild(editorText);
  doneButton = document.createElement("button");
  doneButton.classList.add("done");
  doneButton.innerHTML = '<img src="/static/done.svg">';
  doneButton.addEventListener("click", function() {
    components[index].text = editorText.value;
    updatePage();
    editor.replaceChildren();
    editor.style.display = "none";
  });
  editor.appendChild(doneButton);
  deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = '<img src="/static/delete.svg">';
  editor.className = "text-editor";
  deleteButton.addEventListener("click", function() {
    components.splice(index, 1);
    updatePage();
    editor.replaceChildren();
    editor.style.display = "none";
  });
  editor.appendChild(deleteButton);
};
var editImage = function(index) {
  editor.replaceChildren();
  if (index == null) {
    components.push({ type: "image", url: "https://via.placeholder.com/500", alt: "placeholder image" });
    index = components.length - 1;
  }
  editor.style.display = "flex";
  editor.className = "image-editor";
  let component2 = components[index];
  editorUrl = document.createElement("input");
  editorUrl.placeholder = "Image URL";
  editorUrl.value = component2.url;
  altText = document.createElement("input");
  altText.placeholder = "Alt text";
  altText.value = component2.alt;
  deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = '<img src="/static/delete.svg">';
  deleteButton.addEventListener("click", function() {
    components.splice(index, 1);
    editor.replaceChildren();
    editor.style.display = "none";
    updatePage();
  });
  editor.appendChild(editorUrl);
  editor.appendChild(altText);
  optionWrapper = document.createElement("span");
  optionWrapper.classList.add("option-wrapper");
  doneButton = document.createElement("button");
  doneButton.classList.add("done");
  doneButton.innerHTML = '<img src="/static/done.svg">';
  doneButton.addEventListener("click", function() {
    components[index].url = editorUrl.value;
    components[index].alt = altText.value;
    updatePage();
    editor.replaceChildren();
    editor.style.display = "none";
  });
  optionWrapper.appendChild(doneButton);
  optionWrapper.appendChild(deleteButton);
  editor.appendChild(optionWrapper);
};
var editRadio = function(index) {
  editor.replaceChildren();
  if (index == null) {
    components.push({ type: "radio", question: "", explanation: "", choices: [], answer_idx: 0 });
    index = components.length - 1;
  }
  editor.style.display = "flex";
  editor.className = "radio-editor";
  let component2 = components[index];
  editorQuestion = document.createElement("input");
  editorQuestion.placeholder = "Question";
  editorQuestion.value = component2.question;
  editorExplanation = document.createElement("input");
  editorExplanation.placeholder = "Explanation";
  editorExplanation.value = component2.explanation;
  editorChoices = document.createElement("textarea");
  editorChoices.placeholder = "Choices";
  editorChoices.value = component2.choices.join("\n");
  editorAnswer = document.createElement("input");
  editorAnswer.placeholder = "Answer Index";
  editorAnswer.value = component2.answer_idx;
  editor.appendChild(editorQuestion);
  editor.appendChild(editorExplanation);
  editor.appendChild(editorChoices);
  editor.appendChild(editorAnswer);
  optionWrapper = document.createElement("span");
  optionWrapper.classList.add("option-wrapper");
  deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = '<img src="/static/delete.svg">';
  deleteButton.addEventListener("click", function() {
    components.splice(index, 1);
    updatePage();
    editor.replaceChildren();
    editor.style.display = "none";
  });
  doneButton = document.createElement("button");
  doneButton.classList.add("done");
  doneButton.innerHTML = '<img src="/static/done.svg">';
  doneButton.addEventListener("click", function() {
    components[index].question = editorQuestion.value;
    components[index].explanation = editorExplanation.value;
    components[index].choices = editorChoices.value.split("\n");
    components[index].answer_idx = parseInt(editorAnswer.value);
    updatePage();
    editor.replaceChildren();
    editor.style.display = "none";
  });
  optionWrapper.appendChild(doneButton);
  optionWrapper.appendChild(deleteButton);
  editor.appendChild(optionWrapper);
};
var editCheckbox = function(index) {
  editor.replaceChildren();
  if (index == null) {
    components.push({ type: "checkbox", question: "", explanation: "", choices: [], answer_idxs: [] });
    index = components.length - 1;
  }
  editor.style.display = "flex";
  editor.className = "check-editor";
  let component2 = components[index];
  editorQuestion = document.createElement("input");
  editorQuestion.placeholder = "Question";
  editorQuestion.value = component2.question;
  editorExplanation = document.createElement("input");
  editorExplanation.placeholder = "Explanation";
  editorExplanation.value = component2.explanation;
  editorChoices = document.createElement("textarea");
  editorChoices.placeholder = "Choices";
  editorChoices.value = component2.choices.join("\n");
  editorAnswer = document.createElement("input");
  editorAnswer.placeholder = "Answer Indices";
  editorAnswer.value = component2.answer_idxs.join(",");
  editor.appendChild(editorQuestion);
  editor.appendChild(editorExplanation);
  editor.appendChild(editorChoices);
  editor.appendChild(editorAnswer);
  optionWrapper = document.createElement("span");
  optionWrapper.classList.add("option-wrapper");
  deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = '<img src="/static/delete.svg">';
  deleteButton.addEventListener("click", function() {
    components.splice(index, 1);
    updatePage();
    editor.replaceChildren();
    editor.style.display = "none";
  });
  doneButton = document.createElement("button");
  doneButton.classList.add("done");
  doneButton.innerHTML = '<img src="/static/done.svg">';
  doneButton.addEventListener("click", function() {
    components[index].question = editorQuestion.value;
    components[index].explanation = editorExplanation.value;
    components[index].choices = editorChoices.value.split("\n");
    components[index].answer_idxs = editorAnswer.value.split(",").map((x) => parseInt(x));
    updatePage();
    editor.replaceChildren();
    editor.style.display = "none";
  });
  optionWrapper.appendChild(doneButton);
  optionWrapper.appendChild(deleteButton);
  editor.appendChild(optionWrapper);
};
var editComponent = function(index) {
  let component2 = components[index];
  if (component2.type == "text") {
    editText(index);
  } else if (component2.type == "image") {
    editImage(index);
  } else if (component2.type == "radio") {
    editRadio(index);
  } else if (component2.type == "checkbox") {
    editCheckbox(index);
  }
};
var reattatchListeners = function() {
  localStorage.setItem("components", JSON.stringify(components));
  inner.innerHTML = "";
  console.log("Reattaching listeners");
  for (let i = 0;i < components.length; i++) {
    component = components[i];
    console.log(component.type);
    if (component.type == "text") {
      componentElement = document.createElement("div");
      componentElement.classList.add("component");
      componentElement.classList.add("text");
      componentElement.appendChild(document.createTextNode(component.text));
      inner.appendChild(componentElement);
    }
    if (component.type == "image") {
      componentElement = document.createElement("div");
      imgElement = document.createElement("img");
      imgElement.src = component.url;
      imgElement.alt = component.alt;
      componentElement.appendChild(imgElement);
      componentElement.classList.add("component");
      componentElement.classList.add("image");
      inner.appendChild(componentElement);
    }
    if (component.type == "radio") {
      componentElement = document.createElement("div");
      componentElement.classList.add("component");
      componentElement.classList.add("radio");
      componentElement.appendChild(document.createTextNode(component.question));
      for (let j = 0;j < component.choices.length; j++) {
        choiceSpan = document.createElement("span");
        choice = document.createElement("input");
        choice.classList.add("choice");
        choice.id = "choice" + j + "_" + i;
        choice.type = "radio";
        choice.name = i.toString();
        label = document.createElement("label");
        label.for = "choice" + j + "_" + i;
        label.appendChild(document.createTextNode(component.choices[j]));
        label.appendChild(choice);
        choiceSpan.appendChild(choice);
        choiceSpan.appendChild(label);
        componentElement.appendChild(choiceSpan);
      }
      inner.appendChild(componentElement);
    }
    if (component.type == "checkbox") {
      componentElement = document.createElement("div");
      componentElement.classList.add("component");
      componentElement.classList.add("checkbox");
      componentElement.appendChild(document.createTextNode(component.question));
      for (let j = 0;j < component.choices.length; j++) {
        choiceSpan = document.createElement("span");
        choice = document.createElement("input");
        choice.classList.add("choice");
        choice.id = "choice" + j + "_" + i;
        choice.type = "checkbox";
        label = document.createElement("label");
        label.for = "choice" + j + "_" + i;
        label.appendChild(document.createTextNode(component.choices[j]));
        label.appendChild(choice);
        choiceSpan.appendChild(choice);
        choiceSpan.appendChild(label);
        componentElement.appendChild(choiceSpan);
      }
      inner.appendChild(componentElement);
    }
    componentElement.addEventListener("click", function() {
      editComponent(i);
    });
    componentElement.draggable = true;
    componentElement.ondragstart = (e) => {
      e.dataTransfer.setData("text/plain", i);
    };
    let dragTarget = document.createElement("div");
    dragTarget.classList.add("drag-target");
    dragTarget.style.height = "20px";
    dragTarget.id = "drag-target-" + i;
    dragTarget.ondragover = (e) => {
      e.preventDefault();
    };
    dragTarget.ondragleave = (e) => {
      dragTarget.innerHTML = "";
    };
    dragTarget.ondrop = (e) => {
      e.preventDefault();
      let data = e.dataTransfer.getData("text");
      console.log(data);
      let draggedComponent = components[data];
      components.splice(data, 1);
      components.splice(i + 1, 0, draggedComponent);
      updatePage();
    };
    inner.appendChild(dragTarget);
  }
};
text = document.getElementById("text");
image = document.getElementById("image");
radio = document.getElementById("radio");
checkbox = document.getElementById("checkbox");
inner = document.getElementById("inner");
editor = document.getElementById("editor");
js_snippet = document.getElementById("js-snippet");
css_snippet = document.getElementById("css-snippet");
html_snippet = document.getElementById("html-snippet");
var js_string;
var css_string;
var html_string;
document.getElementById("integrate").addEventListener("click", () => {
  for (const { type, text: text2, fname } of [{ type: "text/javascript", text: js_string, fname: "quiz.js" }, { type: "text/css", text: css_string, fname: "quiz.css" }, { type: "text/html", text: html_string, fname: "quiz.html" }]) {
    const blob = new Blob([text2], { type });
    const blobUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = fname;
    downloadLink.click();
  }
});
var storedComponents = localStorage.getItem("components");
if (storedComponents) {
  components = JSON.parse(storedComponents);
} else {
  components = [
    {
      type: "text",
      text: `
        # An amazing lesson
        Try out the awesome features around here
        `
    },
    { type: "checkbox", question: "What colors do I like", explanation: "All of em", choices: ["Red", "Green", "Blue"], answer_idxs: [0, 1, 2] },
    { type: "image", url: "https://media.istockphoto.com/id/949118068/photo/books.jpg?s=612x612&w=0&k=20&c=1vbRHaA_aOl9tLIy6P2UANqQ27KQ_gSF-BH0sUjQ730=", alt: "some dumb ass library" },
    { type: "text", text: "Today is tuesday" },
    { type: "radio", question: "What day is today", explanation: "It's Tuesday", choices: ["Tuesday", "Friday", "Saturday"], answer_idx: 0 }
  ];
}
text.addEventListener("click", function() {
  editText(null);
});
image.addEventListener("click", function() {
  editImage(null);
});
radio.addEventListener("click", function() {
  editRadio(null);
});
checkbox.addEventListener("click", function() {
  editCheckbox(null);
});
updatePage();
