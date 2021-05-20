$( function () {
	/* scripts can go here */
	const Vue = require( 'vue' );
	const App = require( './App.vue' );
	const appEl = document.getElementById( 'ol-app' );

	// Only enhance to Vue if browser support is good enough
	if ( typeof fetch !== 'undefined' && typeof Object.assign !== 'undefined' ) {
		// eslint-disable-next-line no-new
		new Vue( {
			el: appEl,
			/**
			 *
			 * @param {Function} createElement
			 * @return {Vue.VNode}
			 */
			render: function ( createElement ) {
				return createElement( App, {
					props: {
						initialData: JSON.parse( appEl.dataset.json )
					}
				} );
			}
		} );
	}
} );
