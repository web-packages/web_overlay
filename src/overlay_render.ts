import { OverlayElement } from "./components/overlay_element";
import { OverlayAlignment } from "./overlay";
import { FlexibleOverlayConstraint, OverlayConstraint, OverlayConstraintOverflowed, OverlayConstraintSized } from "./overlay_constraint";

export type OverlayRenderResult = {
    x: number,
    y: number,
    size: {width: number, height: number}
};

export abstract class OverlayRender<T extends OverlayConstraint> {
    /**
     * Calculates the static position and size where the overlay element
     * will be located and returns it.
     */
    abstract performLayout(element: OverlayElement): OverlayRenderResult;

    /** Returns the overlay constraint instance that is created. */
    abstract createOverlayConstraint(
        viewport: DOMRect,
        alignment: OverlayAlignment
    ): T;

    /** Call this function to trigger a reflow of the given element. */
    reflow(child: DOMRect, parent: Partial<DOMRect>): DOMRect {
        return new DOMRect(
            parent.x ?? child.x,
            parent.y ?? child.y,
            parent.width ?? child.width,
            parent.height ?? child.height
        )
    }
}

export abstract class FlexibleOverlayRender extends OverlayRender<FlexibleOverlayConstraint> {
    createOverlayConstraint(
        viewport: DOMRect,
        alignment: OverlayAlignment
    ): FlexibleOverlayConstraint {
        return new FlexibleOverlayConstraint(viewport, alignment);
    }
}

export class BottomOverlayRender extends FlexibleOverlayRender {
    
    performLayout(element: OverlayElement): OverlayRenderResult {
        const target   = element.target.getBoundingClientRect();
        const viewport = element.parent.getBoundingClientRect();
        const alignment = element.behavior.alignment;
        const xa = alignment?.x ?? OverlayAlignment.ALL;
        const xy = alignment?.y ?? OverlayAlignment.ALL;

        let overlay = element.getBoundingClientRect();

        // The centered position relative to target.
        const centeredX = target.x + (target.width - overlay.width) / 2;
        const centeredY = target.y + target.height;

        overlay = this.reflow(overlay, {x: centeredX, y: centeredY});

        const constraint = this.createOverlayConstraint(viewport, OverlayAlignment.ALL);
        const overflowed = constraint.measureOverflowed(overlay);

        console.log(overflowed);

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