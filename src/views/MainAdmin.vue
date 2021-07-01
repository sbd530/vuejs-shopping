<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row class="top"> </b-row>
      <b-row class="title">
        <b-row>
          <b-col>My Tree</b-col>
        </b-row>
      </b-row>
      <b-row class="kategorie-box">
        <b-col class="kategorie">
          <div class="main-name">
            <i class="bx bx-cart main-logo"></i
            ><span class="main-name">주문</span>
          </div>
          <div class="middle-name">주문 현황</div>
          <b-col class="kategorie-bottom">
            <div><i class="bx bx-message-square-dots"></i>입금 대기</div>
            <b-col align="right"><div>0&nbsp;개</div></b-col>
          </b-col>
          <b-col class="kategorie-bottom">
            <div><i class="bx bx-message-check"></i>결제 완료</div>
            <b-col align="right"
              ><div>{{ summary.paymentSuccess }}&nbsp;개</div></b-col
            >
          </b-col>
          <b-col class="kategorie-bottom">
            <div><i class="bx bx-download"></i>배송 준비</div>
            <b-col align="right"
              ><div>{{ summary.ready }}&nbsp;개</div></b-col
            >
          </b-col>
          <b-col class="kategorie-bottom">
            <div><i class="bx bx-rocket"></i>배송 중</div>
            <b-col align="right"
              ><div>{{ summary.done }}&nbsp;개</div></b-col
            >
          </b-col>
          <div class="middle-name">취소/반품 요청</div>
          <b-col class="kategorie-bottom">
            <div><i class="bx bx-window-close"></i>취소 요청</div>
            <b-col align="right"
              ><div>{{ summary.canceled }}&nbsp;개</div></b-col
            >
          </b-col>
          <b-col class="kategorie-bottom">
            <div><i class="bx bx-arrow-from-right"></i> 반품 요청</div>
            <b-col align="right"><div>0 개</div></b-col>
          </b-col>
          <div class="middle-name"></div>
          <b-col class="kategorie-bottom">
            <div class="warning"><i class="bx bx-error"></i>환불 실패</div>
            <b-col align="right"><div>0 개</div></b-col>
          </b-col>
        </b-col>

        <b-col class="kategorie">
          <div class="main-name">
            <i class="bx bx-cube main-logo"></i
            ><span class="main-name">상품</span>
          </div>
          <div class="middle-name">상태</div>
          <b-col class="kategorie-bottom">
            <div><i class="bx bx-archive"></i>판매 중</div>
            <b-col align="right"
              ><div>{{ summary.onSale }}&nbsp;개</div></b-col
            >
          </b-col>
          <b-col class="kategorie-bottom">
            <div><i class="bx bx-message-square-x"></i>판매 중지</div>
            <b-col align="right"><div>0 개</div></b-col>
          </b-col>
          <b-col class="kategorie-bottom">
            <div><i class="bx bx-x"></i>품절</div>
            <b-col align="right"
              ><div>{{ summary.outOfStock }}&nbsp;개</div></b-col
            >
          </b-col>
        </b-col>
        <b-col class="kategorie">
          <div class="main-name">
            <i class="bx bx-sidebar main-logo"></i
            ><span class="main-name">게시글</span>
          </div>
          <div class="middle-name">게시판</div>
          <b-col class="kategorie-bottom">
            <div><i class="bx bx-comment-error"></i>새로 올라온 글</div>
            <b-col align="right"
              ><div>{{ summary.haveToAnswer }}&nbsp;개</div></b-col
            >
          </b-col>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import http from "../http-common";
export default {
  data() {
    return {
      summary: [],
      perPage: 3,
      currentPage: 1,
    };
  },

  mounted() {
    this.getSummary();
  },
  methods: {
    getSummary: function () {
      http
        .get("/dashboard/home")
        .then((response) => {
          this.summary = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap");
* {
  font-family: "Noto Sans KR", sans-serif;
}

.title {
  font-weight: bold;
  font-size: 28pt;
  margin-left: 50px;
}
.middle-name {
  font-size: 11pt;
  border-top: 2px solid #c4c8d4;
  padding: 10px 0 0 3px;
  margin: 10px 10px 0 10px;
  color: gray;
}
.main-name {
  font-size: 20pt;
  margin-left: 10px;
  font-weight: bold;
}
.main-logo {
  background-color: #e8f0ff;
  width: 35px;
  height: 35px;
  text-align: center;
  vertical-align: middle;
  padding-top: 4px;
  border-radius: 8px;
}
.home {
  margin-top: 100px;
}
.home .top {
  height: 50px;
}
.warning {
  color: #ec73c0;
}
.home .kategorie-box {
  margin: 10px 50px 0 50px;
  font-size: 15pt;
  height: 50px;
}
.kategorie {
  border: 2px solid #c4c8d4;
  margin-right: 20px;
  border-radius: 12px;
  padding: 30px 0 20px 10px;
}
.kategorie-bottom {
  display: flex;
  padding: 10px;
}
.table {
  font-size: 15pt;
}
.kategorie-bottom i {
  padding-right: 8px;
}
i {
  font-weight: lighter;
  font-size: 18pt;
}
</style>
