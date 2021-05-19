<template>
	<div class="banner" role="banner">
		<div></div>
		<div v-html="html"></div>
	</div>
</template>

<script>
const DropdownMenu = require( './DropdownMenu.vue' );
module.exports = {
	name: 'Banner',
	props: {
		html: String
	},
	components: {
		DropdownMenu: DropdownMenu
	}
};
</script>

<style lang="less">
.banner {
	background-color: #333;
	padding: 5px;
	height: 40px;

	> div {
		display: flex;
		max-width: 960px;
		margin: 0 auto;
		align-items: center;
	}
}
</style>
