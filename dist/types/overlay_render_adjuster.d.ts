import { OverlayAlignment } from "./overlay";
import { OverlayConstraint } from "./overlay_constraint";
export declare class OverlayRenderAdjuster {
    element: HTMLElement;
    alignment: OverlayAlignment;
    constructor(element: HTMLElement, alignment: OverlayAlignment);
    performLayout(rect: DOMRect, constraint: OverlayConstraint): DOMRect;
    performLayoutHorizontal(rect: DOMRect, constraint: OverlayConstraint): DOMRect;
}
