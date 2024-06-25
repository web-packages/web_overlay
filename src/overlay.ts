import { OverlayElement } from "./components/overlay_element";
import { OverlayConstraint } from "./overlay_constraint";
import { BottomOverlayLayout, LeftOverlayLayout, OverlayLayout, RightOverlayLayout, TopOverlayLayout } from "./overlay_layout";

export const OverlayDirection = {
    BOTTOM: new BottomOverlayLayout(),
    TOP: new TopOverlayLayout(),
    Left: new LeftOverlayLayout(),
    Right: new RightOverlayLayout()
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
        behavior: OverlayBehavior = { layout: OverlayDirection.BOTTOM }
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
}