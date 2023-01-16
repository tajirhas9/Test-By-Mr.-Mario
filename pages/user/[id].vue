<template>
	<div class="container">
		<div class="row" v-for="skill in skills">
			<div class="skillbar" :data-percent="`${skill.level}%`" @click="updateSkill(skill)">
				<div class="skillbar-title">{{ skill.name }}</div>
				<div class="skill-bar-percent">{{ skill.level }}%</div>
				<div class="skillbar-bar" :style="`width: ${skill.level}%;`"></div>
				<button type="button" class="btn-close close" aria-label="Close" @click="deleteSkill(skill.name)"></button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
	import { useStore } from '@/stores/user'
	import { ISkill } from '~~/stores/types'

	export default {
		setup() {
			const store = useStore()
			const route = useRoute()
			return { route, store }
		},
		data() {
			return {
				userId: parseInt(this.$route.params.id as string),
			}
		},
		computed: {
			skills() {
				return this.store.getUserSkills(this.userId)
			},
		},
		methods: {
			deleteSkill(name: string) {
				this.store.deleteSkill(name, this.userId)
			},
			updateSkill(skill: ISkill) {
				let event = new CustomEvent('updateSkill', {
					detail: skill,
				})
				document.dispatchEvent(event)
				// this.$emit('update skill', skill)
			},
		},
	}
</script>
<style scoped lang="scss">
	.skillbar {
		cursor: pointer;
		position: relative;
		display: block;
		width: 100%;
		margin-bottom: 30px;
	}

	.skillbar:nth-child(odd) {
		background: '#eee';
	}

	.skillbar-bar:before {
		background: #eee;
		content: '';
		height: 3px;
		position: absolute;
		width: 100%;
		z-index: -1;
	}

	.skillbar-bar {
		height: 3px;
		width: 0px;
		background: #323232;
		transition-property: width, background-color;
	}

	.skillbar-title {
		color: #323232;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		display: inline-block;
	}

	.skill-bar-percent {
		float: right;
		display: inline-block;
		color: #323232;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
	}

	.close {
		float: right;
		margin-left: 20%;
	}
</style>
