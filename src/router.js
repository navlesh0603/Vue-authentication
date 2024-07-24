import { createRouter, createWebHistory } from "vue-router";
import LoginPage from './pages/LoginPage.vue';
import SignupPage from './pages/SignupPage.vue';



const routes=[
    {path: '/login' , component: LoginPage},
    {path: '/signup' , component: SignupPage},
];

const router= createRouter({
    history:createWebHistory(),
    routes,
});

export default router;