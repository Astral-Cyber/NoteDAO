import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/Hello/:id',
            name: 'Hello',
            component: () => import('../views/HelloView.vue')
        },
        {
            path: '/NoteDAO/:id',
            name: 'NoteDAO',
            component: () => import('../views/NoteView.vue')
        }
    ]
})

export default router
