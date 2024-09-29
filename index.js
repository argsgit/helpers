function createElement(options) {

  if (typeof options==='function') {
    return createElement(options())
  }

  if (arguments.length===2) {
    element = arguments[0]
    options = arguments[1] || {}

    if (typeof options==='function') {
      options = options()
    }
    
    if (element instanceof window.HTMLElement) {
      options.el = element
    }

    if (typeof element==='string') {
      options.tagName = element
    }

    return createElement(options)
  }
  
  var el
    , a
    , i
  
  if (!options.el && !options.tagName) {
    el = document.createDocumentFragment()
  }
  else {
    el = options.el || document.createElement(options.tagName)
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
