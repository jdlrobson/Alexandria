/* scripts can go here */
var Vue = require( 'vue' );
var Header = require( './Header.vue' );
var Article = require( './Article.vue' );
var Banner = require( './Banner.vue' );
var Footer = require( './Footer.vue' );

function vueify( node, Component, mounted, props ) {
	return new Vue( {
		el: node,
		/**
		 *
		 * @param {Function} createElement
		 * @return {Vue.VNode}
		 */
		render: function ( createElement ) {
			console.log(Object.assign( {}, node.dataset ));
			return createElement( Component, {
				props: Object.assign( {}, node.dataset, props )
			} );
		},
		mounted: mounted
	} );
}

$( function () {
	vueify(
		document.querySelector( 'header' ),
		Header,
		function () {
			var header = this.$el;
			document.body.addEventListener( 'click', function ( ev ) {
				header.querySelectorAll( 'input[type=checkbox]' ).forEach( function ( node ) {
					var forAttr = ev.target.getAttribute( 'for' );
					if ( node !== ev.target && forAttr !== node.id ) {
						node.checked = false;
					}
				} );
			} );
		},
		{
			domain: window.location.host
		}
	);

	vueify(
		document.querySelector( '.banner' ),
		Banner
	);

	vueify(
		document.querySelector( 'footer' ),
		Footer
	);

	var appvm;
	var data = {};

	function bootArticle(node) {
		return vueify(
			node,
			Article
		);
	}

	function getVueKey(key) {
		key = key.replace(/^html-/, '');
		switch(key) {
			case 'body-content':
				return 'html';
			default:
				return key;
		}
	}
	function appLinks(node) {
		node.addEventListener( 'click', function ( ev ) {
			var title;
			if ( ev.target.tagName === 'A' ) {
				ev.preventDefault();
				title = ev.target.getAttribute('title');
				if (title) {
					// Fetch the new article;
					fetch(
						mw.config.get('wgArticlePath').replace('$1', encodeURIComponent(title) + '?useskin=openlibrary&useformat=json')
					).then(function ( resp ) {
						return resp.json();
					}).then(function( json ) {
				

						if (!appvm) {
							appvm = new Vue( {
								el: node,
								data,
								/**
								 *
								 * @param {Function} createElement
								 * @return {Vue.VNode}
								 */
								render: function ( createElement ) {
									return createElement( Article )
								}
							} );
						}

						Vue.nextTick( function () {
							Object.keys(json).forEach(function (key) {
								if ( [ 'html-body-content', 'html-title', 'html-subtitle' ].includes( key ) ) {
									data[getVueKey(key)] = json[key];
								}
							});
						} );
					})
				}
			}
		} );
	}

	// if browser supports fetch, set up.
	if (typeof fetch !== 'undefined' ) {
		var article = document.querySelector( 'article' );
		//appLinks( article );
	}

} );
