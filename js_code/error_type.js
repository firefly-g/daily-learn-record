function add(){
  console.log('123');
  try{
    throw new Error('Has Error');
  } catch(e) {
    // console.log(e);
    // throw e;
  }
  console.log('456');
}

add()

// 定义对象的时候,我想看对象里面的内容是什么的时候,就会使用 toString() 方法.
// [object Object] , 该Object 不是基本类型,是引用类型.
// 如果是基本类型的话，那么就会打印出对应的值.
var a2 = { name:'GanTian' }
a2.toString = function(){
  // var content = '';
  // for(key in a2){
  //   content += (' ' + a2[key] + ' --> ')
  // }
  return a2['name'] + 'GanTian'
}
console.log(a2.toString())
var a3 = new Object(123)
console.log(a3.toString())