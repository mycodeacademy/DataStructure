const insertAtBeginning = (element, sortedArray, smallIndex) => {
  smallIndex = smallIndex - 1;
  if (smallIndex === -1) {
    smallIndex = sortedArray.length - 1;
  }
  sortedArray[smallIndex] = element;
  return [sortedArray, smallIndex];
}
