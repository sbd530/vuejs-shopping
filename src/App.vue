<template>
  <div id="app">
    <side-tool-bar></side-tool-bar>
    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
    <spinner :loading="loadingStatus"></spinner>
  </div>
</template>

<script>
import SideToolBar from "./components/SideToolBar.vue";
import Spinner from "./components/Spinner.vue";
import bus from "./utils/bus.js";

export default {
  name: "App",
  components: {
    SideToolBar,
    Spinner,
  },
  data() {
    return {
      loadingStatus: false,
    };
  },
  methods: {
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    },
  },
  created() {
    bus.$on("start:spinner", this.startSpinner);
    bus.$on("end:spinner", this.endSpinner);
  },
  beforeDestroy() {
    bus.$off("start:spinner", this.startSpinner);
    bus.$off("end:spinner", this.endSpinner);
  },
};
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
/* Router Transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}
page .page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
