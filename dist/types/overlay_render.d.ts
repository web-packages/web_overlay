import { OverlayElement } from "./components/overlay_element";
import { OverlayAlignment } from "./overlay";
import { FlexibleOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
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
    reflow(target: HTMLElement, result: Partial<DOMRect>): DOMRect;
}
export declare abstract class FlexibleOverlayRender extends OverlayRender<FlexibleOverlayConstraint> {
    createOverlayConstraint(viewport: DOMRect, alignment: OverlayAlignment): FlexibleOverlayConstraint;
}
export declare class BottomOverlayRender extends FlexibleOverlayRender {
    performLayout(element: OverlayElement): {
        x: number;
        y: number;
        size: {
            width: number;
            height: number;
        };
    };
}
