/**
 * Returns true if the given URL points to an external host.
 *
 * Uses getAttribute('href') for semantic guards (relative paths, anchors, etc.)
 * and link.href (browser-resolved absolute URL) for hostname comparison.
 *
 * @param {HTMLAnchorElement} link
 * @return {boolean}
 */
function isExternalUrl( link ) {
	const raw = link.getAttribute( 'href' );
	if ( ! raw ) return false;
	if (
		raw.startsWith( '#' ) ||
		// Exclude relative paths but not protocol-relative URLs (//example.com)
		( raw.startsWith( '/' ) && ! raw.startsWith( '//' ) ) ||
		raw.startsWith( 'mailto:' ) ||
		raw.startsWith( 'tel:' )
	) {
		return false;
	}
	try {
		return new URL( link.href ).hostname !== window.location.hostname; // phpcs:ignore WordPressVIPMinimum.JS.Window.location
	} catch {
		return false;
	}
}

/**
 * @param {HTMLAnchorElement} link
 */
function processLink( link ) {
	if ( ! isExternalUrl( link ) ) {
		return;
	}

	if ( ! link.target ) {
		link.setAttribute( 'target', '_blank' );
	}

	// Preserve existing rel values (e.g. nofollow) and only add what's missing.
	const rel = new Set( link.rel.split( /\s+/ ).filter( Boolean ) );
	rel.add( 'noopener' );
	rel.add( 'noreferrer' );
	link.setAttribute( 'rel', [ ...rel ].join( ' ' ) );

	// Add class to links in header/footer so CSS can render the icon.
	if ( link.closest( 'header, footer, .wp-block-navigation-item' ) ) {
		link.classList.add( 'has-external-link' );
	}
}

document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( 'a[href]' ).forEach( processLink );

	// Handle links added after DOMContentLoaded (e.g. via AJAX or the Interactivity API).
	const observer = new MutationObserver( ( mutations ) => {
		mutations.forEach( ( mutation ) => {
			mutation.addedNodes.forEach( ( node ) => {
				if ( node.nodeType !== Node.ELEMENT_NODE ) return;
				if ( node.matches( 'a[href]' ) ) processLink( node );
				node.querySelectorAll( 'a[href]' ).forEach( processLink );
			} );
		} );
	} );

	observer.observe( document.body, { childList: true, subtree: true } );
} );
