import { createStore } from "vuex"
import { auth } from "./auth.module"
import { user } from "./user.module"
import { character } from "./character.module"

const store = createStore({
	modules: {
		auth,
		user,
		character
	}
})

export default store
