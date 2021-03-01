/******************
 * YOUR CODE HERE *
 ******************/


function getFirstItemFrom(array){
  return  array[0];
}

function getLastItemFrom(array){
  return array[array.length-1];
}

function getIndex3(array){
  if (array.length > 4){
    return array[3];
  }
  if (array.length < 4){
    return array[array.length - 1]
  }
}

function isLongList(array){
  if(array.length >= 10){
    return true;
  }
  else{
    return false;
  }
}

function firstItemIsNumber(array){
  if(array[0] >= 1 || array[0] <= 1){
     return true;
 }
 else{
   return false;
 }
}


// ✕ returns true if the first item is a number
// ✕ returns false if the first item is a string
// ✕ returns false if the first item is a string, even if its value is 'number'
// ✕ returns false if the first item is a boolean (1 ms)
// ✕ returns false if the first item is an array
// ✕ returns false if the first item is a function



function secondCharOfThirdString(array){

}

// secondCharOfThirdString
// ✕ returns the second character of the third 
// string in the given array





 /********************************************
 * CODE DOWN HERE IS FOR INTERNAL USE ONLY. *
 *           PLEASE DON'T TOUCH!            *
 ********************************************/



if (typeof getFirstItemFrom === 'undefined') {
  getFirstItemFrom = undefined;
}


if (typeof getLastItemFrom === 'undefined') {
  getLastItemFrom = undefined;
}3



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
