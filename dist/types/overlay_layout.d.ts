import { OverlayElement } from "./components/overlay_element";
import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
export type OverlayLayoutPosition = {
    x: number;
    y: number;
};
export type OverlayLayoutResult = {
    initialRect: DOMRect;
    modifiedRect: DOMRect;
};
export declare abstract class OverlayLayout<T extends OverlayConstraint> {
    abstract performLayout(element: OverlayElement): OverlayLayoutResult;
    abstract perfromLayoutPosition(overlay: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition;
    abstract createOverlayConstraint(viewport: DOMRect): T;
}
export declare abstract class DrivenOverlayLayout extends OverlayLayout<DrivenOverlayConstraint> {
    createOverlayConstraint(viewport: DOMRect): DrivenOverlayConstraint;
    performLayout(element: OverlayElement): OverlayLayoutResult;
}
export declare abstract class VerticalCenterOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition;
    abstract getPositionHorizontal(overlay: DOMRect, target: DOMRect, gap: number): number;
}
export declare abstract class HorizontalCenterOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition;
    abstract getPositionVertical(overlay: DOMRect, target: DOMRect, gap: number): number;
}
export declare class BottomCenterOverlayLayout extends HorizontalCenterOverlayLayout {
    getPositionVertical(_: DOMRect, target: DOMRect, gap: number): number;
}
export declare class BottomLeftOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition;
}
export declare class BottomRightOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(_: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition;
}
export declare class TopCenterOverlayLayout extends HorizontalCenterOverlayLayout {
    getPositionVertical(overlay: DOMRect, target: DOMRect, gap: number): number;
}
export declare class TopLeftOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition;
}
export declare class TopRightOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition;
}
export declare class LeftOverlayLayout extends VerticalCenterOverlayLayout {
    getPositionHorizontal(overlay: DOMRect, target: DOMRect, gap: number): number;
}
export declare class RightOverlayLayout extends VerticalCenterOverlayLayout {
    getPositionHorizontal(_: DOMRect, target: DOMRect, gap: number): number;
}
