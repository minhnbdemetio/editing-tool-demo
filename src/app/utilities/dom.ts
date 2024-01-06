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
