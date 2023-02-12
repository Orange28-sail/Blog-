<template>
  <div class="me-view">
    <my-menu></my-menu>
    <div class="me-main">
      <keep-alive exclude="my_article">
        <router-view></router-view>
      </keep-alive>
    </div>
    <el-backtop target=".me-main" :right="40" :bottom="60">
      <div class="back-top">UP</div>
    </el-backtop>
  </div>
</template>

<script>
import MyMenu from "@/components/myModule/MyMenu.vue";
export default {
  data() {
    return {
      page_index: 4,
    };
  },
  activated() {
    this.$store.commit("ctrlIndex", this.page_index);
  },
  components: {
    MyMenu,
  },
  created() {
    this.$store.commit("ctrlIndex", this.page_index);
  },
};
</script>

<style lang="less" scoped>
@import url("@/assets/less/index.less");
.me-view {
  position: absolute;
  top: 102px;
  left: 20px;
  width: 1496px;
  height: 600px;
  .me-menu {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 600px;
    border-radius: 10px 0 0 10px;
    background-color: #626878;
    overflow: hidden;
  }
  .me-main {
    position: absolute;
    right: 0;
    top: 0;
    padding: 20px;
    width: 1296px;
    height: 600px;
    border-radius: 0 10px 10px 0;
    background-color: #fff;
    overflow: scroll;
    .minScroller();
  }
  .back-top {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #ffce65 !important;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    text-align: center;
    font-size: 18px;
    line-height: 40px;
    color: #ffffff;
  }
}
</style>