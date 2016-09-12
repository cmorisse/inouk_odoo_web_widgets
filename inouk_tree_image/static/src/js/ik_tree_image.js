/* 
    OpenERP, Open Source Management Solution
    This module copyright (C) 2014 Therp BV (<http://therp.nl>)
                          (C) 2013 Marcel van der Boom <marcel@hsdev.com>
    Copyright (C) 2016 Serpent Consulting Services Pvt. Ltd.
                            (<http://www.serpentcs.com>)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* global odoo,_*/
odoo.define('inouk_tree_image.widget', function (require) {
    "use strict";
    var core = require('web.core');
    var session = require('web.session');
    var QWeb = core.qweb;
    var list_widget_registry = core.list_widget_registry;


    /*
     * Options:
     *  - value_if_empty ...
     */
    var IKTreeImage = list_widget_registry.get('field.binary').extend({
        init: function () {
            this._super.apply(this, arguments);
            this.DEFAULT_HEIGHT  = 64;
        },
        
        format: function (row_data, options) {
            /* Return a valid img tag. For image fields, test if the
             field's value contains just the binary size and retrieve
            the image from the dedicated controller in that case.
            Otherwise, assume a character field containing either a
            stock Odoo icon name without path or extension or a fully
            fledged location or data url */
            
            var value = row_data[this.id].value;
            if (!value)
                return options.value_if_empty || '';
            
            var imageData = null;
            if (value.substr(0, 10).indexOf(' ') == -1) {
                imageData = "data:image/png;base64," + value;
            } else {
                imageData = session.url('/web/binary/image', {
                    model: options.model,
                    field: this.id,
                    id: options.id
                });
            }
            return _.template('<img height="<%-height%>" src="<%-src%>">')({
                height: this.height || this.DEFAULT_HEIGHT,
                src: imageData,
            });
            
        }
    });

    list_widget_registry.add('field.ik_tree_image', IKTreeImage)
});
