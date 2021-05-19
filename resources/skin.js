$( function () {
	/* scripts can go here */
	const Vue = require( 'vue' );
	const App = require( './App.vue' );

	// Only enhance to Vue if browser support is good enough
	if ( typeof fetch !== 'undefined' && typeof Object.assign !== 'undefined' ) {
		// eslint-disable-next-line no-new
		new Vue( {
			el: document.getElementById( 'ol-app' ),
			/**
			 *
			 * @param {Function} createElement
			 * @return {Vue.VNode}
			 */
			render: function ( createElement ) {
				return createElement( App );
			}
		} );
	}
} );
