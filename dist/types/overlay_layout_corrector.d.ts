import { OverlayElement } from "./components/overlay_element";
import { OverlayBehavior } from "./overlay";
import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
export declare abstract class OverlayLayoutCorrector<T extends OverlayConstraint> {
    element: OverlayElement;
    constructor(element: OverlayElement);
    performLayout(rect: DOMRect, constraint: T): DOMRect;
    abstract performLayoutVertical(rect: DOMRect, constraint: T): DOMRect;
    abstract performLayoutHorizontal(rect: DOMRect, constraint: T): DOMRect;
}
export declare class SizedOverlayLayoutCorrector<T extends OverlayConstraint> extends OverlayLayoutCorrector<T> {
    performLayoutVertical(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect;
    performLayoutHorizontal(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect;
}
export declare class PositionedOverlayLayoutCorrector<T extends OverlayConstraint> extends OverlayLayoutCorrector<T> {
    performLayoutVertical(rect: DOMRect, constraint: T): DOMRect;
    performLayoutHorizontal(rect: DOMRect, constraint: T): DOMRect;
}
export declare class DrivenOverlayRenderCorrector extends OverlayLayoutCorrector<DrivenOverlayConstraint> {
    behavior: OverlayBehavior;
    constructor(element: OverlayElement, behavior: OverlayBehavior);
    performLayoutHorizontal(rect: DOMRect, constraint: OverlayConstraint): DOMRect;
    performLayoutVertical(rect: DOMRect, constraint: OverlayConstraint): DOMRect;
}
