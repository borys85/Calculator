const digits = {
  Z: 2000,
  M: 2000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40, X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
};

function rome2arab(str) {
    return str.toUpperCase().split('').reduce(function (s, v, i, arr) {
	    const [a, b, c] = [
	     digits[arr[i]],
		 digits[arr[i + 1]],
		 digits[arr[i + 2]],
		];
		return b > a ? s - a : s + a; 
	}, 0)
}

function arab2rome(num) {
   if (num < 1) return '';
   let result = '';
   for (key in digits) 
      while (num >= digits[key]) {
	     result += key;
		 num -= digits[key];
	  }
	return result;  
}

function calculator(str) {
  let letter = [];
  str = str.replace(/[^IVXLCDMZ\d+\-*\/]/gi, ch => {
    if (ch !== ' ') letter.push(ch);
    return ' ';
  });
  if (letter.length > 0)
    throw Error('Uncorrect symbols :( ' + letter);
  let vars = str.split(/[+\-*\/]/g)
  if (vars.length !== 2)
    throw Error ('Shoud be two number :(');
  const isRome = /^[IVXLCDMZ]+$/i;

  const r = vars.reduce((s, v) => s + isRome.test(v), 0);
   if (r === 1)
      throw Error ('Both numbers shoud be same style: arab or rome :(');
   else if (r === 2)
     vars = vars.map(v => rome2arab(v));
	   if (vars.some(v => v < 1 || v > 10))
	     throw Error ('Number);
	let acr = str.match(/[+\*-\/]/)[0]
	let result = Math.floor(eval(vars.join(acr)))
	//console.log(result); 
	return r === 0 ? result.toString() : arab2rome(result);
}
