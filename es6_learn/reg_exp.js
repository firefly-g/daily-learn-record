var regex=/t(e)(st(\d?))/g;
var string='test1test2test3';
var matches=[];
var match;
while (match =regex.exec(string)){
  matches.push(match);
}
console.log(matches)   //返回数组

//strign.prototype.matchAll()
var regex=/t(e)(st(\d?))/g;
var string='test1test2test3';
for(const match of string.matchAll(regex)){
  console.log(match)
}                                      //返回遍历器

//将遍历器转为数组
[string.matchAll(regex)]
//or
Array.from(string.matchAll(regex))

console.log(Number('Oo10'))


//Number.isFinite()  Number.isNaN()
console.log(Number.isFinite(15))  //true
console.log(Number.isFinite(Infinity)) //false
console.log(Number.isFinite('string')) //false
console.log(Number.isFinite(true))     //false

console.log(Number.isNaN(true))  //false

console.log(Number.isNaN(NaN))  //true
console.log(Number.isNaN(15))  //false
console.log(Number.isNaN(9/NaN))  //true
console.log(Number.isNaN('true'/0))  //true
console.log(Number.isNaN('true'/'true')) //true


//新旧对比
console.log(Number.isFinite('25'))  //false
console.log(isFinite('25'))      //true

//Number.parseInt()  Number.parseFloat()
console.log(Number.parseFloat('3.144'))  //3.144
console.log(Number.parseInt('3.144'))    //3
console.log(Number.parseFloat===parseFloat)  //true

//Number.isInteger()
console.log(Number.isInteger('3.144'))  //false
console.log(Number.isInteger('3'))   //false

console.log(Number.isInteger(true)) //false

console.log(Number.isInteger(3.00000000000000000000000))  //true
console.log(Number.isInteger(5E-324))   //false
console.log(Number.isInteger(5E-325))    //true


//Number.EPSILON 表示1与大于1的最小浮点数之间的差
console.log(Number.EPSILON===Math.pow(2,-52))  //true


//Number.isSafeInteger()  表示整数范围在-2^52到2^52之间的数
console.log(Number.isSafeInteger('a'))  //false


