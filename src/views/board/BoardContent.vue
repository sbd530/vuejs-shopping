<template>
  <div id="product">
    <div class="row align-items-start">
      <div class="row g-1">
        <b-card>
          <div class="content-detail-content-info">
            <div class="content-detail-content-info-left">
              <div class="content-detail-content-info-left-number">
                {{ contentId }}
              </div>
              <div class="content-detail-content-info-left-subject">
                {{ title }}
              </div>
            </div>
            <div class="content-detail-content-info-right">
              <div class="content-detail-content-info-right-user">
                글쓴이: {{ user }}
              </div>
              <div class="content-detail-content-info-right-created">
                등록일: {{ created }}
              </div>
            </div>
          </div>
          <div class="content-detail-content">
            {{ context }}
          </div>
          <div class="content-detail-button">
            <b-button variant="primary" @click="updateData">수정</b-button>
            <b-button variant="success" @click="deleteData">삭제</b-button>
          </div>
          <div class="content-detail-comment">
            <BoardComment :contentId="contentId" />
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../../data/data.js";
import BoardComment from "./BoardComment.vue";

export default {
  name: "BoardCreate",
  data() {
    const contentId = Number(this.$route.params.contentId);
    const contentData = data.Content.filter(
      (item) => item.content_id === contentId
    )[0];
    return {
      contentId: contentId,
      title: contentData.title,
      context: contentData.context,
      user: data.User.filter((item) => item.user_id === contentData.user_id)[0]
        .name,
      created: contentData.created_at,
    };
  },
  components: {
    BoardComment,
  },
  methods: {
    deleteData() {
      const content_index = data.Content.findIndex(
        (item) => item.content_id === this.contentId
      );
      data.Content.splice(content_index, 1);
      this.$router.push({
        path: "/dashboard/board/",
      });
    },
    updateData() {
      this.$router.push({
        path: `/dashboard/board/${this.contentId}`,
      });
    },
  },
};
</script>
<style scoped>
.top {
  border-top: 1px solid #c3beb6;
  border-bottom: 1px solid #c3beb6;
  align-items: center;
  display: flex;
  font-size: 14pt;
  height: 70px;
}
#product {
  margin: 0 0 0 230px;
  padding: 100px 50px 0 50px;
}
.align-items-start {
  background-color: white;
  width: 1200px;
  padding: 50px 40px 30px 50px;
  border-radius: 12px;
}
</style>
