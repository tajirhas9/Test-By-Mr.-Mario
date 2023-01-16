<template>
	<div class="sidebar">
		<input type="text" class="col form-control" id="username" placeholder="Name" v-on:keyup.enter="addUser()" />
		<div v-for="user in users">
			<NuxtLink :to="`/user/${user.id}`">{{ user.name }}</NuxtLink>
		</div>
	</div>
</template>
<script lang="ts">
	import { useStore } from '~/stores/user'

	export default {
		name: 'Sidebar',
		setup() {
			const store = useStore()
			return { store }
		},
		computed: {
			users() {
				return this.store.getUsers
			},
		},
		methods: {
			addUser() {
				let username = (<HTMLInputElement>document.getElementById('username')).value
				this.store.addUser(username)
			},
		},
	}
</script>
<style scoped lang="scss">
	.sidebar {
		margin: 0;
		padding: 0;
		width: 200px;
		background-color: #f1f1f1;
		position: fixed;
		// height: 100%;
		overflow: auto;
	}

	.sidebar a {
		display: block;
		color: black;
		padding: 16px;
		text-decoration: none;
	}

	.sidebar a.active {
		background-color: #04aa6d;
		color: white;
	}

	.sidebar a:hover:not(.active) {
		background-color: #555;
		color: white;
	}

	div.content {
		margin-left: 200px;
		padding: 1px 16px;
		height: 1000px;
	}

	@media screen and (max-width: 700px) {
		.sidebar {
			width: 100%;
			height: auto;
			position: relative;
		}
		.sidebar a {
			float: left;
		}
		div.content {
			margin-left: 0;
		}
	}

	@media screen and (max-width: 400px) {
		.sidebar a {
			text-align: center;
			float: none;
		}
	}
</style>
