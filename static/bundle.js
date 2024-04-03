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
  let component = components[index];
  editorText = document.createElement("textarea");
  editorText.value = component.text;
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
  editor.style.display = "block";
  let component = components[index];
  editorUrl = document.createElement("input");
  editorUrl.placeholder = "Image URL";
  editorUrl.value = component.url;
  altText = document.createElement("input");
  altText.placeholder = "Alt text";
  altText.value = component.alt;
  deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", function() {
    components.splice(index, 1);
    updatePage();
    editor.replaceChildren();
    editor.style.display = "none";
  });
  editor.appendChild(editorUrl);
  editor.appendChild(altText);
  doneButton = document.createElement("button");
  doneButton.innerHTML = "Done";
  doneButton.addEventListener("click", function() {
    components[index].url = editorUrl.value;
    components[index].alt = altText.value;
    updatePage();
    editor.replaceChildren();
    editor.style.display = "none";
  });
  editor.appendChild(doneButton);
  editor.appendChild(deleteButton);
};
var editComponent = function(index) {
  let component = components[index];
  if (component.type == "text") {
    editText(index);
  } else if (component.type == "image") {
    editImage(index);
  }
};
var reattatchListeners = function() {
  isElementLoaded(inner).then(() => {
    console.log("Reattaching listeners");
    let documentComponents = document.getElementsByClassName("component");
    for (let i = 0;i < documentComponents.length; i++) {
      console.log("Adding listener to component " + i);
      isElementLoaded(documentComponents[i]).then(() => {
        documentComponents[i].addEventListener("click", function() {
          let index = i;
          editComponent(index);
        });
      });
    }
  });
};
text = document.getElementById("text");
image = document.getElementById("image");
question = document.getElementById("question");
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
var isElementLoaded = async (element) => {
  while (element === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  return element;
};
text.addEventListener("click", function() {
  editText(null);
});
image.addEventListener("click", function() {
  editImage(null);
});
updatePage();
