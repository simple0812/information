/**
 * jQuery hashchange 1.0.0
 * 
 * (based on jquery.history)
 *
 * Copyright (c) 2008 Chris Leishman (chrisleishman.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */

(function(a){function d(){var c=location.hash;c!=b&&(b=c,a.event.trigger("hashchange"))}function e(){var d=c.contentDocument||c.contentWindow.document,e=d.location.hash;e==""&&(e="#"),e!=b&&(location.hash!=e&&(location.hash=e),b=e,a.event.trigger("hashchange"))}function f(a){a=="#"&&(a="");var b=c.contentWindow.document;b.open(),b.close(),b.location.hash!=a&&(b.location.hash=a)}a.fn.extend({hashchange:function(a){this.bind("hashchange",a)},openOnClick:function(b){if(b===undefined||b.length==0)b="#";return this.click(function(c){return b&&b.charAt(0)=="#"?window.setTimeout(function(){a.locationHash(b)},0):window.location(b),c.stopPropagation(),!1})}});if(a.support.leadingWhitespace&&document.documentMode&&document.documentMode>=8){a.extend({locationHash:function(a){a?a.charAt(0)!="#"&&(a="#"+a):a="#",location.hash=a}});return}var b,c;a.extend({locationHash:function(c){if(b===undefined)return;c?c.charAt(0)!="#"&&(c="#"+c):c="#",location.hash=c;if(b==c)return;b=c,a.support.leadingWhitespace&&f(c),a.event.trigger("hashchange")}}),a(document).ready(function(){b=location.hash,a.support.leadingWhitespace?(b==""&&(b="#"),c=a("<iframe />").hide().get(0),a("body").prepend(c),f(location.hash),setInterval(e,100)):setInterval(d,100)}),a(window).unload(function(){c=null}),a.support.leadingWhitespace&&a("a[href^=#]").on("click",function(){var b=a(this).attr("href");if(a(b).length==0&&a("a[name="+b.slice(1)+"]").length==0)return a.locationHash(b),!1})})(jQuery)