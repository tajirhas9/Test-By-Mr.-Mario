export interface ISkill {
	name: string
	level: number
}

export interface IUser {
	id: number
	name: string
	skills: Array<ISkill>
}
