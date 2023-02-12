<template>
  <div id="app" style="overflow-x: hidden" class="app" ref="app">
    <!-- 导航栏 -->
    <Titbar id="tit-bar" @nowPage="nowPage"></Titbar>
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <particles-bg type="square" num="5" moveSpeed="0.1" :bg="true" />
  </div>
</template>
<script>
import Titbar from "./components/tit-bar/Titbar.vue";
import { ParticlesBg } from "particles-bg-vue";
export default {
  data() {
    return {
      now_page: 0,
    };
  },
  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign({}, JSON.parse(sessionStorage.getItem("store")))
      );
    }

    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  components: {
    Titbar,
    ParticlesBg,
  },
  methods: {
    nowPage(val) {
      console.log(val);
      this.now_page = val;
    },
  },
};
</script>
<style lang="less">
@import url("@/assets/less/index.less");
@nav-bar-height: 62px;
@nav-background-color: #ff4955;
#app {
  .column();
  width: 1536px;
  height: 100vh;
  position: relative;
  align-items: center;
  justify-content: center;
  .noneScroller();
}

#tit-bar {
  position: fixed;
  top: 20px;
}

/* 滚动槽 */
// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
//   box-shadow: inset006pxrgba(0, 0, 0, 0.3);
//   border-radius: 10px;
// }
</style>
