import { esbuildVersion } from "vite"
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
		},
		createCharacter({ commit }, newCharacter: Character) {
			return characterService.createCharacter(newCharacter).then(
				(character) => {
					commit("addCharacter", character)
					return Promise.resolve(character)
				},
				(error) => {
					return Promise.reject(error)
				}
			)
		},
		updateCharacter({ commit }, updatedCharacter: Character) {
			return characterService.updateCharacter(updatedCharacter).then(
				(character) => {
					commit("updateCharacterInList", character)
					return Promise.resolve(character)
				},
				(error) => {
					return Promise.reject(error)
				}
			)
		},
		deleteCharacter({ commit }, characterId: number) {
			return characterService.deleteCharacter(characterId).then(
				(response) => {
					commit("deleteCharacter", response.data)
					return Promise.resolve(response.data)
				},
				(error) => {
					return Promise.reject(error)
				}
			)
		}
	},
	mutations: {
		setCharacters(state, characters: Character[]) {
			state.characters = characters
		},
		updateCharacterInList(state, character: Character) {
			const index = state.characters.findIndex(
				(x) => x.id === character.id
			)
			debugger
			if (index !== -1) {
				state.characters.splice(index, 1, character)
			}
		},
		addCharacter(state, character: Character) {
			state.characters.push(character)
		},
		deleteCharacter(state, characterId) {
			const index = state.characters.findIndex(
				(x) => x.id === parseInt(characterId)
			)
			if (index !== -1) {
				state.characters.splice(index, 1)
			}
		}
	}
}
