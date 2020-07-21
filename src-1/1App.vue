<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <Add :addComment="addComment"/>
      <List :comments="comments" :deleteComment="deleteComment"/>
    </div>
  </div>
</template>


<script>
//1.引入组件
import Add from "./components/Add.vue";
import List from "./components/List.vue";
export default {
  //向外默认暴露一个配置对象
  //2.映射组件标签
  components: {
    Add,
    List
  },
  data() {
    return {
      comments: [
        {
          name: "陈思琴",
          content: "vue没学过"
        },
        {
          name: "燕子",
          content: "vue挺不错"
        },
        {
          name: "甘甜",
          content: "vue还在学"
        },
        {
          name: "鲍洋",
          content: "vue so easy"
        }
      ]
    }
  },
  methods: {                                //数据在那个组件，更新数据的方法就写在那个组件下面，并将该方法传递给对应的子组件<add>
    addComment(comment){
      this.comments.unshift(comment)           //把一个元素添加到数组的开头，并返回数组的新长度
    },
    deleteComment(index){                     //删除指定下表的评论
      this.comments.splice(index,1)
    }
}  
}
</script>

<style scoped>

</style>
