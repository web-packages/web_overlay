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

    reflow(target: HTMLElement, result: Partial<OverlayRenderResult>): DOMRect {
        if (result.size?.width != null) {
            target.style.width = `${result.size.width}px`;
        }
        if (result.size?.height != null) {
            target.style.height = `${result.size.height}px`;
        }
        if (result.x != null) {
            target.style.left = `${result.x}px`;
        }
        if (result.y != null) {
            target.style.top = `${result.y}px`;
        }

        return target.getBoundingClientRect();
    }

    mergeRect(child: DOMRect, parent: Partial<DOMRect>): DOMRect {
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
    
    performLayout(element: OverlayElement) {
        const target = element.target.getBoundingClientRect();
        const viewport = element.parent.getBoundingClientRect();
        const alignment = element.behavior.alignment;
        const xa = alignment?.x ?? OverlayAlignment.ALL;
        const xy = alignment?.y ?? OverlayAlignment.ALL;

        let overlay = element.getBoundingClientRect();

        // The centered position relative to target.
        const centeredX = target.x + (target.width - overlay.width) / 2;
        const centeredY = target.bottom;

        overlay = this.mergeRect(overlay, {x: centeredX, y: centeredY});

        const constraint = this.createOverlayConstraint(viewport, OverlayAlignment.ALL);
        const overflowed = constraint.getOverflowed(overlay);

        const x = centeredX + overflowed.left;
        const y = centeredY - overflowed.bottom;
        
        overlay = this.reflow(element, {x, y});
        
        return {
            x: x,
            y: y,
            size: {
                width: Math.min(overlay.width, viewport.width),
                height: Math.min(overlay.height, viewport.height)
            }
        }
    }
}