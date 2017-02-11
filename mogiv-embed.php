<?php

/*
Plugin Name: Mogiv <iframe>
Plugin URI:  https://www.mogiv.com
Description: Embed your organization&#39;s Mogiv &#60;iframe&#62;
Version:     0.1.0
Author:      Mogiv
Author URI:  https://www.mogiv.com
License:     GPLv2 or later
*/

defined( 'ABSPATH' ) or die('No script kiddies please!');

function mogiv_scripts() {
	wp_enqueue_script('iframe-resizer', plugins_url('/iframe-resizer.js', __FILE__ ), array(), '3.5.5');
	wp_enqueue_script('mogiv-embed', plugins_url('/mogiv-embed.js', __FILE__ ), array('iframe-resizer'), '0.1.0');
	wp_enqueue_script('mogiv-wp', plugins_url('/mogiv-wp.js', __FILE__ ), array('mogiv-embed'), '0.1.0', true);
}

function mogiv_func($opts) {
	$opts['buttonCSS'] = plugins_url('/mogiv-embed.css', __FILE__ );
	return '
		<div id="mogiv-embed"></div>
    <script> window.mogiv_options = '.json_encode($opts).'; </script>
  ';
}

add_action( 'wp_enqueue_scripts', 'mogiv_scripts' );

add_shortcode('mogiv','mogiv_func');

?>
