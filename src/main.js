import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import "./element-ui/index";
// 修改后的element.message方法
import gtMessage from "./utils/message";
// api
import api from "./api/index.js";
// 序列化请求信息
import qs from "qs";
// 路由
import router from "./router";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
// 日历
import { Calendar } from "ant-design-vue";
// 使用hightlight.js
import hljs from "highlight.js";
import "highlight.js/styles/docco.css"; // 样式文件
Vue.directive("highlight", function (el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
});
Vue.use(Calendar);
// 使用mavonEditor
Vue.use(mavonEditor);
// 使用序列化（请求信息）
Vue.prototype.$qs = qs;
// 重写后的 message方法
Vue.prototype.$message = gtMessage;
// 注册api
Vue.prototype.$http = api;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
