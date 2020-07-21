<template>
    <div class="col-md-4">
    <form action="form-horizontal">
      <div class="form-group">
        <label>用户名</label>
        <input type="text" class="form-control" placeholder="用户名" v-model="name">  
      </div>
      <div class="form-group">
        <label>评论内容</label>
        <textarea class="form-control" rows="6" placeholder="评论内容" v-model="content" ></textarea>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="button" class="btn btn-default pull-right" @click="add()">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>                                

/
<script>                            //1.绑定事件监听（给button绑定），在方法methods中将数据用函数收集起来
export default {
   props:{
       addComment:{                        //z指定属性名或属性值的类型的必要性
           type:Function,
           required:true                  //
       }
   },
   data(){
       return {
           name:'',
           content:''
       }
   },
   methods:{
       add(){
           const name=this.name.trim()
           const content=this.content.trim()
           if(!name||!content){
               alert("不能为空")
               return                       //不满足时不能继续
           }
        const comment={name,content}       //2.根据输入的数据，封装成一个comment对象
        this.addComment(comment)          //3.将单个comment数据unshift到comments数组的开头
        this.name=''                      //4.清除输入记录
        this.content=''
       }

     
   }
   
}
</script>

<style scoped>
.handle {
  width: 40px;
  border: 1px solid #ccc;
  background: #fff;
  position: absolute;
  right: 10px;
  top: 1px;
  text-align: center;
}

</style>