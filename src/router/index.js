import Vue from "vue";
import VueRouter from "vue-router";
import gtMessage from "../utils/message";

// 按需导入需要的组件
import Index from "../views/index/Index.vue";
import Article from "../views/article/Article.vue";
import Message from "../views/message/Message.vue";
import Me from "../views/me/Me.vue";
import Sign from "../views/sign/sign.vue";
import Login from "../views/login/Login.vue";
import Article_show from "../views/article-show/Article-show.vue";
import MyInfo from "../components/myModule/MyInfo.vue";
import MyArticle from "../components/myModule/MyArticle.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "index",
    component: Index,
  },
  {
    path: "/article/:_id",
    name: "article",
    component: Article,
    meta: { authRequired: true },
  },
  {
    path: "/article_show",
    name: "detail",
    component: Article_show,
  },
  {
    path: "/message",
    name: "message",
    component: Message,
  },
  {
    path: "/sign",
    name: "sign",
    component: Sign,
  },
  {
    path: "/me",
    name: "me",
    component: Me,
    redirect: "/me/my_info",
    meta: { authRequired: true },
    children: [
      {
        path: "my_info",
        name: "我的信息",
        component: MyInfo,
      },
      {
        path: "my_article",
        name: "我的博文",
        component: MyArticle,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];
const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("accessToken");
  // console.log("token :>> ", token);
  if (
    to.name != "login" &&
    to.name != "message" &&
    to.name != "index" &&
    to.name != "detail" &&
    !token
  ) {
    gtMessage.warning({
      showClose: true,
      message: "登录后才可进入该模块",
    });
    next({ name: "login" });
  } else {
    // console.log("to :>> ", to);
    // console.log("form :>> ", from);
    next();
  }
  // if (!to.meta.authRequired && !token) {
  //   next({ name: "login" });
  // } else {
  //   next();
  // }
});
// 防止重复同一个路由;
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
