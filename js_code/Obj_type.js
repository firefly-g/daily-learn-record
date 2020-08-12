/**
 * 对象类型Coding
 */
var objj = {
  name:'9527'
}
 // 定义了一个对象
 // 属性也叫字段.
 var obj = {
   name: 'GanTian',
   age: 22,
   1: 123,
   learn: function(){
     var name = 'GavinYang';
     name = this.name
     console.log(objj.name + '学习Coding')
   },
   toString: function(){
     console.log('Gt beanutiful')
   }
 }

 
 // 假设后端传过来的
var oo = {
  names:'GanGan'
} 
obj.name = oo.names
 // 对obj 对 name 进行赋值,赋值后的值是 GavinYang
// obj.name = 'GavinYang'
console.log('-----------en')
// 运用
console.log(obj.hasOwnProperty('toString'))
console.log(obj['na'+'me'])
console.log(obj.name)

 // console.log(obj['1'])
 obj.learn()

 function a(){
   console.log('执行的a方法')
 }

 function b(){
   console.log('执行方法b')
 }

 var fName = 'a()'
//  if (fName === 'a()'){
//    a();
//  } 
//  if(fName === 'b()' ){
//    b();
//  }
//  eval('console.log("GT beautiful");console.log("11223");')

 // obj['hello' + ' world']  ---> obj['hello world']
 // obj[3+3] ---> obj[6]

var pr = function x(){
  console.log('GT beautilful');
  // x();
  // return ;
};
pr();
// x();

// 递归,写递归的时候一定要注意什么时候跳出递归来.
//  严谨性
// 函数柯里化
