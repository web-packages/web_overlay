import { OverlayElement } from "./components/overlay_element";
import { OverlayAlignmentBehvaior } from "./overlay";

export type OverlayRenderResult = {
    x: number,
    y: number,
    size: {width: number, height: number}
};

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

export class BottomOverlayRender extends OverlayRender {
    performLayout(element: OverlayElement): OverlayRenderResult {
        const overlay  = element.getBoundingClientRect();
        const target   = element.target.getBoundingClientRect();
        const viewport = element.parent.getBoundingClientRect();
        const alignment = element.behavior.alignment;
        const xa = alignment?.x ?? OverlayAlignmentBehvaior.ALL;
        const xy = alignment?.y ?? OverlayAlignmentBehvaior.ALL;

        // The centered position relative to target.
        const centeredX = target.x + (target.width - overlay.width) / 2;
        const centeredY = target.y + target.height;

        // The distance about how far from the left of window.
        const right = window.innerWidth - (centeredX + overlay.width);

        // The overflow based on viewport dimensions. (assuming exists scrolling)
        const overflowed = {
            left: Math.max(-1 * centeredX + viewport.left, 0),
            right: 0,
            bottom: Math.max(centeredY + overlay.height - viewport.bottom, 0),
        };

        console.log(right);

        const x = centeredX + overflowed.left;
        const y = centeredY - overflowed.bottom;

        return {
            x: Math.max(x, 0),
            y: Math.max(y, 0),
            size: {
                width: Math.min(overlay.width, viewport.width),
                height: Math.min(overlay.height, overlay.bottom + y),
            }
        }
    }
}