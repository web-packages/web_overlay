import { OverlayElement } from "./components/overlay_element";
import { BottomOverlayRender, OverlayRender } from "./overlay_render";
export declare const OverlayAlignment: {
    BOTTOM: BottomOverlayRender;
};
export declare enum OverlayAlignmentBehvaior {
    NONE = "none",
    ALL = "all",
    SIZE = "size",
    POSITION = "position"
}
export interface OverlayBehavior {
    render: OverlayRender;
    alignment?: {
        x: OverlayAlignmentBehvaior;
        y: OverlayAlignmentBehvaior;
    };
}
export declare class Overlay {
    private static overlays;
    static attach(element: HTMLElement, target: HTMLElement, parent?: HTMLElement, behavior?: OverlayBehavior): OverlayElement;
    static detach(element: HTMLElement): void;
}
