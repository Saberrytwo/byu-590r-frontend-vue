interface Character {
	id: number
	name: string
	imageURL: string
	weightClass: string
	originGame: string
	releasePack: string
	playstyleDescription: string
	created_at: string
	updated_at: string
	image: File
	imageURLToShow?: string
	moves?: Move[]
	// users?: User[]
	// theme?: Theme
}

interface Move {
	id: number
	character_id: number
	name: string
	buttons: string
	created_at: string
	updated_at: string
}

export default Character
