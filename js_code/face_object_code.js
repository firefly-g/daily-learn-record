/**
 * 面向对象基础.
 */

 /**
  *  new 执行函数的过程
  * 
    创建一个空对象，作为将要返回的对象实例。
    将这个空对象的原型，指向构造函数的prototype属性。
    将这个空对象赋值给函数内部的this关键字。
    开始执行构造函数内部的代码。
  * 
  */

var Vehicle = function(){
  this.price = 1000;
  this.age = undefined;
  this.name = 'GanTian';
  this.time = null;
  return 1000;
}  

// new 这个对象的话,返回的是键值对信息
// Vehicle { price: 1000, age: 22, name: 'GanTian' }
console.log(new Vehicle()['name'].toString())
console.log((new Vehicle().price) == 1000)


var n = 123;
var obj = { n:456 };
function a(){
  console.log('--------------------')
  // 改变 this 指向, 并且指向 call / apply 传入的参数
  console.log(this);
  // console.log(this.global.global);
  // this.n = 'GanTian';
  // this.age = 22;
}

a();

// a.call() // 123
//a.call(null) // 123
//a.call(undefined) // 123
//a.call(window) // 123
// 传入obj后,a中的this指向的是 obj. 
// 如果传入进去的参数没有,或者是null,或者是undefined的话,就会是全局对象
// 使用 call , 
a.call(obj) // 456
//console.log(obj.n)
// console.log(obj.age)

