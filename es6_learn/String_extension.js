//字符串的Unicode表示法
console.log('\u{41}\u{42}\u{43}')  //ABC
console.log('\u{20BB7}')          //𠮷
'\z'==='z'
'\172'==='z'
'\x7A'==='z'
'\u007A'==='z'
'\u{7A}'==='z'       //true

//字符串的遍历器接口 可以使字符串被for...of 循环遍历
for(let i of 'foo'){
  console.log(i);
}                    //f o o


let obj={x:1,y=2}
console.log(`${obj.x+obj.y}`)   //1 2

//字符串模板中调用函数
function fn(){
  return 'Hello World'
}
console.log(`foo ${fn()} bar`)     //foo Hello World bar

//模板字符串的嵌套
const tmp1=addrs=>`
<table>
${
  addrs.map(addr=>`
<tr><td>${addr.first}</td></tr>
<tr><td>${addr.last}</td></tr>`).join('')

}
</table>
`;
const data=[
  {first:'<Jane>',last:'Bond'},
  {first:'Lars',last:'<Croft>'},
];
console.log(tmp1(data));


//引用自身
let func=(name)=>{`Hello ${name}!`}
console.log(func('Jack'))     //undefined


//标签模板
console.log(`hello`)
console.log(['hello'])
let a=5;
let b=5;
console.log(`Hello ${a+b} world ${a*b}`);  //Hello 10 world 25

let a=5;                                   //??????????????????????????//
let b=10;
tag(['Hello','world',''],15,50)
function tag(s ,v1 , v2){
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v1);
  console.log(v2);
  return 'OK'
}
tag`Hello ${a+b} world ${a*b}`;   //Hello world 15 50

//String.raw()返回一个斜杠都被转义的字符串
console.log(String.raw`Hi\n${2+3}!`)  //Hi\n5!

console.log(String.raw`Hi\\n`==='Hi\\\\n')   //true

console.log(String.raw({raw:['foo','bar']},1+2))  //foo3bar

//实例方法 include():判断是否找到了参数字符串  startsWith():判断参数字符串是否在原字符串的头部 endWith()判断是否在原字符串的尾部
let s='Hello world';
console.log(s.startsWith('Hello'));  //true
console.log(s.endsWith('!'));         //false
console.log(s.includes('o'));       //true

let s='Hello world!';





