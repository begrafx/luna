<?php
/**
 * Luna Theme v0.1.7
 */

/**
 * @file
 * Theme settings for Luna (Halfmoon CSS Drupal 11 theme).
 */

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function luna_form_system_theme_settings_alter(&$form, \Drupal\Core\Form\FormStateInterface $form_state) {

  $form['luna_settings'] = [
    '#type' => 'details',
    '#title' => t('Luna Theme Settings'),
    '#open' => TRUE,
  ];

  // Halfmoon Core Theme.
  $form['luna_settings']['halfmoon_core'] = [
    '#type' => 'select',
    '#title' => t('Halfmoon Core Theme'),
    '#description' => t('Choose which Halfmoon core theme to apply. Each has a distinct design sensibility.'),
    '#options' => [
      'default' => t('Default – Classic and neutral'),
      'modern'  => t('Modern – Contemporary with refined dark mode'),
      'elegant' => t('Elegant – Refined and sophisticated'),
    ],
    '#default_value' => theme_get_setting('halfmoon_core') ?? 'modern',
  ];

  // Default Color Mode.
  $form['luna_settings']['color_mode'] = [
    '#type' => 'select',
    '#title' => t('Default Color Mode'),
    '#description' => t('Set the default color mode. Users can override this if the toggle is enabled.'),
    '#options' => [
      'light' => t('Light'),
      'dark'  => t('Dark'),
    ],
    '#default_value' => theme_get_setting('color_mode') ?? 'light',
  ];

  // Dark mode toggle.
  $form['luna_settings']['dark_mode_toggle'] = [
    '#type' => 'checkbox',
    '#title' => t('Show dark/light mode toggle in navbar'),
    '#default_value' => theme_get_setting('dark_mode_toggle') ?? TRUE,
  ];

  // Layout width.
  $form['luna_settings']['layout'] = [
    '#type' => 'select',
    '#title' => t('Layout Width'),
    '#options' => [
      'fluid'  => t('Full width (fluid container)'),
      'wide'   => t('Wide (container-xl)'),
      'normal' => t('Normal (container-lg)'),
      'narrow' => t('Narrow (container-md)'),
    ],
    '#default_value' => theme_get_setting('layout') ?? 'wide',
  ];

  // Sidebar position.
  $form['luna_settings']['sidebar_position'] = [
    '#type' => 'select',
    '#title' => t('Sidebar Position'),
    '#options' => [
      'right' => t('Right'),
      'left'  => t('Left'),
    ],
    '#default_value' => theme_get_setting('sidebar_position') ?? 'right',
  ];

  // Hero section settings.
  $form['luna_hero'] = [
    '#type' => 'details',
    '#title' => t('Hero Section'),
    '#open' => TRUE,
  ];

  $form['luna_hero']['show_hero'] = [
    '#type' => 'checkbox',
    '#title' => t('Show hero section on front page'),
    '#default_value' => theme_get_setting('show_hero') ?? TRUE,
  ];

  $form['luna_hero']['hero_heading'] = [
    '#type' => 'textfield',
    '#title' => t('Hero Heading'),
    '#default_value' => theme_get_setting('hero_heading') ?? 'Welcome to Luna',
  ];

  $form['luna_hero']['hero_subheading'] = [
    '#type' => 'textarea',
    '#title' => t('Hero Subheading'),
    '#rows' => 3,
    '#default_value' => theme_get_setting('hero_subheading') ?? 'A beautiful Drupal 11 theme powered by Halfmoon CSS.',
  ];

  $form['luna_hero']['hero_cta_text'] = [
    '#type' => 'textfield',
    '#title' => t('Hero CTA Button Text'),
    '#default_value' => theme_get_setting('hero_cta_text') ?? 'Get Started',
  ];

  $form['luna_hero']['hero_cta_url'] = [
    '#type' => 'textfield',
    '#title' => t('Hero CTA Button URL'),
    '#default_value' => theme_get_setting('hero_cta_url') ?? '/node/add',
  ];

  $form['luna_hero']['hero_style'] = [
    '#type' => 'select',
    '#title' => t('Hero Style'),
    '#options' => [
      'gradient' => t('Gradient (Luna default)'),
      'dark'     => t('Dark solid'),
      'light'    => t('Light solid'),
      'image'    => t('Background image (set image in Hero region)'),
    ],
    '#default_value' => theme_get_setting('hero_style') ?? 'gradient',
  ];

  // Footer settings.
  $form['luna_footer'] = [
    '#type' => 'details',
    '#title' => t('Footer'),
    '#open' => FALSE,
  ];

  $form['luna_footer']['footer_text'] = [
    '#type' => 'textfield',
    '#title' => t('Footer copyright text'),
    '#default_value' => theme_get_setting('footer_text') ?? '© ' . date('Y') . ' My Site. Built with Luna & Halfmoon.',
  ];
}
