<template>
	<div class="footer__menu">
		<h2>{{ heading }}</h2>
		<ul><slot></slot></ul>
	</div>
</template>

<script>
module.exports = {
	name: 'FooterMenu',
	props: [ 'heading', 'html' ]
};
</script>

<style lang="less">
// @import 'FooterMenu.vue.less';
</style>
