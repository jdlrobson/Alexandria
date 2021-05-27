<template>
	<footer>
		<div class="footer__content">
			<div class="footer__menus">
				<footer-menu :id="placesId" :heading="heading">
					<li v-for="( m ) in placesItemsArray"
						:id="m.id"
						:key="m.id"
						v-html="m.html"></li>
				</footer-menu>
			</div>
			<hr>
			<div class="footer__end" v-html="blurb"></div>
		</div>
	</footer>
</template>

<script>
const FooterMenu = require( './FooterMenu.vue' );
module.exports = {
	name: 'Footer',
	components: {
		FooterMenu: FooterMenu
	},
	props: [ 'blurb', 'placesId', 'placesItemsArray', 'heading' ]
};
</script>

<style lang="less">
// @import 'AppFooter.vue.less';
</style>
