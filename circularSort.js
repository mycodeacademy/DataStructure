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

const findCorrectPosition = (element, sortedArray, smallIndex, largeIndex) => {
  let correctPos = 0;
  // correct position before smallest
  if(element < sortedArray[smallIndex]) {
      correctPos = smallIndex - 1;
      if(correctPos === -1){
        correctPos = sortedArray.length - 1;
      }
  }
  // correct position after largest
  else if(element > sortedArray[largeIndex]){
    correctPos = largeIndex + 1;
    if(correctPos === sortedArray.length){
      correctPos = 0;
    }
  }
  // correct position somewhere in between
  else{
    for (let i = smallIndex; i != largeIndex+1; i = (i+1) % sortedArray.length){
      if (sortedArray[i] > element) {
        return i;
      }
    }
    
  }
  return correctPos;
};
const shiftLeftFrom = (correctPos, element, sortedArray, smallIndex) => {
  for(let i = smallIndex; i != correctPos; i = (i+1) % sortedArray.length){
    let prev = i-1;
    if(prev === -1){
      prev = sortedArray.length - 1;
    }
    sortedArray[prev] = sortedArray[i];

  }
  if(correctPos === 0){
    sortedArray[sortedArray.length - 1] = element;
  }else{
    sortedArray[correctPos] = element;
  }
  smallIndex = smallIndex - 1;
  return [sortedArray, smallIndex];
}