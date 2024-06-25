import { OverlayElement } from "./components/overlay_element";
import { OverlayAlignment, OverlayBehavior } from "./overlay";
import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { DrivenOverlayRenderAdjuster, OverlayRenderAdjuster } from "./overlay_render_adjuster";
export type OverlayRenderResult = {
    x: number;
    y: number;
    size: {
        width: number;
        height: number;
    };
};
export declare abstract class OverlayRender<T extends OverlayConstraint> {
    abstract performLayout(element: OverlayElement): OverlayRenderResult;
    abstract createOverlayConstraint(viewport: DOMRect, alignment: OverlayAlignment): T;
    abstract createOverlayRenderAdjuster(element: OverlayElement, behavior: OverlayBehavior): OverlayRenderAdjuster<T>;
    reflow(target: HTMLElement, result: Partial<DOMRect>): DOMRect;
}
export declare abstract class DrivenOverlayRender extends OverlayRender<DrivenOverlayConstraint> {
    createOverlayConstraint(viewport: DOMRect, alignment: OverlayAlignment): DrivenOverlayConstraint;
    createOverlayRenderAdjuster(element: OverlayElement, behavior: OverlayBehavior): DrivenOverlayRenderAdjuster;
}
export declare class BottomOverlayRender extends DrivenOverlayRender {
    performLayout(element: OverlayElement): {
        x: number;
        y: number;
        size: {
            width: number;
            height: number;
        };
    };
}
