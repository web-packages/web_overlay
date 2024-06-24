import { OverlayElement } from "./components/overlay_element";
export type OverlayRenderResult = {
    x: number;
    y: number;
    size: {
        width: number;
        height: number;
    };
};
export declare abstract class OverlayRender {
    abstract performLayout(element: OverlayElement): OverlayRenderResult;
    reflow(target: HTMLElement): void;
}
export declare class BottomOverlayRender extends OverlayRender {
    performLayout(element: OverlayElement): OverlayRenderResult;
}
