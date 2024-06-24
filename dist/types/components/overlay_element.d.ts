import { OverlayBehavior } from "../overlay";
export declare class OverlayElement extends HTMLElement {
    target: HTMLElement;
    parent: HTMLElement;
    behavior: OverlayBehavior;
    observer: MutationObserver;
    unsetLayout(): void;
    disconnectedCallback(): void;
    connectedCallback(): void;
    performLayout(): void;
}
