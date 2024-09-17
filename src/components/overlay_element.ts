import { OverlayAnimation, OverlayBehavior } from "../overlay";

export class OverlayElement extends HTMLElement {
    target: HTMLElement | DOMRect;
    parent: HTMLElement;
    behavior: OverlayBehavior;
    isMarkNeedRepaint: boolean = true;

    /** The target element wrapped by this overlay wrapper. */
    get raw() {
        return this.firstElementChild as HTMLElement;
    }

    get targetRect(): DOMRect {
        return this.target instanceof HTMLElement
             ? this.target.getBoundingClientRect()
             : this.target;
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
        this.isMarkNeedRepaint = false;
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

        // Currently, web standard APIs have limitations in detecting if the target element has moved.
        // As an alternative, we go through the layout stage on every frame to handle this.
        if (this.target instanceof HTMLElement) {
            const checkAnimationCallback = () => {
                if (this.isMarkNeedRepaint) {
                    this.markNeedRepaint();
                    requestAnimationFrame(checkAnimationCallback);
                }
            }

            requestAnimationFrame(checkAnimationCallback);
        }

        window.addEventListener("resize", this.markNeedRepaint.bind(this));
        window.addEventListener("scroll", this.markNeedRepaint.bind(this));

        if (this.animation?.fadein) {
            queueMicrotask(() => this.fadein());
        }

        this.onanimationend = () => this.style.animation = null;
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
        if (this.target instanceof HTMLElement) {
            let element = this.target;

            // A target has been detached, so overlay will be detached in the dome together.
            if (!element.isConnected) {
                this.remove();
            }

            // When a target element is determined to be absent from the DOM or not rendered,
            // an overlay element is no rendered or removed from the document main DOM.
            while (element) {
                const style = getComputedStyle(element);

                if (style.display == "none") {
                    return this.style.display = "none";
                }

                element = element.parentElement;
            }
        }

        if (this.style.display == "none") {
            this.style.display = "block";
        }

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