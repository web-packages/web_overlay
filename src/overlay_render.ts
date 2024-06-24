import { OverlayElement } from "./components/overlay_element";

export type OverlayRenderResult = {
    x: number,
    y: number,
    size: {width: number, height: number}
};

export type OverlayRenderOption = {
    padding: string,
}

export abstract class OverlayRender {
    /**
     * Calculates the static position and size where the overlay element
     * will be located and returns it.
     */
    abstract performLayout(element: OverlayElement): OverlayRenderResult;

    /** Call this function to trigger a reflow of the given element. */
    reflow(target: HTMLElement) {
        target.getBoundingClientRect();
    }
}

export class AutoCenterOverlayRender extends OverlayRender {
    performLayout(element: OverlayElement): OverlayRenderResult {
        const overlay  = element.getBoundingClientRect();
        const target   = element.target.getBoundingClientRect();
        const viewport = element.parent.getBoundingClientRect();
        const padding  = element.option?.padding ?? "15px";

        // Calculate overflow based on viewport dimensions (assuming no scrolling)
        const overflowed = {
            x: Math.max(overlay.x - viewport.x, 0),
            y: Math.max(overlay.y - viewport.y, 0),
        };

        const overlayRight = target.x + overlay.width;
        const x = target.x + (target.right - overlayRight) / 2;
        const y = target.y + target.height;

        console.log(overflowed);

        return {
            x: x,
            y: y,
            size: {width: overlay.width, height: overlay.height}
        }
    }
}