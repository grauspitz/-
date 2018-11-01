// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "@/icon/iconfont.css";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  data() {
    return { value: "" };
  },
  router,
  components: { App },
  template: "<App/>"
});
