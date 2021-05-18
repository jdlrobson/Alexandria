/* scripts can go here */
var Vue = require( 'vue' );
var Header = require( './Header.vue' );
var Footer = require( './Footer.vue' );

function vueify( node, Component, mounted ) {
	new Vue( {
		el: node,
		/**
		 *
		 * @param {Function} createElement
		 * @return {Vue.VNode}
		 */
		render: function ( createElement ) {
			return createElement( Component, {
				props: Object.assign( {}, node.dataset )
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
		}
	);
	
	vueify(
		document.querySelector( 'footer' ),
		Footer
	);
} );
