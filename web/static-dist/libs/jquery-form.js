!function(e){function t(a){if(r[a])return r[a].exports;var n=r[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="/static-dist/",t(0)}([function(e,t,r){e.exports=r(4)},,,,function(e,t){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=!1;(function(){!function(e){"function"==typeof a&&a.amd?a(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function a(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var o=this;if(o.clk=r,"image"==r.type)if(void 0!==t.offsetX)o.clk_x=t.offsetX,o.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var i=a.offset();o.clk_x=t.pageX-i.left,o.clk_y=t.pageY-i.top}else o.clk_x=t.pageX-r.offsetLeft,o.clk_y=t.pageY-r.offsetTop;setTimeout(function(){o.clk=o.clk_x=o.clk_y=null},100)}function n(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var o={};o.fileapi=void 0!==e("<input type='file'/>").get(0).files,o.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,o=e.param(r,t.traditional).split("&"),i=o.length,s=[];for(a=0;a<i;a++)o[a]=o[a].replace(/\+/g," "),n=o[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function a(a){for(var n=new FormData,o=0;o<a.length;o++)n.append(a[o].name,a[o].value);if(t.extraData){var i=r(t.extraData);for(o=0;o<i.length;o++)i[o]&&n.append(i[o][0],i[o][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){t.formData?r.data=t.formData:r.data=n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function a(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){n("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){n("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=a(g).readyState;n("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){n("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),o=f.attr2("action"),i="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||i;S.setAttribute("target",d),u&&!/post/i.test(u)||S.setAttribute("method","POST"),o!=p.url&&S.setAttribute("action",p.url),p.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),p.timeout&&(j=setTimeout(function(){T=!0,s(D)},p.timeout));var l=[];try{if(p.extraData)for(var m in p.extraData)p.extraData.hasOwnProperty(m)&&(e.isPlainObject(p.extraData[m])&&p.extraData[m].hasOwnProperty("name")&&p.extraData[m].hasOwnProperty("value")?l.push(e('<input type="hidden" name="'+p.extraData[m].name+'">').val(p.extraData[m].value).appendTo(S)[0]):l.push(e('<input type="hidden" name="'+m+'">').val(p.extraData[m]).appendTo(S)[0]));p.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{S.submit()}catch(h){var x=document.createElement("form").submit;x.apply(S)}}finally{S.setAttribute("action",o),S.setAttribute("enctype",c),r?S.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=a(g),M||(n("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void w.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void w.reject(x,"error","server abort");if(M&&M.location.href!=p.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,o="success";try{if(T)throw"timeout";var i="xml"==p.dataType||M.XMLDocument||e.isXMLDoc(M);if(n("isXml="+i),!i&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return n("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,i&&(p.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":p.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(p.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||p.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var d=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];d?x.responseText=d.textContent?d.textContent:d.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,p)}catch(y){o="parsererror",x.error=r=y||o}}catch(y){n("error caught: ",y),o="error",x.error=r=y||o}x.aborted&&(n("upload aborted"),o=null),x.status&&(o=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===o?(p.success&&p.success.call(p.context,E,"success",x),w.resolve(x.responseText,"success",x),m&&e.event.trigger("ajaxSuccess",[x,p])):o&&(void 0===r&&(r=x.statusText),p.error&&p.error.call(p.context,x,o,r),w.reject(x,"error",r),m&&e.event.trigger("ajaxError",[x,p,r])),m&&e.event.trigger("ajaxComplete",[x,p]),m&&!--e.active&&e.event.trigger("ajaxStop"),p.complete&&p.complete.call(p.context,x,o),F=!0,p.timeout&&clearTimeout(j),setTimeout(function(){p.iframeTarget?v.attr("src",p.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,p,m,d,v,g,x,y,b,T,j,S=f[0],w=e.Deferred();if(w.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(p=e.extend(!0,{},e.ajaxSettings,t),p.context=p.context||p,d="jqFormIO"+(new Date).getTime(),p.iframeTarget?(v=e(p.iframeTarget),b=v.attr2("name"),b?d=b:v.attr2("name",d)):(v=e('<iframe name="'+d+'" src="'+p.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";n("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(a){}v.attr("src",p.iframeSrc),x.error=r,p.error&&p.error.call(p.context,x,r,t),m&&e.event.trigger("ajaxError",[x,p,r]),p.complete&&p.complete.call(p.context,x,r)}},m=p.global,m&&0===e.active++&&e.event.trigger("ajaxStart"),m&&e.event.trigger("ajaxSend",[x,p]),p.beforeSend&&p.beforeSend.call(p.context,x,p)===!1)return p.global&&e.active--,w.reject(),w;if(x.aborted)return w.reject(),w;y=S.clk,y&&(b=y.name,b&&!y.disabled&&(p.extraData=p.extraData||{},p.extraData[b]=y.value,"image"==y.type&&(p.extraData[b+".x"]=S.clk_x,p.extraData[b+".y"]=S.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(p.extraData=p.extraData||{},p.extraData[L]=A),p.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",o="xml"===r||!r&&n.indexOf("xml")>=0,i=o?t.responseXML:t.responseText;return o&&"parsererror"===i.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(i=a.dataFilter(i,r)),"string"==typeof i&&("json"===r||!r&&n.indexOf("json")>=0?i=C(i):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(i)),i};return w}if(!this.length)return n("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var p={};if(this.trigger("form-pre-serialize",[this,t,p]),p.veto)return n("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return n("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var m=t.traditional;void 0===m&&(m=e.ajaxSettings.traditional);var d,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,d=e.param(t.data,m)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return n("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,p]),p.veto)return n("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,m);d&&(g=g?g+"&"+d:d),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,o=0,i=x.length;o<i;o++)x[o].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),S=j.length>0,w="multipart/form-data",D=f.attr("enctype")==w||f.attr("encoding")==w,k=o.fileapi&&o.formdata;n("fileAPI :"+k);var A,L=(S||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(S||D)&&k?a(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(r){if(r=r||{},r.delegation=r.delegation&&e.isFunction(e.fn.on),!r.delegation&&0===this.length){var o={s:this.selector,c:this.context};return!e.isReady&&o.s?(n("DOM not ready, queuing ajaxForm"),e(function(){e(o.s,o.c).ajaxForm(r)}),this):(n("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return r.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,a).on("submit.form-plugin",this.selector,r,t).on("click.form-plugin",this.selector,r,a),this):this.ajaxFormUnbind().bind("submit.form-plugin",r,t).bind("click.form-plugin",r,a)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var n,i=this[0],s=this.attr("id"),u=t?i.getElementsByTagName("*"):i.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(n=e(":input[form="+s+"]").get(),n.length&&(u=(u||[]).concat(n))),!u||!u.length)return a;var c,l,f,p,m,d,h;for(c=0,d=u.length;c<d;c++)if(m=u[c],f=m.name,f&&!m.disabled)if(t&&i.clk&&"image"==m.type)i.clk==m&&(a.push({name:f,value:e(m).val(),type:m.type}),a.push({name:f+".x",value:i.clk_x},{name:f+".y",value:i.clk_y}));else if(p=e.fieldValue(m,!0),p&&p.constructor==Array)for(r&&r.push(m),l=0,h=p.length;l<h;l++)a.push({name:f,value:p[l]});else if(o.fileapi&&"file"==m.type){r&&r.push(m);var v=m.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:m.type});else a.push({name:f,value:"",type:m.type})}else null!==p&&"undefined"!=typeof p&&(r&&r.push(m),a.push({name:f,value:p,type:m.type,required:m.required}));if(!t&&i.clk){var g=e(i.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:i.clk_x},{name:f+".y",value:i.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var o=0,i=n.length;o<i;o++)r.push({name:a,value:n[o]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;a<n;a++){var o=this[a],i=e.fieldValue(o,t);null===i||"undefined"==typeof i||i.constructor==Array&&!i.length||(i.constructor==Array?e.merge(r,i):r.push(i))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,o=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==o&&t.selectedIndex==-1))return null;if("select"==o){var i=t.selectedIndex;if(i<0)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?i+1:u.length,f=c?i:0;f<l;f++){var p=u[f];if(p.selected){var m=p.value;if(m||(m=p.attributes&&p.attributes.value&&!p.attributes.value.specified?p.text:p.value),c)return m;s.push(m)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==r(this.reset)&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1})}).call(window)}]);