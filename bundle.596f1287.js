parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"LEjR":[function(require,module,exports) {

},{}],"NewY":[function(require,module,exports) {
"use strict";var t=this&&this.__awaiter||function(t,e,r,s){return new(r||(r=Promise))(function(n,i){function o(t){try{a(s.next(t))}catch(e){i(e)}}function h(t){try{a(s.throw(t))}catch(e){i(e)}}function a(t){var e;t.done?n(t.value):(e=t.value,e instanceof r?e:new r(function(t){t(e)})).then(o,h)}a((s=s.apply(t,e||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Router=void 0;class e{constructor(){this._listeners=[],this._currentID=String(+new Date),this._states={},this._states[this._currentID]={url:"",onBeforeEnterArgs:null,onEnterArgs:null,onLeaveArgs:null},this._forward=!0,window.addEventListener("popstate",e=>t(this,void 0,void 0,function*(){let t=this._findNeedURLs(this._states[this._currentID].url);if(e.isTrusted){if(!this._states[this._currentID]||!this._states[e.state.id])return;this._forward=Number(this._currentID)<Number(e.state.id);for(let e=0;e<t.length;e++)yield t[e].onLeave(this._forward,...this._states[this._currentID].onLeaveArgs);this._currentID=e.state.id,t=this._findNeedURLs(this._states[this._currentID].url);for(let e=0;e<t.length;e++)yield t[e].onBeforeEnter(this._forward,...this._states[this._currentID].onBeforeEnterArgs);window.dispatchEvent(new Event("popstate"))}else{for(let e=0;e<t.length;e++)yield t[e].render(this._forward,...this._states[this._currentID].renderArgs);t=this._findNeedURLs(this._states[this._currentID].url);for(let e=0;e<t.length;e++)yield t[e].onEnter(this._forward,...this._states[this._currentID].onEnterArgs)}}))}_findNeedURLs(t){return this._listeners.filter(e=>{const r=e.url;return r instanceof RegExp?!!t.match(r):(r instanceof Function?r():r)===t})}go(e,r,s,n,i){return t(this,void 0,void 0,function*(){this._forward=!0;let t=this._findNeedURLs(this._states[this._currentID].url);for(let e=0;e<t.length;e++)yield t[e].onLeave(!0,...this._states[this._currentID].onLeaveArgs);const o=String(+new Date);this._states[o]={url:e,onBeforeEnterArgs:r,onEnterArgs:s,onLeaveArgs:n,renderArgs:i},t=this._findNeedURLs(e);for(let e=0;e<t.length;e++)yield t[e].onBeforeEnter(!0,...r);this._currentID=o,history.pushState({id:o},e,e),window.dispatchEvent(new Event("popstate"))})}on(t,e,r,s,n){this._listeners.push({url:t,onBeforeEnter:e,onEnter:r,onLeave:s,render:n})}}exports.Router=e;
},{}],"rNk5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.startVisualisation=exports.hooksCreator=exports.renderCreator=exports.getRandomColor=void 0;const o=require("./router"),e=()=>{const o=(7*Math.random()+6|0).toString(16),e=(7*Math.random()+6|0).toString(16),t=(7*Math.random()+6|0).toString(16);return"#".concat(o).concat(e).concat(t)};exports.getRandomColor=e;const t=o=>(function(){const e=document.getElementById("logs"),t=document.createElement("p");t.innerHTML="Rendering page ".concat(location.href.replace(location.origin,""),' from the link "').concat(arguments.length<=1?void 0:arguments[1],'"'),t.classList.add(o),t.style["background-color"]=arguments.length<=2?void 0:arguments[2],e.appendChild(t)});exports.renderCreator=t;const n=function(o){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.5;return Math.random()<e?function(){const e=document.getElementById("logs"),t=document.createElement("p");t.innerHTML="onBeforeEnter()"===o?(arguments.length<=0?void 0:arguments[0])?"let's call ".concat(o," and go FORWARD to the page ").concat(arguments.length<=1?void 0:arguments[1]):"let's call ".concat(o," and go BACK to the page ").concat(arguments.length<=1?void 0:arguments[1]):"onEnter()"===o?"let's call ".concat(o," and please work with the page ").concat(arguments.length<=1?void 0:arguments[1]):"let's call ".concat(o," and say goodbue to the page ").concat(arguments.length<=1?void 0:arguments[1]),t.classList.add("log-container__text"),t.style["background-color"]=arguments.length<=2?void 0:arguments[2],e.appendChild(t)}:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return new Promise(e=>{setTimeout(()=>{const n=document.getElementById("logs"),r=document.createElement("p");r.innerHTML="onBeforeEnter()"===o?t[0]?"let's call ASYNC ".concat(o," and go FORWARD to the page ").concat(t[1]):"let's call ASYNC ".concat(o," and go BACK to the page ").concat(t[1]):"onEnter()"===o?"let's call ASYNC ".concat(o," and please work with the page ").concat(t[1]):"let's call ASYNC ".concat(o," and say goodbue to the page ").concat(t[1]),r.classList.add("log-container__text"),r.style["background-color"]=t[2],n.appendChild(r),e("async operation end")},100)})}};exports.hooksCreator=n;const r=e=>{const t=new o.Router,n=document.querySelectorAll("a");n&&n.forEach(o=>{o.addEventListener("click",o=>{const e=o.target.href.replace(location.origin,""),n=(0,exports.getRandomColor)();t.go(e,[e,n],[e,n],[e,n],[o.target.innerHTML,n]),o.preventDefault()})}),t.on(new RegExp("^/otus-learning/[a-zA-z]+[0-9]*$"),(0,exports.hooksCreator)("onBeforeEnter()",e),(0,exports.hooksCreator)("onEnter()",e),(0,exports.hooksCreator)("onLeave()",e),(0,exports.renderCreator)("log-container__text")),t.on(()=>"/otus-learning/links/Link7",(0,exports.hooksCreator)("onBeforeEnter()",e),(0,exports.hooksCreator)("onEnter()",e),(0,exports.hooksCreator)("onLeave()",e),(0,exports.renderCreator)("log-container__text--dotted")),t.on("/otus-learning/",(0,exports.hooksCreator)("onBeforeEnter()",e),(0,exports.hooksCreator)("onEnter()",e),(0,exports.hooksCreator)("onLeave()",e),(0,exports.renderCreator)("log-container__text--bordered")),document.body.onload=(()=>{const o=(0,exports.getRandomColor)();let e=location.href.replace(location.origin,"");t.go(e,[e,o],[e,o],[e,o],["reloaded page",o])})};exports.startVisualisation=r;
},{"./router":"NewY"}],"pqk3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),require("../scss/reset.scss"),require("../scss/style.scss");const s=require("./routerVisualisation");(0,s.startVisualisation)(.5);
},{"../scss/reset.scss":"LEjR","../scss/style.scss":"LEjR","./routerVisualisation":"rNk5"}]},{},["pqk3"], null)
//# sourceMappingURL=otus-learning/bundle.596f1287.js.map