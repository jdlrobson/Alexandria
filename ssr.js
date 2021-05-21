/* eslint-disable no-implicit-globals, no-restricted-syntax */
/* global __dirname */

const fs = require( 'fs' );
const domino = require( 'domino' );

function hyphenCaseToCamelCase( str ) {
	return str.replace( /[-_]([a-z])/g, function ( m ) {
		return m[ 1 ].toUpperCase();
	} );
}

function hyphenCaseToPascalCase( str ) {
	const r = hyphenCaseToCamelCase( str );
	return r[ 0 ].toUpperCase() + r.slice( 1 );
}

function outerHTML( node ) {
	const window = domino.createWindow( '' );
	window.document.body.appendChild( node );
	return window.document.body.innerHTML;
}

function camelCaseToHyphenCase( str ) {
	return str.replace( /([a-z][A-Z])/g, function ( match ) {
		return match[ 0 ] + '-' + match[ 1 ].toLowerCase();
	} );
}

let lesscss = '';

/**
 * Looks at all the child nodes of an element that are text nodes,
 * and maps the template variable name to the hyphen case equivalent.
 *
 * @param {Node} node
 * @param props
 */
function textNodesToMustache( node, props ) {
	Array.from( node.childNodes ).filter( function ( k ) {
		return k.nodeType === 3;
	} ).forEach( ( text ) => {
		text.textContent = text.textContent.replace( /{{ *([^}{]*) *}}/gi, function ( match ) {
			const value = match.replace( /[{}]/g, '' ).trim();
			if ( props[ value ] ) {
				const newVal = props[ value ];
				const hyphenatedValue = camelCaseToHyphenCase( newVal.value );
				return newVal.compute ? `{{${hyphenatedValue}}}` : hyphenatedValue;
			} else {
				// no change.
				return match;
			}
		} );
	} );
}

function makeMustacheForLoopNode( node, props, statement ) {
	// Regex passes `( m ) in iterable` or `m in iterable` to get iterable
	const m = statement.match( /\(([^)]*)\) *in *([^ ]*)|([^ ]*) in ([^ ]*)/ );
	if ( m ) {
		const item = m[ 1 ].trim();
		let iterable = m[ 2 ].trim().replace( `${item}.`, '' );
		if ( iterable.indexOf( '.' ) > -1 ) {
			throw new Error(
				`Vue to Mustache does not support for loops with nested Objects. Drop the dot in: ${iterable}`
			);
		} else {
			if ( props[ iterable ] ) {
				iterable = props[ iterable ].value;
			}

			iterable = camelCaseToHyphenCase( iterable );
			node.parentNode.insertBefore(
				node.ownerDocument.createTextNode( `{{#${iterable}}}` ),
				node
			);
			// TODO: rewrite children attributes...
			node.getAttributeNames().forEach( ( attr ) => {
				const val = node.getAttribute( attr );
				// drop the iterable.
				node.setAttribute( attr, val.replace( `${item}.`, '' ) );
			} );
			node.parentNode.insertBefore(
				node.ownerDocument.createTextNode( `{{/${iterable}}}` ),
				node.nextSibling
			);
		}

	} else {
		throw new Error(
			`Could not parse v-for statement: ${statement}`
		);
	}
}

function isValidAttribute( attr ) {
	return [
		'accept',
		'accept-charset',
		'accesskey',
		'action',
		'align',
		'allow',
		'alt',
		'async',
		'autocapitalize',
		'autocomplete',
		'autofocus',
		'autoplay',
		'background',
		'bgcolor',
		'border',
		'buffered',
		'capture',
		'challenge',
		'charset',
		'checked',
		'cite',
		'class',
		'code',
		'codebase',
		'color',
		'cols',
		'colspan',
		'content',
		'contenteditable',
		'contextmenu',
		'controls',
		'coords',
		'crossorigin',
		'data',
		'data-*',
		'datetime',
		'decoding',
		'default',
		'defer',
		'dir',
		'dirname',
		'disabled',
		'download',
		'draggable',
		'enctype',
		'for',
		'form',
		'formaction',
		'formenctype',
		'formmethod',
		'formnovalidate',
		'formtarget',
		'headers',
		'height',
		'hidden',
		'high',
		'href',
		'hreflang',
		'http-equiv',
		'icon',
		'id',
		'integrity',
		'inputmode',
		'ismap',
		'itemprop',
		'keytype',
		'kind',
		'label',
		'lang',
		'list',
		'loop',
		'low',
		'max',
		'maxlength',
		'minlength',
		'media',
		'method',
		'min',
		'multiple',
		'muted',
		'name',
		'novalidate',
		'open',
		'optimum',
		'pattern',
		'ping',
		'placeholder',
		'poster',
		'preload',
		'radiogroup',
		'readonly',
		'referrerpolicy',
		'rel',
		'required',
		'reversed',
		'rows',
		'rowspan',
		'sandbox',
		'scope',
		'selected',
		'shape',
		'size',
		'sizes',
		'slot',
		'span',
		'spellcheck',
		'src',
		'srcdoc',
		'srclang',
		'srcset',
		'start',
		'step',
		'style',
		'tabindex',
		'target',
		'title',
		'translate',
		'type',
		'usemap',
		'value',
		'width',
		'wrap'
	].includes( attr );
}

