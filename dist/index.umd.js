!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).Overlay={})}(this,(function(t){"use strict";class e{reflow(t){t.getBoundingClientRect()}}const i={BOTTOM:new class extends e{performLayout(t){var e,i;const n=t.getBoundingClientRect(),s=t.target.getBoundingClientRect(),r=t.parent.getBoundingClientRect(),l=t.behavior.alignment;null!==(e=null==l?void 0:l.x)&&void 0!==e||o.ALL,null!==(i=null==l?void 0:l.y)&&void 0!==i||o.ALL;const h=s.x+(s.width-n.width)/2,a=s.y+s.height,d=window.innerWidth-(h+n.width),c=window.innerWidth-r.right,y={left:Math.max(r.left-h,0),right:Math.max(c-d,0),bottom:Math.max(a+n.height-r.bottom,0)};console.log(y);const u=h+y.left,p=a-y.bottom;return{x:Math.max(u,0),y:Math.max(p,0),size:{width:Math.min(n.width,r.width),height:Math.min(n.height,n.bottom+p)}}}}};var o;!function(t){t.NONE="none",t.ALL="all",t.SIZE="size",t.POSITION="position"}(o||(o={}));class n{static attach(t,e,o=document.body,n={render:i.BOTTOM}){if(null==t)throw new Error("todo");if(null==e)throw new Error("todo");if(null==o)throw new Error("todo");const s=document.createElement("overlay-wrapper");return s.append(t),s.target=e,s.parent=o,s.behavior=n,this.overlays.set(t,s),o.append(s),s}static detach(t){console.log(this.overlays.get(t))}}n.overlays=new Map;class s extends HTMLElement{unsetLayout(){this.style.width="max-content",this.style.height="max-content",this.style.left="0px",this.style.top="0px",this.getBoundingClientRect()}disconnectedCallback(){this.observer.disconnect()}connectedCallback(){this.style.display="block",this.style.position="fixed",this.style.left="0px",this.style.top="0px",this.style.width="max-content",this.style.height="max-content",this.performLayout(),this.observer=new MutationObserver((()=>{this.unsetLayout(),this.performLayout()})),this.observer.observe(this.firstElementChild,{attributes:!0,characterData:!0,subtree:!0,childList:!0}),window.addEventListener("resize",(()=>{this.unsetLayout(),this.performLayout()}))}performLayout(){const t=this.behavior.render.performLayout(this);this.style.width=`${t.size.width}px`,this.style.height=`${t.size.height}px`,this.style.left=`${t.x}px`,this.style.top=`${t.y}px`}}customElements.define("overlay-wrapper",s),t.Overlay=n,t.OverlayAlignment=i,t.OverlayElement=s,t.OverlayRender=e}));
//# sourceMappingURL=index.umd.js.map
