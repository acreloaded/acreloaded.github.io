/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m=$.extend({},m);m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};jQuery.noConflict();

/**
 * Snowy Snow JS – By Jorge Lainfiesta
 * Copyright 2010 Audentio Design
 *
 */

jQuery(document).ready(function(b){;b(".description").each(function(){var c=b(this).text();if(c!=""){b(this).addClass("sep_line")}});b("#bottom_h .wrapper").append("<span class='snowman_collapsed' title='toggle me!'></span>");b(".snowman_collapsed").hide();var a=b.cookie("snowman_col");if(a=="true"){b(".snowman").hide();b(".snowman_collapsed").show()}b(".snowman").click(function(){if(a!="true"){b(this).hide("fast",function(){b(".snowman_collapsed").show("fast");a="true";b.cookie("snowman_col",a)})}});b(".snowman_collapsed").click(function(){b(this).hide("fast",function(){b(".snowman").show("fast");a="false";b.cookie("snowman_col",a)})})});