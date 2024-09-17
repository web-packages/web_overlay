import { OverlayAnimation, OverlayBehavior } from "../overlay";
export declare class OverlayElement extends HTMLElement {
    target: HTMLElement | DOMRect;
    parent: HTMLElement;
    behavior: OverlayBehavior;
    isMarkNeedRepaint: boolean;
    get raw(): HTMLElement;
    get targetRect(): DOMRect;
    get viewportRect(): DOMRect;
    get animation(): OverlayAnimation;
    markNeedRepaint(): void;
    unsetLayout(): void;
    disconnectedCallback(): void;
    connectedCallback(): void;
    detach(callback?: VoidFunction): void;
    fadein(): void;
    fadeout(): void;
    performLayout(): string;
}
