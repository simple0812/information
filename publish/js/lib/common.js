var common=function(a){function b(b,c,d){a(b).popover("destroy"),a(b).popover({placement:d||"bottom",trigger:"manual",content:c}),clearTimeout(a(b).data("timeout1986")),a(b).popover("show");var e=setTimeout(function(){a(b).popover("hide")},3e3);a(b).data("timeout1986",e)}function c(a){var b="",c=window.document.URL;if(c.indexOf("?")>0){var d=c.split("?"),e=d[1].split("&");for(var f=0;f<e.length;f++){var g=e[f].split("=");if(g[0]==a&&g[1]!=""){b=g[1];break}}}return b}function d(b,c){a(c).prop("checked",a(b).prop("checked"))}function e(b,c){a(c).prop("checked",a(b+":checked").length===a(b).length)}function f(){var a=0;return document.documentElement&&document.documentElement.scrollTop?a=document.documentElement.scrollTop:document.body&&(a=document.body.scrollTop),a}function g(a){var b=document.getElementById(a);return b.scrollTop}function h(){var a=0;return document.body.clientHeight&&document.documentElement.clientHeight?a=document.body.clientHeight<document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight:a=document.body.clientHeight>document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight,a}function i(a){var b=document.getElementById(a),c=0;return b.clientHeight}function j(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}function k(a){var b=document.getElementById(a);return b.scrollHeight}function l(){return(f()+h())/j()>=1&&f()>0?!0:!1}function m(a){return(g(a)+i(a))/k(a)>=1&&g(a)>0?!0:!1}function n(a){var b=a.target;b.offsetLeft==undefined&&(b=b.parentNode);var c=o(b),d={x:window.pageXOffset+a.clientX,y:window.pageYOffset+a.clientY},e={offsetX:d.x-c.x,offsetY:d.y-c.y};return a.offsetX=e.offsetX,a.offsetY=e.offsetY,e}function o(a){var b={x:0,y:0};while(a)b.x+=a.offsetLeft,b.y+=a.offsetTop,a=a.offsetParent;return b}return{popBy:b,getQueryString:c,selectAllChk:d,selectItemChk:e,getScrollTop:f,getScrollTopBy:g,getClientHeight:h,getClientHeightBy:i,getScrollHeight:j,getScrollHeightBy:k,reachBottom:l,reachBottomBy:m,getOffset:n,getPageCoord:o}}($)