import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Esto esta muy pillo

export default new Vuex.Store({
	state: {
		status: '',
		baseUrl:'http://localhost/ProjectX/public/api',
		token: localStorage.getItem('token') || '',
		user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
		isLoading: false,
	},
	mutations: {
		auth_request(state){
			state.status = 'loading'
		},
		auth_success(state, data){
			state.status = 'success'
			state.token = data.token
			state.user = data.user
		},
		auth_error(state){
			state.status = 'error'
		},
		logout(state){
			state.status = ''
			state.token = ''
			state.user = {}
		},
		setIsLoading(state, val){
			state.isLoading = val;
		}
	},
	actions: {
		login({commit}, user){
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({url: this.state.baseUrl + '/admin/login', data: user, method: 'POST' })
				.then(resp => {
					if(resp.data.success){
						const token = resp.data.data.token
						const user = resp.data.data.admin
						localStorage.setItem('token', token)
						localStorage.setItem('user', JSON.stringify(user))
						// Add the following line:
						axios.defaults.headers.common['Authorization'] = token
						commit('auth_success', {token: token, user:user})
						resolve(resp)
					} else {
						console.log(resp.data.message);
					}
				})
				.catch(err => {
					commit('auth_error')
					localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		register({commit}, user){
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({url: this.state + '/register', data: user, method: 'POST' })
				.then(resp => {
					const token = resp.data.token
					const user = resp.data.user
					localStorage.setItem('token', token)
					// Add the following line:
					axios.defaults.headers.common['Authorization'] = token
					commit('auth_success', token, user)
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error', err)
					localStorage.removeItem('token')
					reject(err)
				})
			})
		},
		logout({commit}){
			return new Promise((resolve, reject) => {
				commit('logout')
				localStorage.removeItem('token')
				delete axios.defaults.headers.common['Authorization']
				resolve()
			})
		}
	},
	getters : {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
		isLoading: state => state.isLoading,
	}
})
