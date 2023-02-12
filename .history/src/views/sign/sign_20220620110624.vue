<template>
  <div class="main">
    <!-- <el-carousel
      height="200px"
      direction="vertical"
      :autoplay="true"
      :interval="3000"
    >
      <el-carousel-item v-for="item in 3" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-divider content-position="left">
      <div id="sign">
        <i class="el-icon-paperclip"></i> <span>前端技术标签</span>
      </div></el-divider
    >
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="image"
      />
      <div style="padding: 14px">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card> -->
    <h1>待更新</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page_index: 3,
      arr: {
        name: "123",
        age: "12",
        sex: "12",
      },
    };
  },
  methods: {},
  computed: {},
  created() {
    this.$store.commit("ctrlIndex", this.page_index);
    // 练习
  },
  activated() {
    this.$store.commit("ctrlIndex", this.page_index);
    
  },

  components: {},
};
</script>

<style lang="less" scoped>
@import url("@/assets/less/index.less");
.main {
  width: 1496px;
  height: 600px;
  background-color: rgba(255, 255, 255, 1);
  overflow: auto;
  /deep/.el-carousel {
    width: 1456px;
    border-radius: 10px;
    // height: ;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
  #sign {
    color: #ffce65;
    /deep/ .el-divider__text {
      color: #ffce65;
    }
  }
  /deep/ .el-divider {
    background-color: #ffce65;
    width: 1456px !important;
  }
}
</style>