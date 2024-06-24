import { OverlayRender, OverlayRenderOption } from "../overlay_render";
export declare class OverlayElement extends HTMLElement {
    target: HTMLElement;
    parent: HTMLElement;
    render: OverlayRender;
    option: OverlayRenderOption;
    observer: MutationObserver;
    unsetLayout(): void;
    disconnectedCallback(): void;
    connectedCallback(): void;
    performLayout(): void;
}
