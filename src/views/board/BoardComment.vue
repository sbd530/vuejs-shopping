<template>
  <div>
    <BoardCommentList :commentObj="item" />

    <CommentCreate :contentId="contentId" :reloadComments="reloadComments" />
  </div>
</template>
<script>
import data from "../../data/data.js";
import BoardCommentList from "./BoardCommentList";
import CommentCreate from "./CommentCreate.vue";

export default {
  name: "BoardList",
  props: {
    contentId: Number,
  },
  components: {
    BoardCommentList,
    CommentCreate,
  },
  data() {
    return {
      comments: data.Comment.filter(
        (item) => item.content_id === this.contentId
      ),
    };
  },
  methods: {
    reloadComments() {
      this.comments = data.Comment.filter(
        (item) => item.content_id === this.contentId
      );
    },
  },
};
</script>
