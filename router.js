"use strict";
/**
 * Creating floating Panel-nodes which can be shown and hidden.
 *
 *
 * <i>Copyright (c) 2014 ITSA - https://github.com/itsa</i>
 * New BSD License - http://choosealicense.com/licenses/bsd-3-clause/
 *
 *
 * @module panel
 * @class Panel
 * @since 0.0.1
*/

require('js-ext');
require('polyfill');


var NAME = '[router]: ',
    createHashMap = require('js-ext/extra/hashmap.js').createMap;

module.exports = function (window) {

    var DOCUMENT = window.document,
        LightMap = require('js-ext/extra/lightmap.js'),
        Router, IO;

    window._ITSAmodules || Object.protectedProp(window, '_ITSAmodules', createHashMap());

/*jshint boss:true */
    if (Router=window._ITSAmodules.Router) {
/*jshint boss:false */
        return Router; // Panel was already created
    }

    IO = require('io/extra/io-transfer.js')(window);
    Router = {
        load: function(uri) {
            this.serverSupportsRouter().then(
                function(support) {
                    if (!support) {
                        throw new Error('no support');
                    }
                    IO.get(uri).then(
                        function(pagedata) {
                            DOCUMENT.documentElement.setOuterHTML(pagedata);
                        }
                    ).catch(function(err) {
                        console.warn(err);
                    });
                }
            ).catch(function() {
                window.location.href = uri;
            });
        },
        serverSupportsRouter: function() {
            return window.Promise.resolve(true);
        }
    };

    return Router;
};