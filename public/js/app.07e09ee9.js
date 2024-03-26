(()=>{"use strict";var e={7451:(e,t,r)=>{var n=r(1957),o=r(1947),a=r(499),i=r(9835);function u(e,t,r,n,o,a){const u=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(u)}const s=(0,i.aZ)({name:"App"});var l=r(1639);const c=(0,l.Z)(s,[["render",u]]),d=c;var p=r(3340),f=r(8339);const m=[{path:"/update-frame",component:()=>Promise.all([r.e(736),r.e(64),r.e(573)]).then(r.bind(r,2573)),children:[{path:"/update-frame",component:()=>Promise.all([r.e(736),r.e(64),r.e(571)]).then(r.bind(r,5571))}]},{path:"/asset-packs-frame",component:()=>Promise.all([r.e(736),r.e(64),r.e(190)]).then(r.bind(r,7190)),children:[{path:"/asset-packs-frame",component:()=>Promise.all([r.e(736),r.e(64),r.e(319)]).then(r.bind(r,319))}]}],v=m,h=(0,p.BC)((function(){const e=f.PO,t=(0,f.p7)({scrollBehavior:()=>({left:0,top:0}),routes:v,history:e("/")});return t}));async function b(e,t){const r=e(d);r.use(o.Z,t);const n=(0,a.Xl)("function"===typeof h?await h({}):h);return{app:r,router:n}}var g=r(4328);const y={config:{},plugins:{Notify:g.Z}};async function w({app:e,router:t}){e.use(t),e.mount("#q-app")}b(n.ri,y).then(w)}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,r),a.exports}r.m=e,(()=>{var e=[];r.O=(t,n,o,a)=>{if(!n){var i=1/0;for(c=0;c<e.length;c++){for(var[n,o,a]=e[c],u=!0,s=0;s<n.length;s++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](n[s])))?n.splice(s--,1):(u=!1,a<i&&(i=a));if(u){e.splice(c--,1);var l=o();void 0!==l&&(t=l)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[n,o,a]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+(64===e?"chunk-common":e)+"."+{64:"71d29afd",110:"490512d9",126:"5a2c4b07",190:"f9ed9cc9",319:"4089ae77",571:"62129561",573:"1922fefd"}[e]+".js"})(),(()=>{r.miniCssF=e=>{}})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="momentum-fw.dev:";r.l=(n,o,a,i)=>{if(e[n])e[n].push(o);else{var u,s;if(void 0!==a)for(var l=document.getElementsByTagName("script"),c=0;c<l.length;c++){var d=l[c];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+a){u=d;break}}u||(s=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,r.nc&&u.setAttribute("nonce",r.nc),u.setAttribute("data-webpack",t+a),u.src=n),e[n]=[o];var p=(t,r)=>{u.onerror=u.onload=null,clearTimeout(f);var o=e[n];if(delete e[n],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((e=>e(r))),t)return t(r)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=p.bind(null,u.onerror),u.onload=p.bind(null,u.onload),s&&document.head.appendChild(u)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.j=143})(),(()=>{r.p="/"})(),(()=>{r.b=document.baseURI||self.location.href;var e={143:0};r.f.j=(t,n)=>{var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var a=new Promise(((r,n)=>o=e[t]=[r,n]));n.push(o[2]=a);var i=r.p+r.u(t),u=new Error,s=n=>{if(r.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;u.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",u.name="ChunkLoadError",u.type=a,u.request=i,o[1](u)}};r.l(i,s,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,n)=>{var o,a,[i,u,s]=n,l=0;if(i.some((t=>0!==e[t]))){for(o in u)r.o(u,o)&&(r.m[o]=u[o]);if(s)var c=s(r)}for(t&&t(n);l<i.length;l++)a=i[l],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(c)},n=globalThis["webpackChunkmomentum_fw_dev"]=globalThis["webpackChunkmomentum_fw_dev"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=r.O(void 0,[736],(()=>r(7451)));n=r.O(n)})();