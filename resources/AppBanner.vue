<template>
	<div class="banner" role="banner">
		<ul class="skin-alexandria-notifications" v-html="htmlNotifications"></ul>
		<div></div>
		<div v-html="html"></div>
	</div>
</template>

<script>
const DropdownMenu = require( './DropdownMenu.vue' );
module.exports = {
	name: 'Banner',
	props: {
		htmlNotifications: String,
		html: String
	},
	components: {
		DropdownMenu: DropdownMenu
	}
};
</script>

<style lang="less">
.skin-alexandria-notifications {
	float: right;
	list-style: none;
	margin: 2px 20px 0;

	li {
		display: inline-block;
		margin-left: 10px;

		filter: invert(1);
		opacity: 1;
	}

	~ div {
		clear: both;
	}
}

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
