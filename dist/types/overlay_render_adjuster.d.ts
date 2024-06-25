import { OverlayAlignment } from "./overlay";
import { OverlayConstraint } from "./overlay_constraint";
export declare class OverlayRenderAdjuster {
    rect: DOMRect;
    viewport: DOMRect;
    alignment: OverlayAlignment;
    constructor(rect: DOMRect, viewport: DOMRect, alignment: OverlayAlignment);
    performLayout(constraint: OverlayConstraint): DOMRect;
}
