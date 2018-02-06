import Vue from 'vue';
import vueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './views/app.vue';
import router from './router';

Vue.use(vueRouter);
Vue.use(ElementUI);
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});