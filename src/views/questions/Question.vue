<template>
  <div class="pom">
    <b-container class="bv-example-row">
      <b-row class="top"> </b-row>

      <b-row class="box">
        <b-row>
          <b-col>Question </b-col>
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
                    questions = $vs.sortData($event, questions, 'content')
                  "
                >
                  질문
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    questions = $vs.sortData($event, questions, 'productName')
                  "
                >
                  상품명
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    questions = $vs.sortData($event, questions, 'userName')
                  "
                >
                  고객명
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    questions = $vs.sortData($event, questions, 'questionTime')
                  "
                >
                  질문 작성일
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    questions = $vs.sortData($event, questions, 'show_details')
                  "
                >
                  답변
                </vs-th>
                <vs-th
                  class="column"
                  sort
                  @click="
                    questions = $vs.sortData($event, questions, 'deleted')
                  "
                >
                  삭제
                </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-model="questions"
                v-for="(question, i) in $vs.getPage(
                  $vs.getSearch(questions, search),
                  page,
                  max
                )"
                :data="question"
                class="table"
              >
              <vs-td>
                  {{ question.content }}
                </vs-td>
                <vs-td>
                  {{ question.productName }}
                </vs-td>
                <vs-td>
                  {{ question.userName}}
                </vs-td>
                <vs-td>
                  {{ question.questionTime }}
                </vs-td>

                <vs-td>
                  <vs-button
                    to="/dashboard/questioncomment"
                    flat
                    v-on:click="rowClick(question)"
                    :active="active == 0"
                  >
                    Answer
                  </vs-button>
                </vs-td>
                <vs-td>
                  <vs-button
                    danger
                    :active="active == 0"
                    @click="deleteQuestion(question, i)"
                  >
                    Delete
                  </vs-button>
                </vs-td>
                <template #expand>
                  <div class="con-content">
                    <div>
                      {{ question.answer }}
                    </div>
                  </div>
                </template>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination
                v-model="page"
                :length="$vs.getLength(questions, max)"
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
      questions: [],
      page: 1,
      max: 5,
      selected: [],
    };
  },
  mounted() {
    this.getQuestions();
  },
  computed: {
    rows() {
      return this.questions.length;
    },
  },
  methods: {
    rowClick(question) {
      this.$router.push({
        name: "QuestionComment",
        params: {
          id: question.id,
          content: question.content,
          userName: question.userName,
          productName: question.productName,
        },
      });
    },
    writeContent() {
      this.$router.push({
        path: "/dashboard/board/boardcreate/",
      });
    },
    getQuestions: function () {
      http
        .get("/dashboard/questions")
        .then((response) => {
          this.questions = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteQuestion: function (question, i) {
      http
        .delete("/dashboard/questions/" + question.id)
        .then(() => {
          this.questions.splice(i, 1);
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
