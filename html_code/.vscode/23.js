// 7/22：this的指向性问题
var a={
    p:'Hello',
    b:{
        m:function(){
            console.log(this.p);
        }
    }
}
console.log(a.p)
console.log(a.b.m)
a.b.m()                 //在a对象的第二层中。this指向a.b 所以输出undefined
console.log(a.b.m())

var b={
    m:function (){
        console.log(this.p);
    }
};

var a={
    p:'Hello',
    b:b
};

a.b.m()      //undefined

var a={
    b:{
        m:function(){
            console.log(this.p)
        },
        p:'Hello'
    }
}
a.b.m()         //在同一层时可以输出

//将含有嵌套对象内部方法赋值给一个变量
var a = {
    b: {
        m: function () {
            console.log(this.p)
        },
        p:'Hello'
    }
}

var Hello=a.b.m;
Hello()                   //undefined  此时this仍然指向全局变量

var Hello1=a.b;
Hello1.m()              // Hello 将m对应的对象赋值给Hello1，这样就不用改变指向

//多层this问题
var o = {
    f1: function () {
        console.log(this);          //全局or对象？ （对象）
        var f2 = function () {
            console.log(this);      //指向哪里？     （全局）
        }();
    }
}
o.f1()
//解决方法：在第二层里加入一个中间变量，存储指向外层的this
var o = {
    f1: function () {
        console.log(this);
        var temp = this;
        var f2 = function () {
            console.log(temp);
        }();
    }

}
o.f1() //Object   Object

//数组中的this问题
var o={
    v:'Hello',
    p:['v1','v2'],
    f:function(){
        this.p.forEach(function(item){
            console.log(this.v+" "+item);
        });                                
    }
}
o.f()
//undefined v1
//undefined v2     此时this指向全局，修改方法如之前，加入中间变量
var o={
    v:'Hello',
    p:['v1','v2'],
    f:function(){
        var temp=this;
        this.p.forEach(function(item){
            console.log(temp.v+" "+item);
        })
    }
}
o.f()
//Hello v1
//Hello v2 // 或者第二种方法：将this作为foreach()的第二个参数
var o={
    v:'Hello',
    p:['v1','v2'],
    f:function(){
        this.p.forEach(function(item){
            console.log(this.v+" "+item)
        },this)

    }
}
o.f()  
// Hello v1
// Hello v2

//回调函数中的this问题（此时的this易边，最好不用）
var o=new Object();
o.f=function(){
    console.log(this===o);
}()

//false 此时this不再指向对象·而是指向按钮的DOM对象，考虑绑定this使其固定
/**方法：
 * 1.call:第一个参数就是this要指向的对象，若参数为空、null、和undefined是默认传入全局对象
 *        后面的参数则是函数调用时所需的参数。主要运用于调用对象的原生方法
 * 2.apply:不同点在于第二个参数是一个数组，允许作为多个成员参数传入原函数
 * 3.bind:将函数体中的this绑定到某个对象，返回一个新函数
 * 
 */
var n=123;
var obj={n:456};

function a(){
console.log(this.n);
}

a.call()                //undefined
a.call(null)           //undefined
a.call(undefined)      //undefined
//a.call(window) 
console.log(global.n)  //undefined
a.call(obj)         //456

//调用对象的原生方法
var obj={};
obj.hasOwnProperty('toString') //false
obj.hasOwnProperty=function(){  //覆盖继承的hasOwnProperty方法
    return true;
}
obj.hasOwnProperty('toString')//true
Object.prototype.hasOwnProperty.call(obj,'toString')//false 将原生方法放到obj对象执行，无论obj上是否有t
// 同名方法，都不影响结果
apply绑定
function f(x,y){
    console.log(x+y);
}
f.call(null,1,1) //2
f.apply(null,[1,1]) //2

// //应用1：找出数组中最大的元素
var a=[10,2,5,32,4];
Math.max.apply(null,a) //32

