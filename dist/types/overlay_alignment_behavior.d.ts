import { OverlayElement } from "./components/overlay_element";
import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { OverlayLayoutPosition } from "./overlay_layout";
export type OverlayLayoutRepositionCallback = (rect: DOMRect) => OverlayLayoutPosition;
export declare abstract class OverlayAlignmentBehavior<T extends OverlayConstraint> {
    element: OverlayElement;
    reposition: OverlayLayoutRepositionCallback;
    parent?: OverlayAlignmentBehavior<T>;
    constructor(element: OverlayElement, reposition: OverlayLayoutRepositionCallback);
    performLayout(rect: DOMRect, constraint: T): DOMRect;
    abstract performLayoutVertical(rect: DOMRect, constraint: T): DOMRect;
    abstract performLayoutHorizontal(rect: DOMRect, constraint: T): DOMRect;
}
export declare class SizedOverlayLayoutCorrector extends OverlayAlignmentBehavior<DrivenOverlayConstraint> {
    performLayoutVertical(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect;
    performLayoutHorizontal(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect;
}
export declare class PositionedOverlayLayoutCorrector extends OverlayAlignmentBehavior<DrivenOverlayConstraint> {
    performLayoutVertical(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect;
    performLayoutHorizontal(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect;
}
