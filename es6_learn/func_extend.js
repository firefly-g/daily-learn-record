//允许为参数设置默认值
function log(x,y='world'){
  console.log(x,y)
}

log('hello')   //hello world
log('hello','China')  //hello China
log('hello','')   //hello

//与解构赋值默认值结合使用
function foo({x,y=5}={}){
console.log(x,y)
}
foo({})   //undefined 5
foo({x:4})   //4 5
foo({x:3,y:3})  //3 3
foo()        //undefined 5

function fetch(url,{body='',method='GET',headers={}}){
  console.log(method);
}
fetch('http://example.com',{})  //GET
fetch('http://example.com')  //报错

//结合函数参数默认值，就可以省略第二个参数，出现双重默认值
function fetch(url,{body='',method='GET',headers={}}={}){
  console.log(method)
  
}
fetch('http://example.com')  //GET

//体会下列两种方法的差别
function m1({x=0,y=0}={}){
 console.log([x,y])
}

function m2({x,y}={x:0,y:0}){
console.log([x,y])
}
m1()   //[ 0, 0 ]
m2()   //[ 0, 0 ]
m1({x:3,y:8})  //[ 3, 8 ]
m2({x:3,y:8})  //[ 3, 8 ]
m1({x:3})      //[ 3, 0 ]
m2({x:3})    //[ 3, undefined ]
m1({})     //[ 0, 0 ]
m2({})   //[ undefined, undefined ]

m1({z:1})    //[ 0, 0 ]
m2({z:1})   //[ undefined, undefined ]

//参数默认值的位置
function f(x=12,y){
  console.log(x,y)
}
f()   //12 undefined
f(2)  // 2 undefined
f(undefined,11)  //12 11

function f(x=12,y){
  console.log(x,y)
}
f(undefined,null)  //12 null

//函数的length属性，等于没有指定默认参数的个数
console.log((function(a){}).length)  //1
console.log((function(a,b,c=1,d){}).length)  //2

//作用域
var x=1;
function f(x,y=x){   //此时的默认值y指向第一个参数（单独形成一个作用域）
console.log(y)
}

//函数做默认值参数
let foo='outer';
function bar(func=()=>foo){
  let foo='inner';
  console.log(func());
}
bar()  //outer

//复杂
var x=1
function f(x,y=function(){x=2}){      //！！！！！！！！！！！！！！
var x=3;
y();
console.log(x);
}
f()   //3
console.log(x)  //1

//复杂
var x=1
function f(x,y=function(){x=2}){      //！！！！！！！！！！！！！！
 x=3;
y();
console.log(x);
}
f()   //2
console.log(x) //1

//rest参数：获取函数的多余参数
function add(...values){
  let sum=0;
  for(var val of values){
    sum+=val;
  }
  console.log( sum)
}
add(2,5,7)  //14

//利用rest参数改写数组push方法的例子
function push(array,...items){
  items.forEach(function(item){
    array.push(item);
    console.log(item);
  })
}
var a=[];
push(a,1,2,3,4,5)

//函数的name属性：返回函数名
function fun(){}
console.log(fun.name)   //fun

const bay=function baz(){}
console.log(bay.name)       //baz

