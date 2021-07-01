<template>
  <div id="product">
    <div class="row align-items-start">
      <div class="row g-1 row-top">
        <div class="col-3">
          <div>
            <div class="title">{{ userName }}</div>
          </div>
        </div>
        <div class="col-3">{{ productName }}</div>
        <div class="col-3"></div>
        <div class="col-3">
          <div align="center">
            <!-- 전체오다 -->
          </div>
        </div>
      </div>

      <pre class="mt-3 mb-0"></pre>
      <!-- 본문 -->
      <div class="row g-1 top-tag">
        <div class="col-12 tag">질문</div>

        <div class="col-12">
          <b-form-textarea
            v-model="content"
            id="textarea-rows"
            rows="8"
            readonly="true"
          ></b-form-textarea>
        </div>

        <div class="col-12 tag">답변</div>

        <div class="col-12 comment">
          <b-input-group class="mt-3">
            <b-form-textarea
              id="textarea"
              v-model="answer"
              :placeholder="'답변을 달아주세요~!'"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
            <b-input-group-append>
              <b-button variant="info" class="create" @click="addAnswer()"
                >작성하기</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  data() {
    return {
      id: this.$route.params.id,
      content: this.$route.params.content,
      answer: "",
      userName: this.$route.params.userName,
      productName: this.$route.params.productName,
    };
  },
  methods: {
    addAnswer: function () {
      http
        .post("/dashboard/questions/answer", {
          questionId: this.id,
          content: this.answer,
        })
        .then(
          this.$router.push({
            path: `/dashboard/questions/`
          })
        )
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.create {
  color: #eaeaf3;
  background-color: #332d2f;
}
.comment {
  padding: 0;
  margin: 0;
}
.row-top {
  border-bottom: 2px solid #c3beb6;
  padding-bottom: 20px;
}
.title {
  float: left;
  font-size: 30pt;
  padding-right: 90px;
  border-right: 3px solid #c3beb6;
  border-radius: 2px;
}
.addr-button {
  background-color: #232d4a;
  color: white;
  border-radius: 8px;
  border: 0;
  width: 170px;
  height: 50px;
  font-size: 24px;
}
.tag-addr1 {
  border: 0;
  border-bottom: 2px solid burlywood;
  width: 350px;
  height: 50px;
  border-radius: 0;
}
.tag-addr {
  border: 0;
  border-bottom: 2px solid burlywood;
  width: 550px;
  height: 50px;
  border-radius: 0;
}

.tag-text {
  border: 0;
  border-bottom: 2px solid burlywood;
  width: 520px;
  height: 50px;
  border-radius: 0;
}
input:focus {
  outline: 3px solid #bfdeff;
  border-radius: 8px;
}
.top-tag {
  margin-top: 5px;
}
.tag {
  font-size: 30px;
  margin-top: 5px;
}
.bv-example-row {
  width: 1000px;
  font-size: 30pt;
}
.main-container {
  width: 1000px;
  height: 400px;
  margin: 0 auto;
}

.btn-primary {
  background-color: #eaeaf3;
  color: #d9557c;
  border: 0;
  width: 105px;
  height: 45px;
  font-size: 13pt;
}
#product {
  margin: 0 0 0 230px;
  padding: 60px 50px 0 50px;
}
.align-items-start {
  background-color: white;
  width: 1050px;
  padding: 30px 40px 30px 40px;
  border-radius: 12px;
}
</style>
