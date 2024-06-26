import { OverlayBehavior } from "../overlay";
import { OverlayLayoutResult } from "../overlay_layout";
export type OverlayReflowBehindBuilder = (element: HTMLElement, reflowed: OverlayLayoutResult) => HTMLElement;
export declare class OverlayElement extends HTMLElement {
    target: HTMLElement | DOMRect;
    parent: HTMLElement;
    behavior: OverlayBehavior;
    observer: MutationObserver;
    get raw(): HTMLElement;
    get targetRect(): DOMRect;
    get viewportRect(): DOMRect;
    reflowBehindBuilder: OverlayReflowBehindBuilder;
    markNeedRepaint(): void;
    unsetLayout(): void;
    disconnectedCallback(): void;
    connectedCallback(): void;
    performLayout(): void;
}
