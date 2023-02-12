<template>
  <div class="left-menu">
    <el-menu :default-active="default_index" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      background-color="rgba(81, 88, 105, 0.9)" text-color="#fff" active-text-color="#dfbc4f" :unique-opened="true">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>所有文章</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-0" @click="searchAll">All</el-menu-item>
          <el-menu-item v-for="item in $store.state.tags" :key="'1' + item.index" :index="'1' + item.index"
            @click="searchByClass_public(item.value)">{{ item.value }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2" v-if="$store.state.isLogin">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>个人文章</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-0" @click="getPrivateArticle">All</el-menu-item>
          <el-menu-item v-for="item in $store.state.tags" :key="'2' + item.index" :index="'2' + item.index"
            @click="searchByClass_private(item.value)">{{ item.value }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: "left",
      default_index: "1-0",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async searchByClass_public(e) {
      this.$store.commit("toSearch", false);
      const query = this.$qs.stringify({
        query: e,
      });
      // console.log(query);
      const { data } = await this.$http.searchPublicArticleByClass(query);
      this.$store.commit("searchArticles", data.data);
    },
    async searchByClass_private(e) {
      this.$store.commit("toSearch", false);
      const query = this.$qs.stringify({
        query: e,
      });
      // console.log(query);
      const { data } = await this.$http.searchPrivateArticleByClass(query);
      this.$store.commit("searchArticles", data.data);
    },
    async getPrivateArticle() {
      this.$store.commit("toSearch", false);
      const { data } = await this.$http.getPrivateArticle();
      console.log('data', data)
      this.$store.commit("searchArticles", data.data);
    },
    searchAll() {
      this.$store.commit("toSearch", true);
    },
  },
};
</script>

<style lang="less" scoped>
.left-menu {
  position: absolute;
  left: 0;
  width: 200px;
  height: 600px;
  border-right: 0 !important;

  /deep/ .el-submenu__title {
    width: 200px;
  }

  /deep/ .el-submenu .el-menu-item {
    min-width: 0px;
  }

  /deep/ .el-menu {
    border-right: 0;
  }

  /deep/ .el-menu-item {
    font-size: 14px;
    letter-spacing: 2px;
  }

  /deep/ .is-active {
    background-color: rgba(255, 255, 255, 1) !important;
    // background-color: rgba(244, 245, 245, 0.95) !important;
    font-size: 14px;
    letter-spacing: 2px;
  }

  /deep/ .el-submenu__title {
    letter-spacing: 2px;
  }
}
</style>