import Character from "../../models/character"
import { character } from "../../store/character.module"
import { ref } from "vue"
export default {
	name: "CharactersView",
	data: () => ({
		characters: [] as Character[],
		showCreateDialog: false,
		showEditDialog: false,
		showDeleteDialog: false,
		selectedCharacter: {} as Character,
		nameRules: [
			(value) => {
				if (value) return true

				return "Name is required."
			},
			(value) => {
				if (value?.length >= 3) return true

				return "No character has name shorter than 3 characters."
			}
		]
	}),
	computed: {
		imageTypeRule() {
			return (value) => {
				if (!value || value.length === 0)
					return "You must upload an image."
				console.log(value)
				return true
			}
		}
	},
	methods: {
		getCharacters() {
			this.$store.dispatch("character/getCharacters").then((response) => {
				response.forEach((x) => (x.imageURLToShow = x.imageURL))
				this.characters = response
			})
		},
		showTheme(index: number) {
			this.characters[index].imageURLToShow =
				this.characters[index].theme.imageURL ===
				this.characters[index].imageURLToShow
					? this.characters[index].imageURL
					: this.characters[index].theme.imageURL
		},
		onFileUpload(e) {
			var image = e.target.files || e.dataTransfer.files
			if (!image.length) return

			this.selectedCharacter.image = image[0]
		},
		initializeEdit(character: Character) {
			this.selectedCharacter = character
			this.showEditDialog = true
		},
		updateCharacter() {
			this.$store
				.dispatch("character/updateCharacter", this.selectedCharacter)
				.then(() => {
					this.resetForm()
					this.showEditDialog = false
				})
				.catch((error) => {
					console.error("Error updating character:", error)
				})
		},
		initializeCreate() {
			this.selectedCharacter = {}
			this.showCreateDialog = true
		},
		createCharacter() {
			this.$refs.form.validate().then((valid) => {
				if (valid.valid) {
					this.$store
						.dispatch(
							"character/createCharacter",
							this.selectedCharacter
						)
						.then(() => {
							this.resetForm()
							this.showCreateDialog = false
						})
						.catch((error) => {
							console.error("Error creating character:", error)
						})
				} else {
					console.log("Form validation failed")
				}
			})
		},
		resetForm() {
			this.selectedCharacter = {}
		},
		cancelCreation() {
			// Reset the form and close the dialog
			this.resetForm()
			this.showCreateDialog = false
		},
		confirmDelete(character) {
			this.selectedCharacter = character
			this.showDeleteDialog = true
		},
		deleteCharacter() {
			if (this.selectedCharacter) {
				this.$store.dispatch(
					"character/deleteCharacter",
					this.selectedCharacter.id
				)
				this.showDeleteDialog = false
			}
		}
	},
	created() {
		this.getCharacters()
	}
}
