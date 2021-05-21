<template>
	<!-- this is a dummy template for rendering something to noscript users.
	It should not be used in JS view. -->
	<form class="alex-fallback-search" :action="dataSearchBox.formAction">
		<div v-html="dataSearchBox.htmlInput"></div>
		<div v-html="dataSearchBox.htmlButtonSearchFallback"></div>
		<input type="hidden"
			name="title"
			:value="dataSearchBox.pageTitle">
	</form>
</template>

<script>
throw new Error( 'Do not use in frontend' );
</script>

<style lang="less">
    .client-js .alex-fallback-search {
        display: none;
    }
</style>
