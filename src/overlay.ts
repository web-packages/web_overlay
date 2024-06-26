import { OverlayElement } from "./components/overlay_element";
import { OverlayConstraint } from "./overlay_constraint";
import { BottomCenterOverlayLayout, BottomLeftOverlayLayout, BottomRightOverlayLayout, LeftOverlayLayout, OverlayLayout, OverlayLayoutPosition, RightOverlayLayout, TopCenterOverlayLayout, TopLeftOverlayLayout, TopRightOverlayLayout } from "./overlay_layout";
import { AbsoluateOverlayLayoutModifier, OverlayLayoutModifier, PositionedOverlayLayoutModifier, SizedOverlayLayoutModifier } from "./overlay_layout_modifier";

/** Overlay layout objects that define alignment directions are defined. */
export const OverlayDirection = {
    BOTTOM_CENTER: new BottomCenterOverlayLayout(),
    BOTTOM_RIGHT: new BottomRightOverlayLayout(),
    BOTTOM_LEFT: new BottomLeftOverlayLayout(),
    TOP_CENTER: new TopCenterOverlayLayout(),
    TOP_RIGHT: new TopRightOverlayLayout(),
    TOP_LEFT: new TopLeftOverlayLayout(),
    LEFT: new LeftOverlayLayout(),
    RIGHT: new RightOverlayLayout()
}

/** Signature for types about the overlay alignment behavior. */
export const OverlayAlignment = {
    ALL: new PositionedOverlayLayoutModifier(new SizedOverlayLayoutModifier()),
    NONE: new AbsoluateOverlayLayoutModifier(),
    SIZE: new SizedOverlayLayoutModifier(),
    POSITION: new PositionedOverlayLayoutModifier()
}

export type OverlayLayoutModifierByDirection = {
    vertical: OverlayLayoutModifier,
    horizontal: OverlayLayoutModifier
}

export interface OverlayBehavior<T extends OverlayConstraint = any> {
    direction: OverlayLayout<T>,
    alignment?: OverlayLayoutModifier | OverlayLayoutModifierByDirection,
    viewportPadding?: number;
}

export class Overlay {
    private static overlays = new Map<HTMLElement, OverlayElement>();
    private static defaultBehavior: OverlayBehavior = { direction: OverlayDirection.BOTTOM_CENTER }
    
    static attach({element, target, parent, behavior}: {
        element: HTMLElement,
        target: HTMLElement,
        parent: HTMLElement,
        behavior: OverlayBehavior
    }) {
        if (element == null) throw new Error("todo");
        if (target == null) throw new Error("todo");
        if (parent == null) throw new Error("todo");

        const wrapper = document.createElement("overlay-wrapper") as OverlayElement;
        wrapper.append(element);
        wrapper.target = target;
        wrapper.parent = parent;
        wrapper.behavior = behavior ?? Overlay.defaultBehavior;

        this.overlays.set(element, wrapper);
        parent.append(wrapper);

        return wrapper;
    }

    static detach(element: HTMLElement) {
        console.log(this.overlays.get(element));
    }

    static at({element, parent, behavior, position}: {
        element: HTMLElement,
        parent: HTMLElement,
        behavior: OverlayBehavior,
        position: OverlayLayoutPosition,
    }) {
        const wrapper = document.createElement("overlay-wrapper") as OverlayElement;
        wrapper.append(element);
        wrapper.target = new DOMRect(position.x, position.y);
        wrapper.parent = parent ?? document.body;
        wrapper.behavior = behavior ?? Overlay.defaultBehavior;

        this.overlays.set(element, wrapper);
        parent.append(wrapper);

        return wrapper;
    }
}