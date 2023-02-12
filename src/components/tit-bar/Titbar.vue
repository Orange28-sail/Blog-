<template>
  <div class="nav-bar" ref="titBar" v-if="$store.state.nowPage !== 5">
    <h1 class="tit-main" @click="toIndex">For - Front End</h1>
    <img class="tit-img" src="@/assets/img/blog.png" alt="" />
    <p class="tit-dep">
      <span style="color: #c678dd">const </span>
      <span style="color: #d4b861">Blog.attribute</span>
      <span style="color: #56b6c2"> = </span>
      <span style="color: #ffffff">"只与前端有关的 Blog 网站"</span>
    </p>
    <div class="tit-bar">
      <router-link
        :class="item.isAct ? 'li-item-act' : 'li-item'"
        v-for="item in titList"
        :key="item.id"
        :to="item._id ? item.to + '/' + item._id : item.to"
        @click.native="switchTit(item.id)"
      >
        {{ item.name }}
      </router-link>
    </div>
    <div class="login-btn" v-show="!$store.state.isLogin" @click="toLogin">
      login
    </div>
    <div
      class="user-view"
      v-show="$store.state.isLogin"
      @mouseenter="menu_show = true"
    >
      <!--   @mouseleave="menu_show = false" -->
      <p
        :class="menu_show || $store.state.nowPage === 4 ? 'p_sel' : ''"
        ref="username"
      >
        {{ $store.state.userInfo.name }}
      </p>
      <img :src="$store.state.userInfo.user_pic" />
    </div>
    <!-- 显示用户菜单 -->
    <ul class="user-menu" v-show="menu_show" @mouseleave="menu_show = false">
      <li @click="toMe">个人中心</li>
      <li @click="toQuit">退出登录</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu_show: false,
      titList: [
        {
          id: 0,
          name: "博客",
          isAct: true,
          to: "/index",
        },

        {
          id: 1,
          name: "写文章",
          isAct: false,
          to: "/article",
          _id: "1",
        },
        {
          id: 2,
          name: "留言板",
          isAct: false,
          to: "/message",
        },
        {
          id: 3,
          name: "标签",
          isAct: false,
          to: "/sign",
        },
      ],
    };
  },
  methods: {
    // 导航点击切换
    switchTit(e) {
      this.$store.commit("ctrlIndex", e);
      if (e === 4 || e === 5) {
        this.titList.some((item) => (item.isAct = false));
        return;
      }
      if (this.titList[e].isAct) {
        return;
      }
      this.titList[e].isAct = true;
      this.titList.some((item) => {
        if (item.id !== e) {
          item.isAct = false;
        }
      });
      this.$store.commit("ctrlIndex", e);
    },
    // 点击logo跳转首页
    toIndex() {
      this.$router.push("/index");
      this.titList[0].isAct = true;
      this.titList.some((item) => {
        if (item.id !== 0) {
          item.isAct = false;
        }
      });
    },
    toLogin() {
      // this.$store.commit("isLogin", true);
      this.$router.push("/login");
      this.switchTit(5);
    },
    toMe() {
      this.$router.push("/me");
      this.switchTit(3);
      if (this.$store.state.nowPage === 3) {
        this.$refs.username.style.color = "#edc139";
        this.titList.some((item) => {
          item.isAct = false;
        });
      }
    },
    toQuit() {
      this.$store.commit("isLogin", false);
      this.$router.push("/index");
      this.switchTit(0);
      sessionStorage.removeItem("accessToken");
      this.$store.commit("getUserInfo", "");
      this.$store.commit("toSearch", true);
    },
  },
  mounted() {
    // 页面刷新后，导航栏状态根据store中nowPage的值改变
    if (
      this.$store.state.nowPage !== 5 &&
      this.$store.state.nowPage !== 3 &&
      this.$store.state.nowPage !== 6
    ) {
      this.switchTit(this.$store.state.nowPage);
    } else {
      this.titList.some((item) => (item.isAct = false));
    }
    if (this.$store.state.nowPage === 6) {
      this.switchTit(0);
    }
  },
};
</script>

<style lang="less" scoped>
@import url("@/assets/less/index.less");
.nav-bar {
  // opacity: 0.9;
  z-index: 99;
  .row();
  align-items: center;
  width: @main-width;
  height: @nav-bar-height;
  border-radius: 10px;
  // background-color: rgba(247, 68, 78, 0.99);
  background-color: rgba(81, 88, 105, 0.9);
  color: white;
  position: relative;
  .tit-main {
    opacity: 1;
    margin-left: 50px;
    color: rgb(237, 193, 57);
    cursor: pointer;
    user-select: none;
  }
  .tit-img {
    opacity: 1;
    margin-left: 20px;
    width: 36px;
    height: 36px;
  }
  .tit-dep {
    margin-left: 130px;
    user-select: none;
    font-size: 18px;
    font-style: italic;
  }
  .user-view {
    .row();
    align-items: center;
    position: absolute;
    right: 20px;
    width: 130px;
    height: 62px;
    border-radius: 15px;
    overflow: hidden;
    p {
      position: absolute;
      left: 0;
      display: block;
      width: 80px;
      text-align: right;
      font-size: 14px;
      line-height: 40px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; //行数
    }
    .p_sel {
      color: #dfbc4f;
    }
    img {
      position: absolute;
      right: 0;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      overflow: hidden;
    }
  }
  .user-menu {
    .column();
    align-items: center;
    z-index: 100;
    position: absolute;
    top: 72px;
    right: 20px;
    width: 130px;
    padding: 20px 0 0 0;
    border-radius: 15px;
    background-color: rgba(89, 95, 112, 0.9);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    li {
      margin-bottom: 20px;
      padding: 5px;
      cursor: pointer;
      border-bottom: 1px solid rgba(89, 95, 112, 0.9);
      &:hover {
        color: #dfbc4f;
        border-bottom: 1px solid #dfbc4f;
      }
    }
  }
  .login-btn {
    position: absolute;
    right: 50px;
    height: 42px;
    border-radius: 15px;
    padding: 0 30px 0 30px;
    font-size: 20px;
    text-align: center;
    line-height: 42px;
    color: #dfbc4f;
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: rgba(112, 117, 134, 0.9);
    }
  }
  .tit-bar {
    position: absolute;
    right: 160px;
    .row();
    align-items: center;
    .li-item {
      display: block;
      height: 42px;
      border-radius: 15px;
      list-style: none;
      padding: 0 30px 0 30px;
      font-size: 20px;
      line-height: 42px;
      color: white;
      user-select: none;
      &:hover {
        background-color: rgba(112, 117, 134, 0.9);
        color: rgb(237, 193, 57);
        transform: scale(0.8);
      }
    }
    .li-item-act {
      display: block;
      height: 42px;
      border-radius: 15px;
      list-style: none;
      padding: 0 30px 0 30px;
      font-size: 20px;
      line-height: 42px;
      color: rgb(237, 193, 57);
      background-color: #ffff99;
      background-color: rgba(112, 117, 134, 0.9);
      user-select: none;
    }
  }
}
</style>