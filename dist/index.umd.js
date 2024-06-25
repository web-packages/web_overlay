!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).Overlay={})}(this,(function(t){"use strict";class e{constructor(t,e){this.viewport=t,this.alignment=e}}class i extends e{getOverflowed(t){const e=this.viewport,i=window.innerWidth-(t.x+t.width),r=window.innerWidth-this.viewport.right;return{left:Math.max(e.left-t.x,0),right:Math.max(r-i,0),top:Math.max(e.top-t.y,0),bottom:Math.max(t.y+t.height-e.bottom,0)}}}class r{static merge(t,e){var i,r,o,n;return new DOMRect(null!==(i=e.x)&&void 0!==i?i:t.x,null!==(r=e.y)&&void 0!==r?r:t.y,null!==(o=e.width)&&void 0!==o?o:t.width,null!==(n=e.height)&&void 0!==n?n:t.height)}static reflowHorizontal(t,e){return t.style.left=`${e.left}px`,t.style.top=`${e.top}px`,t.style.width=`${e.width}px`,t.style.height=null,t.getBoundingClientRect()}}class o{constructor(t,e){this.element=t,this.behavior=e}performLayout(t,e){return this.performLayoutVertical(this.performLayoutHorizontal(t,e),e)}}class n extends o{performLayoutHorizontal(t,e){let i=e.getOverflowed(t);return i.left?(t=r.merge(t,{x:t.x+i.left}),i=e.getOverflowed(t),i.right&&(t=r.merge(t,{width:t.width-i.right}),t=r.reflowHorizontal(this.element,t))):i.right&&(t=r.merge(t,{x:t.x-Math.max(i.right,e.viewport.left)}),i=e.getOverflowed(t),i.left&&(t=r.merge(t,{x:t.x+i.left,width:t.width-i.left}),t=r.reflowHorizontal(this.element,t))),t}performLayoutVertical(t,e){let i=e.getOverflowed(t);if(i.bottom){if(t=r.merge(t,{y:t.y-i.bottom}),i=e.getOverflowed(t),i.top)return r.merge(t,{y:t.y+i.top,height:Math.max(t.height-i.top,0)})}else if(i.top&&(t=r.merge(t,{y:t.y+i.top}),i=e.getOverflowed(t),i.bottom))return r.merge(t,{height:Math.max(t.height-i.bottom,0)});return t}}class s{reflow(t,e){return null!=(null==e?void 0:e.width)&&(t.style.width=`${e.width}px`),null!=(null==e?void 0:e.height)&&(t.style.height=`${e.height}px`),null!=e.x&&(t.style.left=`${e.x}px`),null!=e.y&&(t.style.top=`${e.y}px`),t.getBoundingClientRect()}}class l extends s{createOverlayConstraint(t,e){return new i(t,e)}createOverlayRenderAdjuster(t,e){return new n(t,e)}}const h=new class extends l{performLayout(e){const i=e.target.getBoundingClientRect(),o=e.parent.getBoundingClientRect(),n=e.behavior;let s=e.getBoundingClientRect();const l=i.x+(i.width-s.width)/2,h=i.bottom;s=r.merge(s,{x:l,y:h});const a=this.createOverlayConstraint(o,t.OverlayAlignment.ALL);return s=this.createOverlayRenderAdjuster(e,n).performLayout(s,a),{x:s.x,y:s.y,size:{width:s.width,height:s.height}}}};var a;t.OverlayAlignment=void 0,(a=t.OverlayAlignment||(t.OverlayAlignment={})).ALL="all",a.NONE="none",a.SIZE="size",a.POSITION="position";class d{static attach(t,e,i=document.body,r={render:h}){if(null==t)throw new Error("todo");if(null==e)throw new Error("todo");if(null==i)throw new Error("todo");const o=document.createElement("overlay-wrapper");return o.append(t),o.target=e,o.parent=i,o.behavior=r,this.overlays.set(t,o),i.append(o),o}static detach(t){console.log(this.overlays.get(t))}}d.overlays=new Map;class y extends HTMLElement{markNeedRepaint(){this.unsetLayout(),this.performLayout()}unsetLayout(){this.style.width="max-content",this.style.height="max-content",this.style.left="0px",this.style.top="0px",this.getBoundingClientRect()}disconnectedCallback(){this.observer.disconnect(),window.removeEventListener("resize",this.markNeedRepaint.bind(this)),window.removeEventListener("scroll",this.markNeedRepaint.bind(this))}connectedCallback(){this.style.display="block",this.style.position="fixed",this.style.left="0px",this.style.top="0px",this.style.width="max-content",this.style.height="max-content",this.performLayout(),this.observer=new MutationObserver(this.markNeedRepaint.bind(this)),this.observer.observe(this.firstElementChild,{attributes:!0,characterData:!0,subtree:!0,childList:!0}),window.addEventListener("resize",this.markNeedRepaint.bind(this)),window.addEventListener("scroll",this.markNeedRepaint.bind(this))}performLayout(){const t=this.behavior.render.performLayout(this);this.style.width=`${t.size.width}px`,this.style.height=`${t.size.height}px`,this.style.left=`${t.x}px`,this.style.top=`${t.y}px`}}customElements.define("overlay-wrapper",y),t.Overlay=d,t.OverlayElement=y,t.OverlayRender=s}));
//# sourceMappingURL=index.umd.js.map
