<?php

require_once 'ajaxid.civix.php';

use CRM_Ajaxid_ExtensionUtil as E;

/**
 * Implements hook_civicrm_config().
 *
 * @link https://docs.civicrm.org/dev/en/latest/hooks/hook_civicrm_config/
 */
function ajaxid_civicrm_config(&$config): void {
  _ajaxid_civix_civicrm_config($config);
}

/**
 * Implements hook_civicrm_install().
 *
 * @link https://docs.civicrm.org/dev/en/latest/hooks/hook_civicrm_install
 */
function ajaxid_civicrm_install(): void {
  _ajaxid_civix_civicrm_install();
}

/**
 * Implements hook_civicrm_enable().
 *
 * @link https://docs.civicrm.org/dev/en/latest/hooks/hook_civicrm_enable
 */
function ajaxid_civicrm_enable(): void {
  _ajaxid_civix_civicrm_enable();
}

/**
 * Implements hook_civicrm_pageRun().
 */
function ajaxid_civicrm_pageRun($page): void {
  _ajaxid_add_script();
}

/**
 * Implements hook_civicrm_buildForm().
 */
function ajaxid_civicrm_buildForm($formName, &$form): void {
  _ajaxid_add_script();
}

function _ajaxid_add_script() {
  CRM_Core_Resources::singleton()->addScriptFile(E::LONG_NAME, 'js/ajaxid.js');  
}
