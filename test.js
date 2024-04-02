const constructQuiz = () => {
    let child;
    let child_child;
    let child_child_child;

    // --- text
    child = document.createElement("p");
    child.textContent = "This is a quiz";
    child.style.display = "none";
    root.appendChild(child);


    // --- image
    child = document.createElement("img");
    child.src = "https://via.placeholder.com/150";
    child.alt = "placeholder";
    child.style.display = "none";
    root.appendChild(child);


    // --- checkbox
    child = document.createElement("div");

    // upper
    child_child = document.createElement("h5");
    child_child.textContent = "Which are holidays?"+ " (Select all that apply)";
    child.appendChild(child_child)

    // lower
    child_child = document.createElement("div");
    for (const choice of ["Christmas", "Easter", "New Year", "Halloween"]) {
        child_child_child = document.createElement("input");
        child_child_child.type = "checkbox";
        child_child.appendChild(child_child_child);

        child_child_child = document.createElement("label");
        child_child_child.textContent = choice;
        child_child.appendChild(child_child_child);
    }
    child.appendChild(child_child);



    // --- radio
    child = document.createElement("div");

    // upper
    child_child = document.createElement("h5");
    child_child.textContent = "What day is todas?"+ " (Select one)";
    child.appendChild(child_child)

    // lower
    child_child = document.createElement("div");
    for (const choice of ["Christmas", "Easter", "New Year", "Halloween"]) {
        child_child_child = document.createElement("input");
        child_child_child.type = "checkbox";
        child_child.appendChild(child_child_child);

        child_child_child = document.createElement("label");
        child_child_child.textContent = choice;
        child_child.appendChild(child_child_child);
    }
    child.appendChild(child_child);