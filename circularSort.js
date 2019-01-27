const insertAtBeginning = (element, sortedArray, smallIndex) => {
  smallIndex = smallIndex - 1;
  if (smallIndex === -1) {
    smallIndex = sortedArray.length - 1;
  }
  sortedArray[smallIndex] = element;
  return [sortedArray, smallIndex];
}

const insertAtEnd = (element, sortedArray, largeIndex) => {
  largeIndex = largeIndex + 1;
  if (largeIndex === sortedArray.length){
    largeIndex = 0;
  }
  sortedArray[largeIndex] = element;
  return [sortedArray, largeIndex];
}