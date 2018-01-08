import $ from 'jquery';
import React from 'react';

global.$ = global.jQuery = $;

$.prototype.sideNav = () => { };
$.prototype.material_select = () => { };
$.prototype.modal = () => { };
$.prototype.tooltip = () => { };

global.Materialize = {
  toast: () => { }
};
