/******************
 * YOUR CODE HERE *
 ******************/

function getFirstItemFrom(array) {
  return array[0];
}

// The last index is always one less than the length
function getLastItemFrom(array) {
  return array[array.length - 1];
}

// Index 3 exists only if there are at least 4 items; otherwise fall back to the last item
function getIndex3(array) {
  if (array.length >= 4) {
    return array[3];
  } else {
    return array[array.length - 1];
  }
}

function isLongList(array) {
  return array.length >= 10;
}

function firstItemIsNumber(array) {
  return typeof array[0] === 'number';
}

// Third item is index 2; its second character is index 1
function secondCharOfThirdString(array) {
  const third = array[2];
  return third[1];
}

 /********************************************
 * CODE DOWN HERE IS FOR INTERNAL USE ONLY. *
 *           PLEASE DON'T TOUCH!            *
 ********************************************/



if (typeof getFirstItemFrom === 'undefined') {
  getFirstItemFrom = undefined;
}


if (typeof getLastItemFrom === 'undefined') {
  getLastItemFrom = undefined;
}



if (typeof getIndex3 === 'undefined') {
  getIndex3 = undefined;
}


if (typeof firstItemIsNumber === 'undefined') {
  firstItemIsNumber = undefined;
}


if (typeof isLongList === 'undefined') {
  isLongList = undefined;
}


if (typeof secondCharOfThirdString === 'undefined') {
  secondCharOfThirdString = undefined;
}




module.exports = {
  getLastItemFrom,
  getFirstItemFrom,
  getIndex3,
  firstItemIsNumber,
  isLongList,
  secondCharOfThirdString,
}
