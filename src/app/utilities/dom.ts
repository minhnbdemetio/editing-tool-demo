export const findIdFromString = (htmlString: string) => {
  const tempContainer = document.createElement('div');

  tempContainer.innerHTML = htmlString;

  const elementsWithId = tempContainer.querySelectorAll('[id]');

  if (elementsWithId.length > 0) {
    const id = elementsWithId.item(0).id;
    tempContainer.remove();
    return id;
  } else {
    tempContainer.remove();
    return null;
  }
};

export function removeAllChildStyles(
  element: HTMLElement | Element,
  isTopLevel = true,
) {
  // Remove style attribute from the current element
  if (!isTopLevel) {
    element.removeAttribute('style');
  }

  // Iterate through child elements
  for (let i = 0; i < element.children.length; i++) {
    // Recursively remove style attributes from nested elements
    removeAllChildStyles(element.children[i], false);
  }
}
