import vueRouter from 'vue-router';
import Start from './views/start.vue';

const routes = [
    {
        path: '/',
        name: 'Start',
        component: Start
    }
];
const router = new vueRouter({
    routes
});

export default router;