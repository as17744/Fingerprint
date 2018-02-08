import vueRouter from 'vue-router';
import Start from './views/start.vue';
import Manager from './views/manager.vue';

const routes = [
    {
        path: '/',
        name: 'Start',
        component: Start
    },
    {
        path: '/manager',
        name: 'Manager',
        component: Manager
    }
];
const router = new vueRouter({
    routes
});

export default router;