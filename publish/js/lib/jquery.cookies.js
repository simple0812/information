/**
* Cookie plugin
*
* Copyright (c) 2006 ziqiu.zhang 
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
* 使用举例：
    //注： 写入时，subName参数请传递空值或null
    //写入Cookies-值为字符串，即不包含子键
    $.cookie("singleKey", "", "singleKey-value", { expires: 1, path: "/", secure: false })
    //读取Cookies-根据主键
    alert("singleKey:" + $.cookie("singleKey"));

    //写入Cookies-值为对象，则每个属性名为子键的名称，属性值为子键值
    var subNameObj = { subName1: "aaa", subName2: "bbb", subName3: "ccc" };
    $.cookie("multiKey", "", subNameObj, { expires: 1, path: "/", secure: false });
    //读取Cookies-根据主键
    alert("multiKey:" + $.cookie("multiKey"));
    //读取Cookies-根据主键和子键
    alert("multiKey,subName1:" + $.cookie("multiKey", "subName1"));
*
*/

jQuery.cookie=function(a,b,c,d){if(typeof c=="undefined"){var m=null;if(document.cookie&&document.cookie!=""){var n=document.cookie.split(";");for(var o=0;o<n.length;o++){var p=jQuery.trim(n[o]);if(p.substring(0,a.length+1)==a+"="){m=decodeURIComponent(p.substring(a.length+1));if(typeof b!="undefined"&&b!=null&&b!=""){var q=m.toString().split("&");for(var r=0;r<q.length;r++){var s=jQuery.trim(q[r]);if(s.substring(0,b.length+1)==b+"="){m=decodeURIComponent(s.substring(b.length+1));break}}}break}}}return m}d=d||{},c===null&&(c="",d.expires=-1);var e="";if(d.expires&&(typeof d.expires=="number"||d.expires.toUTCString)){var f;typeof d.expires=="number"?(f=new Date,f.setTime(f.getTime()+d.expires*24*60*60*1e3)):f=d.expires,e="; expires="+f.toUTCString()}var g=d.path?"; path="+d.path:";path=/",h=d.domain?"; domain="+d.domain:"",i=d.secure?"; secure":"";if(typeof c=="object"){var j=0,k="";for(var l in c)j>0&&(k+="&"),k+=l+"="+encodeURIComponent(c[l]),j++;c=k}else c=encodeURIComponent(c);document.cookie=[a,"=",c,e,g,h,i].join("")}