var that;
class tab{
  //获取元素
  constructor (id){
    console.log(id);
    that=this;
    console.log(document.querySelector(id))
    this.main=document.querySelector(id);
    console.log(this.main)
    this.add=this.main.querySelector('.tabadd');
    //li的父元素
    this.ul=this.main.querySelector('.firstnav ul:first-child');
    //section 元素
    this.fsection=this.main.querySelector('.tabscon');
    this.init();
  }
  init(){
    this.updateNode();
    //init初始化操作将相关的元素绑定事件
    this.add.onclick=this.addTab;
    for(var i=0;i<this.lis.length;i++){
      this.lis[i].index=i;
      this.lis[i].onclick=this.toggleTab;
      this.remove[i].onclick=this.removeTab;
      this.spans[i].ondbclick=this.editTab;
      this.sections[i].ondbclick=this.editTab;
    }
  }

  //因为是动态添加元素，所以要重新获取对应的元素
  updateNode(){
    this.lis=this.main.querySelectorAll('li');
    this.sections=this.main.querySelectorAll('section');
    this.remove=this.main.querySelectorAll('.icon-guanbi');
    this.spans=this.main.querySelectorAll('.firstnav li span:first-child')
  
  }
//1.切换功能
toggleTab(){
  console.log(index);
  that.clearClass();
  this.className='liactive';
  that.sections[this.index].className='conactive';
}
//清除所有的li和section类
clearClass(){
  for(var i=0;i<this.lis.length;i++){
    this.lis.className='';
    this.sections[i].className='';
  }
}

//2.添加功能
addab(){
  that.clearClass();
  //创建li元素和section元素
  var random=Math.random();
  var li='<li class="liactive"><span>新选项卡<span class="iconfont icon-guanbi"></span></li>'
  var section='<section class="conactive">测试"+random+"</section>';
  //把这两个元素追加到对应的父元素里面
  that.ul.insertAdjacentHTML('beforeend',section);
  that.niti();
}

//3.删除功能
removeTab(e){
  e.stopPropagation();
  var index=this.parentNode.index;
  console.log(index);
  //根据索引号删除所对应的li和section remove()方法可直接删除指定的元素
  that.lis[index].remove();
  that.sections[index].remove();
  that.init();
  //当删除的不是选中状态的li时，原来的选中状态保持不变
  if(document.querySelector('.liactive'))
  return;
  //删除选择状态时，上一个li处于选定状态
  index--;
  //手动调用时，不需要鼠标触发
  that.lis[index]&&that.lis[index].click();
  
}
//修改功能
editTab(){
  var str=this.innerHTML;
  //双击禁止选定文字
  window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();

  this.innerHTNL='<input type="text"/>'
  var input=this.children[0];
  this.value=str;
  input.select() ;  //文本框里的内容处于选定状态
  //离开文本框时，将其中的值传给span
  input.onblur=function(){
    this.parentNode.innerHTML=this.value;
  }
  //按下回车时也可以把文本框的值传给span
  input.onkeyup=function(e){
    if(e.keyCode===13){
      //手动调用表单失去焦点事件 不需要鼠标离开操作
      this.blur();
    }
  }
}
}
new tab('#tab')