!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).Overlay={})}(this,(function(t){"use strict";class e extends HTMLElement{get raw(){return this.firstElementChild}get targetRect(){return this.target instanceof HTMLElement?this.target.getBoundingClientRect():this.target}get viewportRect(){return this.parent.getBoundingClientRect()}get animation(){return this.behavior.animation}markNeedRepaint(){this.unsetLayout(),this.performLayout()}unsetLayout(){this.style.width="max-content",this.style.height="max-content",this.style.left="0px",this.style.top="0px",this.getBoundingClientRect()}disconnectedCallback(){this.observer.disconnect(),window.removeEventListener("resize",this.markNeedRepaint.bind(this)),window.removeEventListener("scroll",this.markNeedRepaint.bind(this))}connectedCallback(){var t;if(this.style.display="block",this.style.position="fixed",this.style.left="0px",this.style.top="0px",this.style.width="max-content",this.style.height="max-content",this.performLayout(),this.target instanceof HTMLElement){this.observer=new MutationObserver(this.markNeedRepaint.bind(this)),this.observer.observe(this.target,{attributes:!0,characterData:!0,subtree:!0,childList:!0});let t=!1;const e=()=>{t=!0,i()},i=()=>{this.markNeedRepaint(),t&&requestAnimationFrame(i)};this.target.addEventListener("animationstart",e),this.target.addEventListener("animationend",(()=>t=!1)),this.target.addEventListener("transitionstart",e),this.target.addEventListener("transitionend",(()=>t=!1))}window.addEventListener("resize",this.markNeedRepaint.bind(this)),window.addEventListener("scroll",this.markNeedRepaint.bind(this)),(null===(t=this.animation)||void 0===t?void 0:t.fadein)&&queueMicrotask((()=>this.fadein()))}detach(t){var e;if(null===(e=this.animation)||void 0===e?void 0:e.fadeout)return this.fadeout(),this.onanimationend=()=>this.parent.removeChild(this),void(t&&t());this.parent.removeChild(this)}fadein(){this.style.animation=this.animation.fadein}fadeout(){this.style.animation=this.animation.fadeout}performLayout(){var t;const e=this.behavior.direction.performLayout(this),i=e.modifiedRect;this.style.width=`${i.width}px`,this.style.height=`${i.height}px`,this.style.left=`${i.x}px`,this.style.top=`${i.y}px`,null===(t=this.behavior.onLayoutBehind)||void 0===t||t.call(this.raw,e)}}customElements.define("overlay-layout",e);class i{constructor(t){this.viewport=t}}class o extends i{overflowed(t){const e=this.viewport,i=window.innerWidth-(t.x+t.width),o=window.innerWidth-this.viewport.right;return{left:Math.max(e.left-t.x,0),right:Math.max(o-i,0),top:Math.max(e.top-t.y,0),bottom:Math.max(t.y+t.height-e.bottom,0)}}}class r{static merge(t,e){var i,o,r,n;return new DOMRect(null!==(i=e.x)&&void 0!==i?i:t.x,null!==(o=e.y)&&void 0!==o?o:t.y,null!==(r=e.width)&&void 0!==r?r:t.width,null!==(n=e.height)&&void 0!==n?n:t.height)}static reflowHorizontal(t,e){return t.style.left=`${e.left}px`,t.style.top=`${e.top}px`,t.style.width=`${e.width}px`,t.style.height=null,t.getBoundingClientRect()}static reflowVertical(t,e){return t.style.left=`${e.left}px`,t.style.top=`${e.top}px`,t.style.width=null,t.style.height=`${e.height}px`,t.getBoundingClientRect()}static applyPadding(t,e){return new DOMRect(t.x+e,t.y+e,t.width-2*e,t.height-2*e)}}var n;!function(t){t.NONE="none",t.REFLOW="reflow",t.REFLOW_REPOSITION="reflow_reposition"}(n||(n={}));class a{constructor(t){this.parent=t,t&&(this.parent.child=this)}performLayout(t,e,i,o){const r=this.performLayoutHorizontal(t,e,i,o);return this.performLayoutVertical(t,r,i,o)}}class s extends a{constructor(t=n.NONE){super(),this.overflowBehavior=t}performLayoutVertical(t,e,i,o){let a=i.overflowed(e),s=!1,l=!1;return a.bottom&&(e=r.merge(e,{height:Math.max(e.height-a.bottom,0)}),s=!0,l=!0),a.top&&(e=r.merge(e,{y:e.y+a.top,height:e.height-a.top}),s=!0,l=!0),(s&&this.overflowBehavior==n.REFLOW||this.overflowBehavior==n.REFLOW_REPOSITION)&&(e=r.reflowVertical(t,e)),l&&this.overflowBehavior==n.REFLOW_REPOSITION&&(e=r.merge(e,{x:o(e).x})),e}performLayoutHorizontal(t,e,i,o){let n=i.overflowed(e),a=!1;return n.left&&(e=r.merge(e,{x:e.x+n.left,width:e.width-n.left}),e=r.reflowHorizontal(t,e),a=!0),n.right&&(e=r.merge(e,{width:e.width-n.right}),e=r.reflowHorizontal(t,e),a=!0),a&&(e=r.merge(e,{y:o(e).y})),e}}class l extends a{performLayoutVertical(t,e,i,o){var n,a;let s=i.overflowed(e),l=!1;return s.bottom?(e=r.merge(e,{y:e.y-s.bottom}),s=i.overflowed(e),s.top&&(l=!0)):s.top&&(e=r.merge(e,{y:e.y+s.top}),s=i.overflowed(e),s.bottom&&(l=!0)),l&&null!==(a=null===(n=this.parent)||void 0===n?void 0:n.performLayoutVertical(t,e,i,o))&&void 0!==a?a:e}performLayoutHorizontal(t,e,i,o){var n,a;let s=i.overflowed(e),l=!1;return s.left?(e=r.merge(e,{x:e.x+s.left}),s=i.overflowed(e),s.right&&(l=!0)):s.right&&(e=r.merge(e,{x:e.x-s.right}),s=i.overflowed(e),s.left&&(l=!0)),l&&null!==(a=null===(n=this.parent)||void 0===n?void 0:n.performLayoutHorizontal(t,e,i,o))&&void 0!==a?a:e}}class h{}class d extends h{createOverlayConstraint(t){return new o(t)}performLayout(t){var e,i,o;const n=t.getBoundingClientRect(),s=t.targetRect,l=t.viewportRect,h=t.behavior,d=null!==(e=h.alignment)&&void 0!==e?e:O.ALL,u=null!==(i=h.targetGap)&&void 0!==i?i:0,y=null!==(o=h.viewportPadding)&&void 0!==o?o:0,c=t=>this.perfromLayoutPosition(t,s,u),p=r.merge(n,c(n)),f=this.createOverlayConstraint(r.applyPadding(l,y));let v=p;if(d instanceof a)v=d.performLayout(t,p,f,c);else{console.assert(null!=d.horizontal),console.assert(null!=d.vertical);const e=d.horizontal.performLayoutHorizontal(t,p,f,c);v=d.vertical.performLayoutVertical(t,e,f,c)}return{initialRect:p,modifiedRect:v}}}class u extends d{perfromLayoutPosition(t,e,i){return{x:this.getPositionHorizontal(t,e,i),y:e.y+(e.height-t.height)/2}}}class y extends d{perfromLayoutPosition(t,e,i){return{x:e.x+(e.width-t.width)/2,y:this.getPositionVertical(t,e,i)}}}class c extends y{getPositionVertical(t,e,i){return e.bottom+i}}class p extends d{perfromLayoutPosition(t,e,i){return{x:e.right-t.width,y:e.bottom+i}}}class f extends d{perfromLayoutPosition(t,e,i){return{x:e.left,y:e.bottom+i}}}class v extends y{getPositionVertical(t,e,i){return e.top-t.height-i}}class m extends d{perfromLayoutPosition(t,e,i){return{x:e.right-t.width,y:e.y-t.height-i}}}class g extends d{perfromLayoutPosition(t,e,i){return{x:e.left,y:e.top-t.height-i}}}class w extends u{getPositionHorizontal(t,e,i){return e.left-t.width-i}}class L extends u{getPositionHorizontal(t,e,i){return e.right+i}}const x={BOTTOM_CENTER:new c,BOTTOM_RIGHT:new f,BOTTOM_LEFT:new p,TOP_CENTER:new v,TOP_RIGHT:new g,TOP_LEFT:new m,LEFT:new w,RIGHT:new L},O={ALL:new l(new s),NONE:new class extends a{performLayoutVertical(t,e){return e}performLayoutHorizontal(t,e){return e}},SIZE:new s,POSITION:new l};class E{static attach({element:t,target:e,parent:i,behavior:o}){if(null==t)throw new Error("todo");if(null==e)throw new Error("todo");if(null==i)throw new Error("todo");const r=document.createElement("overlay-layout");return r.append(t),r.target=e,r.parent=i,r.behavior=null!=o?o:E.defaultBehavior,this.overlays.set(t,r),i.append(r),r}static detach(t,e){t.detach(e)}static at({element:t,parent:e,behavior:i,position:o}){const r=document.createElement("overlay-layout");return r.append(t),r.target=new DOMRect(o.x,o.y),r.parent=null!=e?e:document.body,r.behavior=null!=i?i:E.defaultBehavior,this.overlays.set(t,r),e.append(r),r}}E.overlays=new Map,E.defaultBehavior={direction:x.BOTTOM_CENTER},t.BottomCenterOverlayLayout=c,t.BottomLeftOverlayLayout=p,t.BottomRightOverlayLayout=f,t.DrivenOverlayLayout=d,t.HorizontalCenterOverlayLayout=y,t.LeftOverlayLayout=w,t.Overlay=E,t.OverlayAlignment=O,t.OverlayDirection=x,t.OverlayElement=e,t.OverlayLayout=h,t.RightOverlayLayout=L,t.TopCenterOverlayLayout=v,t.TopLeftOverlayLayout=m,t.TopRightOverlayLayout=g,t.VerticalCenterOverlayLayout=u}));
//# sourceMappingURL=index.umd.js.map