// //应用2：将数组中的空元素变为undefined
console.log(Array.apply(null,['a', ,'d', 'c']))  //['a',undefined,'d','c']

//应用3：转换对象为数组  slice() 方法可从已有的数组中返回选定的元素。
Array.prototype.slice.apply({0:1,length:1})//[1]前提：对象中有length属性和数字键
Array.prototype.slice.apply({0:1}) //[]
Array.prototype.slice.apply({0:1,length:2})//此时提示还差一个元素（空）
Array.prototype.slice.apply({0:1,1:2,length:2})//[1,2]
console.log(Array.prototype.slice.apply({length:1})) //undefined

//应用4:绑定回调函数的对象 按钮点击事件
var o=new Object;
o.f=function(){
console.log(this===o);
}
o.f()  //true
var t=function(){
  o.f.apply(o);      //放在函数体中进行绑定
};
console.log(t);  //

//bind应用
var d=new Date()
console.log(d.getTime()) //??
var print=d.getTime;
print() //报错，把d.getTime方法赋值给变量之前时，方法内部的this绑定Data对象的实例
//赋值之后this指向发生改变

//解决：
var print=d.getTime.bind(d);
console.log(print)

//bind例子：(固定到自身对象上面)
var counter={
    count:0,
    add:function(){
        this.count++;
    }

}
//console.log(counter.add())   //undefined
temp=counter.add.bind(counter); //将counter.add()方法赋值给变量时，
//用bind()方法将add()内部的this绑定到counter上
temp(); 
temp();                   //此时变量可以运行add方法了
//console.log(temp.add)
console.log(counter.count)  //2

// bind例子： （将this绑定到其他的对象上面）可以让对个对象共用一个对象上面的方法
var counter = {
    count: 0,
    add: function () {
        this.count++;
    }
}
var obj={count:100}

 var temp=counter.add.bind(obj)
 temp();
 console.log(obj.count)//绑定到谁身上就用谁调用，此时count已经成为obj内部的属性

var add=function(x,y){
return x*this.m + y*this.n;
}

var obj={
    m:2,
    n:2
}
var newAdd=add.bind(obj,5)  //将add的第一个参数x绑定为5，然后返回一个新函数
newAdd(5)  //此时再接受一个y参数就可以运行了 20

var obj={
    names:'张三',
    times:[1,2,3],
    print:function(){
        this.times.forEach(function(n){console.log(this.names)}.bind(this))
    }
}
obj.print()//张三
张三
张三
console.log([1,2,3].slice(0,2))  //[1,2]    按指定位置输出一个新的数组
var res=[1,2,3].slice(0,2)
Array.prototype.slice.call([1,2,3],0,2)//[1,2] 等于在数组上调用了call方法，传入slice需要的两个参数
var slice=Function.prototype.call.bind(Array.prototype.slice);
console.log(slice([1,2,3,4],1))   //[2,3,4]这样就将一个变量转换为首先某种功能的函数

var push=Function.prototype.call.bind(Array.prototype.push)
var pop=Function.prototype.call.bind(Array.prototype.pop)
var a=[1,2,3]
var res=push(a,5)
console.log(res)//[1,2,3,5]
pop(a)  
pop(a)     //push方法改变原数组
console.log(a)//[1,2,3]
console.log(push([1,2,3],5)) 
console.log(push(1,2))       //此时为何输出4？？


//还可以将Function.prototype.call绑定到Function.prototype.bind对象，实现bind的直接调用
var bind=Function.prototype.call.bind(Function.prototype.bind)
var o={
    v:123
}
function f(){
    console.log(this.v)
}
bind(f,o)() //123 直接将一个函数指针绑定到另一个对象上面

