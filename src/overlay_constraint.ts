
/**
 * Signature for the interface that defines the overflowed pixel values
 * based on the direction of an overlay element.
 *
 * Used by [OverlayConstraint].
 */
export type OverlayConstraintOverflowed = {
    left: number,
    right: number,
    top: number,
    bottom: number
}

/**
 * This class provides the function about calculating the degree
 * to which an overlay element overflows.
 * 
 * Used by [OverlayLayout], [OverlayLayoutModifier]. 
 */
export abstract class OverlayConstraint {
    constructor(public viewport: DOMRect) {}

    abstract overflowed(rect: DOMRect): OverlayConstraintOverflowed;
}

export class DrivenOverlayConstraint extends OverlayConstraint {
    overflowed(rect: DOMRect): OverlayConstraintOverflowed {
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