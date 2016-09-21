# -*- coding: utf-8 -*-
# 
#    This file is part of "inouk_odoo_web_widgets".
#
#    Copyright (C) 2016 Cyril MORISSE <cmorisse@boxes3.net>
#
#    "inouk_odoo_web_widgets" is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Lesser General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Lesser General Public License for more details.
#
#    You should have received a copy of the GNU Lesser General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
{
    'name': 'Inouk "Guillotine" Web Widget',
    'version': '9.0.0',
    'author': "Cyril MORISSE <cmorisse@boxes3.net>",
    'website': 'https://github.com/cmorisse/inouk_odoo_web_widgets',
    'license': 'LGPL-3',
    'category': 'Web',
    'depends': [
        'web',
    ],
    'qweb': [
        "static/src/xml/*.xml",
    ],
    'data': [
        'views/jsLoader.xml',
    ],
    'installable': True,
}
