<?php
/**
 * Plugin Name: HM External Links
 * Description: Automatically detects and handles external links sitewide — opens them in a new tab and optionally displays an icon.
 * Version:     __VERSION__
 * Requires at least: 6.0
 * Tested up to:      6.7
 * Requires PHP:      7.4
 * Author:      Human Made
 * License:     GPL-2.0-or-later
 * Text Domain: hm-external-links
 */

namespace HM\ExternalLinks;

defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_assets' );

function enqueue_assets(): void {
	$js_path = __DIR__ . '/build/index.js';
	wp_enqueue_script(
		'hm-external-links',
		plugin_dir_url( __FILE__ ) . 'build/index.js',
		[],
		is_readable( $js_path ) ? filemtime( $js_path ) : null,
		[ 'strategy' => 'defer' ]
	);

	if ( ! apply_filters( 'hm_external_links_show_icon', true ) ) {
		return;
	}

	$css_path = __DIR__ . '/assets/style.css';
	wp_enqueue_style(
		'hm-external-links-icon',
		plugin_dir_url( __FILE__ ) . 'assets/style.css',
		[],
		is_readable( $css_path ) ? filemtime( $css_path ) : null,
	);

	wp_add_inline_style(
		'hm-external-links-icon',
		':root{--hm-external-icon-url:url("' . esc_url( plugin_dir_url( __FILE__ ) . 'assets/icons/external.svg' ) . '")}'
	);
}
