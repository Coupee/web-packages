function createElement(type, attributes) {
    let elm = document.createElement(type);
    for (let [key, value] of Object.entries(attributes)) {
      if (key == 'append') elm.append(...value);
      else if (elm[key] != undefined) elm[key] = value;
      else elm.setAttribute(key, value);
    };
    return elm;
  }