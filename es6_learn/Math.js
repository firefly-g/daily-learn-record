//Math.trunc() 去掉一个数的小数部分
console.log(Math.trunc(4.44))  //4
console.log(Math.trunc(true))  //1 非数值时，默认先转化为数值
console.log(Math.trunc(null)) //0
console.log(Math.trunc(undefined)) //NaN

//Math.sign()  判断一个数是正数（+1）、负数(-1)还是(0\-0)，非数值是先转化为数值,其他未NaN
console.log(Math.sign(-2))  //-1
console.log(Math.sign())   //NaN

//Math.cbrt() 计算一个数的立方根
console.log(Math.cbrt(2))  //1.2599210498948732
console.log(Math.cbrt('8')) //2

//Math.clz32() 转为32位无符号整型，输出值里面的前导0
console.log(Math.clz32(2)) //30

//Math.imul() 返回两数相乘的结果
console.log(Math.imul(2,3)) //6

//Math.hypot() 返回所有参数的平方和的平方根
console.log(Math.hypot(3,4))  //5

//Math.expm1()  返回e^x-1 即 Math.exp(x)-1
console.log(Math.expm1(0))  //0

//Math.log1p() 返回1+x 的自然对数，x<-1 返回NaN
console.log(Math.log1p(1))


//Math.log10() 返回以10为底的x 的对数，x<0 返回NaN  Math.log2() 以2为底
console.log(Math.log10(10))  //1
console.log(Math.log2(8))    //3

//Math.sinh(x) 返回x的双曲正弦
console.log(Math.sinh(0))  //0

//指数运算符**  !!!右结合
console.log(2**4)   //16
console.log(2**2**2) //16


//新增BigInt数据类型:表示整数，没有位数限制，后缀带n
const a=12345455n
const b=4676n
console.log(a*b)    //57727347580n
console.log(43n===43)  //false

console.log(typeof(43n))   //bigint

console.log(-42n)  //-42n
console.log(+42n) //报错

console.log(Boolean(0n))  //false
console.log(Boolean(1n))    //true
console.log(Number(-1n))   //-1

console.log((-1n)<0)  //true  可以混合运算

console.log('str '+123n)   //str 123  先转为字符串再运算








