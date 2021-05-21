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
.skin-alexandria-notifications {
	flex-grow: 1;
	text-align: right;
	list-style: none;
	margin: 2px 20px 0;

	li {
		display: inline-block;
		margin-left: 10px;
		filter: invert( 1 );
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
	position: sticky;
	top: 0;
	z-index: 1;

	> div {
		display: flex;
		max-width: 960px;
		margin: 0 auto;
		align-items: center;
	}
}
</style>
