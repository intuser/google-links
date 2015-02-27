/**
 * (C) Copyright 2008 Jeremy Maitin-Shepard
 * (C) Copyright 2009-2010 John J. Foerch
 *
 * Use, modification, and distribution are subject to the terms specified in the
 * COPYING file.
**/

require("content-buffer.js");

define_keymap("google_clean_links_keymap", $display_name = "google-clean-links");

// Keys for the "experimental" keyboard search
define_key(google_clean_links_keymap, "j", "ensure-content-focused", $fallthrough);
define_key(google_clean_links_keymap, "k", "ensure-content-focused", $fallthrough);
define_key(google_clean_links_keymap, "o", "ensure-content-focused", $fallthrough);
define_key(google_clean_links_keymap, "/", "ensure-content-focused", $fallthrough);
define_key(google_clean_links_keymap, "return", "ensure-content-focused", $fallthrough);//BAD

/**
 * Note: escape already does the same thing as the Google key binding.
 */

function preventURLRewrites (d) {
    // To be inserted in the page itself
    function injectedFunction () {
        'use strict';
        // This part disables the UGLY URI-converting
        if (Object.defineProperty) { // FF 4+, Chrome 5+
            Object.defineProperty(window, 'rwt', {
              value: function () {return true;},
              writable: false, configurable: false
            });
        } else { // FF (2-3.6), Chrome 1-4
            window.__defineGetter__('rwt', function () {
              return function () {return true;};
            });
        }
    }
    /* Create script tag to inject in Google Search page */
    var document = d;
    var s = document.createElement('script');
    s.textContent = '(' + injectedFunction + ')()';
    (document.body || document.head||document.documentElement).appendChild(s);
    s.parentNode.removeChild(s);
}

define_page_mode("google-clean-links-mode",
    build_url_regexp($domain = /(?:encrypted\.)?google/,
                     $allow_www = true,
                     $path = /search\?|cse\?/,
                     $tlds = ["com", "com.au", "co.uk", "de", "dk", "es",
                              "fr", "it", "no", "se", "uk"]),
    function enable (buffer) {

    if (buffer.browser.webProgress.isLoadingDocument)
       add_hook.call(buffer, "buffer_dom_content_loaded_hook", function(buffer){ preventURLRewrites(buffer.document)});
    else preventURLRewrites(buffer.document);

    },
    function disable (buffer) {
    },
    $display_name = "Google Link Sanitation");

page_mode_activate(google_clean_links_mode);

provide("google-clean-links");
