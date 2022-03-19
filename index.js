function createElement(type, attributes) {
    let elm = document.createElement(type);
    for (let [key, value] of Object.entries(attributes)) {
        if (key == 'append') elm.append(...value);
        else if (elm[key] != undefined) elm[key] = value;
        else elm.setAttribute(key, value);
    };
    return elm;
}

function createSelect(parent, array, id) {
    let clear = createElement("div", {
        classList: "select__clear",
        innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
    })
    let input = createElement("input", {
        classList: "select__input",
        type: "text",
        placeholder: `${id} select`,
        id: id
    })
    let options = createElement("div", {
        classList: "select__options"
    })
    let main = createElement("div", {
        classList: "select",
        append: [clear, input, options, ]
    })
    array.forEach(option => {
        options.append(createElement("div", {
            classList: "select__option",
            innerText: option,
            option: option.toLowerCase().trim(),
            visible: "true",
            state: "false",
            tabindex: "0"
        }))
    });
    input.addEventListener("keyup", (event) => {
        let value = event.target.value.toLowerCase().trim()
        Array.from(options.children).forEach(child => {
            if (!value.length) {
                child.setAttribute("visible", "true")
            } else {
                if (!child.getAttribute("option").startsWith(value)) child.setAttribute("visible", "false")
                else child.setAttribute("visible", "true")
            }
        });
    })
    clear.addEventListener("click", (event) => {
        Array.from(options.querySelectorAll("[state=true]")).forEach(child => child.setAttribute("state", "false"))
        input.value = ""
    })
    options.addEventListener("click", (event) => {
        let state = event.target.getAttribute("state")
        console.log(event.ctrlKey)
        if (event.ctrlKey === true) {
            event.target.setAttribute("state", state === "true" ? "false" : "true")
            input.value = ""
        } else {
            Array.from(options.querySelectorAll("[state=true]")).forEach(child => child.setAttribute("state", "false"))
            event.target.setAttribute("state", state === "true" ? "false" : "true")
            event.target.blur()
            input.value = event.target.innerText
        }
    })
    parent.append(main)
}

function createCheckbox(parent, id, text) {
    let main = createElement("div", {
        classList: "checkbox",
        state: "false",
        id: id,
        append: [
            createElement("div", {
                classList: "checkbox__box",
                innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>'
            }),
            createElement("p", {
                classList: "checkbox__text",
                innerText: text
            })
        ]
    })
    parent.append(main)
    main.addEventListener("click", (event) => {
        main.setAttribute("state", main.getAttribute("state") === "true" ? "false" : "true")
    })
}

window.onload = () => {
    let selectExample = ["A", "B", "C", "Who", "What", "Where", "When", "Why"]
    createSelect(document.querySelector(".select-area"), selectExample, "Test")
    createSelect(document.querySelector(".select-area"), selectExample, "Test")
    createSelect(document.querySelector(".select-area"), selectExample, "Test")
    createCheckbox(document.querySelector(".checkbox-area"), "example", "Example item")
    createCheckbox(document.querySelector(".checkbox-area"), "test", "Test item")
}