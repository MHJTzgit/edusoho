webpackJsonp(["app/js/activity/video/preview/index"],{"06597b47670159844043":function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n("b704ce0ef0c1bec36938"),s=n.n(a),c=n("17c25dd7d9d2615bc1d9"),f=n.n(c),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.name=e.name,n.project=e.project,n.children=e.children,n.type=e.type,n.setup(),n}return o(t,e),u(t,[{key:"setup",value:function(){var e=this,t=new s.a(this.name,this.project);if("child"==this.type)t.addTarget(window.parent,"parent"),t.addTarget(window.self,"partner");else if("parent"==this.type){t.addTarget(window.self,"child");for(var n=this.children,r=n.length-1;r>=0;r--)t.addTarget(n[r].contentWindow,n[r].id)}t.listen(function(t){t=JSON.parse(t),e.emit(t.eventName,t.args)}),this.messenger=t}},{key:"sendToParent",value:function(e,t){for(var n in this.messenger.targets)this.messenger.targets[n].send(this.convertToString(e,t))}},{key:"sendToChild",value:function(e,t,n){this.messenger.targets[e.id].send(this.convertToString(t,n))}},{key:"convertToString",value:function(e,t){var n={eventName:e,args:t};return n=JSON.stringify(n)}}]),t}(f.a);t.default=l},"1dc4cd4f0f1db3e6ec67":function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=n("c04c1b91e3806f24595a"),o=n.n(i),a=n("06597b47670159844043"),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=function(){function e(t){r(this,e),this.player={},this.container=t}return s(e,[{key:"play",value:function(){$("#swf-player").length?this._playerSwf():this._playVideo()}},{key:"_playerSwf",value:function(){o.a.embedSWF($("#swf-player").data("url"),"swf-player","100%","100%","9.0.0",null,null,{wmode:"opaque",allowFullScreen:"true"})}},{key:"_playVideo",value:function(){new a.default({name:"partner",project:"PlayerProject",children:[],type:"parent"}).on("ended",function(){$("#task-preview-player").html($(".js-time-limit-dev").html())})}}]),e}();t.a=c},"3000b356d9530a606bbf":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),new(n("1dc4cd4f0f1db3e6ec67").a)("#video-content").play()},b704ce0ef0c1bec36938:function(e,t){e.exports=function(){function e(e,t,n){var r="";if(arguments.length<2?r="target error - target and name are both required":"object"!=typeof e?r="target error - target itself must be window object":"string"!=typeof t&&(r="target error - target name must be string type"),r)throw new Error(r);this.target=e,this.name=t,this.prefix=n}function t(e,t){this.targets={},this.name=e,this.listenFunc=[],this.prefix=t||n,this.initListen()}var n="[PROJECT_NAME]",r="postMessage"in window;return e.prototype.send=r?function(e){this.target.postMessage(this.prefix+"|"+this.name+"__Messenger__"+e,"*")}:function(e){var t=window.navigator[this.prefix+this.name];if("function"!=typeof t)throw new Error("target callback function is not defined");t(this.prefix+e,window)},t.prototype.addTarget=function(t,n){var r=new e(t,n,this.prefix);this.targets[n]=r},t.prototype.initListen=function(){var e=this,t=function(t){"object"==typeof t&&t.data&&(t=t.data);try{var n=t.split("__Messenger__")}catch(e){return!0}for(var t=n[1],r=n[0].split("|"),i=r[0],o=r[1],a=0;a<e.listenFunc.length;a++)i+o===e.prefix+e.name&&e.listenFunc[a](t)};r?"addEventListener"in document?window.addEventListener("message",t,!1):"attachEvent"in document&&window.attachEvent("onmessage",t):window.navigator[this.prefix+this.name]=t},t.prototype.listen=function(e){for(var t=0,n=this.listenFunc.length,r=!1;t<n;t++)if(this.listenFunc[t]==e){r=!0;break}r||this.listenFunc.push(e)},t.prototype.clear=function(){this.listenFunc=[]},t.prototype.send=function(e){var t,n=this.targets;for(t in n)n.hasOwnProperty(t)&&n[t].send(e)},t}()}},["3000b356d9530a606bbf"]);