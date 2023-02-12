<template>
  <div class="me-menu">
    <el-menu
      default-active="/me/my_info"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item :index="item.index" v-for="(item, i) in menu" :key="i">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          index: "/me/my_info",
          title: "信息管理",
          icon: "el-icon-user",
        },
        {
          index: "/me/my_article",
          title: "博文管理",
          icon: "el-icon-document",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("@/assets/less/index.less");
.me-menu {
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  height: 600px;
  border-radius: 10px 0 0 10px;
  background-color: #626878;
  overflow: hidden;
}
</style>