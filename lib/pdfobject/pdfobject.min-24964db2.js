/**
 *  PDFObject v2.3.0
 *  https://github.com/pipwerks/PDFObject
 *  @license
 *  Copyright (c) 2008-2024 Philip Hutchison
 *  MIT-style license: http://pipwerks.mit-license.org/
 *  UMD module pattern from https://github.com/umdjs/umd/blob/master/templates/returnExports.js
 */
!function(root,factory){"function"==typeof define&&define.amd?define([],factory):"object"==typeof module&&module.exports?module.exports=factory():root.PDFObject=factory()}(this,function(){"use strict";if("undefined"==typeof window||void 0===window.navigator||void 0===window.navigator.userAgent)return!1;let win=window,nav=win.navigator,ua=nav.userAgent,suppressConsole=!1,validateAX=function(type){var ax=null;try{ax=new ActiveXObject(type)}catch(e){ax=null}return!!ax},supportsPDFs=function(){if(void 0!==nav.platform&&"MacIntel"===nav.platform&&void 0!==nav.maxTouchPoints&&nav.maxTouchPoints>1||/Mobi|Tablet|Android|iPad|iPhone/.test(ua))return!1;let supportsPDFVE="boolean"==typeof nav.pdfViewerEnabled;return!(supportsPDFVE&&!nav.pdfViewerEnabled)&&(supportsPDFVE&&nav.pdfViewerEnabled||function(){let isChromium=void 0!==win.chrome,isSafari=void 0!==win.safari||void 0!==nav.vendor&&/Apple/.test(nav.vendor)&&/Safari/.test(ua),isFirefox=void 0!==win.Mozilla||/irefox/.test(ua);return isChromium||isSafari||isFirefox}()||"ActiveXObject"in win&&(validateAX("AcroPDF.PDF")||validateAX("PDF.PdfCtrl")))}(),embedError=function(msg){return suppressConsole||console.log("[PDFObject]",msg),!1},generatePDFObjectMarkup=function(embedType,targetNode,url,pdfOpenFragment,width,height,id,title,omitInlineStyles,customAttribute,PDFJS_URL){!function(node){for(;node.firstChild;)node.removeChild(node.firstChild)}(targetNode);let source=url;if("pdfjs"===embedType){source=PDFJS_URL+(-1!==PDFJS_URL.indexOf("?")?"&":"?")+"file="+encodeURIComponent(url)+pdfOpenFragment}else source+=pdfOpenFragment;let el=document.createElement("iframe");if(el.className="pdfobject",el.type="application/pdf",el.title=title,el.src=source,el.allow="fullscreen",el.frameborder="0",id&&(el.id=id),!omitInlineStyles){let style="border: none;";targetNode!==document.body?style+="width: "+width+"; height: "+height+";":style+="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;",el.style.cssText=style}return customAttribute&&customAttribute.key&&-1===["className","type","title","src","style","id","allow","frameborder"].indexOf(customAttribute.key)&&el.setAttribute(customAttribute.key,void 0!==customAttribute.value?customAttribute.value:""),targetNode.classList.add("pdfobject-container"),targetNode.appendChild(el),targetNode.getElementsByTagName("iframe")[0]},embed=function(url,targetSelector,options){let selector=targetSelector||!1,opt=options||{};suppressConsole="boolean"==typeof opt.suppressConsole&&opt.suppressConsole;let id="string"==typeof opt.id?opt.id:"",page=opt.page||!1,pdfOpenParams=opt.pdfOpenParams||{},fallbackLink="string"!=typeof opt.fallbackLink&&"boolean"!=typeof opt.fallbackLink||opt.fallbackLink,width=opt.width||"100%",height=opt.height||"100%",title=opt.title||"Embedded PDF",forcePDFJS="boolean"==typeof opt.forcePDFJS&&opt.forcePDFJS,omitInlineStyles="boolean"==typeof opt.omitInlineStyles&&opt.omitInlineStyles,PDFJS_URL=opt.PDFJS_URL||!1,targetNode=function(targetSelector){let targetNode=document.body;return"string"==typeof targetSelector?targetNode=document.querySelector(targetSelector):void 0!==win.jQuery&&targetSelector instanceof jQuery&&targetSelector.length?targetNode=targetSelector.get(0):void 0!==targetSelector.nodeType&&1===targetSelector.nodeType&&(targetNode=targetSelector),targetNode}(selector),pdfOpenFragment="",customAttribute=opt.customAttribute||{},fallbackHTML_default="<p>This browser does not support inline PDFs. Please download the PDF to view it: [pdflink]</p>";if("string"!=typeof url)return embedError("URL is not valid");if(!targetNode)return embedError("Target element cannot be determined");if(page&&(pdfOpenParams.page=page),pdfOpenFragment=function(pdfParams){let prop,string="",paramArray=[],fdf="";if((pdfParams.comment||pdfParams.viewrect||pdfParams.highlight)&&(pdfParams.page||(pdfParams.page=1,embedError("The comment, viewrect, and highlight parameters require a page parameter, but none was specified. Defaulting to page 1."))),pdfParams.page&&(paramArray.push("page="+encodeURIComponent(pdfParams.page)),delete pdfParams.page),pdfParams.fdf&&(fdf=pdfParams.fdf,delete pdfParams.fdf),pdfParams){for(prop in pdfParams)pdfParams.hasOwnProperty(prop)&&paramArray.push(encodeURIComponent(prop)+"="+encodeURIComponent(pdfParams[prop]));fdf&&paramArray.push("fdf="+encodeURIComponent(fdf)),(string=paramArray.join("&"))&&(string="#"+string)}return string}(pdfOpenParams),forcePDFJS&&PDFJS_URL)return generatePDFObjectMarkup("pdfjs",targetNode,url,pdfOpenFragment,width,height,id,title,omitInlineStyles,customAttribute,PDFJS_URL);if(supportsPDFs)return generatePDFObjectMarkup("iframe",targetNode,url,pdfOpenFragment,width,height,id,title,omitInlineStyles,customAttribute);if(PDFJS_URL)return generatePDFObjectMarkup("pdfjs",targetNode,url,pdfOpenFragment,width,height,id,title,omitInlineStyles,customAttribute,PDFJS_URL);if(fallbackLink)if("string"==typeof fallbackLink)targetNode.innerHTML=fallbackLink.replace(/\[url\]/g,url);else if(-1!==url.indexOf("data:application/pdf;base64"))!function(b64,filename,targetNode,fallbackHTML){if(window.Blob&&window.URL&&window.URL.createObjectURL){var xhr=new XMLHttpRequest;xhr.open("GET",b64,!0),xhr.responseType="blob",xhr.onload=function(){if(200===xhr.status){var blob=xhr.response,link=document.createElement("a");link.innerText="Download PDF",link.href=URL.createObjectURL(blob),link.setAttribute("download",filename),targetNode.innerHTML=fallbackHTML.replace(/\[pdflink\]/g,link.outerHTML)}},xhr.send()}}(url,"file.pdf",targetNode,fallbackHTML_default);else{let link="<a href='"+url+"'>Download PDF</a>";targetNode.innerHTML=fallbackHTML_default.replace(/\[pdflink\]/g,link)}return embedError("This browser does not support embedded PDFs")};return{embed:function(a,b,c){return embed(a,b,c)},pdfobjectversion:"2.3.0",supportsPDFs:supportsPDFs}});