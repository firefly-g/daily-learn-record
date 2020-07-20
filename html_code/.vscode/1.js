// var user='';
// function greet(user){
//     console.count();
//     console.log(123);
//     return ("hi"+user);
//     console.log(888);
// }
// greet('Susan')

//console.log({name:'gt',sex:'female'})
//console.dir({name:'gt',sex:'female'}) //检查对象object

//console.dir(document.body)//输出dom对象

//console.assert(false,'判断条件不成立')

// try{
//     if(!false){
//         throw new Error('判断条件不成立');
//     }
//     }
//     catch(e){
//         console.error(e);
//     }
// console.log('JavaScript'.substring(10,4))//若第一个参数大于第二个参数，自动更换位置。参数1：开始 参数2：结束（不包含）
// console.log('JavaScript'.substring(-3))//参数为负，自动变为0
// console.log('JavaScript'.substring(4,-3))//负数自动变为0，参数交换位置

// console.log('JavaScript'.substr(0,4))//参数1：开始位置 参数2：子字符串的长度
// console.log('JavaScript'.substr(-2))//pt 参数为负：从结尾开始倒数计算的位置
// console.log('JavaScript'.substr(4,-3))//第2参数为负，自动变为0，返回空字符
// console.log('JavaScript'.substr(8,3))
// console.log('JavaScript'.substr(-2,-5))//空字符
// console.log('JavaScript'.substr(-8,3))//从倒数第8个开始，正向返回3个

// console.log('Hello World'.indexOf('o'))//返回子字符在原字符中第一次出现的位置
// console.log('Hello World'.indexOf('World'))
// console.log('Hello World'.indexOf('ll'))
// console.log('Hello World'.indexOf('Wr'))//不匹配时，显示-1
// console.log('Hello World'.indexOf('o',6))//7 从第二个参数的索引位置开始正向查找第一个字符在原字符中第一次出现得位置
// console.log('Hello World'.lastIndexOf('o',6))//从第二个参数的索引位置反向匹配
// console.log('Helll you World'.lastIndexOf('o',6))//匹配不到时返回-1
// console.log('Hello World'.indexOf('o',-4))//从倒数第4个位置正向匹配？？？？
// console.log('Hello World'.indexOf('o',-8))//????????????//


// console.log(' Hello World '.trim())//清除字符串两边的空格、制表符（\t、\v)\换行符（\n)和回车符（\r)
// console.log('  \r \nHello World\t '.trim())

// console.log(' Hello World '.toLowerCase())//将原字符串转为小写
// console.log(' Hello World '.toUpperCase())

// console.log('cat, bat, sat,seat'.match('at'))//['at']确定原字符串行否匹配某个子字符串，返回一个数组！（匹配的第一个字符串），失败返回null
// var res='car,cat,bat,sat,seat'.match('at')
// console.log(res.index)//返回的一个字符串匹配的位置
// console.log(res.input)//返回原字符串        （可以使用正则表达式作为参数）


// console.log('cat, bat, sat,seat'.search('at'))//1  返回值为匹配的第一个位置！

// console.log('aaa'.replace('a','b'))//替换匹配的子字符串，一般只替换第一个匹配

// split分割分割分割分割
// console.log('a|b|c'.split('|'))//返回一个由分割出来的子字符串组成的数组
// console.log('a|b|c'.split(''))//若分割规则为空字符串，则返回原字符串的每一个字符
// console.log('a|b|c'.split('  '))//
// console.log('a|b|c'.split())//省略参数时返回原字符串
// console.log('a|||c'.split('|'))//若分隔符紧邻，返回的数组中会出现空字符串
// console.log('a||c|'.split('|'))

// //console.log('a|b|c'.split('|',0))//参数2：限定返回数组的最大成员数
// console.log('a||c|'.split('|',0))
// console.log('a||c|'.split('|',1))
// console.log('a||c|'.split('|',2))
// console.log('a||c|'.split('|',3))
// console.log('a||c|'.split('|',4))
// console.log('a||c|'.split('|',5))


// console.log('china'.localeCompare('usa'))//逐个字母比较大小，小于第2个参数返回-1
// console.log('C'.charCodeAt())
 // console.log('u'.charCodeAt())
// console.log('B'.localeCompare('a'))//考虑到自然语言的排序情况，B比a大
// console.log('C'.localeCompare('b'))
// console.log('A'.localeCompare('u'))

//数学常数表达法
// console.log(Math.E)// 常数e
// console.log(Math.LN2)//2的自然对数
// console.log(Math.LN10)//10的自然对数
// console.log(Math.LOG2E)//以2为底的10的对数
// console.log(Math.LOG10E)//以10为底的e的对数
// console.log(Math.PI)//π
// console.log(Math.SQRT1_2)//0.5的平方根
// console.log(Math.SQRT2)//2的平方根

// console.log(Math.abs(-2))//绝对值
// console.log(Math.ceil(-2.89))//-2 向上取整
//console.log(Math.ceil(3.01))//4
// console.log(Math.floor(-2.89))//-3 向下取整
// console.log(Math.max(-2,0,3,5))//最大值
// console.log(Math.max(-2,-2))
// console.log(Math.min(-2,-2))//最小值
// console.log(Math.max())//-infinity
// console.log(Math.min())//infinity

// function toInteger(x){
//     x=Number(x);
//     return x<0?Math.ceil(x):Math.floor(x);
// }
// console.log(toInteger(3.2))//3
// console.log(toInteger(0.0))//0

