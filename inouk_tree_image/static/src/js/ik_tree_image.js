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
            this.DEFAULT_HEIGHT  = 96;
        },
        
        _format: function (row_data, options) {
            var styleModifier;
            var imageData = null;
            
            var value = row_data[this.id].value;
            
            if (!value) {
                imageData = '/web/static/src/img/placeholder.png';
            } else {
                /* Depending on 'value' content, either use value as image source
                 * or fetch the image from the 'image' controller.
                 */
                if (value.substr(0, 10).indexOf(' ') == -1) {
                    imageData = "data:image/png;base64," + value;
                } else {
                    imageData = session.url('/web/binary/image', {
                        model: options.model,
                        field: this.id,
                        id: options.id
                    });
                }
            }

            /*
             * User can define a class or an height.
             * Note that height is ignored when class is supplied
             */
            if(this.class)
                styleModifier = ' class='+this.class;
            else
                styleModifier = ' height='+(this.height || this.DEFAULT_HEIGHT);
                
            return _.template('<img src="<%-src%>"<%-styleModifier%>>')({
                src: imageData,
                styleModifier: styleModifier
            });
            
        }
    });

    list_widget_registry.add('field.ik_tree_image', IKTreeImage)
});
