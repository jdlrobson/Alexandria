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
.alexandria-portlet {
	ul {
		margin: 0;
		padding: 0;
	}

	li {
		display: inline-block;
	}
}
</style>
