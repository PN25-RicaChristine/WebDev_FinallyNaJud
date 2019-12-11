import AUTH from "@/auth";
let beforeEnter = (to, from, next) => {
    if (to.meta.tokenRequired === true) {
        if (AUTH.user != null) {
            if (AUTH.type == "Blogger") {
                next({ path: '/bloggerdashboard' })
            } else {
                next({ path: '/dashboard' })
            }
            next({ path: '/myaccount' })
        } else {
            next({ path: '/login' })
        }
    } else {
        next({ path: '/home' })
    }

    var devRoutes = []
    let app = require('router/index.js')
    devRoutes = devRoutes.concat(app.default.routes)
    for (let x = 0; x < devRoutes.length; x++) {
        devRoutes[x]['beforeEnter'] = beforeEnter
    }

    let routes = [
        {
            path: '/',
            name: 'home',
            component: resolve => require(['modules/Home.vue'], resolve),
            beforeEnter: beforeEnter
        }
    ]
    routes = routes.concat(devRoutes)
    export default {

        routes: routes
    }