// 对象的继承：代码复用，通过原型对(prototype)来实现
function Cat(name,color){
    this.name=name;
    this.color=color;
    this.speak=function(){
        console.log("喵喵~");
    }

}
var cat1= new Cat('大黄','yellow');  //new一个实例，集成构造函数的属性
var cat2=new Cat('小黑','black');
console.log(cat1.speak===cat2.speak) // false 缺点：多个实例之间无法共享属性，造成资源浪费

//解决方法：js的原型对象prototype
/*1.为对象指定原型，每个函数都有一个prototype属性，指向一个对象*/
function f(){}
console.log(typeof(f.prototype))//object

//在构造函数中，将实例共享的属性放在构造函数的原型对象上面就可以啦~
function Cat(name,color){
    this.name=name;
    this.color=color;
}
Cat.prototype.speak='喵喵~';
var cat1=new Cat('大白','white');
var cat2=new Cat('小蓝','blue')
console.log(cat1.speak===cat2.speak) //true
console.log(cat1.speak)  //共享时若修改数据，所有实例同步改变

// //以此可见原型对象的特殊：实例本身没有某个属性/方法时，就去原型对象上寻找！
cat1.speak="旺旺~"
console.log(cat1.speak)  // 当不需要读取原型对象的属性时当自己有了,
console.log(cat2.speak)
console.log(Cat.prototype.speak)

//应用：将构造函数的prototype属性指向一个数组，则其实例对象可以调用数组方法
var MyArray=function(){}
MyArray.prototype=new Array() //指向数组
MyArray.prototype.constructor=MyArray
var mine=new MyArray()
res=mine.push(1,2,3)
console.log(res)               //3
console.log(mine instanceof Array)  //true

// 7/23:;::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// constructor属性：默认指向prototype所在的对象函数。定义在ptrototype上面，可以被其他实例继承
作用是可以知道实力对象是哪个构造函数产生的
function P(){}
var p=new P()
console.log(p.constructor===P)     //true 
console.log(p.constructor===P.prototype.constructor)     //true
console.log(p.hasOwnProperty('constructor'))       //false

// 利用constructor，从一个实例对象新建另一个实例
function Constr(){}
var a=new Constr()
var b=new a.constructor
console.log(b.constructor===Constr)  //true

实现调用自身的构造函数
Constr.prototype.creatCopy=function(){
    return new this.constructor()
}                                 //creatCopy调用构造函数，新建另一个实例

// constructor表示原型对象与构造函数之间的关系，改变原型对象，constructor同时改变
function Person(name){
this.name=name;
}
console.log(Person.prototype.constructor===Person) //true
Person.prototype={
    method:function(){}     //改变构造函数的原型对象,constructor将不指向元构造函数
}
console.log(Person.prototype.constructor===Person) //false
console.log(Person.prototype.constructor===Object) //true 

解决方法
 Person.prototype={
     constructor:Person,
     method:function(){}
 }

 console.log(Person.prototype.constructor===Person)  //true

或者
Person.prototype.method=function(){}
console.log(Person.prototype.constructor===Person)   //true

//如何确定constructor指向哪个构造函数？
function Foo(){}
var f=new Foo
console.log(f.constructor.name)       //Foo

// instanceof:判断对象是否为某个构造函数的实例
var v=new Vehicle()
console.log(v instanceof Vehicle)

//上面先检查右边的原型对象是否在左边的原型链上面。但是左边为null对象时，instanceof会失真。等价于
Vehicle.prototype.isPrototyprOf(v)

//利用instanceof解决调用构造函数是忘了加new
function F(foo,bar){
    if(this instanceof F)
    {
        this.foo=foo;
        this.bar=bar
    }else{
        return new F(foo,bar)
    }
}

//构造函数的继承:1.在子类的构造函数中调用父类的构造函数 
function Son(value){
    Father.call(this);   //this:子类的实例，在实例上调用父类的构造函数Father,让子类实例具有父类实例的属性
    this.prop=value;
}
//2.让子类的原型指向父类的原型，使子类能继承父类原型
Son.prototype=Object.create(Father.prototype)
Son.prototype.constructor=Son     //间接找一个中介使父类的原型赋值给子类
Son.prototype.method=""

