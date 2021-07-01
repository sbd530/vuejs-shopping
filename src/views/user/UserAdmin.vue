<template>
  <div class="pom">
    <b-container class="bv-example-row">
      <b-row class="top"> </b-row>

      <b-row class="box">
        <b-row>
          <b-col>User</b-col>
          <b-col align="right">
            <b-form-select v-model="max" seleted="5" class="mb-3">
              <b-form-select-option :value="5"
                >Select an option</b-form-select-option
              >
              <b-form-select-option value="10">10 개</b-form-select-option>
              <b-form-select-option value="15">15 개</b-form-select-option>
              <b-form-select-option value="20">20 개</b-form-select-option>
              <b-form-select-option value="25">25 개</b-form-select-option>
            </b-form-select>
          </b-col>
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
                  class="kategorie"
                  sort
                  @click="users = $vs.sortData($event, users, 'email')"
                >
                  이메일
                </vs-th>
                <vs-th
                  class="kategorie"
                  sort
                  @click="users = $vs.sortData($event, users, 'name')"
                >
                  이름
                </vs-th>
                <vs-th
                  class="kategorie"
                  sort
                  @click="users = $vs.sortData($event, users, 'poneNumber')"
                >
                  전화번호
                </vs-th>
                <vs-th
                  class="kategorie"
                  sort
                  @click="users = $vs.sortData($event, users, 'address')"
                >
                  주소
                </vs-th>
                <vs-th
                  class="kategorie"
                  sort
                  @click="users = $vs.sortData($event, users, 'create')"
                >
                  가입일
                </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-model="users"
                v-for="(user, i) in $vs.getPage(
                  $vs.getSearch(users, search),
                  page,
                  max
                )"
                :data="user"
                class="table"
              >
                <vs-td>
                  {{ user.email }}
                </vs-td>
                <vs-td>
                  {{ user.name }}
                </vs-td>
                <vs-td>
                  {{ user.phoneNumber1 }}-{{ user.phoneNumber2 }}-{{ user.phoneNumber3 }}
                </vs-td>
                <vs-td>
                  {{ user.postNumber }}&nbsp;{{ user.address1 }}&nbsp;{{ user.address2 }}
                </vs-td>
                <vs-td>
                  {{ user.createdDate }}
                </vs-td>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination
                v-model="page"
                :length="$vs.getLength(users, max)"
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
      page: 1,
      max: 5,
      users: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  computed: {
    rows() {
      return this.users.length;
    },
  },
  methods: {
    rowClick(user) {
      this.$router.push({
        path: `/dashboard/users/${user.id}`,
      });
    },
    writeContent() {
      this.$router.push({
        path: "/dashboard/board/boardcreate/",
      });
    },
    getUsers: function () {
      http
        .get("/dashboard/users")
        .then((response) => {
          this.users = response.data;
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
.kategorie {
  font-size: 12pt;
}

.search-var {
  width: 500px;
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
.mb-3 {
  width: 150px;
}
</style>
