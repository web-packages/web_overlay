import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { OverlayLayoutPosition } from "./overlay_layout";
export type OverlayLayoutRepositionCallback = (rect: DOMRect) => OverlayLayoutPosition;
type RC = OverlayLayoutRepositionCallback;
export declare abstract class OverlayLayoutModifier<T extends OverlayConstraint = OverlayConstraint> {
    parent?: OverlayLayoutModifier<T>;
    constructor(parent?: OverlayLayoutModifier<T>);
    performLayout(element: HTMLElement, current: DOMRect, constraint: T, reposition: RC): DOMRect;
    abstract performLayoutVertical(element: HTMLElement, current: DOMRect, constraint: T, reposition: RC): DOMRect;
    abstract performLayoutHorizontal(element: HTMLElement, current: DOMRect, constraint: T, reposition: RC): DOMRect;
}
export declare class SizedOverlayLayoutModifier extends OverlayLayoutModifier {
    performLayoutVertical(_: HTMLElement, rect: DOMRect, constraint: OverlayConstraint): DOMRect;
    performLayoutHorizontal(element: HTMLElement, rect: DOMRect, constraint: OverlayConstraint, reposition: RC): DOMRect;
}
export declare class PositionedOverlayLayoutModifier extends OverlayLayoutModifier {
    performLayoutVertical(_: HTMLElement, rect: DOMRect, constraint: OverlayConstraint, reposition: RC): DOMRect;
    performLayoutHorizontal(_: HTMLElement, rect: DOMRect, constraint: DrivenOverlayConstraint, reposition: RC): DOMRect;
}
export declare class AbsoluateOverlayLayoutModifier extends OverlayLayoutModifier {
    performLayoutVertical(_: HTMLElement, rect: DOMRect): DOMRect;
    performLayoutHorizontal(_: HTMLElement, rect: DOMRect): DOMRect;
}
export {};
