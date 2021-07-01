<template>
  <div class="pom">
    <b-container class="bv-example-row">
      <b-row class="top"> </b-row>

      <b-row class="box">
        <b-row>
          <b-col>Review </b-col>
          <b-col></b-col>
          <b-col></b-col>
        </b-row>
      </b-row>
      <b-row class="box">
        <b-col>
          <vs-table>
            <template #header>
              <vs-input
                v-model="search"
                border
                placeholder="Search"
                class="search-var"
              />
            </template>
            <template #thead>
              <vs-tr>
                <vs-th
                  class="column"
                  sort
                  @click="
                    reviews = $vs.sortData($event, reviews, 'content')
                  "
                >
                  리뷰내용
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    reviews = $vs.sortData($event, reviews, 'productName')
                  "
                >
                  상품명
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    reviews = $vs.sortData($event, reviews, 'userName')
                  "
                >
                  고객명
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    reviews = $vs.sortData($event, reviews, 'reviewTime')
                  "
                >
                  리뷰 작성일
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    reviews = $vs.sortData($event, reviews, 'rating')
                  "
                >
                  별점
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    reviews = $vs.sortData($event, reviews, 'deleted')
                  "
                >
                  삭제
                </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-model="reviews"
                v-for="(review, i) in $vs.getPage(
                  $vs.getSearch(reviews, search),
                  page,
                  max
                )"
                :data="review"
                class="table"
              >
                <vs-td>
                  {{ review.content }}
                </vs-td>
                <vs-td>
                  {{ review.productName }}
                </vs-td>
                <vs-td>
                  {{ review.userName }}
                </vs-td>
                <vs-td>
                  {{ review.reviewTime }}
                </vs-td>

                <vs-td>
                  <b-form-rating v-model="review.rating"></b-form-rating>
              
                </vs-td>
                <vs-td>
                  <vs-button
                    danger
                    :active="active == 0"
                    @click="deletereview(review, i)"
                  >
                    Delete
                  </vs-button>
                </vs-td>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination
                v-model="page"
                :length="$vs.getLength(reviews, max)"
              />
            </template> </vs-table
        ></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import http from "../../http-common";

export default {
  data() {
    return {
      search: "",
      reviews: [],
      page: 1,
      max: 5,
      selected: [],
    };
  },
  mounted() {
    this.getreviews();
  },
  computed: {
    rows() {
      return this.reviews.length;
    },
  },
  methods: {
    writeContent() {
      this.$router.push({
        path: "/dashboard/board/boardcreate/",
      });
    },
    getreviews: function () {
      http
        .get("/dashboard/reviews")
        .then((response) => {
          this.reviews = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletereview: function (review, i) {
      http
        .delete("/dashboard/reviews/" + review.id)
        .then(() => {
          this.reviews.splice(i, 1);
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
.column {
  font-size: 12pt;
}

.pom {
  margin-top: 46px;
}
.pom .top {
  height: 50px;
}
.pom .box {
  margin: 10px 50px 0 50px;
  font-size: 23pt;
  color: #080842;
  height: 50px;
}
.table {
  font-size: 20pt;
}
</style>
