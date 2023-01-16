<template>
	<div class="container layout">
		<Sidebar />
		<div class="container right-section">
			<Header />
			<slot />
		</div>
	</div>
</template>

<script lang="ts"></script>
<style scoped lang="scss">
	.layout {
		display: grid;
		justify-content: center;
		align-content: center;
		.right-section {
			margin-left: 210px;
		}
	}
</style>
