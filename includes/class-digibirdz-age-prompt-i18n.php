<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://digibirdz.com
 * @since      1.0.0
 *
 * @package    Digibirdz_Age_Prompt
 * @subpackage Digibirdz_Age_Prompt/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Digibirdz_Age_Prompt
 * @subpackage Digibirdz_Age_Prompt/includes
 * @author     Digibirdz
 */
class Digibirdz_Age_Prompt_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'digibirdz-age-prompt',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
