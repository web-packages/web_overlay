!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).Overlay={})}(this,(function(t){"use strict";class e{reflow(t){t.getBoundingClientRect()}}class i extends e{performLayout(t){var e;const i=t.getBoundingClientRect(),s=t.target.getBoundingClientRect(),o=t.parent.getBoundingClientRect();null===(e=t.option)||void 0===e||e.padding;const n={x:Math.max(i.x-o.x,0),y:Math.max(i.y-o.y,0)},r=s.x+i.width,l=s.x+(s.right-r)/2,h=s.y+s.height;return console.log(n),{x:l,y:h,size:{width:i.width,height:i.height}}}}const s={AUTO:"auto",AUTO_LEFT:"auto_left",AUTO_RIGHT:"auto_right",AUTO_CENTER:new i};class o{static attach(t,e,o=document.body,n=s.AUTO){if(null==t)throw new Error("todo");if(null==e)throw new Error("todo");if(null==o)throw new Error("todo");const r=document.createElement("overlay-wrapper");return r.append(t),r.target=e,r.parent=o,r.render=new i,this.overlays.set(t,r),o.append(r),r}static detach(t){console.log(this.overlays.get(t))}}o.overlays=new Map;class n extends HTMLElement{unsetLayout(){this.style.width="fit-content",this.style.height="fit-content",this.style.left="0px",this.style.top="0px",this.getBoundingClientRect()}disconnectedCallback(){this.observer.disconnect()}connectedCallback(){this.style.display="block",this.style.position="fixed",this.style.left="0px",this.style.top="0px",this.style.width="fit-content",this.style.height="fit-content",this.performLayout(),this.observer=new MutationObserver((()=>{this.unsetLayout(),this.performLayout()})),this.observer.observe(this.firstElementChild,{attributes:!0,characterData:!0,subtree:!0,childList:!0}),window.addEventListener("resize",(()=>{this.unsetLayout(),this.performLayout()}))}performLayout(){const t=this.render.performLayout(this);this.style.width=`${t.size.width}px`,this.style.height=`${t.size.height}px`,this.style.left=`${t.x}px`,this.style.top=`${t.y}px`,console.log(t)}}customElements.define("overlay-wrapper",n),t.Overlay=o,t.OverlayAlignment=s,t.OverlayElement=n,t.OverlayRender=e}));
//# sourceMappingURL=index.umd.js.map
