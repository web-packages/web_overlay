import { OverlayAlignment } from "./overlay"

export type OverlayConstraintSized = {
    width: number,
    height: number
}

export type OverlayConstraintOverflowed = {
    left: number,
    right: number,
    top: number,
    bottom: number
}

export interface OverlayConstraintResult {
    size: OverlayConstraintSized,
    overflowed: OverlayConstraintOverflowed
}

export abstract class OverlayConstraint {
    constructor(
        public viewport: DOMRect,
        public alignment: OverlayAlignment
    ) {}

    measure(rect: DOMRect): OverlayConstraintResult {
        return {
            size: this.measureSized(rect),
            overflowed: this.measureOverflowed(rect)
        }
    }

    abstract measureSized(rect: DOMRect): OverlayConstraintSized;
    abstract measureOverflowed(rect: DOMRect): OverlayConstraintOverflowed;
}

export class FlexibleOverlayConstraint extends OverlayConstraint {
    measureSized(rect: DOMRect): OverlayConstraintSized {
        throw new Error("Method not implemented.")
    }

    measureOverflowed(rect: DOMRect): OverlayConstraintOverflowed {
        const viewport = this.viewport;

        // The distance about how far from the window left of overlay element.
        const overlayRight = window.innerWidth - (rect.x + rect.width);

        // The distance about how far from the window left of viewport element.
        const viewportRight = window.innerWidth - (this.viewport.right);

        // The overflow based on viewport dimensions. (assuming exists scrolling)
        return {
            left: Math.max(viewport.left - rect.x, 0),
            right: Math.max(viewportRight - overlayRight, 0),
            top: 0,
            bottom: Math.max(rect.y + rect.height - viewport.bottom, 0),
        };
    }
}