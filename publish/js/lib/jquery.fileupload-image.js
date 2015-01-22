/*
 * jQuery File Upload Image Preview & Resize Plugin 1.7.2
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

(function(a){typeof define=="function"&&define.amd?define(["jquery","load-image","load-image-meta","load-image-exif","load-image-ios","canvas-to-blob","./jquery.fileupload-process"],a):a(window.jQuery,window.loadImage)})(function(a,b){a.blueimp.fileupload.prototype.options.processQueue.unshift({action:"loadImageMetaData",disableImageHead:"@",disableExif:"@",disableExifThumbnail:"@",disableExifSub:"@",disableExifGps:"@",disabled:"@disableImageMetaDataLoad"},{action:"loadImage",prefix:!0,fileTypes:"@",maxFileSize:"@",noRevoke:"@",disabled:"@disableImageLoad"},{action:"resizeImage",prefix:"image",maxWidth:"@",maxHeight:"@",minWidth:"@",minHeight:"@",crop:"@",orientation:"@",forceResize:"@",disabled:"@disableImageResize"},{action:"saveImage",quality:"@imageQuality",type:"@imageType",disabled:"@disableImageResize"},{action:"saveImageMetaData",disabled:"@disableImageMetaDataSave"},{action:"resizeImage",prefix:"preview",maxWidth:"@",maxHeight:"@",minWidth:"@",minHeight:"@",crop:"@",orientation:"@",thumbnail:"@",canvas:"@",disabled:"@disableImagePreview"},{action:"setImage",name:"@imagePreviewName",disabled:"@disableImagePreview"},{action:"deleteImageReferences",disabled:"@disableImageReferencesDeletion"}),a.widget("blueimp.fileupload",a.blueimp.fileupload,{options:{loadImageFileTypes:/^image\/(gif|jpeg|png|svg\+xml)$/,loadImageMaxFileSize:1e7,imageMaxWidth:1920,imageMaxHeight:1080,imageOrientation:!1,imageCrop:!1,disableImageResize:!0,previewMaxWidth:80,previewMaxHeight:80,previewOrientation:!0,previewThumbnail:!0,previewCrop:!1,previewCanvas:!0},processActions:{loadImage:function(c,d){if(d.disabled)return c;var e=this,f=c.files[c.index],g=a.Deferred();return a.type(d.maxFileSize)==="number"&&f.size>d.maxFileSize||d.fileTypes&&!d.fileTypes.test(f.type)||!b(f,function(a){a.src&&(c.img=a),g.resolveWith(e,[c])},d)?c:g.promise()},resizeImage:function(c,d){if(d.disabled||!c.canvas&&!c.img)return c;d=a.extend({canvas:!0},d);var e=this,f=a.Deferred(),g=d.canvas&&c.canvas||c.img,h=function(a){a&&(a.width!==g.width||a.height!==g.height||d.forceResize)&&(c[a.getContext?"canvas":"img"]=a),c.preview=a,f.resolveWith(e,[c])},i;if(c.exif){d.orientation===!0&&(d.orientation=c.exif.get("Orientation"));if(d.thumbnail){i=c.exif.get("Thumbnail");if(i)return b(i,h,d),f.promise()}c.orientation?delete d.orientation:c.orientation=d.orientation}return g?(h(b.scale(g,d)),f.promise()):c},saveImage:function(b,c){if(!b.canvas||c.disabled)return b;var d=this,e=b.files[b.index],f=a.Deferred();return b.canvas.toBlob?(b.canvas.toBlob(function(a){a.name||(e.type===a.type?a.name=e.name:e.name&&(a.name=e.name.replace(/\..+$/,"."+a.type.substr(6)))),e.type!==a.type&&delete b.imageHead,b.files[b.index]=a,f.resolveWith(d,[b])},c.type||e.type,c.quality),f.promise()):b},loadImageMetaData:function(c,d){if(d.disabled)return c;var e=this,f=a.Deferred();return b.parseMetaData(c.files[c.index],function(b){a.extend(c,b),f.resolveWith(e,[c])},d),f.promise()},saveImageMetaData:function(a,b){if(!(a.imageHead&&a.canvas&&a.canvas.toBlob&&!b.disabled))return a;var c=a.files[a.index],d=new Blob([a.imageHead,this._blobSlice.call(c,20)],{type:c.type});return d.name=c.name,a.files[a.index]=d,a},setImage:function(a,b){return a.preview&&!b.disabled&&(a.files[a.index][b.name||"preview"]=a.preview),a},deleteImageReferences:function(a,b){return b.disabled||(delete a.img,delete a.canvas,delete a.preview,delete a.imageHead),a}}})})