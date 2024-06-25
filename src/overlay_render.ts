import { OverlayElement } from "./components/overlay_element";
import { OverlayAlignment } from "./overlay";
import { FlexibleOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { OverlayRenderAdjuster } from "./overlay_render_adjuster";
import { DOMRectUtil } from "./utils/dom_rect";

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

    reflow(target: HTMLElement, result: Partial<DOMRect>): DOMRect {
        if (result?.width != null) {
            target.style.width = `${result.width}px`;
        }
        if (result?.height != null) {
            target.style.height = `${result.height}px`;
        }
        if (result.x != null) {
            target.style.left = `${result.x}px`;
        }
        if (result.y != null) {
            target.style.top = `${result.y}px`;
        }

        return target.getBoundingClientRect();
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

        overlay = DOMRectUtil.merge(overlay, {x: centeredX, y: centeredY});

        const constraint = this.createOverlayConstraint(viewport, OverlayAlignment.ALL);
        const adjuster = new OverlayRenderAdjuster(element, xa);
        
        overlay = adjuster.performLayout(overlay, constraint);
        overlay = this.reflow(element, overlay);
        
        return {
            x: overlay.x,
            y: overlay.y,
            size: {
                width: overlay.width,
                height: overlay.height
            }
        }
    }
}