import { OverlayElement } from "./components/overlay_element";

export const OverlayAlignment = {
    AUTO: "auto",
    AUTO_LEFT: "auto_left",
    AUTO_RIGHT: "auto_right",
    AUTO_CENTER: "auto_center"
}

export class Overlay {
    private static overlays = new Map<HTMLElement, OverlayElement>();

    static attach(
        element: HTMLElement,
        target: HTMLElement,
        parent: HTMLElement = document.body,
        alignment = OverlayAlignment.AUTO
    ) {
        if (element == null) throw new Error("todo");
        if (target == null) throw new Error("todo");
        if (parent == null) throw new Error("todo");

        const wrapper = document.createElement("overlay-wrapper") as OverlayElement;
        wrapper.append(element);
        
        this.overlays.set(element, wrapper);

        parent.append(wrapper);

        return wrapper;
    }

    static detach(element: HTMLElement) {
        console.log(this.overlays.get(element));
    }
}