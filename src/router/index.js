
import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "@/view/Register";
import Login from "@/view/Login";
import Dashboard from "@/view/Dashboard";
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
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    beforeEnter: auth
  },
  {
    path: "/bloggerdashboard",
    name: "bdashboard",
    component: Dashboard,
    beforeEnter: auth
  },
  {
    path: "/",
    name: "home",
    component: Home,

  },
  {
    path: "/home",
    name: "home",
    component: Home,

  },
  {
    path: "/myaccount",
    name: "myaccount",
    component: MyAccount,
    beforeEnter: auth
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;