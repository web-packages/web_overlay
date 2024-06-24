!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).Overlay={})}(this,(function(t){"use strict";class e{constructor(t,e){this.viewport=t,this.alignment=e}}class i extends e{getSized(t){throw new Error("Method not implemented.")}getOverflowed(t){const e=this.viewport,i=window.innerWidth-(t.x+t.width),n=window.innerWidth-this.viewport.right;return{left:Math.max(e.left-t.x,0),right:Math.max(n-i,0),top:Math.max(e.top-t.y,0),bottom:Math.max(t.y+t.height-e.bottom,0)}}}class n{reflow(t,e){var i,n;return null!=(null===(i=e.size)||void 0===i?void 0:i.width)&&(t.style.width=`${e.size.width}px`),null!=(null===(n=e.size)||void 0===n?void 0:n.height)&&(t.style.height=`${e.size.height}px`),null!=e.x&&(t.style.left=`${e.x}px`),null!=e.y&&(t.style.top=`${e.y}px`),t.getBoundingClientRect()}mergeRect(t,e){var i,n,s,o;return new DOMRect(null!==(i=e.x)&&void 0!==i?i:t.x,null!==(n=e.y)&&void 0!==n?n:t.y,null!==(s=e.width)&&void 0!==s?s:t.width,null!==(o=e.height)&&void 0!==o?o:t.height)}}class s extends n{createOverlayConstraint(t,e){return new i(t,e)}}const o=new class extends s{performLayout(e){var i,n;const s=e.target.getBoundingClientRect(),o=e.parent.getBoundingClientRect(),l=e.behavior.alignment;null!==(i=null==l?void 0:l.x)&&void 0!==i||t.OverlayAlignment.ALL,null!==(n=null==l?void 0:l.y)&&void 0!==n||t.OverlayAlignment.ALL;let r=e.getBoundingClientRect();const h=s.x+(s.width-r.width)/2,a=s.bottom;r=this.mergeRect(r,{x:h,y:a});const d=this.createOverlayConstraint(o,t.OverlayAlignment.ALL).getOverflowed(r),y=h+d.left,c=a-d.bottom;return r=this.reflow(e,{x:y,y:c}),{x:y,y:c,size:{width:Math.min(r.width,o.width),height:Math.min(r.height,o.height)}}}};var l;t.OverlayAlignment=void 0,(l=t.OverlayAlignment||(t.OverlayAlignment={})).NONE="none",l.ALL="all",l.SIZE="size",l.POSITION="position";class r{static attach(t,e,i=document.body,n={render:o}){if(null==t)throw new Error("todo");if(null==e)throw new Error("todo");if(null==i)throw new Error("todo");const s=document.createElement("overlay-wrapper");return s.append(t),s.target=e,s.parent=i,s.behavior=n,this.overlays.set(t,s),i.append(s),s}static detach(t){console.log(this.overlays.get(t))}}r.overlays=new Map;class h extends HTMLElement{markNeedRepaint(){this.unsetLayout(),this.performLayout()}unsetLayout(){this.style.width="max-content",this.style.height="max-content",this.style.left="0px",this.style.top="0px",this.getBoundingClientRect()}disconnectedCallback(){this.observer.disconnect(),window.removeEventListener("resize",this.markNeedRepaint.bind(this)),window.removeEventListener("scroll",this.markNeedRepaint.bind(this))}connectedCallback(){this.style.display="block",this.style.position="fixed",this.style.left="0px",this.style.top="0px",this.style.width="max-content",this.style.height="max-content",this.performLayout(),this.observer=new MutationObserver(this.markNeedRepaint.bind(this)),this.observer.observe(this.firstElementChild,{attributes:!0,characterData:!0,subtree:!0,childList:!0}),window.addEventListener("resize",this.markNeedRepaint.bind(this)),window.addEventListener("scroll",this.markNeedRepaint.bind(this))}performLayout(){const t=this.behavior.render.performLayout(this);this.style.width=`${t.size.width}px`,this.style.height=`${t.size.height}px`,this.style.left=`${t.x}px`,this.style.top=`${t.y}px`}}customElements.define("overlay-wrapper",h),t.Overlay=r,t.OverlayElement=h,t.OverlayRender=n}));
//# sourceMappingURL=index.umd.js.map
