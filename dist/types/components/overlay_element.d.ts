import { OverlayBehavior } from "../overlay";
import { OverlayLayoutResult } from "../overlay_layout";
export type OverlayReflowBehindBuilder = (element: HTMLElement, reflowed: OverlayLayoutResult) => HTMLElement;
export declare class OverlayElement extends HTMLElement {
    target: HTMLElement;
    parent: HTMLElement;
    behavior: OverlayBehavior;
    observer: MutationObserver;
    get raw(): HTMLElement;
    reflowBehindBuilder: OverlayReflowBehindBuilder;
    markNeedRepaint(): void;
    unsetLayout(): void;
    disconnectedCallback(): void;
    connectedCallback(): void;
    performLayout(): void;
}
