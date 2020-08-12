var {x=3}={x:undefined}
console.log(x)   //3 对象属性严格为undefined时，默认值生效
console.log('123')


//已经声明的对象用于结构赋值时，不能将{}写在行首
let x;
({x} = {x:1});
console.log(x)  //1

//对数组进行对象属性的解构
let arr =[1,2,3];
let {0:first,[arr.lenght-1]:last}=arr;
console.log(first); //1
console.log(last);  //undefined???? 3

//字符串的解构赋值
const res=[a,b,c,d,e]='hello';
(function(){
  for(let i=0;i<5;i++){
  console.log(res[i])
}
})()                   //h e l l o
let {length:len}='hello'
console.log(len)       //5

//数值和布尔值的解构赋值 如果等号右边的是数值或者布尔值，先转为对象
let {toString:s}=123;
console.log(s===Number.prototype.toString)  //true

let {prop:x}=undefined;  //等号右边undefined和null无法转为对象
let {prop:y}=null;     
console.log(x,y)        //error

//函数参数的解构赋值
function add([x,y]){
  return x+y;
}
console.log(add([1,2]))  //3

res=[[1,2],[3,4]].map(([a,b])=>a+b)
console.log(res)        //[3,7]

function move({x=0,y=0}={}){
return [x,y];
}
console.log(move({x:1,y:2}))  //[ 1, 2 ]
console.log(move({x:2}))      //[ 2, 0 ]
move({})             //????/ [undefined, undefined]
move()                //???? [0,0]
// ({x=0,y=0}={})
// console.log(x,y)  //0 0

console.log([1,undefined,3].map((x='yes')=>x))  //[ 1, 'yes', 3 ]

//用途：1.交换变量的值
let x=1;
let y=2;
[x,y]=[y,x]
console.log(x,y)  //2 1
//2.从函数中返回多个值
function example(){
  return [1,2,3];
}
let res= [a,b,c] =example()
console.log(res)            //返回一个数组

function example(){
  return {
    foo:1,
    bar:2
  };
}
let res={foo,bar} = example()
console.log(res)           //返回一个对象

//3.函数参数的定义
function f([x,y,z]){
  //.......
}
f([1,2,3]);

//4.提取JSON数据
let jsonData={
  id:42,
  status:'OK',
  data:[867,5309]
};

let {id,status,data:number}=jsonData;
console.log(id,status,number)          //42 OK [ 867, 5309 ]

//5.函数参数的默认值

//6.遍历Map结构
const map=new Map();
map.set('first','hello');
map.set('second','world');
for(let [key,value] of map){
  console.log(key+' is '+value);
}                              //first is hello
                               //second is world

 //7.输入模块的指定方法
 const { SourceMapConsumer,SourceNode } =  require('source-map')   
 
 
 var person = {
  firstName:"John",
  lastName:"Doe",
  age:50,
  eyeColor:"blue",
  subject : ['english','math','chinese'],
  info : {
    '07-28':'应天',
    '07-29':'晴天',
    'all':[1,2,3,4]
  },
  say: function(){
    console.log('i"m say()')
  }
}; 

// {}
// []
// [{name:[n:{n:123}]},{},{}]
// [1,2,3]



var text = '{ "sites" : [' +
'{ "name":"Runoob" , "url":"www.runoob.com" },' +
'{ "name":"Google" , "url":"www.google.com" },' +
'{ "name":"Taobao" , "url":"www.taobao.com" } ]}';
var b = 'gt'
var textObj = JSON.parse(text)
console.log(textObj)
textObj.name = 'GT'
var arr = [1,2,3]
var jsonStr = JSON.stringify(arr)
console.log(jsonStr)

//console.log(typeof text)


function add() {
  var counter = 0;
  function plus() {
    var innerParam = 'gt'
    counter += 1;
  }
  console.log(innnerParam)
  plus();    
  return counter; 
}

var name = 'GanTian'
var name1 = name.replace('Gan','Bao')
console.log(name)


//正则匹配索引
const text='zabbcdef';
const re=/ab/;
const result=re.exec(text);
console.log(result.index) //1
console.log(result.indices)  //[1,3]不包含3

const text='zabbcdef';
const re=/ab+(cd)/;
const result=re.exec(text);
console.log(result.indices) //[[1,6],[4,6]]  组匹配

