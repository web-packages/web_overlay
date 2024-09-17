class t extends HTMLElement{constructor(){super(...arguments),this.isMarkNeedRepaint=!0}get raw(){return this.firstElementChild}get targetRect(){return this.target instanceof HTMLElement?this.target.getBoundingClientRect():this.target}get viewportRect(){return this.parent.getBoundingClientRect()}get animation(){return this.behavior.animation}markNeedRepaint(){this.unsetLayout(),this.performLayout()}unsetLayout(){this.style.width="max-content",this.style.height="max-content",this.style.left="0px",this.style.top="0px",this.getBoundingClientRect()}disconnectedCallback(){this.isMarkNeedRepaint=!1,window.removeEventListener("resize",this.markNeedRepaint.bind(this)),window.removeEventListener("scroll",this.markNeedRepaint.bind(this))}connectedCallback(){var t;if(this.style.display="block",this.style.position="fixed",this.style.left="0px",this.style.top="0px",this.style.width="max-content",this.style.height="max-content",this.performLayout(),this.target instanceof HTMLElement){const t=()=>{this.isMarkNeedRepaint&&(this.markNeedRepaint(),requestAnimationFrame(t))};requestAnimationFrame(t)}window.addEventListener("resize",this.markNeedRepaint.bind(this)),window.addEventListener("scroll",this.markNeedRepaint.bind(this)),(null===(t=this.animation)||void 0===t?void 0:t.fadein)&&queueMicrotask((()=>this.fadein())),this.onanimationend=()=>this.style.animation=null}detach(t){var e;if(null===(e=this.animation)||void 0===e?void 0:e.fadeout)return this.fadeout(),this.onanimationend=()=>this.parent.removeChild(this),void(t&&t());this.parent.removeChild(this)}fadein(){this.style.animation=this.animation.fadein}fadeout(){this.style.animation=this.animation.fadeout}performLayout(){var t;if(this.target instanceof HTMLElement){let t=this.target;for(t.isConnected||this.remove();t;){const e=getComputedStyle(t);if("none"==e.display||"contents"==e.display)return this.style.display="none";t=t.parentElement}}"none"==this.style.display&&(this.style.display="block");const e=this.behavior.direction.performLayout(this),i=e.modifiedRect;this.style.width=`${i.width}px`,this.style.height=`${i.height}px`,this.style.left=`${i.x}px`,this.style.top=`${i.y}px`,null===(t=this.behavior.onLayoutBehind)||void 0===t||t.call(this.raw,e)}}customElements.define("overlay-layout",t);class e{constructor(t){this.viewport=t}}class i extends e{overflowed(t){const e=this.viewport,i=window.innerWidth-(t.x+t.width),o=window.innerWidth-this.viewport.right;return{left:Math.max(e.left-t.x,0),right:Math.max(o-i,0),top:Math.max(e.top-t.y,0),bottom:Math.max(t.y+t.height-e.bottom,0)}}}class o{static merge(t,e){var i,o,r,n;return new DOMRect(null!==(i=e.x)&&void 0!==i?i:t.x,null!==(o=e.y)&&void 0!==o?o:t.y,null!==(r=e.width)&&void 0!==r?r:t.width,null!==(n=e.height)&&void 0!==n?n:t.height)}static reflowHorizontal(t,e){return t.style.left=`${e.left}px`,t.style.top=`${e.top}px`,t.style.width=`${e.width}px`,t.style.height=null,t.getBoundingClientRect()}static reflowVertical(t,e){return t.style.left=`${e.left}px`,t.style.top=`${e.top}px`,t.style.width=null,t.style.height=`${e.height}px`,t.getBoundingClientRect()}static applyPadding(t,e){return new DOMRect(t.x+e,t.y+e,t.width-2*e,t.height-2*e)}}var r;!function(t){t.NONE="none",t.REFLOW="reflow",t.REFLOW_REPOSITION="reflow_reposition"}(r||(r={}));class n{constructor(t){this.parent=t,t&&(this.parent.child=this)}performLayout(t,e,i,o){const r=this.performLayoutHorizontal(t,e,i,o);return this.performLayoutVertical(t,r,i,o)}}class a extends n{constructor(t=r.NONE){super(),this.overflowBehavior=t}performLayoutVertical(t,e,i,n){let a=i.overflowed(e),s=!1,l=!1;return a.bottom&&(e=o.merge(e,{height:Math.max(e.height-a.bottom,0)}),s=!0,l=!0),a.top&&(e=o.merge(e,{y:e.y+a.top,height:e.height-a.top}),s=!0,l=!0),(s&&this.overflowBehavior==r.REFLOW||this.overflowBehavior==r.REFLOW_REPOSITION)&&(e=o.reflowVertical(t,e)),l&&this.overflowBehavior==r.REFLOW_REPOSITION&&(e=o.merge(e,{x:n(e).x})),e}performLayoutHorizontal(t,e,i,r){let n=i.overflowed(e),a=!1;return n.left&&(e=o.merge(e,{x:e.x+n.left,width:e.width-n.left}),e=o.reflowHorizontal(t,e),a=!0),n.right&&(e=o.merge(e,{width:e.width-n.right}),e=o.reflowHorizontal(t,e),a=!0),a&&(e=o.merge(e,{y:r(e).y})),e}}class s extends n{performLayoutVertical(t,e,i,r){var n,a;let s=i.overflowed(e),l=!1;return s.bottom?(e=o.merge(e,{y:e.y-s.bottom}),s=i.overflowed(e),s.top&&(l=!0)):s.top&&(e=o.merge(e,{y:e.y+s.top}),s=i.overflowed(e),s.bottom&&(l=!0)),l&&null!==(a=null===(n=this.parent)||void 0===n?void 0:n.performLayoutVertical(t,e,i,r))&&void 0!==a?a:e}performLayoutHorizontal(t,e,i,r){var n,a;let s=i.overflowed(e),l=!1;return s.left?(e=o.merge(e,{x:e.x+s.left}),s=i.overflowed(e),s.right&&(l=!0)):s.right&&(e=o.merge(e,{x:e.x-s.right}),s=i.overflowed(e),s.left&&(l=!0)),l&&null!==(a=null===(n=this.parent)||void 0===n?void 0:n.performLayoutHorizontal(t,e,i,r))&&void 0!==a?a:e}}class l{}class h extends l{createOverlayConstraint(t){return new i(t)}performLayout(t){var e,i,r;const a=t.getBoundingClientRect(),s=t.targetRect,l=t.viewportRect,h=t.behavior,d=null!==(e=h.alignment)&&void 0!==e?e:L.ALL,u=null!==(i=h.targetGap)&&void 0!==i?i:0,c=null!==(r=h.viewportPadding)&&void 0!==r?r:0,p=t=>this.perfromLayoutPosition(t,s,u),m=o.merge(a,p(a)),y=this.createOverlayConstraint(o.applyPadding(l,c));let f=m;if(d instanceof n)f=d.performLayout(t,m,y,p);else{console.assert(null!=d.horizontal),console.assert(null!=d.vertical);const e=d.horizontal.performLayoutHorizontal(t,m,y,p);f=d.vertical.performLayoutVertical(t,e,y,p)}return{initialRect:m,modifiedRect:f}}}class d extends h{perfromLayoutPosition(t,e,i){return{x:this.getPositionHorizontal(t,e,i),y:e.y+(e.height-t.height)/2}}}class u extends h{perfromLayoutPosition(t,e,i){return{x:e.x+(e.width-t.width)/2,y:this.getPositionVertical(t,e,i)}}}class c extends u{getPositionVertical(t,e,i){return e.bottom+i}}class p extends h{perfromLayoutPosition(t,e,i){return{x:e.right-t.width,y:e.bottom+i}}}class m extends h{perfromLayoutPosition(t,e,i){return{x:e.left,y:e.bottom+i}}}class y extends u{getPositionVertical(t,e,i){return e.top-t.height-i}}class f extends h{perfromLayoutPosition(t,e,i){return{x:e.right-t.width,y:e.y-t.height-i}}}class w extends h{perfromLayoutPosition(t,e,i){return{x:e.left,y:e.top-t.height-i}}}class g extends d{getPositionHorizontal(t,e,i){return e.left-t.width-i}}class v extends d{getPositionHorizontal(t,e,i){return e.right+i}}const x={BOTTOM_CENTER:new c,BOTTOM_RIGHT:new m,BOTTOM_LEFT:new p,TOP_CENTER:new y,TOP_RIGHT:new w,TOP_LEFT:new f,LEFT:new g,RIGHT:new v},L={ALL:new s(new a),NONE:new class extends n{performLayoutVertical(t,e){return e}performLayoutHorizontal(t,e){return e}},SIZE:new a,POSITION:new s};class R{static attach({element:t,target:e,parent:i,behavior:o}){if(null==t)throw new Error("todo");if(null==e)throw new Error("todo");if(null==i)throw new Error("todo");const r=document.createElement("overlay-layout");return r.append(t),r.target=e,r.parent=i,r.behavior=null!=o?o:R.defaultBehavior,this.overlays.set(t,r),i.append(r),r}static detach(t,e){t.detach(e)}static at({element:t,parent:e,behavior:i,position:o}){const r=document.createElement("overlay-layout");return r.append(t),r.target=new DOMRect(o.x,o.y),r.parent=null!=e?e:document.body,r.behavior=null!=i?i:R.defaultBehavior,this.overlays.set(t,r),e.append(r),r}}R.overlays=new Map,R.defaultBehavior={direction:x.BOTTOM_CENTER};export{c as BottomCenterOverlayLayout,p as BottomLeftOverlayLayout,m as BottomRightOverlayLayout,h as DrivenOverlayLayout,u as HorizontalCenterOverlayLayout,g as LeftOverlayLayout,R as Overlay,L as OverlayAlignment,x as OverlayDirection,t as OverlayElement,l as OverlayLayout,v as RightOverlayLayout,y as TopCenterOverlayLayout,f as TopLeftOverlayLayout,w as TopRightOverlayLayout,d as VerticalCenterOverlayLayout};
//# sourceMappingURL=index.esm.js.map
