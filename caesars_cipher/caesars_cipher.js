function rot13(str) {
    var result = '';
    for(let i =0; i<str.length;i++){
      let charCode = str.charCodeAt(i)
      if(charCode >= 65 && charCode <= 77){
        result += String.fromCharCode(charCode+13);
      }
      else if(charCode > 77 && charCode <= 90){
        result += String.fromCharCode(charCode-13);
      }
      else {
        result += str[i];
      }
    }
    // console.log(result);
    return result;
  }
  
//   rot13("SERR PBQR PNZC");