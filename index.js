function createElement(options) {
  var el
    , a
    , i

  if (options instanceof window.HTMLElement) {
    el = options;
  }
  
  if (typeof options==='string') {
    options = {tagName : options}
  }

  if (arguments.length===2) {
    options = {...options, ...arguments[1]}
  }
  
  if (!options.tagName) {
    el = document.createDocumentFragment()
  }
  else {
    el = el || document.createElement(options.tagName)
    if (Array.isArray(options.classList)) {
      options.className = ((options.className || '') + ' ' + options.classList.join(" ")).trimStart()
    }
    if (options.className) {
      el.className = options.className
    }

    if (options.attributes) {
      for (a in options.attributes) {
        el.setAttribute(a, options.attributes[a])
      }
    }

    if (options.html !== undefined) {
      el.innerHTML = options.html
    }
  }

  if (options.text) {
    el.appendChild(document.createTextNode(options.text))
  }

  // IE 8 doesn"t have HTMLElement
  if (window.HTMLElement === undefined) {
    window.HTMLElement = Element
  }

  if (options.childs && options.childs.length) {
    for (i = 0; i < options.childs.length; i++) {
      el.appendChild(options.childs[i] instanceof window.HTMLElement ? options.childs[i] : createElement(options.childs[i]))
    }
  }

  return el
}
