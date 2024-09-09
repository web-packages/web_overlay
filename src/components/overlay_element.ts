import { OverlayAnimation, OverlayBehavior } from "../overlay";

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

    get animation(): OverlayAnimation {
        return this.behavior.animation;
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

        if (this.animation?.fadein) {
            queueMicrotask(() => this.fadein());
        }
    }
    
    detach(callback?: VoidFunction) {
        if (this.animation?.fadeout) {
            this.fadeout();
            this.onanimationend = () => this.parent.removeChild(this), callback && callback();
            return;
        }

        this.parent.removeChild(this);
    }

    fadein() {
        this.style.animation = this.animation.fadein;
    }

    fadeout() {
        this.style.animation = this.animation.fadeout;
    }

    performLayout() {
        const layout = this.behavior.direction;
        const result = layout.performLayout(this); 
        const target = result.modifiedRect;

        this.style.width = `${target.width}px`;
        this.style.height = `${target.height}px`;
        this.style.left = `${target.x}px`;
        this.style.top = `${target.y}px`;

        this.behavior.onLayoutBehind?.call(this.raw, result);
    }
}

customElements.define("overlay-layout", OverlayElement);