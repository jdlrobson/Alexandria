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
		<div v-html="banner"></div>
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

	&__lastmod {
		max-width: 190px;
		white-space: wrap;
		text-align: right;
		margin-top: 3px 0 0;
		font-size: 11px;
		font-weight: normal;
		color: #615132;
		list-style: none;
		padding: 0;
		display: inline;

		li {
			margin-left: 8px;
			display: inline;
		}
	}

	&__tagline {
		font-style: oblique;
		color: #666;
		width: 100%;
	}

	h1 {
		font-family: 'Georgia', 'Palatino Linotype', 'Book Antiqua', 'Palatino', serif;
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
		font: 11px/15px 'Menlo', 'Consolas', 'Monaco', monospace;
		background: rgba( 71, 87, 120, 0.08 );
		display: block;
		color: #000;
		border-radius: 3px;
		white-space: pre-wrap;
		border-color: #000;
		padding: 12px;
	}

	header {
		display: flex;
		flex-flow: row wrap;
		align-items: center;

		h1 {
			flex-grow: 1;
		}
	}

	a {
		color: #02598b;
	}

	a:hover,
	a:visited {
		color: #003266;
	}
}

.mw-editsection-divider,
.mw-editsection-bracket {
	display: none;
}

.mw-editsection {
	float: right;
}

#ca-ve-edit a,
#ca-edit a,
.mw-editsection a {
	text-decoration: none;
	color: #666;
	border: 1px solid #999;
	border-radius: 5px;
	background: #fff;
	padding: 10px;
	display: inline-block;
	font-size: 16px;
	line-height: normal;
	margin-left: 8px;
}

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

// Wikitemplate styles
.hatnote {
	border-top: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
	margin: 20px 0 10px;
	padding: 17px 0;
}

.article__subtitle {
	font-style: oblique;
	color: #666;
	margin: 7px 2px 20px;
}
</style>
