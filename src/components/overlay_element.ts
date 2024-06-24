import { OverlayBehavior } from "../overlay";

export class OverlayElement extends HTMLElement {
    target: HTMLElement;
    parent: HTMLElement;
    behavior: OverlayBehavior;
    observer: MutationObserver;

    unsetLayout() {
        this.style.width = "max-content";
        this.style.height = "max-content";
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
        this.style.width = "max-content";
        this.style.height = "max-content";

        // (this.firstElementChild as HTMLElement).style.minWidth = "max-content";

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
        const result = this.behavior.render.performLayout(this);
        
        this.style.width = `${result.size.width}px`;
        this.style.height = `${result.size.height}px`;
        this.style.left = `${result.x}px`;
        this.style.top = `${result.y}px`;
    }
}

customElements.define("overlay-wrapper", OverlayElement);