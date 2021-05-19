<template>
	<article class="alexandria-article">
		<header>
			<div class="alexandria-article__tagline">
				{{ tagline }}
			</div>
			<h1 v-html="title"></h1>
			<div class="article__subtitle" v-html="subtitle"></div>
			<portlet :id="menu.id"
				:class="menu.class"
				:html="menu.htmlItems"></portlet>
		</header>
		<div v-html="html"></div>
	</article>
</template>

<script>
module.exports = {
	name: 'Article',
	components: {
		Portlet: require( './Portlet.vue' )
	},
	props: {
		tagline: String,
		title: String,
		subtitle: String,
		html: String,
		menu: Object
	}
};
</script>

<style lang="less">
.alexandria-article {
	box-sizing: border-box;
	max-width: 960px;
	width: 100%;
	margin: 20px auto 0;
	padding: 20px;
	background-color: #fff;
	border-radius: 5px;
	border: 1px solid #babbae;
	z-index: 0;
	position: relative;

	&__tagline {
		font-style: oblique;
		color: #666;
		width: 100%;
	}

	h1 {
		font-family: Georgia,"Palatino Linotype","Book Antiqua",Palatino,serif;
		margin: 10px 0 0;
		color: #333;
		font-size: 2em;
	}

	.printfooter {
		display: none;
	}

	code,
	pre {
		max-height: 200px;
		overflow: scroll;
		font: 11px/15px "Menlo","Consolas","Monaco",monospace;
		background: rgba(71,87,120,0.08);
		display: block;
		color: #000;
		border-radius: 3px;
		white-space: pre-wrap;
		border-color: rgb(0, 0, 0);
		padding: 12px;
	}
}

@import 'editsection.less';

.mw-body-content {
	font-size: 13px;

	h1,
	h2,
	h3,
	h4,
	h5 {
		color: #666;
		font-weight: 600;
		margin-bottom: 30px;
	}

	h2 {
		clear: both;
		font-size: 1.375em;
	}

	h3 {
		font-size: 14px;
		margin: 0;
	}

	h4 {
		font-size: 0.8125em;
	}

	h5 {
		font-size: 13px;
		text-transform: uppercase;
	}
}
@import 'wiki-template-styles.less';

</style>
