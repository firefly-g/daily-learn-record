// let res=id=>({id:id,name:'Tom'})  //对

// res=[1,2,3].map(x=>x*x)
// console.log(res)      //[1,4,9]

// //箭头函数与rest函数结合
// const number=values.sort(function(a,b){return a-b})
// var number=values.sort((a,b)=>a-b)

// const number=(...nums)=>nums;
// console.log(number(1,2,3,4,5))  //[ 1, 2, 3, 4, 5 ]

// const headAndTail=(head,...tail)=>[head,tail];
// console.log(headAndTail(1,2,3,4,5))    //[ 1, [ 2, 3, 4, 5 ] ]

// //箭头函数使this指向固定化（绑定定义使所在的作用域），有利于封装回调函数
// function Timer(){
//   this.s1=0;
//   this.s2=0;
//   setInterval(()=>this.s1++,1000);
//   setInterval(function(){
//     this.s2++;
//   },1000);
// }
// var timer=new Timer()
// setTimeout(()=>console.log('s1',timer.s1),3100);  //s1 3  箭头函数使this指向固定化（绑定定义使所在的作用域），有利于封装回调函数
// setTimeout(()=>console.log('s2',timer.s2),3100);  //s2 0

// var handler={
//   id:'123456',
//   init :function(){
//     document.addEventListener('click',event=>this.doSmething(event.type),false);
//   },
//   doSmething:function(type){
//     console.log('Handling'+type+'for'+this.id);
// }

// }

// const cart={
//   wheels:4,
//   get wheels(){
//     return this.wheels;
//   },
//   set wheels(value){
//     if(value<this.wheels){
// throw new Error('数值太小了！');
//     }
//     this.wheels=value
//   }
// }
// console.log(cart)

// //表达式作为对象的属性名
// let lastWord='last word';
// const a={
//   'first word':'hello',
//   [lastWord]:'world'
// };
// console.log(a['first word'])

// //表达式还可以定义方法名
// let obj={
//   ['h'+'ello'](){
//     return 'hi';
//   }
// };
// console.log(obj.hello())     //hi

// //方法的name属性返回函数名
// const obj={
//   get foo(){},
//   set foo(x){}
// };
// const desc=Object.getOwnPropertyDescriptor(obj,'foo');
// console.log(desc.get.name)  //get foo
// console.log(desc.set.name)   //set foo

// //属性的遍历
// //1.for...in
// //2. Object.keys(obj)
// //3.Object.getOwnPropertyNames(obj)
// //4.Object.getOwnPropertySymbols(obj)
// //5.Peflect.ownKeys(obj)
// console.log(Reflect.ownKeys({[Symbol()]:0,b:0,10:0,2:0,a:0}))   //[ '2', '10', 'b', 'a', Symbol() ]

// //super关键字：指向当前对象的原型对象
// const proto={
//   foo:'hello'
// };
//  const obj={
//    foo:'world',
//    find() {
//      return super.foo;   //此处引用了原型对象的proto的foo属性
//    }
//  };
//  Object.setPrototypeOf(obj,proto);
//  obj.find()

//  const proto={
//    x:'hello',
//    foo(){
// console.log(this.x);
//    }
//  };

//  const obj={
//    x:'world',
//    foo(){
//      super.foo();
//    }
//  }

//  Object.setPrototypeOf(obj,proto)
// obj.foo()                         //world

// //链判断运算符
// const firstName =message?.body?.user?.firstName||'default';

// //Object.is() 判断值是否严格相等
// Object.is('foo','foo')

// console.log(Object.is({},{}))   //false
// console.log(Object.is(+0,-0))   //false
// console.log(Object.is(NaN,NaN) )    //true

// //Object.assign()  对象的合并、实行的是浅拷贝
// const a={a:1}
// const b={b:2}
// const c={c:3}
// Object.assign(a,b,c)
// console.log(a)       //{ a: 1, b: 2, c: 3 }    //第一个参数是目标对象

// const obj1={a:{b:1}}
// const obj2=Object.assign({},obj1)
// obj1.a.b=2;
// console.log(obj2.a.b)     //2

// //
// let proto={}
// ;
// let obj={x:10};
// Object.setPrototypeOf(obj,proto);
// proto.y=20;
// proto.z=40;

// console.log(obj.x,obj.y,obj.z)    //10 20 40

// function Rectangle() {
//   // ...
// }

// const rec = new Rectangle();
// Object.setPrototypeOf(rec, Object.prototype);
// console.log(Object.getPrototypeOf(rec) === Rectangle.prototype)
// // false

// function iniq(array){
//   var temp=[];
//   for (var i=0;i<array.length;i++){
//     if(array.indexOf(array[i])==i){
//       temp.push(array[i])
//     }
//   }
//   return temp;
// }
// var a=[1,2,'3',4,'a',5,7,5,8,'7']
// console.log(iniq(a))

// for(var i=0;i<10;i++){
// console.log( i)
// }
// console.log(i)

function uniq(array) {
  let temp = [];
  for (var i = 0; i < array.length; i++) {
    if (array.indexOf(array[i]) === i) {
      temp.push(array[i]);
    }
  }

  return temp;
}

let arr = [1, 2, 2, "a", "a", 9, 9];
console.log("去除前：=", arr);
console.log("去除后", uniq(arr));

const obj = {};
let a = Symbol("a");
let b = Symbol("b");
obj[a] = "hello";
obj[b] = "world";
const objectSymbols = Object.getOwnPropertySymbols(obj);
console.log(objectSymbols); //[ Symbol(a), Symbol(b) ]

const obj = {};
const foo = Symbol("foo");
obj[foo] = "bar";
for (let i in obj) {
  console.log(i);
} //无输出

console.log(Object.getOwnPropertyNames(obj)); //[]
console.log(Object.getOwnPropertySymbols(obj)); //[ Symbol(foo) ]

//使用Reflect.ownKeys)()方法可以返回所有类型的键名
let obj = {
  [Symbol("my_key")]: 1,
  enum: 2,
  nonEnum: 3,
};
console.log(Reflect.ownKeys(obj)); //[ 'enum', 'nonEnum', Symbol(my_key) ]

let size = Symbol("size"); ////  ???????????????????????
class Collection {
  constructor() {
    this[size] = 0;
  }
  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
console.log(Collection.sizeOf(x)); //0
x.add("foo");
console.log(Collection.sizeOf(x)); //1
console.log(Object.keys(x)); //[ '0' ]
console.log(Object.getOwnPropertyNames(obj)); //[ 'enum', 'nonEnum' ]
console.log(Object.getOwnPropertySymbols(obj)); //  [ Symbol(my_key) ]

class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}
console.log(1 instanceof Even); //false

let arr1 = ["c", "d"];
console.log(["a", "b"].concat(arr1, "e")); //[ 'a', 'b', 'c', 'd', 'e' ]
console.log(arr1[Symbol.isConcatSpreadable]); //undefined

let arr2 = ["c", "d"];
arr2[Symbol.isConcatSpreadable] = false; //设置数组arr2不能展开
console.log(["a", "b"].concat(arr2, "e")); //['a','b', [ 'c', 'd'], 'e']

let obj = { length: 2, 0: "c", 1: "d" };
console.log(["a", "b"].concat(obj, "e"));
//result: [ 'a', 'b', { '0': 'c', '1': 'd', length: 2 }, 'e' ]

obj[Symbol.isConcatSpreadable] = true;
console.log(["a", "b"].concat(obj, "e")); //[ 'a', 'b', 'c', 'd', 'e' ]
