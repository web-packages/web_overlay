import { OverlayBehavior } from "../overlay";
import { OverlayLayoutResult } from "../overlay_layout";

export type OverlayReflowBehindBuilder = (element: HTMLElement, reflowed: OverlayLayoutResult) => HTMLElement;

export class OverlayElement extends HTMLElement {
    target: HTMLElement;
    parent: HTMLElement;
    behavior: OverlayBehavior;
    observer: MutationObserver;

    /** The target element wrapped by this overlay wrapper. */
    get raw() {
        return this.firstElementChild as HTMLElement;
    }

    /** Called when after the layout calculation has finally been completed. */
    reflowBehindBuilder: OverlayReflowBehindBuilder;

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
        const result = this.behavior.layout.performLayout(this);
        const target = result.correctedRect;

        this.style.width = `${target.width}px`;
        this.style.height = `${target.height}px`;
        this.style.left = `${target.x}px`;
        this.style.top = `${target.y}px`;

        this.reflowBehindBuilder?.call(this.raw, result);
    }
}

customElements.define("overlay-wrapper", OverlayElement);