import axios from "axios"
import API_URL from "./env"
import authHeader from "./auth-header"
import Character from "../models/character"

class CharacterService {
	getCharacters() {
		return axios
			.get(API_URL + "characters", { headers: authHeader() })
			.then((response) => {
				return response.data.data
			})
	}

	createCharacter(newCharacter: Character) {
		let formData = new FormData()

		Object.entries(newCharacter).forEach(([key, value]) => {
			formData.append(key, value)
		})
		return axios
			.post(API_URL + "create", formData, {
				headers: authHeader()
			})
			.then((response) => {
				debugger
				return response.data.data
			})
			.catch((error) => {
				throw error.response.data.message
			})
	}

	updateCharacter(updatedCharacter: Character) {
		let formData = new FormData()

		Object.entries(updatedCharacter).forEach(([key, value]) => {
			formData.append(key, value)
		})
		return axios
			.post(API_URL + "update?_method=PUT", formData, {
				headers: authHeader()
			})
			.then((response) => {
				return response.data.data
			})
			.catch((error) => {
				throw error.response.data.message
			})
	}

	deleteCharacter(characterId: number) {
		debugger
		return axios
			.delete(API_URL + "delete?characterId=" + characterId, {
				headers: authHeader()
			})
			.then((response) => {
				debugger
				return response.data
			})
			.catch((error) => {
				debugger
				throw error.response.data.message
			})
	}
}

const characterService = new CharacterService()
export default characterService
