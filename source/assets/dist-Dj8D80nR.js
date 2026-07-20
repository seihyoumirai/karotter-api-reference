import{r as t}from"./rolldown-runtime-NMqb_1LM.js";import{i as e}from"./react-vendor-DOWtrr9O.js";var r=t(e(),1),a={data:""},o=t=>{if("object"==typeof window){let e=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return e.nonce=window.__nonce__,e.parentNode||(t||document.head).appendChild(e),e.firstChild}return t||a},i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,s=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,l=(t,e)=>{let r="",a="",o="";for(let i in t){let s=t[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?l(s,i):i+"{"+l(s,"k"==i[1]?"":e)+"}":"object"==typeof s?a+=l(s,e?e.replace(/([^,])+/g,t=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,e=>/&/.test(e)?e.replace(/&/g,t):t?t+" "+e:e)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=l.p?l.p(i,s):i+":"+s+";")}return r+(e&&o?e+"{"+o+"}":o)+a},d={},c=t=>{if("object"==typeof t){let e="";for(let r in t)e+=r+c(t[r]);return e}return t},p=(t,e,r,a,o)=>{let p=c(t),m=d[p]||(d[p]=(t=>{let e=0,r=11;for(;e<t.length;)r=101*r+t.charCodeAt(e++)>>>0;return"go"+r})(p));if(!d[m]){let e=p!==t?t:(t=>{let e,r,a=[{}];for(;e=i.exec(t.replace(s,""));)e[4]?a.shift():e[3]?(r=e[3].replace(n," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][e[1]]=e[2].replace(n," ").trim();return a[0]})(t);d[m]=l(o?{["@keyframes "+m]:e}:e,r?"":"."+m)}let u=r&&d.g?d.g:null;return r&&(d.g=d[m]),((t,e,r,a)=>{a?e.data=e.data.replace(a,t):-1===e.data.indexOf(t)&&(e.data=r?t+e.data:e.data+t)})(d[m],e,a,u),m};function m(t){let e=this||{},r=t.call?t(e.p):t;return p(r.unshift?r.raw?((t,e,r)=>t.reduce((t,a,o)=>{let i=e[o];if(i&&i.call){let t=i(r),e=t&&t.props&&t.props.className||/^go/.test(t)&&t;i=e?"."+e:t&&"object"==typeof t?t.props?"":l(t,""):!1===t?"":t}return t+a+(null==i?"":i)},""))(r,[].slice.call(arguments,1),e.p):r.reduce((t,r)=>Object.assign(t,r&&r.call?r(e.p):r),{}):r,o(e.target),e.g,e.o,e.k)}m.bind({g:1});var u,f,g,y=m.bind({k:1});function b(t,e){let r=this||{};return function(){let a=arguments;function o(i,s){let n=Object.assign({},i),l=n.className||o.className;r.p=Object.assign({theme:f&&f()},n),r.o=/ *go\d+/.test(l),n.className=m.apply(r,a)+(l?" "+l:""),e&&(n.ref=s);let d=t;return t[0]&&(d=n.as||t,delete n.as),g&&d[0]&&g(n),u(d,n)}return e?e(o):o}}var h=(t,e)=>(t=>"function"==typeof t)(t)?t(e):t,x=(()=>{let t=0;return()=>(++t).toString()})(),v=(()=>{let t;return()=>{if(void 0===t&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),w="default",$=(t,e)=>{let{toastLimit:r}=t.settings;switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,r)};case 1:return{...t,toasts:t.toasts.map(t=>t.id===e.toast.id?{...t,...e.toast}:t)};case 2:let{toast:a}=e;return $(t,{type:t.toasts.find(t=>t.id===a.id)?1:0,toast:a});case 3:let{toastId:o}=e;return{...t,toasts:t.toasts.map(t=>t.id===o||void 0===o?{...t,dismissed:!0,visible:!1}:t)};case 4:return void 0===e.toastId?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(t=>t.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let i=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(t=>({...t,pauseDuration:t.pauseDuration+i}))}}},j=[],E={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},A=(t,e=w)=>{k[e]=$(k[e]||E,t),j.forEach(([t,r])=>{t===e&&r(k[e])})},z=t=>Object.keys(k).forEach(e=>A(t,e)),N=(t=w)=>e=>{A(e,t)},O=t=>(e,r)=>{let a=((t,e="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...r,id:(null==r?void 0:r.id)||x()}))(e,t,r);return N(a.toasterId||(t=>Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===t)))(a.id))({type:2,toast:a}),a.id},_=(t,e)=>O("blank")(t,e);_.error=O("error"),_.success=O("success"),_.loading=O("loading"),_.custom=O("custom"),_.dismiss=(t,e)=>{let r={type:3,toastId:t};e?N(e)(r):z(r)},_.dismissAll=t=>_.dismiss(void 0,t),_.remove=(t,e)=>{let r={type:4,toastId:t};e?N(e)(r):z(r)},_.removeAll=t=>_.remove(void 0,t),_.promise=(t,e,r)=>{let a=_.loading(e.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof t&&(t=t()),t.then(t=>{let o=e.success?h(e.success,t):void 0;return o?_.success(o,{id:a,...r,...null==r?void 0:r.success}):_.dismiss(a),t}).catch(t=>{let o=e.error?h(e.error,t):void 0;o?_.error(o,{id:a,...r,...null==r?void 0:r.error}):_.dismiss(a)}),t};var I=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,C=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,D=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${C} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,L=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,S=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${L} 1s linear infinite;
`,M=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,P=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,T=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${P} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,q=b("div")`
  position: absolute;
`,H=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Z=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Z} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,G=({toast:t})=>{let{icon:e,type:a,iconTheme:o}=t;return void 0!==e?"string"==typeof e?r.createElement(B,null,e):e:"blank"===a?null:r.createElement(H,null,r.createElement(S,{...o}),"loading"!==a&&r.createElement(q,null,"error"===a?r.createElement(D,{...o}):r.createElement(T,{...o})))},J=t=>`\n0% {transform: translate3d(0,${-200*t}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,K=t=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*t}%,-1px) scale(.6); opacity:0;}\n`,Q=b("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,R=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;r.memo(({toast:t,position:e,style:a,children:o})=>{let i=t.height?((t,e)=>{let r=t.includes("top")?1:-1,[a,o]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[J(r),K(r)];return{animation:e?`${y(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||e||"top-center",t.visible):{opacity:0},s=r.createElement(G,{toast:t}),n=r.createElement(R,{...t.ariaProps},h(t.message,t));return r.createElement(Q,{className:t.className,style:{...i,...a,...t.style}},"function"==typeof o?o({icon:s,message:n}):r.createElement(r.Fragment,null,s,n))});!function(t,e,r,a){l.p=e,u=t,f=r,g=a}(r.createElement);m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var U=_;export{U as t};