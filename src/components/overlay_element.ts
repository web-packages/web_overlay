import { OverlayBehavior } from "../overlay";
import { OverlayLayoutResult } from "../overlay_layout";

export class OverlayElement extends HTMLElement {
    target: HTMLElement | DOMRect;
    parent: HTMLElement;
    behavior: OverlayBehavior;
    observer: MutationObserver;

    /** The target element wrapped by this overlay wrapper. */
    get raw() {
        return this.firstElementChild as HTMLElement;
    }

    get targetRect(): DOMRect {
        return this.target instanceof HTMLElement ? this.target.getBoundingClientRect() : this.target;
    }

    get viewportRect(): DOMRect {
        return this.parent.getBoundingClientRect();
    }

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

        // Called when this element is reflowed or animation progressing.
        if (this.target instanceof HTMLElement) {
            this.observer = new MutationObserver(this.markNeedRepaint.bind(this));
            this.observer.observe(this.target, {
                attributes: true,
                characterData: true,
                subtree: true,
                childList: true,
            });

            let markNeedRepaint = false;
            const startAnimationCallback = () => {
                markNeedRepaint = true;
                checkAnimationCallback();
            } 

            const checkAnimationCallback = () => {
                this.markNeedRepaint();
                if (markNeedRepaint) {
                    requestAnimationFrame(checkAnimationCallback);
                }
            }

            this.target.addEventListener("animationstart", startAnimationCallback);
            this.target.addEventListener("animationend", () => markNeedRepaint = false);
            this.target.addEventListener("transitionstart", startAnimationCallback);
            this.target.addEventListener("transitionend", () => markNeedRepaint = false);
        }

        window.addEventListener("resize", this.markNeedRepaint.bind(this));
        window.addEventListener("scroll", this.markNeedRepaint.bind(this));
    }

    performLayout() {
        const layout = this.behavior.direction;
        const result = layout.performLayout(this); 
        const target = result.correctedRect;

        this.style.width = `${target.width}px`;
        this.style.height = `${target.height}px`;
        this.style.left = `${target.x}px`;
        this.style.top = `${target.y}px`;

        this.behavior.onReflowBehind?.call(this.raw, result);
    }
}

customElements.define("overlay-wrapper", OverlayElement);