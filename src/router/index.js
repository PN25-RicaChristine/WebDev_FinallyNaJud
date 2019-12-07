
import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "@/view/Register";
import Login from "@/view/Login";
import Dashboard from "@/view/Dashboard";
import BloggerDashboard from "@/view/BloggerDashboard";
import Home from "@/view/Home";
import MyAccount from "@/view/MyAccount"
import store from '../store'


Vue.use(VueRouter);

const auth = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next()
  } else {
    next('/login')
  }
}


const routes = [
  {
    path: "/register",
    name: "signup",
    component: Signup,
    tokenRequired : false
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    tokenRequired : false
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    beforeEnter: auth,
    tokenRequired : true

  },
  {
    path: "/bloggerdashboard",
    name: "bdashboard",
    component: BloggerDashboard,
    beforeEnter: auth,
    tokenRequired : true
  },
  {
    path: "/",
    name: "home",
    component: Home,
    tokenRequired : false

  },
  {
    path: "/myaccount",
    name: "myaccount",
    component: MyAccount,
    beforeEnter: auth,
    tokenRequired : true
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;