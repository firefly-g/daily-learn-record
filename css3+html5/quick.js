var a=[1,2,6,2,4,8,7,9];
// console.log(a.splice(4,2));  //每次返回一个数组


// 快速排序
var quicksort=function(arr){
    if(arr.length<= 1){
        return arr;
    }
//1.找到基准点的索引
var pivotindex=Math.floor(arr.length/2);
// 2. 找到基准点的值
var pivot=arr.splice(pivotindex,1)[0];
//3.存放比基准点小的数组
 var left=[];
//  4.存放比基准点大的值
var right=[];
//5.循环遍历每个节点进行比较
for(var i=0;i<arr.length;i++){
    if(arr[i]<pivot){
        left.push(arr[i]);   //6.比基准点小的放在左边数组
    }else{
        right.push(arr[i]);     //7.比基准点大的放在右边数组
    }
}
  return quicksort(left).concat([pivot],quicksort(right));
}
var aa=[1,2,6,4,8,7,9];
console.log(quicksort(aa));