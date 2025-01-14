import { createRouter, createWebHistory } from 'vue-router';
import Chapters from '@/views/Chapters.vue'; // Glavna stran za izbiro poglavij
import PravdniPostopek from '@/views/PravdniPostopek.vue';
import Presenecenje from "@/views/Presenecenje.vue"; // Stran za pravdni postopek

const routes = [
    {
        path: "/",
        name: "Chapters",
        component: Chapters,
    },
    {
        path: '/pravdniPostopek',
        name: 'PravdniPostopek',
        component: PravdniPostopek,
    },
    { path: "/presenecenje", component: Presenecenje },
    // Tukaj lahko dodate več poti za druga poglavja
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
