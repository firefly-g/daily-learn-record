/**
 * 数据类型
 * 每个语言都有基本的数据类型
 * 原始类型: 字符串类型/Number/Boolean
 * 合成类型: 不是原型类型的话，就是合成类型
 */


 var a = '1'
 // var a = { name: '123' }
 var b =  2
 var c;
 c = a + b;
//  if(typeof a === 'string'){
//    c = parseInt(a) + b
//  }
// typeOf 和 instanceof
var n ;
n = 'GanTian';
var nn = 'GanTian';

 if(a instanceof String){
   c = parseInt(a) + b
 }

 console.log(c)
 console.log(undefined == null)
 console.log(undefined === null)

 // NaN   隐式转换

 var n = '2222z';
 var m = 5;
 var z ;
 // console.log(Number(n))
 // isNaN(n)
 if(isNaN(n)){
   console.log('Eneter if')
   z = m;
 } else {
   console.log('Enter else')
   z = m + Number(n)
 }

 console.log(z)