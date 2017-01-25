<?php

/*
Plugin Name: Mogiv <iframe>
Plugin URI:  https://www.mogiv.com
Description: Embed your organization&#39;s Mogiv &#60;iframe&#62;
Version:     0.1
Author:      Mogiv
Author URI:  https://www.mogiv.com
License:     GPLv2 or later
*/

defined( 'ABSPATH' ) or die('No script kiddies please!');

function mogiv_scripts() {
	wp_enqueue_script('iframe-resizer', 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.5/iframeResizer.min.js', array(), null);
	wp_enqueue_script('mogiv-embed', 'https://app.mogiv.com/js/v2/iframe/embed-js.js', array('iframe-resizer'), null);
	wp_enqueue_script('mogiv-frame', plugins_url('/mogiv-frame.js', __FILE__ ), array('mogiv-embed'), null, true);
}

function mogiv_func($opts) {
	return '
		<div id="mogiv-embed"></div>
    <script> window.mogiv_options = '.json_encode($opts).'; </script>
  ';
}

add_action( 'wp_enqueue_scripts', 'mogiv_scripts' );

add_shortcode('mogiv','mogiv_func');

?>
