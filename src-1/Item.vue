<template>
    <li class="list-group-item">
        <div class="handle">
            <a href="javascript:;" @click="deleteItem">删除</a>
        </div>
        <p class="user"><span>{{comment.name}}</span><span>说：</span></p>
        <p class="centence">{{comment.content}}</p>

    </li>
</template>

<script>
export default {
    props:{                //指定属性名和属性值 的类型
        comment:Object,    // 接收
        deleteComment:Function,
        index:Number
    },
    methods:{
        deleteItem(){
            const{comment,index,deleteComment}=this
            if(window.confirm(`确定删除${comment.name}的评论吗？`)){
              deleteComment(index)
            }
        }
    }
}
</script>

<style scoped>
.li {
  transition: 0.5s;
  overflow: hidden;
}
.user {
  font-size: 22px;
}
.handle {
  width: 40px;
  border: 1px solid #ccc;
  background: #fff;
  position: relative;
  right: 10px;
  top: 1px;
  text-align: center;
}

.list-group-item  {
  /* padding: 0px 50px;
  list-style-type: none; */
   transition: 0.5s;
  overflow: hidden;
}
</style>