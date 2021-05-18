/* scripts can go here */
var Vue = mw.loader.require( 'vue' );

new Vue( {
	el: '#app',
	/**
	 *
	 * @param {Function} createElement
	 * @return {Vue.VNode}
	 */
	render: function ( createElement ) {
		return createElement( App, {
			props: Object.assign( {
				autofocusInput: search === document.activeElement,
				action: searchForm.getAttribute( 'action' ),
				searchAccessKey: search.getAttribute( 'accessKey' ),
				searchTitle: search.getAttribute( 'title' ),
				searchPlaceholder: search.getAttribute( 'placeholder' ),
				searchQuery: search.value
			},
			// Pass additional config from server.
			config
		} );
	}
} );
