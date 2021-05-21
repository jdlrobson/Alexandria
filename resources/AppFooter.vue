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
footer {
	display: flex;
	width: 100%;
	font-size: 0.8em;

	ul {
		padding: 0;
	}

	hr {
		border: 0;
		border-top: 1px solid #babbae;
		margin: 20px 0;
		background: hsla( 48, 33%, 83%, 0.66 );
		height: 1px;
		box-sizing: border-box;
	}
}

.footer__content {
	max-width: 960px;
	margin: 5px auto;
	padding: 20px;
	width: 100%;
}

.footer__menus {
	flex-wrap: wrap;
	min-width: 150px;
	display: flex;
	margin-left: 10px;
	line-height: 1.5em;
}

.footer__end {
	color: #333;
	display: flex;
	width: 100%;
}
</style>
