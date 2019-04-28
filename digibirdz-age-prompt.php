<?php
/**
 * The plugin bootstrap file
 *
 * @link              https://digibirdz.com
 * @since             1.0.0
 * @package           Digibirdz_Age_Prompt
 *
 * @wordpress-plugin
 * Plugin Name:       Digibirdz age prompt
 * Plugin URI:        https://digibirdz.com
 * Description:       Check a visitors age before allowing them to view your website.
 * Version:           1.0.0
 * Author:            Digibirdz
 * Author URI:        https://digibirdz.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       digibirdz-age-prompt
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-digibirdz-age-prompt-activator.php
 */
function activate_Digibirdz_Age_Prompt() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-digibirdz-age-prompt-activator.php';
	Digibirdz_Age_Prompt_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-digibirdz-age-prompt-deactivator.php
 */
function deactivate_Digibirdz_Age_Prompt() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-digibirdz-age-prompt-deactivator.php';
	Digibirdz_Age_Prompt_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_Digibirdz_Age_Prompt' );
register_deactivation_hook( __FILE__, 'deactivate_Digibirdz_Age_Prompt' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-digibirdz-age-prompt.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_Digibirdz_Age_Prompt() {

	$plugin = new Digibirdz_Age_Prompt();
	$plugin->run();

}
run_Digibirdz_Age_Prompt();
