!function(n){var e={};function t(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=n,t.c=e,t.d=function(n,e,o){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:o})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)t.d(o,r,function(e){return n[e]}.bind(null,r));return o},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=2)}([function(n,e){n.exports=function(n){return window?window.fetch(n).then(function(n){return n.json()}):fetch(n).then(function(n){return n.json()})}},,function(n,e,t){t(0);self.oninstall=function(){caches.open("backgroundSyncExample").then(function(n){n.addAll(["/","index.html","index.js"]).then(function(){console.log("added file")}).catch(function(n){console.log(n)})}).catch(function(n){console.log("err ",n)})},self.onfetch=function(n){n.respondWith(caches.match(n.request).then(function(e){return e||fetch(n.request)}))},self.addEventListener("sync",function(n){console.log("i am sync"),console.log("event-tag == ",n.tag),console.log(new Date)})}]);