/*
 * This file is part of ...
 */
 
/* global odoo,_*/
odoo.define('inouk_guillotine_web_widget.guillotine_widget', function (require) {
    "use strict";
    
    var core = require('web.core');
    var common = require('web.form_common');
    var session = require('web.session');
    var utils = require('web.utils');
    var QWeb = core.qweb;

    var IKFieldGuillotineImage = common.AbstractField.extend(common.ReinitializeFieldMixin, {
        
        ODOO_DEFAULT_IMAGE: "/web/static/src/img/placeholder.png",
        
        optionsDefaultsValue: {
            width: 400, 
            height: 400            
        },
        
        
        init: function(field_manager, node) {
            console.log("in init()");
            this._super(field_manager, node);
            this.options = _.defaults(this.options, this.optionsDefaultsValue);            
            this.url = null;
        },
        
        
        set_value: function(value) {
            console.log("set_value()",value);
            
            var url;
            //if (this.get('value') && !utils.is_bin_size(this.get('value'))) {
            if (value && !utils.is_bin_size(value)) {
                url = 'data:image/png;base64,' + value;
            } else if (value) {
                url = session.url('/web/image', {
                    model: this.view.dataset.model,
                    id: this.view.datarecord.id || null,
                    field: this.name,
                    unique: (this.view.datarecord.__last_update || '').replace(/[^0-9]/g, ''),
                });
            } else {
                url = null;
            };
            this.url = url;
            this.id = _.uniqueId("ik-guillotine");
            console.log("  => set_value()::this.url=",this.url)

            this._super(value); // Warning: Calling set_value() cause re-rendering

        },
        
        render_value: function() {
            console.log("in render_value()");
            console.log("  => effective_readonly=",this.get('effective_readonly'));
            console.log("  => this.url=", this.url)
            this._super();

            this.$el.empty();
            var $img = QWeb.render("IKFieldGuillotineImage", { widget: this, 
                                                               url: this.url || this.ODOO_DEFAULT_IMAGE });
            this.$el.append($img);

            
            if(!this.get('effective_readonly')) {
                // guillotine initialieation code
                var picture = this.$el.find('div > img');  // Must be already loaded or cached!
                var self = this;
                picture.one('load', function() {
                    picture.guillotine(self.options);
                    self.guillotine_widget = picture;
                    // Bind button actions
                    self.$el.find('#rotate_left').click(function(){ picture.guillotine('rotateLeft'); });
                    self.$el.find('#rotate_right').click(function(){ picture.guillotine('rotateRight'); });
                    self.$el.find('#fit').click(function(){ picture.guillotine('fit'); });
                    self.$el.find('#zoom_in').click(function(){ picture.guillotine('zoomIn'); });
                    self.$el.find('#zoom_out').click(function(){ picture.guillotine('zoomOut'); });
                    picture.guillotine('fit');
                });
            };
        },
        
        /**
         * from: ReinitializeWidgetMixin
         * Called to initialize the content.
         */
        initialize_content: function() {
            console.log("in initialize_content()");
            console.log("  effective_readonly=",this.get('effective_readonly'));

        },

        /**
         * from: ReinitializeWidgetMixin
         * Called to destroy anything that could have been created previously, called before a
         * re-initialization.
         */
        destroy_content: function() {
            console.log("in destroy_content()");
            console.log("  effective_readonly=",this.get('effective_readonly'));
            if(this.guillotine_widget) {
                // TODO: destroy widgt
                this.guillotine_widget = null;
            } 
            this.$el.empty();
        },
        
        /**
         * from: AbstractField : FormWidget (FieldInterface) : Widget(InvisibilityChangerMixin)
         * setup translation, label and fields attributes
         */
        renderElement: function() {
            console.log("in renderElement()");
            console.log("  effective_readonly=",this.get('effective_readonly'));
            this._super();
            
        }
        
        
    });

    core.form_widget_registry.add('ik_guillotine_image', IKFieldGuillotineImage)
    
    return {
        IKFieldGuillotineImage: IKFieldGuillotineImage
    }
});
