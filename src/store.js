import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


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
                axios({ url: 'http://localhost:3000/api/users/login', data: { data: user }, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        console.log(resp)
                        console.log(user)
                      

                        if (token) {
                            localStorage.setItem('jwt', token)
                        }
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(resp)
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
                axios.post('http://localhost:3000/api/users/register', user)
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        console.log(resp)
            
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
        }
        // logout({ commit }) {
        //     return new Promise((resolve, reject) => {
        //         commit('logout')
        //         localStorage.removeItem('jwt')
        //         delete axios.defaults.headers.common['Authorization']
        //         resolve()
        //     })
        // }
    },

    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})