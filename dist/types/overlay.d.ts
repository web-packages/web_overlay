import { OverlayElement } from "./components/overlay_element";
import { OverlayConstraint } from "./overlay_constraint";
import { BottomCenterOverlayLayout, BottomLeftOverlayLayout, BottomRightOverlayLayout, LeftOverlayLayout, OverlayLayout, OverlayLayoutPosition, RightOverlayLayout, TopCenterOverlayLayout, TopLeftOverlayLayout, TopRightOverlayLayout } from "./overlay_layout";
import { AbsoluateOverlayLayoutModifier, OverlayLayoutModifier, PositionedOverlayLayoutModifier, SizedOverlayLayoutModifier } from "./overlay_layout_modifier";
export declare const OverlayDirection: {
    BOTTOM_CENTER: BottomCenterOverlayLayout;
    BOTTOM_RIGHT: BottomRightOverlayLayout;
    BOTTOM_LEFT: BottomLeftOverlayLayout;
    TOP_CENTER: TopCenterOverlayLayout;
    TOP_RIGHT: TopRightOverlayLayout;
    TOP_LEFT: TopLeftOverlayLayout;
    LEFT: LeftOverlayLayout;
    RIGHT: RightOverlayLayout;
};
export declare const OverlayAlignment: {
    ALL: PositionedOverlayLayoutModifier;
    NONE: AbsoluateOverlayLayoutModifier;
    SIZE: SizedOverlayLayoutModifier;
    POSITION: PositionedOverlayLayoutModifier;
};
export type OverlayLayoutModifierByDirection = {
    vertical: OverlayLayoutModifier;
    horizontal: OverlayLayoutModifier;
};
export interface OverlayBehavior<T extends OverlayConstraint = any> {
    layout: OverlayLayout<T>;
    modifier?: OverlayLayoutModifier | OverlayLayoutModifierByDirection;
    viewportPadding?: number;
}
export declare class Overlay {
    private static overlays;
    private static defaultBehavior;
    static attach({ element, target, parent, behavior }: {
        element: HTMLElement;
        target: HTMLElement;
        parent: HTMLElement;
        behavior: OverlayBehavior;
    }): OverlayElement;
    static detach(element: HTMLElement): void;
    static at({ element, parent, behavior, position }: {
        element: HTMLElement;
        parent: HTMLElement;
        behavior: OverlayBehavior;
        position: OverlayLayoutPosition;
    }): OverlayElement;
}
