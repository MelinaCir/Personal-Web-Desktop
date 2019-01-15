/**
   * Creates elements with attributes from given parameters.
   *
   * @param {string} name
   * @param {object} attributes
   */
function create (name, attributes) {
  let node = document.createElement(name)
  if (attributes) {
    for (let attribute in attributes) {
      if (attributes.hasOwnProperty(attribute)) {
        node.setAttribute(attribute, attributes[attribute])
      }
    }
  }
  for (let i = 2; i < arguments.length; i++) {
    let child = arguments[i]
    if (typeof child === 'string') {
      child = document.createTextNode(child)
    }
    node.appendChild(child)
  }
  return node
}

// Exports
export default {
  create
}
