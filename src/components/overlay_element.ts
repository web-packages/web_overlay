import { OverlayRender, OverlayRenderOption } from "../overlay_render";

export class OverlayElement extends HTMLElement {
    target: HTMLElement;
    parent: HTMLElement;
    render: OverlayRender;
    option: OverlayRenderOption;
    observer: MutationObserver;

    unsetLayout() {
        this.style.width = "fit-content";
        this.style.height = "fit-content";
        this.style.left = "0px";
        this.style.top = "0px";
        this.getBoundingClientRect(); // reflowed
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }

    connectedCallback() {
        this.style.display = "block";
        this.style.position = "fixed";
        this.style.left = "0px";
        this.style.top = "0px";
        this.style.width = "fit-content";
        this.style.height = "fit-content";

        // Calculate size and position initially and perform layout.
        this.performLayout();
        
        // Called when this element is reflowed.
        this.observer = new MutationObserver(() => {
            this.unsetLayout();
            this.performLayout();
        });

        this.observer.observe(this.firstElementChild, {
            attributes: true,
            characterData: true,
            subtree: true,
            childList: true,
        });

        window.addEventListener("resize", () => {
            this.unsetLayout();
            this.performLayout();
        })
    }

    performLayout() {
        const result = this.render.performLayout(this);
        
        this.style.width = `${result.size.width}px`;
        this.style.height = `${result.size.height}px`;
        this.style.left = `${result.x}px`;
        this.style.top = `${result.y}px`;
        
        console.log(result);
    }
}

customElements.define("overlay-wrapper", OverlayElement);