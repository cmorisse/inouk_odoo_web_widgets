Widget: ik_guillotine
=====================

This widget is an is an integration off "JQuery Guillotine" in a backend
widget that allows to crop / manipulate images in form views.

Usage
=====

Install the *inouk_tree_image* addon then reference the *ik_tree_image* widget 
in your Tree views like this:

.. code-block:: xml
    
    <field name="image_preview" widget="ik_tree_image" />


Parameters
==========

The widget accepts 2 parameters:

* height 
* class ; a classical class specifier

If class is defined, height is ignored.
If neither class nor height is specified, the widget inserts a height="96"


License
=======

All Inouk Odoo Web Widgets are LGPL-3 Licenced.
See the LICENCE file located in the repository root for detail.

