<template>
	<div id="ol-app">
		<app-banner :html="htmlSiteNotice"></app-banner>
		<app-header
			:logo-width="logos.wordmark.width"
			:logo-height="logos.wordmark.height"
			:logo-src="logos.wordmark.src"
			:tagline="msgTagline"
			:mainpage="linkMainpage"
			:form-action="searchBox.formAction"
			:title="msgSitetitle"
			:placeholder="msgTooltipSearch"
			:button-label="msgSearch"
			:footer-search-text="msgSearchsuggestContaining"
			:html-user-menu="computedUserMenu"
			:html-sidebar="computedSidebar"
		></app-header>
		<app-article
			:tagline="msgTagline"
			:html="htmlBodyContent"
			:title="htmlTitle"
			:subtitle="htmlSubtitle"
			:menu="portlets.views"
		></app-article>
		<app-footer :blurb="computedBlurb"
			:menu="footer.places"
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
	key = key.replace( /^data-/, '' );
	key = key.replace( /^array-/, '' );
	return toCamelCase( key );
}

module.exports = {
	name: 'App',
	props: [ 'initialData' ],
	data: function () {
		return Object.assign( {
			domain: window.location.host,
			msgTagline: undefined,
			linkMainpage: undefined,
			msgSitetitle: undefined,
			msgTooltipSearch: undefined,
			msgSearch: undefined,
			msgSearchsuggestContaining: undefined,
			searchBox: {
				formAction: undefined
			},
			logos: {
				wordmark: {
					src: undefined,
					width: undefined,
					height: undefined
				}
			},
			footer: {
				icons: {
					items: []
				},
				places: {
					items: []
				},
				html: ''
			},
			portlets: {
				views: {},
				notifications: {
					htmlItems: ''
				},
				userMenu: {
					htmlItems: ''
				}
			},
			portletsSidebar: {
				portletsFirst: {
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
	computed: {
		computedBlurb: function () {
			return this.footer.icons.items.map( function ( item ) {
				return item.html;
			} ).join( '' );
		},
		computedSidebar: function () {
			const p = this.portletsSidebar;
			return String( p.portletsFirst.htmlItems ) + p.portletsRest.map( function ( r ) {
				return r.htmlItems;
			} );
		},
		computedUserMenu: function () {
			const userMenu = this.portlets.userMenu ? this.portlets.userMenu.htmlItems : '',
				n = this.portlets.notifications;
			if ( n ) {
				return '<li><ul class="' + n.class + '" id="' + n.id + '">' + n.htmlItems + '</ul></li>' + userMenu;
			} else {
				return userMenu;
			}
		}
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
