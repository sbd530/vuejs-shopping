<template>
  <div class="center">
    <vs-button border @click="changeButton()"> {{ btn }} </vs-button>
    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">Welcome to <b>My tree</b></h4>
      </template>

      <div class="con-form">
        <vs-input v-model="email" placeholder="Email">
          <template #icon> @ </template>
        </vs-input>
        <vs-input type="password" v-model="password" placeholder="Password">
          <template #icon>
            <i class="bx bxs-lock"></i>
          </template>
        </vs-input>
        <div class="flex">
          <vs-checkbox v-model="remember">Remember me</vs-checkbox>
          <a href="#">Forgot Password?</a>
        </div>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="sendLoginForm()"> Sign In </vs-button>

          <div class="new">New Here? <a href="#">Create New Account</a></div>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
import http from "../http-common";
export default {
  data: () => ({
    active: false,
    email: "",
    password: "",
    remember: false,
    btn: "Login",
  }),
  methods: {
    sendLoginForm() {
      let loginForm = { email: this.email, password: this.password };
      http
        .post("/auth/login/check", loginForm)
        .then((response) => {
          //SUCCESS면 메인페이지로 이동, FAIL이면 다시 로그인폼으로
          if (response.data == "SUCCESS") {
            this.$router.push("/dashboard/home");
            this.active = false;
            this.btn = "Logout";
          } else {
            //로그인정보가 맞지않습니다, 이메일-비밀번호 지우기
            alert("로그인 정보가 맞지 않습니다.");
            (this.email = ""), (this.password = "");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    changeButton() {
      //버튼이 Login => 모달을 띄운다
      //버튼이 Logout => 버튼을 Login으로 바꾼다 & 이메일,패스워드 지우기
      if (this.btn == "Login") {
        this.active = true;
      } else if (this.btn == "Logout") {
        this.btn = "Login";
        (this.email = ""), (this.password = "");
      }
    },
  },
};
</script>
<style lang="stylus" scope>
getColor(vsColor, alpha = 1)
    unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
getVar(var)
    unquote("var(--vs-"+var+")")
.not-margin
  margin 0px
  font-weight normal
  padding 10px
.con-form
  width 100%
  .flex
    display flex
    align-items center
    justify-content space-between
    a
      font-size .8rem
      opacity .7
      &:hover
        opacity 1
  .vs-checkbox-label
    font-size .8rem
  .vs-input-content
    margin 10px 0px
    width calc(100%)
    .vs-input
      width 100%
.footer-dialog
  display flex
  align-items center
  justify-content center
  flex-direction column
  width calc(100%)
  .new
    margin 0px
    margin-top 20px
    padding: 0px
    font-size .7rem
    a
      color getColor('primary') !important
      margin-left 6px
      &:hover
        text-decoration underline
  .vs-button
    margin 0px
</style>
