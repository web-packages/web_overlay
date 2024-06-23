import { OverlayRender } from "../overlay_render";

export class OverlayElement extends HTMLElement {
    render: OverlayRender;

    unsetLayout() {
        this.style.width = "fit-content";
        this.style.height = "fit-content";
    }

    connectedCallback() {
        this.style.display = "block";
        this.style.width = "fit-content";
        this.style.height = "fit-content";

        const obj = this.render.performLayout(this, document.body, document.body);
        console.log(obj);
    }
}

customElements.define("overlay-wrapper", OverlayElement);