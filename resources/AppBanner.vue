<template>
	<div class="banner" role="banner">
		<div>
			<ul class="skin-alexandria-notifications" v-html="htmlNotifications"></ul>
		</div>
	</div>
</template>

<script>
const DropdownMenu = require( './DropdownMenu.vue' );
module.exports = {
	name: 'Banner',
	props: {
		htmlNotifications: String
	},
	components: {
		DropdownMenu: DropdownMenu
	}
};
</script>

<style lang="less">
// @import 'AppBanner.vue.less';
</style>