//应用：将长方形的构造函数继承Shape
function Shape(){
    this.x=0;
    this.y=0;
}
Shape.prototype.move=function(x,y){
    this.x+=x;
    this.y+=y;
    console.log('Shape moved.');
}
//Rectangle继承Sahpe
//1.子类继承父类的实例
function rectangle(){
    Shape.call(this);
}//2.继承原型
rectangle.prototype=Object.creat(Shape.prototype);
rectangle.prototype.constructor=rectangle         // 子类整体继承父类

//单个方法的继承
B.prototype.print=function(){
    A.prototype.print.call(this)            //B的print方法调用A的print方法
   //  ...
}

多重继承
function F1(){
    this.hello='hello'
}
function F2(){
    this.world='world'
}
function S(){
    F1.call(this);
    F2.call(this);
}
//继承F1
S.prototype=Object.create(F1.prototype)
S.prototype=Object.create(F2.prototype)
//继承F2,原型链上加入F2
//Object.assign(S.prototype,F2.prototype)
//指定构造函数
S.prototype.constructor=S
var s=new S()
console.log(s.hello+" "+s.world)

// 模块：封装一组属性和方法，实现特定功能（利用对象实现模块的效果）
// 封装私有函数：构造函数的写法
function StringBuilder(){
    var buffer=[]
    this.add=function(str){
        buffer.push(str)
    }
    this.toString=function(){
        return buffer.join('')
    }
}
// 封装私有函数：立即执行函数的写法
 var Moudel=(function(){
     var _count=0;
     var m1 = function(){
        console.log('我是小姐姐')
     };
     var m2 = function(){
        console.log('我是小哥哥')
    }
    return{
        m1:m1,
        m2:m2
    }
 })()
 console.log(Moudel._count)  //undefined 此时外部无法读取_count变量

//放大模式：一个大模块拆分、一个模块继承另一个模块
 var module=(function f(mod){
     mod.m3=function(){
         console.log('hello')
     }
     return mod
 })(module)
//  console.log(module)   到底用来干嘛的呢？？

//宽放大模式：立即函数的参数可以是空对象
var module=(function(mod){
    return mod;
})(window.module||[])

模块内部调用全局变量
var module=(function($,YAHOO){

})(jQuery,YAHOO)  //吧jQuery库和YUI库当作参数输入模块

立即函数可以起到命名空间的作用
(function($,window,document){
    function A(){}
    function B(){}
    function C(){}
    window.D={      // D对象输出到全局,对外暴露init和destroy接口
        init:B,
        destroy:C
    }
})(jQuery,window,document)   //但内部方法A，B，C，是外部无法调用的

// Object对象的相关方法
// Object.prototype:
var F=function (){}
var f=new F()
console.log(Object.getPrototypeOf(f)===F.prototype) //获取对象原型

console.log(Object.getPrototypeOf({})===Object.prototype) //true
console.log(Object.getPrototypeOf(Object.prototype)===null) //true
console.log(Object.getPrototypeOf(F)===Function.prototype) // 函数原型是Function.prototype

 Object.setPrototypeOf  //为现有对象（参数1）设置原型对象（参数2）
var a={}
var b={x:1}
Object.setPrototypeOf(a,b)
console.log(Object.getPrototypeOf(a)===b.prototype) //false
console.log(Object.getPrototypeOf(a)===b)    //true
console.log(a.x)    //1

//应用：实现new命令
var F=function (name){
    this.name=name
}

var f=Object.setPrototypeOf({},F.prototype)
F.call(f)

