import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { OverlayLayoutPosition } from "./overlay_layout";
export type OverlayRepositionCallback = (rect: DOMRect) => OverlayLayoutPosition;
export declare enum OverlaySizedOverflowBehavior {
    NONE = "none",
    REFLOW = "reflow",
    REFLOW_REPOSITION = "reflow_reposition"
}
export declare abstract class OverlayLayoutModifier<T extends OverlayConstraint = OverlayConstraint> {
    parent?: OverlayLayoutModifier<T>;
    protected child?: OverlayLayoutModifier;
    constructor(parent?: OverlayLayoutModifier<T>);
    performLayout(element: HTMLElement, current: DOMRect, constraint: T, reposition: OverlayRepositionCallback): DOMRect;
    abstract performLayoutVertical(element: HTMLElement, current: DOMRect, constraint: T, reposition: OverlayRepositionCallback): DOMRect;
    abstract performLayoutHorizontal(element: HTMLElement, current: DOMRect, constraint: T, reposition: OverlayRepositionCallback): DOMRect;
}
export declare class SizedOverlayLayoutModifier extends OverlayLayoutModifier {
    overflowBehavior: OverlaySizedOverflowBehavior;
    constructor(overflowBehavior?: OverlaySizedOverflowBehavior);
    performLayoutVertical(element: HTMLElement, rect: DOMRect, constraint: OverlayConstraint, reposition: OverlayRepositionCallback): DOMRect;
    performLayoutHorizontal(element: HTMLElement, rect: DOMRect, constraint: OverlayConstraint, reposition: OverlayRepositionCallback): DOMRect;
}
export declare class PositionedOverlayLayoutModifier extends OverlayLayoutModifier {
    performLayoutVertical(_: HTMLElement, rect: DOMRect, constraint: OverlayConstraint, reposition: OverlayRepositionCallback): DOMRect;
    performLayoutHorizontal(_: HTMLElement, rect: DOMRect, constraint: DrivenOverlayConstraint, reposition: OverlayRepositionCallback): DOMRect;
}
export declare class AbsoluateOverlayLayoutModifier extends OverlayLayoutModifier {
    performLayoutVertical(_: HTMLElement, rect: DOMRect): DOMRect;
    performLayoutHorizontal(_: HTMLElement, rect: DOMRect): DOMRect;
}
