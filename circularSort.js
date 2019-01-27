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
const shiftRightFrom = (correctPos, element, sortedArray, largeIndex) => {
  for(let i = largeIndex; i != correctPos - 1 ; i = i- 1) {
    if(i === -1){
      i = sortedArray.length - 1;
    }
    sortedArray[i+1] = sortedArray[i];
  }
  sortedArray[correctPos] = element;
  largeIndex = largeIndex + 1;
  return [sortedArray, largeIndex];
};

const calculateDistances = (element, sortedArray, smallIndex, largeIndex) => {
  let smallDistance = 0, largeDistance = 0;
  for(let i = smallIndex; i != largeIndex + 1; i = (i+1) % sortedArray.length){
    if(sortedArray[i] < element){
      smallDistance = smallDistance + 1;
    }
    else{
      largeDistance = largeDistance + 1;
    }
  }
  return [smallDistance, largeDistance];
}

const main = () => {
  const X = process.argv.slice(3);
  let Y = new Array(X.length);
  for(let i = 0; i < Y.length; i++){
    Y[i] = -1;
  }
  Y[0] = X[0];
  let smallIndex = 0, largeIndex = 0;
  let smallDistance = 0, largeDistance = 0;
  console.log(Y);
  for(let i = 1; i<X.length; i++ ){
    console.log('\n');
    let position = findCorrectPosition(X[i],Y,smallIndex,largeIndex);
    let nextOfLargeIndex = largeIndex + 1;
    if(nextOfLargeIndex === Y.length){
      nextOfLargeIndex = 0;
    }
    let prevOfSmallIndex = smallIndex - 1;
    if(prevOfSmallIndex === -1){
      prevOfSmallIndex = Y.length - 1;
    }

    if (position === nextOfLargeIndex) {
      [sortedArray, largeIndex] =  insertAtEnd(X[i], Y, largeIndex);
    } else if(position === prevOfSmallIndex){
      [sortedArray, smallIndex] = insertAtBeginning(X[i], Y, smallIndex);
    } else {
      [smallDistance, largeDistance] = calculateDistances(X[i], Y, smallIndex, largeIndex);
      if(smallDistance < largeDistance){
        [Y, smallIndex] = shiftLeftFrom(position, X[i], Y, smallIndex);
      }else{
        [Y, largeIndex] = shiftRightFrom(position, X[i], Y, largeIndex);
      }
    }
    console.log(Y);
  }
};

main();