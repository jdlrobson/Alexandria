<template>
	<div id="ol-app">
		<app-banner
			:html-notifications="dataPortlets.dataNotifications.htmlItems"></app-banner>
		<app-header
			:logo-width="alexDataWordmark.width"
			:logo-height="alexDataWordmark.height"
			:logo-src="alexDataWordmark.src"
			:tagline="msgTagline"
			:mainpage="linkMainpage"
			:form-action="dataSearchBox.formAction"
			:sitetitle="msgSitetitle"
			:placeholder="msgTooltipSearch"
			:button-label="msgSearch"
			:footer-search-text="msgSearchsuggestContaining"
			:html-user-menu="dataPortlets.dataUserMenu.htmlItems"
			:html-sidebar="alexSidebar"
		></app-header>
		<app-article
			:class="appClass"
			:banner="htmlSiteNotice"
			:lastmodified="alexLastmod"
			:tagline="msgTagline"
			:html="htmlBodyContent"
			:html-page-title="htmlTitle"
			:subtitle="htmlSubtitle"
			:menu-id="dataPortlets.dataViews.id"
			:menu-class="dataPortlets.dataViews.class"
			:menu-html-items="dataPortlets.dataViews.htmlItems"
		></app-article>
		<app-footer :blurb="alexFooterIcons"
			:places-items-array="dataFooter.dataPlaces.arrayItems"
			:places-id="dataFooter.dataPlaces.id"
			:heading="msgSitetitle"></app-footer>
	</div>
</template>

<script>
const Header = require( './AppHeader.vue' );
const Article = require( './AppArticle.vue' );
const Banner = require( './AppBanner.vue' );
const Footer = require( './AppFooter.vue' );

function toCamelCase( str ) {
	return str.replace( /-([a-z])/g, function ( g ) {
		return g[ 1 ].toUpperCase();
	} );
}

function mapAllKeysRecursive( json ) {
	const newObj = {};
	Object.keys( json ).forEach( function ( key ) {
		const newKey = toCamelCase( key );
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

module.exports = {
	name: 'App',
	props: [ 'initialData' ],
	data() {
		return Object.assign( {
			appClass: '',
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
			alexDataWordmark: {
				src: undefined,
				width: undefined,
				height: undefined
			},
			dataFooter: {
				dataPlaces: {
					// varies on article
					items: []
				}
			},
			dataPortlets: {
				// vary on each article
				dataViews: {},
				// The following data is static, should be same across articles
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

			// Vary on article
			alexLastMod: '',
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
			this.appClass = 'app__loading';
			const portlets = this.dataPortlets;

			return fetch(
				mw.config.get( 'wgAlexandriaSearchApi' ).replace( '$1', title ),
				{
					redirect: 'follow'
				}
			).then( ( resp ) => {
				if ( resp.headers.get( 'Content-Type' ).indexOf( 'text/html' ) > -1 ) {
					return resp.text().then(
						( html ) => {
							const startIndex = html.indexOf( '<body' );
							const endIndex = html.indexOf( '</body' );
							const bodyContentHtml = html.slice( startIndex, endIndex ).replace(
								/^<body[^>]*>/, ''
							);
							return Promise.resolve( {
								'html-title': decodeURIComponent( title ),
								'alex-last-mod': '',
								'html-subtitle': '',
								'html-body-content': bodyContentHtml,
								'data-portlets': Object.assign( {}, portlets, {
									'data-views': {}
								} ),
								'data-footer': {
									'data-places': {}
								}
							} );
						}
					);
				} else {
					return resp.json();
				}
			} ).then( ( json ) => {
				json = mapAllKeysRecursive( json );
				this.appClass = '';
				Object.keys( json ).forEach( ( key ) => {
					const newKey = toCamelCase( key );
					this[ newKey ] = json[ key ];
				} );
			} );
		}
	},
	/**
	 * Only one checkbox menu can be checked at a time.
	 */
	mounted: function () {
		const header = this.$el.querySelector( 'header' );
		const article = this.$el.querySelector( 'article' );

		document.body.addEventListener( 'click', ( ev ) => {
			header.querySelectorAll( 'input[type=checkbox]' ).forEach( ( node ) => {
				const forAttr = ev.target.getAttribute( 'for' );
				if ( node !== ev.target && forAttr !== node.id ) {
					node.checked = false;
				}
			} );
		} );

		const getClosestLink = ( node ) => {
			if ( node.tagName === 'BODY' ) {
				return false;
			} else if ( node.tagName === 'A' ) {
				return node;
			} else {
				return getClosestLink( node.parentNode );
			}
		};

		// Redirect links
		const clickHandler = ( ev ) => {
			const closestLink = getClosestLink( ev.target );
			let title;
			let href;
			if ( closestLink ) {
				ev.preventDefault();
				href = closestLink.getAttribute( 'href' );
				if ( href.indexOf( 'search=' ) > -1 ) {
					const m = href.match( /search=([^&]*)/ );
					if ( m ) {
						title = m[ 1 ];
					}
				} else {
					title = closestLink.getAttribute( 'title' );
				}

				// Article fetching via ajax only supported for article pages and pages without query strings.

				if ( title && title.indexOf( ':' ) === -1 && title.indexOf( '?' ) === -1 ) {
					// Fetch the new article;
					ev.preventDefault();
					const scrollY = window.scrollY;
					const path = window.location.pathname;
					// update scroll position of current page
					history.replaceState( {
						path,
						title,
						scrollY
					}, document.title, path );

					const newPath = mw.config.get( 'wgArticlePath' ).replace( '$1', title );
					// New page, jump to top.
					window.scrollTo( {
						top: 0,
						left: 0,
						behavior: 'smooth'
					} );
					this.renderArticle( title ).then( () => {
						history.pushState( {
							path: newPath,
							title,
							scrollY: 0
						}, title, newPath );
					} );
				}
			}
		};

		// set up lazy loading if available
		if ( mw.config.get( 'wgAlexandriaSearchApi' ) ) {
			article.addEventListener( 'click', clickHandler );
			header.querySelector( '.search-component' ).addEventListener( 'click', clickHandler );
			window.addEventListener( 'popstate', ( ev ) => {
				const state = ev.state;

				this.renderArticle( state.title ).then( () => {
					this.$nextTick( () => {
						window.scrollTo( {
							top: state.scrollY,
							left: 0
						} );
					} );
				} );

			} );
		}
	}
};
</script>

<style lang="less">
@import 'App.vue.less';
</style>
