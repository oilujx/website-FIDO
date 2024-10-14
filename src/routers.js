import Home from './components/inicio.vue'
import Autor from './components/autor.vue'
import Libro from './components/libro.vue'
import Registro from './components/registro.vue'
import Premio from './components/premio.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'
    },
    {
        name: 'Autor',
        component: Autor,
        path: '/autores'
    },
    {
        name: 'Libro',
        component: Libro,
        path: '/libros'
    },
    {
        name: 'Registro',
        component: Registro,
        path: '/registro'
    },
    {
        path: '/premio',
        name: 'Premio',
        component: Premio,
        beforeEnter: (to, from, next) => {
            // Comprobar si el código fue validado
            const codigoValidado = localStorage.getItem('codigoValidado');
            if (codigoValidado === 'true') {
                next(); // Permitir el acceso
            } else {
                // Redirigir al registro si no está validado
                next({ name: 'Registro' });
            }
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})
/*
const router = new VueRouter({
    routes: [
        {
            name: 'Home',
            component: Home,
            path: '/'
        },
        {
            name: 'Autor',
            component: Autor,
            path: '/autores'
        },
        {
            name: 'Libro',
            component: Libro,
            path: '/libros'
        },
        {
            name: 'Registro',
            component: Registro,
            path: '/registro'
        },
        {
            path: '/premio',
            name: 'Premio',
            component: Premio,
            beforeEnter: (to, from, next) => {
                // Comprobar si el código fue validado
                const codigoValidado = localStorage.getItem('codigoValidado');
                if (codigoValidado === 'true') {
                    next(); // Permitir el acceso
                } else {
                    // Redirigir al registro si no está validado
                    next({ name: 'Registro' });
                }
            }
        },/*
        {
            path: '/registro',
            name: 'Registro',
            component: Registro
        }
    ]
});*/


export default router