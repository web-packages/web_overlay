import { OverlayBehavior } from "./overlay";
import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
export declare abstract class OverlayRenderCorrector<T extends OverlayConstraint> {
    element: HTMLElement;
    behavior: OverlayBehavior;
    constructor(element: HTMLElement, behavior: OverlayBehavior);
    performLayout(rect: DOMRect, constraint: T): DOMRect;
    abstract performLayoutVertical(rect: DOMRect, constraint: T): DOMRect;
    abstract performLayoutHorizontal(rect: DOMRect, constraint: T): DOMRect;
}
export declare class SizedOverlayRenderCorrector<T extends OverlayConstraint> extends OverlayRenderCorrector<T> {
    performLayoutVertical(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect;
    performLayoutHorizontal(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect;
}
export declare class PositionedOverlayRenderCorrector<T extends OverlayConstraint> extends OverlayRenderCorrector<T> {
    performLayoutVertical(rect: DOMRect, constraint: T): DOMRect;
    performLayoutHorizontal(rect: DOMRect, constraint: T): DOMRect;
}
export declare class DrivenOverlayRenderCorrector extends OverlayRenderCorrector<DrivenOverlayConstraint> {
    performLayoutHorizontal(rect: DOMRect, constraint: OverlayConstraint): DOMRect;
    performLayoutVertical(rect: DOMRect, constraint: OverlayConstraint): DOMRect;
}
