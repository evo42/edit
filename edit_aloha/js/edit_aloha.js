/**
 * @file
 * Integrate Aloha Editor with Edit.
 */

(function($, window, undefined) {
var Aloha = window.Aloha || (window.Aloha = {});

// @TODO: this is a currently futile attempt to get AE to use Drupal's jQuery.
// It is futile, because AE's JS is loaded before this one and thus it will
// already be too late.
// Aloha.settings = {
//    jQuery: $,
// };

Drupal.edit.wysiwyg.edit_aloha = {
  init: function() {
    console.log('edit_aloha:initializing');

    Aloha.settings = Drupal.settings.edit.settings;
    Aloha.deferInit();
    Aloha.ready(function() {
      $(document).trigger('edit-wysiwyg-ready');
    });
  },

  attach: function($editable) {
    var id = $editable.attr('id');
    // If no ID is set on this editable, then generate one.
    if (id == "") {
      id = 'edit-aloha-' + new Date().getTime();
      $editable.attr('id', id);
    }

    Aloha.jQuery('#' + id).aloha();
  },

  activate: function($editable) {
    var id = $editable.attr('id');

    Aloha.getEditableById(id).activate();
    // This hack will trigger the floating menu to appear *immediately*.
    Aloha.jQuery('#' + id).trigger('mousedown').trigger('mouseup');
  },

  detach: function($editable) {
    var id = $editable.attr('id');

    Aloha.jQuery('#' + id).mahalo();
    if (id.match(/^edit-aloha-\d+$/) != null) {
      $editable.removeAttr('id');
    }
  }
};

})(jQuery, window);
