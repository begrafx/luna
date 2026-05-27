<?php
/**
 * Luna Theme v0.1.8
 */

/**
 * @file
 * Theme settings for Luna (Halfmoon CSS Drupal 11 theme).
 *
 * Hero content is managed via the Hero block content type —
 * NOT via theme settings. Edit hero content at:
 * Structure → Block layout → Custom block library
 */

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function luna_form_system_theme_settings_alter(&$form, \Drupal\Core\Form\FormStateInterface $form_state) {

  $form['luna_settings'] = [
    '#type'  => 'details',
    '#title' => t('Luna Theme Settings'),
    '#open'  => TRUE,
  ];

  $form['luna_settings']['halfmoon_core'] = [
    '#type'          => 'select',
    '#title'         => t('Halfmoon Core Theme'),
    '#description'   => t('Choose which Halfmoon core theme to apply.'),
    '#options'       => [
      'default' => t('Default – Classic and neutral'),
      'modern'  => t('Modern – Contemporary with refined dark mode'),
      'elegant' => t('Elegant – Refined and sophisticated'),
    ],
    '#default_value' => theme_get_setting('halfmoon_core') ?? 'modern',
  ];

  $form['luna_settings']['color_mode'] = [
    '#type'          => 'select',
    '#title'         => t('Default Color Mode'),
    '#description'   => t('Starting mode for first-time visitors. Returning visitors keep their last preference.'),
    '#options'       => [
      'light' => t('Light'),
      'dark'  => t('Dark'),
    ],
    '#default_value' => theme_get_setting('color_mode') ?? 'light',
  ];

  $form['luna_settings']['dark_mode_toggle'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Show dark/light mode toggle in navbar'),
    '#default_value' => theme_get_setting('dark_mode_toggle') ?? TRUE,
  ];

  $form['luna_settings']['layout'] = [
    '#type'          => 'select',
    '#title'         => t('Layout Width'),
    '#options'       => [
      'fluid'  => t('Full width (fluid container)'),
      'wide'   => t('Wide (container-xl)'),
      'normal' => t('Normal (container-lg)'),
      'narrow' => t('Narrow (container-md)'),
    ],
    '#default_value' => theme_get_setting('layout') ?? 'wide',
  ];

  // Hero section — informational only, no fields.
  $form['luna_hero'] = [
    '#type'  => 'details',
    '#title' => t('Hero Section'),
    '#open'  => TRUE,
  ];

  $form['luna_hero']['hero_info'] = [
    '#type'   => 'markup',
    '#markup' => '<div class="messages messages--info">'
      . '<p><strong>' . t('Hero content is managed as a Drupal block.') . '</strong></p>'
      . '<p>' . t('Go to <a href="/admin/content/block">Structure → Custom block library</a> and edit your <strong>Hero</strong> block to change the heading, subheading, button text, button URL, and style.') . '</p>'
      . '</div>',
  ];

  $form['luna_footer'] = [
    '#type'  => 'details',
    '#title' => t('Footer'),
    '#open'  => FALSE,
  ];

  $form['luna_footer']['footer_text'] = [
    '#type'          => 'textfield',
    '#title'         => t('Footer copyright text'),
    '#description'   => t('Leave blank to auto-generate from site name and current year.'),
    '#default_value' => theme_get_setting('footer_text') ?? '',
  ];
}