function vueToNode( name, props = {} ) {
	let srcCode;
	try {
		srcCode = fs.readFileSync( `${__dirname}/resources/${name}.vue` ).toString();
	} catch ( e ) {
		return false;
	}
	let window = domino.createWindow( srcCode );
	let document = window.document;
	const template = document.querySelector( 'template' );

	const style = document.querySelector( 'style' );
	if ( style ) {
		lesscss += `${style.innerHTML}
`;
	}

	// Now we have the template, let's parse that...
	window = domino.createWindow( template.innerHTML );
	document = window.document;
	let activeIfClause;
	document.body.querySelectorAll( '*' ).forEach( ( node ) => {
		const childProps = {};
		const attributes = Array.from( node.getAttributeNames() );
		textNodesToMustache( node, props );

		attributes.forEach( ( attrKey ) => {
			let value = node.getAttribute( attrKey );
			let mustCompute = false;
			node.removeAttribute( attrKey );

			// If computed, map to escaped value
			if ( attrKey.indexOf( ':' ) === 0 ) {
				attrKey = attrKey.slice( 1 );
				mustCompute = true;
			}

			// pass down parent value
			const p = props[ value ];
			if ( p ) {
				mustCompute = p.compute;
				value = p.value;
			}

			const isValid = isValidAttribute( attrKey );

			// add the new one
			switch ( attrKey ) {
				case 'debug':
					throw new Error( 'debug mode' );
				case 'v-for':
					makeMustacheForLoopNode( node, props, value );
					break;
				case 'v-if':
					activeIfClause = camelCaseToHyphenCase( value );
					node.parentNode.insertBefore(
						document.createTextNode( `{{#${activeIfClause}}}` ),
						node
					);
					node.parentNode.insertBefore(
						document.createTextNode( `{{/${activeIfClause}}}` ),
						node.nextSibling
					);
					break;
				case 'v-else':
					node.parentNode.insertBefore(
						document.createTextNode( `{{^${activeIfClause}}}` ),
						node
					);
					node.parentNode.insertBefore(
						document.createTextNode( `{{/${activeIfClause}}}` ),
						node.nextSibling
					);
					// reset active if clause
					activeIfClause = false;
					break;
				case 'v-html':
					node.textContent = `{{{${camelCaseToHyphenCase( value )}}}}`;
					break;
				default:
					if ( !isValid ) {
						childProps[ hyphenCaseToCamelCase( attrKey ) ] = {
							value: value,
							compute: mustCompute
						};
					}
					break;
			}
			if ( isValid ) {
				if ( mustCompute ) {
					node.setAttribute( attrKey, `{{${camelCaseToHyphenCase( value )}}}` );
				} else {
					node.setAttribute( attrKey, value );
				}
			}
		} );

		const componentName = hyphenCaseToPascalCase( node.tagName.toLowerCase() );
		const c = vueToNode( componentName, Object.assign( {}, props, childProps ) );
		// Replace the old child.
		if ( c ) {
			const slot = c.querySelector( 'slot' );
			if ( slot ) {
				node.childNodes.forEach( ( childNode ) => {
					if ( childNode.tagName ) {
						slot.parentNode.appendChild( childNode );
					} else {
						slot.parentNode.appendChild(
							document.createTextNode( childNode.textContent )
						);
					}
				} );
				// delete the slot.
				slot.parentNode.removeChild( slot );
			}
			node.parentNode.replaceChild( c, node );
		}
	} );
	return document.body.firstChild;
}

const root = vueToNode( 'App' );
root.setAttribute( 'data-json', '{{data-json}}' );
const mustache = `
{{!
DO NOT EDIT THIS FILE.
This Mustache file has been dynamically generated by the script ssr.js from
the Vue components in thsi skin.
For problems you will need to edit the associated Vue templates.

To re-generate run "npm install && node ssr.js"
}}
${outerHTML( root )}`;
// console.log(mustache)
fs.writeFileSync( `${__dirname}/resources/dist/skin.mustache`, mustache );
fs.writeFileSync( `${__dirname}/resources/skin.less`, `
/* DO NOT EDIT THIS FILE.
This LESS file has been dynamically generated by the script ssr.js.*/

${lesscss}` );
