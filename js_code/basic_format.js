/**
 * 基本语法
 * 
 */

 // undefined 和 null
 // let : 变量范围区别    
 // const : 不想变量改变的话,就使用这个
 var a ;
 console.log(a);

 var b = 1;
 b = 2;
 console.log(typeof b)

//  var c = '123';
//  {
//    let c = '456';
//    console.log(c)
//  }

/**
 * 加法.
 * @param {*} x 
 * @param {*} y 
 */
function add(x,y){
  return x + y;
}

var name = 'GanTian';
function changeName() {
  name = 'GavinYang'
  return name;
}
name = changeName()
console.log(name)

// ==  ===
// switch  break穿墙
// 使用三元表达式的时候,需要注意:运算的优先级问题
var count = 0;
while(count < 10){
  console.log(count)
  count ++;
}
var cc=0;
do{
console.log(cc);
cc++;
}while(cc<10)