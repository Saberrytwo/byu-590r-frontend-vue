import authService from "../../services/auth.service"

export default {
	name: "LoginView",
	emits: ["authenticate"],
	data: () => ({
		valid: false,
		username: "",
		usernameRules: [
			(value) => {
				if (value) return true

				return "Name is required."
			},
			(value) => {
				if (value?.length >= 3) return true

				return "Username must be at least 3 characters."
			}
		],
		password: "",
		passwordRules: [
			(value) => {
				if (value) return true

				return "Password is requred."
			},
			(value) => {
				if (value?.length >= 8) return true

				return "Password must be at least 8 characters."
			}
		],
		loading: false,
		registrationUsername: "",
		registrationUsernameRules: [
			(value) => {
				if (value) return true

				return "Username is required to register."
			},
			(value) => {
				if (value?.length >= 3) return true

				return "Username must be at least 3 characters."
			}
		],
		registrationPassword: "",
		registrationPasswordRules: [
			(value) => {
				if (value) return true

				return "Password is requred to register."
			},
			(value) => {
				if (value?.length >= 8) return true

				return "Password must be at least 8 characters."
			}
		],
		confirmPassword: "",
		registrationFirstName: "",
		registrationLastName: "",
		registrationNameRules: [
			(value) => {
				if (value) return true

				return "Name is required to register."
			}
		],

		showAlert: false,
		alertMessage: "",
		alertStyle: "",
		dialog: false,
		registerDialog: false,
		errorMsg: "",
		validRegistration: false
	}),
	computed: {
		passwordMatchRule() {
			return (value) => {
				if (!value) return "You must confirm your password."
				return value === this.registrationPassword
					? true
					: "Passwords do not match"
			}
		}
	},
	methods: {
		async submitLogin() {
			if (!this.valid) {
				return
			}

			const user = {
				email: this.username,
				password: this.password
			}
			this.errorMsg = ""
			this.loading = true

			await this.$store
				.dispatch("auth/login", user)
				.then(() => {
					this.alertMessage = "Login Success. Redirecting!"
					this.alertStyle = "success"
					this.showAlert = true
					this.isAuthenticated = true
					this.$emit("authenticate", this.isAuthenticated)

					setTimeout(() => {
						// debugger
						window.location.reload()
					}, 2000)
				})
				.catch((error) => {
					// debugger
					this.loading = false
					this.errorMsg =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
					console.error(this.errorMsg)
				})
		},

		async submitRegistration() {
			if (this.isValidRegistration) {
				return
			}

			const user = {
				name:
					this.registrationFirstName +
					" " +
					this.registrationLastName,
				email: this.registrationUsername,
				password: this.registrationPassword,
				c_password: this.confirmPassword
			}

			await this.$store
				.dispatch("auth/register", user)
				.then(() => {
					alert("success!")
				})
				.catch((error) => {
					this.loading = false
					this.errorMsg =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
					console.error(this.errorMsg)
				})

			this.registerDialog = false
		}
	}
}
