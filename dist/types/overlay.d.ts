import { OverlayElement } from "./components/overlay_element";
import { OverlayConstraint } from "./overlay_constraint";
import { BottomOverlayLayout, LeftOverlayLayout, OverlayLayout, RightOverlayLayout, TopOverlayLayout } from "./overlay_layout";
export declare const OverlayDirection: {
    BOTTOM: BottomOverlayLayout;
    TOP: TopOverlayLayout;
    Left: LeftOverlayLayout;
    Right: RightOverlayLayout;
};
export declare enum OverlayAlignment {
    ALL = "all",
    NONE = "none",
    SIZE = "size",
    POSITION = "position"
}
export interface OverlayBehavior<T extends OverlayConstraint = any> {
    layout: OverlayLayout<T>;
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
