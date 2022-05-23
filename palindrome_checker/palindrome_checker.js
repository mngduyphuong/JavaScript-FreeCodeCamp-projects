function palindrome(str) {
    str = str.toLowerCase().replace(/[\W\_]/g, '');
    let length = str.length - 1;
    for (let i = 0; i < length/2;i++){
      if (str[i] !== str[length-i])
        return false;
    }
    return true;
  }
  
// palindrome("race car");