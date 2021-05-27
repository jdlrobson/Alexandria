<template>
	<article class="alexandria-article">
		<header>
			<div class="alexandria-article__tagline">
				{{ tagline }}
			</div>
			<h1 v-html="htmlPageTitle"></h1>
			<div class="article__subtitle" v-html="subtitle"></div>
			<ul class="alexandria-article__lastmod" v-html="lastmodified"></ul>
			<portlet :id="menuId"
				:class="menuClass"
				:html="menuHtmlItems"></portlet>
		</header>
		<div role="banner" v-html="banner"></div>
		<main v-html="html"></main>
	</article>
</template>

<script>
module.exports = {
	name: 'Article',
	components: {
		Portlet: require( './Portlet.vue' )
	},
	props: {
		lastmodified: String,
		banner: String,
		tagline: String,
		htmlPageTitle: String,
		subtitle: String,
		html: String,
		menuId: String,
		menuClass: String,
		menuHtmlItems: String
	}
};
</script>

<style lang="less">
@import 'AppArticle.vue.less';
</style>
