import authService from "../services/auth.service"

const user = JSON.parse(localStorage.getItem("user"))
const initialState = user
	? { status: { loggedIn: true }, user }
	: { status: { loggedIn: false }, user: null }
// debugger

export const auth = {
	namespaced: true,
	state: initialState,
	actions: {
		login({ commit }, user) {
			return authService.login(user).then(
				(user) => {
					commit("loginSuccess", user)
					return Promise.resolve(user)
				},
				(error) => {
					commit("loginFailure")
					return Promise.reject(error)
				}
			)
		},
		fetchUser() {
			return user
		},
		logout({ commit }) {
			authService.logout()
			commit("logout")
		},
		register({ commit }, user) {
			debugger
			return authService.register(user).then(
				(response) => {
					commit("registerSuccess")
					return Promise.resolve(response.data)
				},
				(error) => {
					commit("registerFailure")
					return Promise.reject(error)
				}
			)
		},
		forgotPassword({ commit }, user) {
			return authService.forgotPassword(user).then(
				(response) => {
					commit("forgotPasswordSuccess", user)
					return Promise.resolve(user)
				},
				(error) => {
					commit("forgotPasswordSuccess")
					return Promise.reject(error)
				}
			)
		}
	},
	getters: {
		getAuthentication: (state) => state.status.loggedIn
	},
	mutations: {
		loginSuccess(state, user) {
			state.status.loggedIn = true
			state.user = user
		},
		loginFailure(state) {
			state.status.loggedIn = false
			state.user = null
		},
		logout(state) {
			state.status.loggedIn = false
			state.user = null
		},
		registerSuccess(state) {
			state.status.loggedIn = false
		},
		registerFailure(state) {
			state.status.loggedIn = false
		},
		forgotPasswordSuccess(state) {
			state.status.loggedIn = false
		}
	}
}
