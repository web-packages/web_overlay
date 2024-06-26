import { OverlayElement } from "./components/overlay_element";
import { OverlayConstraint } from "./overlay_constraint";
import { BottomCenterOverlayLayout, BottomLeftOverlayLayout, BottomRightOverlayLayout, LeftOverlayLayout, OverlayLayout, OverlayLayoutPosition, RightOverlayLayout, TopCenterOverlayLayout, TopLeftOverlayLayout, TopRightOverlayLayout } from "./overlay_layout";

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

export enum OverlayAlignment {
    ALL = "all",
    NONE = "none",
    SIZE = "size",
    POSITION = "position"
}

export interface OverlayBehavior<T extends OverlayConstraint = any> {
    layout: OverlayLayout<T>,
    alignment?: {
        x: OverlayAlignment,
        y: OverlayAlignment,
    }
}

export class Overlay {
    private static overlays = new Map<HTMLElement, OverlayElement>();

    static attach(
        element: HTMLElement,
        target: HTMLElement,
        parent: HTMLElement = document.body,
        behavior: OverlayBehavior = { layout: OverlayDirection.BOTTOM_CENTER }
    ) {
        if (element == null) throw new Error("todo");
        if (target == null) throw new Error("todo");
        if (parent == null) throw new Error("todo");

        const wrapper = document.createElement("overlay-wrapper") as OverlayElement;
        wrapper.append(element);
        wrapper.target = target;
        wrapper.parent = parent;
        wrapper.behavior = behavior;

        this.overlays.set(element, wrapper);
        parent.append(wrapper);

        return wrapper;
    }

    static detach(element: HTMLElement) {
        console.log(this.overlays.get(element));
    }

    static at(
        element: HTMLElement,
        parent: HTMLElement = document.body,
        behavior: OverlayBehavior = { layout: OverlayDirection.BOTTOM_CENTER },
        position: OverlayLayoutPosition,
    ) {
        const target = document.createElement("div");
        target.style.position = "fixed";
        target.style.width = "0px";
        target.style.height = "0px";
        target.style.left = `${position.x}px`;
        target.style.top = `${position.y}px`;

        const wrapper = document.createElement("overlay-wrapper") as OverlayElement;
        wrapper.append(element);
        wrapper.target = target;
        wrapper.parent = parent;
        wrapper.behavior = behavior;

        this.overlays.set(element, wrapper);
        parent.append(target);
        parent.append(wrapper);

        return wrapper;
    }
}