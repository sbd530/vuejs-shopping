<template>
  <div id="product">
    <div class="row align-items-start">
      <div class="row g-1">
        <div class="col-3">
          <div>
            <div
              style="
                float: left;
                font-size: 24px;
                padding-right: 10px;
                border-right: 2px solid #c3beb6;
              "
            >
              게시판
            </div>

            <div style="margin-bottom: 20px">
              <form
                action=""
                name="searchForm1"
                method="post"
                style="width: 500px"
              >
                <div class="input-group w-50" style="padding-left: 20px">
                  <input
                    type="text"
                    name="searchValue"
                    class="form-control"
                    placeholder="Search"
                    aria-describedby="basic-addon1"
                    style="border-radius: 8px; padding-right: 10px"
                  />
                  <button
                    value=" 검 색 "
                    class="btn2"
                    onclick="sendIt()"
                    style="
                      width: 40px;
                      border: 1px solid #efefef;
                      border-radius: 8px;
                      background-color: #c3beb6;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      style="color: black"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3"></div>
      </div>
      <div class="row g-1">
        <div class="col-12" style="width: 1000px; padding-bottom: 10px">
          <div class="dropdown">
            <form action="" name="searchForm" method="post">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                10개
              </button>
              <ul
                class="dropdown-menu"
                aria-labelledby="dropdownMenu2"
                name="searchKey"
                onclick="searchData();"
              >
                <li>
                  <button class="dropdown-item" type="button" value="ten">
                    10개
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" type="button" value="thirty">
                    30개
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" type="button" value="one_h">
                    100개
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" type="button" value="five_h">
                    500개
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" type="button" value="one_t">
                    1000개
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>

      <div class="row g-1">
        <!-- iter start-->
      </div>
      <!-- 테이블 -->
      <b-table
        :items="questions"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        responsive="sm"
        hover
        @row-clicked="rowClick"
        class="boardtable"
      >
        <!-- 수정 버튼 -->
        <template v-slot:cell(show_details)="data">
          <b-button
            size="sm"
            v-on:click="rowClick(data.item)"
            class="btn-primary"
          >
            답변달기
          </b-button>
        </template>
        <template v-slot:cell(deleted)="data">
          <b-button
            size="sm"
            v-on:click="rowClick(data.item)"
            class="btn-primary"
          >
            삭 제
          </b-button>
        </template>
      </b-table>
      <!-- create -->
      <b-button @click="writeContent" class="">글쓰기</b-button>
      <!-- 페이징 버튼 -->
      <div class="col-12 paging-button">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
        ></b-pagination>

        <p class="mt-3">Current Page: {{ currentPage }}</p>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";

export default {
  data() {
    return {
      fields: [
        {
          key: "productName",
          label: "상품명",
        },
        {
          key: "content",
          label: "질문 내용",
        },

        {
          key: "userName",
          label: "고객명",
        },
        {
          key: "questionTime",
          label: "질문 작성일",
        },
        {
          key: "show_details",
          label: "답변",
        },
        {
          key: "deleted",
          label: "삭제",
        },
      ],

      questions: [],
      perPage: 10,
      currentPage: 1,
    };
  },
  mounted() {
    this.getquestions();
  },
  computed: {
    rows() {
      return this.questions.length;
    },
  },
  methods: {
    rowClick(questions) {
      this.$router.push({
        path: `/dashboard/board/boardcontent/${questions.content_id}`,
      });
    },
    getquestions: function () {
      http
        .get("/dashboard/questions")
        .then((response) => {
          this.questions = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    writeContent() {
      this.$router.push({
        path: "/dashboard/board/boardcreate/",
      });
    },
  },
};
</script>

<style scoped>
.boardtable {
  width: 1100px;
}
.btn-primary {
  background-color: #eaeaf3;
  color: #d9557c;
  border: 0;
  width: 95px;
  height: 35px;
  font-size: 13pt;
}
.paging-button {
  margin: 40px 0 0 350px;
}
.top {
  border-top: 1px solid #c3beb6;
  border-bottom: 1px solid #c3beb6;
  align-items: center;
  display: flex;
  font-size: 14pt;
  height: 70px;
}
#product {
  margin: 0 0 0 250px;
  padding: 100px 50px 0 50px;
}
.align-items-start {
  background-color: white;
  width: 1000px;
  padding: 50px 40px 30px 50px;
  border-radius: 12px;
}
.listAll {
  align-items: center;
  display: flex;
  height: 60px;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #c3beb6;
}
</style>
