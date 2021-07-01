import Vue from "vue";
import App from "./App.vue";
import { router } from "./routes/index.js";
import { store } from "./store/store.js";

import Vuesax from "vuesax";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "vuesax/dist/vuesax.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(Vuesax, {
  // options here
});

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
