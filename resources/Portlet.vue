<template>
	<div :id="id" class="alexandria-portlet">
		<ul v-html="html">
		</ul>
	</div>
</template>

<script>
module.exports = {
	name: 'Alexandria',
	props: {
		id: String,
		html: String
	}
};
</script>

<style lang="less">
// import 'Portlet.vue.less';
</style>
