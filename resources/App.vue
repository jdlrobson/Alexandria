<template>
	<div id="ol-app">
		<app-banner :html="htmlSiteNotice"
			:html-notifications="dataPortlets.dataNotifications.htmlItems"></app-banner>
		<app-header
			:logo-width="dataLogos.wordmark.width"
			:logo-height="dataLogos.wordmark.height"
			:logo-src="dataLogos.wordmark.src"
			:tagline="msgTagline"
			:mainpage="linkMainpage"
			:form-action="dataSearchBox.formAction"
			:title="msgSitetitle"
			:placeholder="msgTooltipSearch"
			:button-label="msgSearch"
			:footer-search-text="msgSearchsuggestContaining"
			:html-user-menu="dataPortlets.dataUserMenu.htmlItems"
			:html-sidebar="alexSidebar"
		></app-header>
		<app-article
			:tagline="msgTagline"
			:html="htmlBodyContent"
			:title="htmlTitle"
			:subtitle="htmlSubtitle"
			:menu="dataPortlets.dataViews"
		></app-article>
		<app-footer :blurb="alexFooterIcons"
			:menu="dataFooter.dataPlaces"
			:heading="msgSitetitle"></app-footer>
	</div>
</template>

<script>
const Header = require( './AppHeader.vue' );
const Article = require( './AppArticle.vue' );
const Banner = require( './AppBanner.vue' );
const Footer = require( './AppFooter.vue' );


function mapAllKeysRecursive( json ) {
	const newObj = {};
	Object.keys( json ).forEach( function ( key ) {
		const newKey = getVueKey( key );
		if ( !json[ key ] ) {
			newObj[ newKey ] = undefined;
		} else if ( Array.isArray( json[ key ] ) ) {
			newObj[ newKey ] = json[ key ];
		} else if ( typeof json[ key ] === 'object' ) {
			newObj[ newKey ] = mapAllKeysRecursive( json[ key ] );
		} else {
			newObj[ newKey ] = json[ key ];
		}
	} );
	return newObj;
}

function toCamelCase( str ) {
	return str.replace( /-([a-z])/g, function ( g ) {
		return g[ 1 ].toUpperCase();
	} );
}

function getVueKey( key ) {
	return toCamelCase( key );
}

module.exports = {
	name: 'App',
	props: [ 'initialData' ],
	data: function () {
		return Object.assign( {
			alexFooterIcons: undefined,
			alexSidebar: undefined,
			domain: window.location.host,
			msgTagline: undefined,
			linkMainpage: undefined,
			msgSitetitle: undefined,
			msgTooltipSearch: undefined,
			msgSearch: undefined,
			msgSearchsuggestContaining: undefined,
			dataSearchBox: {
				formAction: undefined
			},
			dataLogos: {
				wordmark: {
					src: undefined,
					width: undefined,
					height: undefined
				}
			},
			dataFooter: {
				dataPlaces: {
					items: []
				}
			},
			dataPortlets: {
				dataViews: {},
				dataNotifications: {
					htmlItems: ''
				},
				dataUserMenu: {
					htmlItems: ''
				}
			},
			dataPortletsSidebar: {
				dataPortletsFirst: {
					htmlItems: ''
				},
				portletsRest: []
			},

			// Banner
			htmlSiteNotice: '',

			// Article
			htmlTitle: '',
			htmlSubtitle: '',
			htmlBodyContent: ''
		}, mapAllKeysRecursive( this.initialData ) );
	},
	components: {
		AppHeader: Header,
		AppArticle: Article,
		AppBanner: Banner,
		AppFooter: Footer
	},
	methods: {
		renderArticle: function ( title ) {

			fetch(
				mw.config.get( 'wgArticlePath' ).replace( '$1', title + '?useskin=alexandria&useformat=json' )
			).then( function ( resp ) {
				return resp.json();
			}, function ( resp ) {
				return resp.json();
			} ).then( function ( json ) {
				json = mapAllKeysRecursive( json );

				console.log(json);
				Object.keys( json ).forEach( function ( key ) {
					const newKey = getVueKey( key );
					this[ newKey ] = json[ key ];
				}.bind( this ) );
			}.bind( this ) );
		}
	},
	/**
	 * Only one checkbox menu can be checked at a time.
	 */
	mounted: function () {
		const header = this.$el.querySelector( 'header' );
		const article = this.$el.querySelector('article');

		document.body.addEventListener( 'click', function ( ev ) {
			header.querySelectorAll( 'input[type=checkbox]' ).forEach( function ( node ) {
				const forAttr = ev.target.getAttribute( 'for' );
				if ( node !== ev.target && forAttr !== node.id ) {
					node.checked = false;
				}
			} );
		} );

		// Redirect links
		article.addEventListener( 'click', function ( ev ) {
			var title;
			if ( ev.target.tagName === 'A' ) {
				ev.preventDefault();
				title = ev.target.getAttribute('title');
				if (title) {
					// Fetch the new article;
					this.renderArticle(title);
				}
			}
		}.bind( this ) );
	}
};
</script>

<style lang="less">
* {
	box-sizing: border-box;
}

body {
	font-size: 100%;
	line-height: normal;
	background-color: #e1dcc5;
	font-family: 'Lucida Grande', 'Verdana', 'Geneva', 'Helvetica', 'Arial', sans-serif;
}

@import 'skin-system-hacks.less';
</style>