// console.log(Math.round(0.1))
// console.log(Math.round(0.5))//1 四舍五入 等同于Math.floor(x+0.5)
// console.log(Math.round(-0.5))//-0
// console.log(Math.round(-1.5))//-1
// console.log(Math.round(-1.6))//-2

// console.log(Math.pow(10,3))//幂运算

// console.log(Math.sqrt(4))//2 平方根
// console.log(Math.sqrt(-4))//参数为负 返回NAN

// console.log(Math.E)//1 返回以e为底的自然对数
// console.log(Math.log(10000)/Math.LN10)//4 返回以10为底的自然数对数

//console.log(Math.random())//产生一个随机数，可以等于0但必须小于1

// 1.生成任意范围的随机数函数如下：
// function getRandomInt(min,max){
//     return Math.random()*(max-min)+min;
// }
// console.log(getRandomInt(1.5,6.66))

// 2.生成任意范围的随机整整数函数如下：
// function getRandomInt(min,max){
//     return Math.floor(Math.random()*(max-min+1))+min;
// }
// console.log(getRandomInt(1,10))

// 3.返回随机字符的函数如下
// function random_str(length){
// var init='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// init+='abcdefghijklmnopqrstuvwxyz';
// init+='0123456789-_';
// var str='';
// for(var i=0;i<length;i++){
// var send=Math.floor(Math.random()*init.length);
//      str+=init.substring(send,send+1);
// } 
// return(str);
// }
// console.log(random_str(5))


//console.log(Date())//返回时间，有无参数不影响
// var today=new Date('2020-02')
// console.log(today)
// console.log(today.toString())

// console.log(Date.now())
// console.log(Date.parse('Aug 9 1998'))//解析距离时间零点的毫秒数

// var d=new Date(2012,12,12);
// console.log(d.getDate())
// console.log(d.toISOString())//返回UTC时区时间


// console.log(d.toJSON())
// console.log(d.toDateString())

// var d =new Date();
// console.log(d.toLocaleString('zh-CN'))
// console.log(d.toLocaleString('en-US'))//美国时间
// console.log(d.toLocaleDateString('zh-CN'))
// console.log(d.toLocaleDateString('en-US'))
// console.log(d.toLocaleTimeString('zh-CN'))
// console.log(d.toLocaleTimeString('en-US'))

//计算本年度还剩多少天
// function leftDays(){
// var today=new Date();

// var endYear=new Date(today.getFullYear(),11,31,23,59,59,999)
// var perDay=24*60*60*1000;
// return Math.round(endYear.getTime()-today.getTime()/perDay);

// }
// console.log(leftDays())

// var r=/abc/igm;
// console.log(r.ignoreCase)//true 是否设置了i修饰符
// console.log(r.global)//true 是否设置了g修饰符（全局搜索，会有多个结果）
// console.log(r.multiline)//true 是否设置了m修饰符
// console.log(r.flags)//gim 返回一个字符串，包含已设置的所有修饰符，按字母排序
// console.log(r.lastIndex)//0 返回下一次搜索的位置
// console.log(r.source)//返回正则表达式的字符串形式

//console.log(/abc/.test('aaa def abcdfhj'))
// var str='abc def abcshio';
// var reg=/abc/g;
// console.log(reg.lastIndex)//0
// console.log(reg.test(str))//true 每一次test方法都从上一次结束位置向后匹配
// console.log(reg.lastIndex)//3
// console.log(reg.test(str))//true

//高级匹配
// console.log('abb'.replace(/a/,'c'))//cbb
// console.log('abb'.replace(/b/g,'c'))//acc 替换1全局中的b
// var str='  #id div.class  ';
// console.log(str.replace(/^\s+|\s+$/g,''))//消除字符串首尾两端的空格)  \s:space,空格 ^:以...开始 +：一个或多个 $:以..结束
//  console.log('hello world'.replace(/(\w+)\s(\w+)/,'$2,$1'))//将匹配的组互换位置
//  console.log('hello you world'.replace(/(\w+)\s(\w+)\s(\w+)/g,'$3,$2,$1'))

//console.log('abc'.replace('b','[$`-$&-$\']'))//改写匹配的值 a[a-b-c]c

// var res='3 and 5'.replace(/[0-9]+/g,function(match){
//     return 2*match;
// })
// console.log(res)                                      //6 and 10 将每一个匹配的内容替换为函数返回值

// var a='The quick red fox jumped over the lazy dog';
// var pattern=/quick|red|lazy/ig;
// console.log(a.replace(pattern,function(match){
//     return match.toUpperCase();
// }))

//网页·模板替换实例?????????????????????????????????????????????????????????????????????????
// var prices={
// 'p1':'$2.22',
// 'p2':'$3.33',
// 'p3':'$4.44'
// };
// var template="<span id='p1'></span>"+"<span id='p2'></span>"+"<span id='p3'></span>";
// var res=template.replace(/(<span id=")(.*?)(">)(<\/span>)/g,function(match,$1,$2,$3,$4){
//     return $1+$2+$3+prices[$2]+$4;
// })
// console.log(res);
// console.log('a, b,c,d'.split(/, */))// 正则分割。去掉多余的空格
// console.log('a, b,c,d'.split(/, */,3))//返回数组的最大成员数

console.log('aaa*a*'.split(/a*/))//默认贪婪匹配；第一次将aaa作为分隔符，第二次将a作为分隔符
console.log('aaa**a*'.split(/a*/))