Object.creat()  //直接从一个对象生成另一个实例对象
var A={
    print : function(){
        console.log('hello');
    }
}
 var B=Object.create(A)
 console.log( Object.getPrototypeOf(B)===A)
 B.print()   //hello

 //等价
 if(typeof Object.create !== 'function'){
     Object.create=function (obj) {
         function F(){}  //新建空构造函数
         F.prototype=obj //原型指向obj
         return new F() //返回一个实例
     }
 }

//生成新对象的三个方法：
var obj1=Object.create({})
var obj2=Object.create(Object.prototype)
var obj3=new Object()

//参数为空时，不具备Object.prototype对象上面的属性
var obj=Object.create(null)
obj.valueOf()                  //报错

//Object.create第二个参数为属性描述对象，将属性添加到实例对象中作为对象自身的属性
var obj=Object.create({},{
    p1: {
    value:123,
    enumerable:true,
    configurable:true,
    writable:true,

    },
    p2: {
        value:'abc',
        enumerable:true,
        configurable:true,
        writable:true,

        }

})
//等于
var obj=Object.create({})
obj.p1=123;
obj.p2='abc'

// isPrototypeOf方法：判断对象是否为参数对象的原型
var o1={}
var o2=Object.create(o1)
var o3=Object.create(o1)
console.log(o1.isPrototypeOf(o2))  //true
console.log(o1.isPrototypeOf(o3)) //true

//__proto__属性，返回对象的原型，属性可读写
var A={
    name:'Amy'
}
var B={
    name:'sunny'
}
var C={
    name:'penny'
}
var proto={
    print:function(){
        console.log(this.name)
    }
}
A.__proto__=proto
B.__proto__=proto
A.print()
B.print()

//获取实例对象的原型对象方法
// 1.obj__proto__
// 2.obj.constructor.prototype
// 3.Object.getPrototypeOf(obj)

getOwnPropertyNames //返回对象属性的键名（数组）
console.log(Object.getOwnPropertyNames(Date)) //返回Date自身属性名

//hasOwnProperty:判断某个属性是否定义在对象自身，还是在原型链上
 console.log(Date.hasOwnProperty('length')) //true

 //等价
 console.log('length' in Date)

//for...in循环
var a={p1:123}
var b=Object.create(a,{
    p2:{
        value:'abc',
        enumerable:true
    }
})
for(p in b){
    console.info(p)   //p2 p1   ?????????????????????????????????????????????????????

}

//获得对象的所有属性                       ????????????????????????????????????????????
function inheritedPropertyNames(obj){
    var props={}
    while(obj){
        Object.getOwnPropertyNames(obj).forEach(function(p){
            props[p]=true
        })
        obj=Object.getPrototypeOf(obj)
    }
    return Object.getOwnPropertyNames(props)
}
console.log(inheritedPropertyNames(Date))

//对象的拷贝？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？

// 异步操作的模式：回调函数、事件监听、发布/订阅（观察者模式）
// 异步操作的流程控制：
function async(arg,callback){    //一个异步任务，执行1s后在调用回调函数
    console.log('参数为'+arg+',一秒后返回结果')
    setTimeout(function(){callback(arg*2)},1000)
}


function final(value){              //?????????????????????????????????????///
    console.log('完成：',value);
}
async(1,function(value){
    async(2,function(value){
        async(3,function(value){
            async(4,function(value){
                async(5,function(value){
                    async(6,final)
                })
            })
        })
    })
})

//串行执行
var items=[1,2,3,4,5,6]
var results=[]
function async(arg,callback){
    console.log('参数为'+arg+',一秒后返回结果')
    setTimeout(function(){callback(arg*2)},1000)
}
function final(value){
    console.log('完成：',value)
}

function series(item){
    if(item){
        async(item,function(result){
            results.push(result)
            return series(items.shift())
        })
    }else{
        return final(results[results.length-1])
    }
}
series(items.shift())

