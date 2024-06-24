import { OverlayBehavior } from "../overlay";

export class OverlayElement extends HTMLElement {
    target: HTMLElement;
    parent: HTMLElement;
    behavior: OverlayBehavior;
    observer: MutationObserver;

    markNeedRepaint() {
        this.unsetLayout();
        this.performLayout();
    }

    unsetLayout() {
        this.style.width = "max-content";
        this.style.height = "max-content";
        this.style.left = "0px";
        this.style.top = "0px";
        this.getBoundingClientRect(); // reflowed
    }

    disconnectedCallback() {
        this.observer.disconnect();
        window.removeEventListener("resize", this.markNeedRepaint.bind(this));
        window.removeEventListener("scroll", this.markNeedRepaint.bind(this));
    }

    connectedCallback() {
        this.style.display = "block";
        this.style.position = "fixed";
        this.style.left = "0px";
        this.style.top = "0px";
        this.style.width = "max-content";
        this.style.height = "max-content";

        // Calculate size and position initially and perform layout.
        this.performLayout();

        // Called when this element is reflowed.
        this.observer = new MutationObserver(this.markNeedRepaint.bind(this));

        this.observer.observe(this.firstElementChild, {
            attributes: true,
            characterData: true,
            subtree: true,
            childList: true,
        });

        window.addEventListener("resize", this.markNeedRepaint.bind(this));
        window.addEventListener("scroll", this.markNeedRepaint.bind(this));
    }

    performLayout() {
        const result = this.behavior.render.performLayout(this);
        
        this.style.width = `${result.size.width}px`;
        this.style.height = `${result.size.height}px`;
        this.style.left = `${result.x}px`;
        this.style.top = `${result.y}px`;
    }
}

customElements.define("overlay-wrapper", OverlayElement);