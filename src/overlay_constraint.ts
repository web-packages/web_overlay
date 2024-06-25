import { OverlayAlignment } from "./overlay"

export type OverlayConstraintOverflowed = {
    left: number,
    right: number,
    top: number,
    bottom: number
}

export abstract class OverlayConstraint {
    constructor(
        public viewport: DOMRect,
        public alignment: OverlayAlignment
    ) {}

    abstract getOverflowed(rect: DOMRect): OverlayConstraintOverflowed;
}

export class DrivenOverlayConstraint extends OverlayConstraint {
    getOverflowed(rect: DOMRect): OverlayConstraintOverflowed {
        const viewport = this.viewport;

        // The distance about how far from the window left of overlay element.
        const overlayRight = window.innerWidth - (rect.x + rect.width);

        // The distance about how far from the window left of viewport element.
        const viewportRight = window.innerWidth - (this.viewport.right);

        // The overflow based on viewport dimensions. (assuming exists scrolling)
        return {
            left: Math.max(viewport.left - rect.x, 0),
            right: Math.max(viewportRight - overlayRight, 0),
            top: Math.max(viewport.top - rect.y, 0),
            bottom: Math.max(rect.y + rect.height - viewport.bottom, 0),
        };
    }
}