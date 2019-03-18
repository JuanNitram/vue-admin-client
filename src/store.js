import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		baseUrl: process.env.VUE_APP_API_URL,
		token: localStorage.getItem('token') || '',
		user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
		isLoading: false,
	},
	mutations: {
		auth_success(state, data){
			state.token = data.token
			state.user = data.user
		},
		logout(state){
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
				axios({url: this.state.baseUrl + '/login', data: user, method: 'POST' })
				.then(resp => {
					if(resp.data.success){
						const token = resp.data.data.token
						const user = resp.data.data.admin
						localStorage.setItem('token', token)
						localStorage.setItem('user', JSON.stringify(user))
						axios.defaults.headers.common['Authorization'] = token
						commit('auth_success', {token: token, user:user})
						resolve(resp)
					} else {
						console.log(resp.data.message);
					}
				})
				.catch(err => {
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
		isLoading: state => state.isLoading,
	}
})
