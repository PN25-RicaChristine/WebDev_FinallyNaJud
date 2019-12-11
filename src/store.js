import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from "sweetalert";
import AUTH from "@/auth";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('jwt') || '',
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            localStorage.removeItem('jwt')
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        loginAsync({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: 'http://localhost:3000/users/login', data: { data: user }, method: 'POST' })
                    .then(resp => {
                        console.log(resp.data)
                        if (resp.data == "Account not found!") {
                            swal(resp.data, " ", "error");
                        } else if (resp.data == "Password is incorrect!") {
                            swal(resp.data, " ", "error");
                        } else {
                            const token = resp.data.token
                            const user = resp.data.userInfo
                            console.log(user)

                
                            localStorage.setItem("Name", user.name),
                                localStorage.setItem("Username", user.username),
                                localStorage.setItem("Email", user.email),
                                localStorage.setItem("Password", user.password),
                                localStorage.setItem("Type", user.userType),
                                localStorage.setItem("id", user._id),
                                AUTH.setType(localStorage.getItem("Type")),
                                AUTH.setID(localStorage.getItem("id")),
                                AUTH.setUser(localStorage.getItem("Name")),
                                AUTH.setUsername(localStorage.getItem("Username")),
                                AUTH.setEmail(localStorage.getItem("Email"),
                                    AUTH.setPassword(localStorage.getItem("Password"))
                                )
                            if (token) {
                                localStorage.setItem('jwt', token)
                            }
                            axios.defaults.headers.common['Authorization'] = token
                            commit('auth_success', token, user)
                            resolve(resp)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        commit('auth_error')
                        commit('logout')
                        reject(err)
                    })
            })
        },

        registerAsync({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post('http://localhost:3000/users/register', user)
                    .then(resp => {
                        resolve(resp)
                    })
                    .catch(err => {
                        console.log(err)
                        commit('auth_error', err)
                        reject(err)
                    })
            })
        },
       updateSync({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                console.log(user)
                axios.put('http://localhost:3000/api/users/account', user)
                    .then(resp => {
                        const token = localStorage.getItem('jwt')
                        const user = resp.data
                        console.log(resp)
                        localStorage.setItem("Name", user.name),
                        localStorage.setItem("Username", user.username),
                        localStorage.setItem("Email", user.email),
                        localStorage.setItem("Password", user.password)
                        if (token) {
                            localStorage.setItem('jwt', token)
                        }
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        console.log(err)
                        commit('auth_error', err)
                        localStorage.removeItem('jwt')
                        reject(err)
                    })
            })
        },

        authorizedAsync({ commit }, token) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.get('http://localhost:3000/users/profile/' + token)
                    .then(resp => {
                        resolve(resp)
                    })
                    .catch(err => {
                        console.log(err)
                        commit('auth_error', err)
                        reject(err)
                    })
            })
        }
        // logout({ commit }) {
        //     return new Promise((resolve, reject) => {
        //         console.log("logout")
        //         commit('logout')
        //         localStorage.removeItem('jwt')
        //         delete axios.defaults.headers.common['Authorization']
        //         resolve()
        //     })
        //     .catch(err => {
        //         reject(err)
        //     })
        // }
    },

    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})