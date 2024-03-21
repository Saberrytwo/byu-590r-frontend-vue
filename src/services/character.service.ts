import axios from "axios"
import API_URL from "./env"
import authHeader from "./auth-header"

class CharacterService {
	getCharacters() {
		return axios
			.get(API_URL + "characters", { headers: authHeader() })
			.then((response) => {
				return response.data.data
			})
	}
}

const characterService = new CharacterService()
export default characterService
