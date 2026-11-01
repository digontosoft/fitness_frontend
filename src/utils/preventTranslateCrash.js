// Browser page translation (Chrome / Google Translate, Safari "Translate")
// replaces React's text nodes with its own <font> elements. When React later
// removes or inserts next to one of those original nodes, the DOM throws
// "NotFoundError: The object can not be found here" and the whole app crashes
// to the error screen. Skip the operation instead of throwing when the node
// has already been moved out by the translator.
// See https://github.com/facebook/react/issues/11538
if (typeof Node === "function" && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      console.warn("Skipped removeChild of a node moved by page translation", child);
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      console.warn("Skipped insertBefore next to a node moved by page translation", referenceNode);
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}
