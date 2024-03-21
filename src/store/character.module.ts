import Character from "../models/character"
import characterService from "../services/character.service"
import userService from "../services/user.service"

interface InitialState {
	characters: Character[]
}

const initialState: InitialState = {
	characters: []
}

export const character = {
	namespaced: true,
	state: initialState,
	actions: {
		getCharacters({ commit }) {
			return characterService.getCharacters().then(
				(characters) => {
					commit("setCharacters", characters)
					return Promise.resolve(characters)
				},
				(response) => {
					return Promise.resolve(response)
				}
			)
		}
	},
	mutations: {
		setCharacters(state, characters) {
			state.characters = characters
		}
	}
	// getters: {
	// 	getCharacters: (state) => {
	// 		return state.characters
	// 	}
	// }
}
