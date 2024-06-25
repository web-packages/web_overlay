import { OverlayElement } from "./components/overlay_element";
import { OverlayConstraint } from "./overlay_constraint";
import { BottomOverlayRender, OverlayRender } from "./overlay_render";
export declare const OverlayRenders: {
    BOTTOM: BottomOverlayRender;
};
export declare enum OverlayAlignment {
    ALL = "all",
    NONE = "none",
    SIZE = "size",
    POSITION = "position"
}
export interface OverlayBehavior<T extends OverlayConstraint = any> {
    render: OverlayRender<T>;
    alignment?: {
        x: OverlayAlignment;
        y: OverlayAlignment;
    };
}
export declare class Overlay {
    private static overlays;
    static attach(element: HTMLElement, target: HTMLElement, parent?: HTMLElement, behavior?: OverlayBehavior): OverlayElement;
    static detach(element: HTMLElement): void;
}
