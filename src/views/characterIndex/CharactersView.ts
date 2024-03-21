import Character from "../../models/character"
export default {
	name: "CharactersView",
	data: () => ({
		characters: [] as Character[]
	}),
	computed: {},
	methods: {
		getCharacters() {
			this.$store.dispatch("character/getCharacters").then((response) => {
				this.characters = response
			})
		}
	},
	created() {
		this.getCharacters()
	}
}
