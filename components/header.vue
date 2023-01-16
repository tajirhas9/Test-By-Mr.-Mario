<template>
	<div class="container">
		<div class="form-group row" v-if="userRoute">
			<label for="skill" class="col col-form-label"> Skill: </label>
			<input type="text" class="col form-control" id="skill" />
			<div class="col"></div>
			<label for="level" class="col col-form-label"> Level: </label>
			<input type="number" class="col form-control" id="level" />
			<button id="header-button" type="button" class="col btn btn-primary button-margin" @click="addSkill()">
				Add
			</button>
		</div>
	</div>
</template>
<script lang="ts">
	import { ISkill } from '~~/stores/types'
	import { useStore } from '~~/stores/user'

	export default {
		name: 'Header',
		setup() {
			const store = useStore()
			return { store }
		},
		computed: {
			userRoute() {
				console.log(this.$route)
				return this.$route.name === 'user-id'
			},
		},
		methods: {
			addSkill() {
				let userId = parseInt(this.$route.params.id as string)

				let skillName = (<HTMLInputElement>document.getElementById('skill')).value
				let skillLevel = (<HTMLInputElement>document.getElementById('level')).value

				let newSkill: ISkill = { name: skillName, level: parseInt(skillLevel) }

				this.store.addSkill(newSkill, userId)
			},
		},
		mounted() {
			document.addEventListener('updateSkill', (e: any) => {
				let skill: ISkill = e.detail as ISkill
				;(<HTMLInputElement>document.getElementById('skill')).value = skill.name
				;(<HTMLInputElement>document.getElementById('level')).value = skill.level.toString()

				document.getElementById('header-button')!.innerText = 'Update'
			})
		},
		watch: {
			$route(newVal, oldVal) {
				try {
					if (newVal.name !== 'index') {
						;(<HTMLInputElement>document.getElementById('skill')).value = ''
						;(<HTMLInputElement>document.getElementById('level')).value = ''
						document.getElementById('header-button')!.innerText = 'Add'
					}
				} catch (e) {}
			},
		},
	}
</script>
<style scoped lang="scss">
	main {
		margin: auto;
	}
	.button-margin {
		margin-left: 5vw;
	}
</style>
