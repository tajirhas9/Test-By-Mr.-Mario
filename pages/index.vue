<template>
	<p>Welcome</p>
</template>
<script lang="ts">
	import { useStore } from '~/stores/user'

	export default {
		setup() {
			const store = useStore()
			return { store }
		},
		computed: {
			users() {
				return JSON.stringify(this.store.getUsers)
			},
		},
	}
</script>
