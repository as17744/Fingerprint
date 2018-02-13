import vueRouter from 'vue-router';
import Start from './views/start.vue';
import Manager from './views/manager.vue';
import Teacher from './views/teacher.vue';
import Student from './views/student.vue';
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
    },
    {
        path: '/student',
        name: 'Student',
        component: Student
    }
];
const router = new vueRouter({
    routes
});

export default router;