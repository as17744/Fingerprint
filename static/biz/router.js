import vueRouter from 'vue-router';
import Start from './views/start.vue';
import Manager from './views/manager.vue';
import Teacher from './views/teacher.vue';

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
    },
    {
        path: '/teacher',
        name: 'Teacher',
        component: Teacher
    }
];
const router = new vueRouter({
    routes
});

export default router;