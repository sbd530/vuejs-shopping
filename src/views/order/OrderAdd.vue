<template>
  <div id="product">
    <div class="row align-items-start">
      <div class="row g-1 row-top">
        <div class="col-3">
          <div>
            <div class="title">유저 네임</div>
          </div>
        </div>
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3">
          <div align="center">
            <!-- 전체오다 -->
            <router-link to="/dashboard/orders">
              <button
                class="btn btn-primary"
                type="submit"
                id="show-modal"
                @click="showModal = true"
                style="
                  background-color: #332d2f;
                  color: #efefef;
                  border: 0;
                  width: 150px;
                  height: 50px;
                  font-size: 25px;
                "
              >
                수정 완료
              </button>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 본문 -->
      <div class="row g-1 top-tag">
        <div class="col-6 tag">주문일자</div>
        <div class="col-6 tag">송장 번호</div>
        <div class="col-6">
          <input type="text" class="tag-text" />
        </div>
        <div class="col-6">
          <input type="text" class="tag-text" />
        </div>
        <div class="col-6 tag">주문 상태</div>
        <div class="col-6 tag">전화 번호</div>
        <div class="col-6">
          <input type="text" class="tag-text" />
        </div>
        <div class="col-6">
          <input type="text" class="tag-text" />
        </div>
        <div class="col-6 tag">배송 상태</div>
        <div class="col-6 tag">주소</div>
        <div class="col-6">
          <input type="text" class="tag-text" />
        </div>
        <div class="col-4">
          <input type="text" class="tag-addr1" v-model="zip" />
        </div>
        <div class="col-2">
          <div ref="embed"></div>
          <button @click="showApi" class="addr-button">주소 변경</button>
        </div>
        <div class="col-6 tag">운송 업체</div>
        <div class="col-6">
          <input type="text" class="tag-addr" v-model="addr1" />
        </div>

        <div class="col-6">
          <b-form-select
            v-model="selected"
            :options="options"
            class="tag-text"
          ></b-form-select>
          <div class="mt-3">
            Selected: <strong>{{ selected }}</strong>
          </div>
        </div>
        <div class="col-6">
          <input
            type="text"
            placeholder="상세주소"
            class="tag-addr"
            v-model="addr2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import http from "../../http-common";
export default {
  data() {
    return {
      //select 버튼
      selected: null,
      options: [
        { value: null, text: "대한 행운" },
        { value: "a", text: "쿠팡 딜리버리" },
        { value: "b", text: "한진 택배" },
        { value: "c", text: "롯데 택배" },
        { value: "d", text: "돈 딜리버리" },
      ],
      //주소 api
      zip: "",
      addr1: "",
      addr2: "",
    };
  },
  methods: {
    showApi() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
          // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          let fullRoadAddr = data.roadAddress;
          // 도로명 주소 변수
          let extraRoadAddr = "";
          // 도로명 조합형 주소 변수
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }
          // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }
          // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
          if (fullRoadAddr !== "") {
            fullRoadAddr += extraRoadAddr;
          }
          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          this.zip = data.zonecode;
          //5자리 새우편번호 사용
          this.addr1 = fullRoadAddr;
        },
      }).open();
    },
  },
};

// http
//   .get("/dashboard/orders")
//   .then((response) => {
//     this.orders = response.data;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
</script>

<style scoped>
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
  margin-top: 20px;
}
.bv-example-row {
  width: 1000px;
  font-size: 30pt;
}
.main-container {
  width: 1200px;
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
  padding: 100px 50px 0 50px;
}
.align-items-start {
  background-color: white;
  width: 1200px;
  padding: 50px 40px 30px 40px;
  border-radius: 12px;
}
</style>
