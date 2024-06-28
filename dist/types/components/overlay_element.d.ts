import { OverlayBehavior } from "../overlay";
export declare class OverlayElement extends HTMLElement {
    target: HTMLElement | DOMRect;
    parent: HTMLElement;
    behavior: OverlayBehavior;
    observer: MutationObserver;
    get raw(): HTMLElement;
    get targetRect(): DOMRect;
    get viewportRect(): DOMRect;
    markNeedRepaint(): void;
    unsetLayout(): void;
    disconnectedCallback(): void;
    connectedCallback(): void;
    performLayout(): void;
}
