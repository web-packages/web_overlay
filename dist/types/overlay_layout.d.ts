import { OverlayElement } from "./components/overlay_element";
import { OverlayAlignment, OverlayBehavior } from "./overlay";
import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { DrivenOverlayRenderCorrector, OverlayLayoutCorrector, OverlayLayoutRepositionCallback } from "./overlay_layout_corrector";
export type OverlayLayoutPosition = {
    x: number;
    y: number;
};
export type OverlayLayoutResult = {
    initialRect: DOMRect;
    correctedRect: DOMRect;
};
export declare abstract class OverlayLayout<T extends OverlayConstraint> {
    abstract performLayout(element: OverlayElement): OverlayLayoutResult;
    abstract perfromLayoutPosition(overlay: DOMRect, target: DOMRect): OverlayLayoutPosition;
    abstract createOverlayConstraint(viewport: DOMRect, alignment: OverlayAlignment): T;
    abstract createOverlayLayoutCorrector(element: OverlayElement, behavior: OverlayBehavior, repositionCallback: OverlayLayoutRepositionCallback): OverlayLayoutCorrector<T>;
}
export declare abstract class DrivenOverlayLayout extends OverlayLayout<DrivenOverlayConstraint> {
    createOverlayConstraint(viewport: DOMRect, alignment: OverlayAlignment): DrivenOverlayConstraint;
    createOverlayLayoutCorrector(element: OverlayElement, behavior: OverlayBehavior, repositionCallback: OverlayLayoutRepositionCallback): DrivenOverlayRenderCorrector;
    performLayout(element: OverlayElement): OverlayLayoutResult;
}
export declare abstract class VerticalCenterOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect): OverlayLayoutPosition;
    abstract getPositionHorizontal(overlay: DOMRect, target: DOMRect): number;
}
export declare abstract class HorizontalCenterOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect): OverlayLayoutPosition;
    abstract getPositionVertical(overlay: DOMRect, target: DOMRect): number;
}
export declare class BottomOverlayLayout extends HorizontalCenterOverlayLayout {
    getPositionVertical(_: DOMRect, target: DOMRect): number;
}
export declare class TopOverlayLayout extends HorizontalCenterOverlayLayout {
    getPositionVertical(overlay: DOMRect, target: DOMRect): number;
}
export declare class LeftOverlayLayout extends VerticalCenterOverlayLayout {
    getPositionHorizontal(overlay: DOMRect, target: DOMRect): number;
}
export declare class RightOverlayLayout extends VerticalCenterOverlayLayout {
    getPositionHorizontal(_: DOMRect, target: DOMRect): number;
}