//并行执行
var items = [1, 2, 3, 4, 5, 6]
var results = []
function async(arg, callback) {
    console.log('参数为' + arg + ',一秒后返回结果')
    setTimeout(function () { callback(arg * 2) }, 1000)
}
function final(value) {
    console.log('完成：', value)
}
items.forEach(function (item) {
    async(item, function (result) {
        results.push(result);
        if (results.length === items.length) {
            final(results[results.length - 1])
        }
    })
})

//并行与串行的结合
var items = [1, 2, 3, 4, 5, 6]
var results = []
var running=0
var limit=2
function async(arg,callback){
    console.log('参数为:'+arg+' ,1秒后返回结果')
    setTimeout(function(){
        callback(arg*2)
    },1000)
}
function final(value){
    console.log('完成',value)
}
function launcher(){
    while(running<limit&&items.length>0){
        var item=items.shift()
        async(item,function(result){
            results.push(result)
            running--
            if(items.length>0){
                launcher()
            }else if(running==0){
                final(results)
            }
        })
        running++
    }
}
launcher()

//定时器：setTimeout() 指定函数或代码在多少时间后执行，返整数（编号），用来之后取消定时器
setInterval() 
console.log(1)

setTimeout('console.log(2)',1000)    //????????????????????????????????????????????????
console.log(3)

function f(){
    console.log(2)
}
setTimeout(f,1000)

console.log(1)
setTimeout(function(x,y){
    console.log(x+y)
},1000,1,2)
console.log(5)     //1 5 3

var x=1
var obj={
    x:3,
    y:function(){
        console.log(this.x)
    }
}
setTimeout(obj.y,1000) //1 此时setTimeout把this指向全局？？？？？？？？？？？？？？

//解决方法1：把obj.y用匿名函数包装起来
setTimeout(function(){obj.y()},1000)  //3

//解决方法2：用bind把obj.y方法绑定在obj上面
setTimeout(obj.y.bind(obj),1000)        //3

setInterval() //每隔一段时间执行一次
res=setInterval(function(){
   console.log('2')

},1000)
clearInterval(res)

//应用：实现轮询
var hash=window.location.hash
var hashWatcher=setInterval(function(){
   if(window.location.hash!=hash){
      updatePage()
   }
},1000)

// //清空之前所有的定时器（立即函数）
(function(){
   var gid=setInterval(clearAllTimeouts,0)
   function clearAllTimeouts(){
      var id=setTimeout(function(){},0)
      while(id>0){
         if(id!==gid){
            clearTimeout(id)
         }
         id--
      }
   }
})()

//防抖（debounce)：设置两次ajax通信的间隔，避免造成大量的ajax通信，产生性能问题
$('textarea').on('keydown', debounce(ajaxAction, 2500));
function debounce(fn, delay) {
   var timer = null;           //声明一个计时器
   return function () {
      var context = this;
      var args = argumwnts;
      timer = setTimeout(function () {
         fn.apply(context, args);
      }, delay);
   };
}

seetTimeout(f,0) //必须要等到同步任务执行完毕才能执行回调函数
setTimeout(function(){
   console.log(1)
},0)
console.log(2)    //2 1

//应用 调整事件的发生顺序

//Promise对象：充当异步操作与回调函数的中介 所有异步任务是一个promise实例，用then方法指定回调函数
function f(resolve,reject){
   //异步代码
}
var p1= new Promise(f)  //p1为实例对象
p1.then(f2)     //f1异步任务执行完就执行f2

var p1=new Promise(function(resolve,reject){
   resolve('成功');
});
p1.then(console.log,console.error); //成功
var p2=new Promise(function(rsolve,reject){
   reject(new Error('失败'))
})
p2.then(console.log,console.error) //失败

//实例：图片加载
var preloadImage=function(path){
   return new Promise(function(resolve,reject){
      var image=new Image();
      image.onload=resolve;
      image.onerror=reject;
      image.src=path;
   });
}
preloadImage('http://www.baidu.com').then(function(e){document.body.append(e.target)}).then(function(){console.log('成功')})

