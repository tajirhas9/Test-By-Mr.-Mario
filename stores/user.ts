import { defineStore } from 'pinia'
import { ISkill, IUser } from './types'
import type { NumberOrNull } from '@/utils/types'

export const useStore = defineStore({
	id: 'user',
	state: () => ({
		activeUser: null as NumberOrNull,
		users: [] as Array<IUser>,
	}),
	getters: {
		getUsers: (state) => state.users,
		getUserSkills: (state) => {
			return (userId: number) => state.users.find((user) => user.id === userId)?.skills
		},
	},
	actions: {
		addUser(_name: string) {
			this.users.push({
				id: this.users.length,
				name: _name,
				skills: [] as Array<ISkill>,
			})
		},
		addSkill(newSkill: ISkill, userId: number) {
			try {
				console.log('adding new skill', newSkill, userId)
				for (let i = 0; i < this.users.length; ++i) {
					let user: IUser = this.users[i]

					if (user.id === userId) {
						console.log('found user')
						if (user.skills.some((skill) => skill.name === newSkill.name)) {
							throw new SkillAlreadyExistError()
						} else {
							console.log('new skill')
							this.users[i].skills.push(newSkill)
							console.log(this.users)
						}
					}
				}
				// this.users.forEach((user: IUser) => {
				// 	if (user.id === userId) {
				// 		if (user.skills.some((skill) => skill.name === newSkill.name)) {
				// 			throw new SkillAlreadyExistError()
				// 		} else {
				// 			user.skills.push(newSkill)
				// 		}
				// 	}
				// })
			} catch (e) {
				this.updateSkill(newSkill, userId)
			}
		},
		updateSkill(newSkill: ISkill, userId: number) {
			try {
				console.log('updating skill', newSkill)

				for (let i = 0; i < this.users.length; ++i) {
					let user: IUser = this.users[i]

					if (user.id === userId) {
						for (let j = 0; j < user.skills.length; ++j) {
							let skill = user.skills[j]

							if (skill.name === newSkill.name) {
								this.users[i].skills[j].level = newSkill.level
							}
						}
					}
				}
				// this.users.forEach((user: IUser) => {
				// 	if (user.id === userId) {
				// 		user.skills.forEach((skill: ISkill) => {
				// 			if (skill.name === newSkill.name) {
				// 				skill.level = newSkill.level
				// 			}
				// 		})
				// 	}
				// })
			} catch (e) {
				console.error(
					`Failed to update skill for user id: ${userId}.\n skill: ${newSkill.name}\nlevel: ${newSkill.level}`
				)
			}
		},
		deleteSkill(_skill: string, userId: number) {
			try {
				let user = this.users.find((user: IUser) => user.id === userId)

				if (user?.skills.some((skill) => skill.name === _skill)) {
					user.skills = user.skills.filter((skill) => skill.name !== _skill)
				} else {
					throw new SkillNotFoundError()
				}
			} catch (e) {
				console.error(e)
			}
		},
	},
})
