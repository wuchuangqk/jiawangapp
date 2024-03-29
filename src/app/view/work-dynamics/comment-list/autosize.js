/*!
Autosize 2.0.0
license: MIT
http://www.jacklmoore.com/autosize
*/(function(root,factory){'use strict';if(typeof define==='function'&&define.amd){define([],factory);}else if(typeof exports==='object'){module.exports=factory();}else{root.autosize=factory();}}(this,function(){function main(ta){if(!ta||!ta.nodeName||ta.nodeName!=='TEXTAREA'||ta.hasAttribute('data-autosize-on')){return;}
var maxHeight;var heightOffset;function init(){var style=window.getComputedStyle(ta,null);if(style.resize==='vertical'){ta.style.resize='none';}else if(style.resize==='both'){ta.style.resize='horizontal';}
ta.style.wordWrap='break-word';var width=ta.style.width;ta.style.width='0px';ta.offsetWidth;ta.style.width=width;maxHeight=style.maxHeight!=='none'?parseFloat(style.maxHeight):false;if(style.boxSizing==='content-box'){heightOffset=-(parseFloat(style.paddingTop)+parseFloat(style.paddingBottom));}else{heightOffset=parseFloat(style.borderTopWidth)+parseFloat(style.borderBottomWidth);}
adjust();}
function adjust(){var startHeight=ta.style.height;var htmlTop=document.documentElement.scrollTop;var bodyTop=document.body.scrollTop;ta.style.height='auto';var endHeight=ta.scrollHeight+heightOffset;if(maxHeight!==false&&maxHeight<endHeight){endHeight=maxHeight;if(ta.style.overflowY!=='scroll'){ta.style.overflowY='scroll';}}else if(ta.style.overflowY!=='hidden'){ta.style.overflowY='hidden';}
ta.style.height=endHeight+'px';document.documentElement.scrollTop=htmlTop;document.body.scrollTop=bodyTop;if(startHeight!==ta.style.height){var evt=document.createEvent('Event');evt.initEvent('autosize.resized',true,false);ta.dispatchEvent(evt);}}
if('onpropertychange'in ta&&'oninput'in ta){ta.addEventListener('keyup',adjust);}
window.addEventListener('resize',adjust);ta.addEventListener('input',adjust);ta.addEventListener('autosize.update',adjust);ta.addEventListener('autosize.destroy',function(style){window.removeEventListener('resize',adjust);ta.removeEventListener('input',adjust);ta.removeEventListener('keyup',adjust);ta.removeEventListener('autosize.destroy');Object.keys(style).forEach(function(key){ta.style[key]=style[key];});ta.removeAttribute('data-autosize-on');}.bind(ta,{height:ta.style.height,overflow:ta.style.overflow,overflowY:ta.style.overflowY,wordWrap:ta.style.wordWrap,resize:ta.style.resize}));ta.setAttribute('data-autosize-on',true);ta.style.overflow='hidden';ta.style.overflowY='hidden';init();}
if(typeof window.getComputedStyle!=='function'){return function(elements){return elements;};}else{return function(elements){if(elements&&elements.length){Array.prototype.forEach.call(elements,main);}else if(elements&&elements.nodeName){main(elements);}
return elements;};}}));
