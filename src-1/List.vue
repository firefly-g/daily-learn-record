<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 v-show="comments.length===0">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <Item v-for="(comment ,index) in comments" :key="index" :comment="comment" :deleteComment="deleteComment" :index="index"/>
    </ul>
  </div>
</template>

<script>
import Item from './Item.vue'
export default {
    props:{
        comments:Array,    //声明从App中<list>接受的属性，这个行为就会成为组件对象的属性（从vm变为组件）
        deleteComment:Function
    },
    components:{
        Item
    },
  
};
</script>

<style scoped>
.li {
  transition: 0.5s;
  overflow: hidden;
}

.handle {
  width: 40px;
  border: 1px solid #ccc;
  background: #fff;
  position: absolute;
  right: 10px;
  top: 1px;
  text-align: center;
}

.handle a {
  display: block;
  text-decoration: none;
}

.list-group-item .centence {
  padding: 0px 50px;
}

.user {
  font-size: 22px;
}
.reply {
  margin-top: 0px;
  color:salmon;
}
</style>