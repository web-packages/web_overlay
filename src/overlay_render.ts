import { OverlayElement } from "./components/overlay_element";
import { OverlayAlignment, OverlayBehavior } from "./overlay";
import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { DrivenOverlayRenderAdjuster, OverlayRenderAdjuster } from "./overlay_render_adjuster";
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

    /** Returns the overlay render adjuster instance that is created. */
    abstract createOverlayRenderAdjuster(
        element: OverlayElement,
        behavior: OverlayBehavior
    ): OverlayRenderAdjuster<T>;

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

export abstract class DrivenOverlayRender extends OverlayRender<DrivenOverlayConstraint> {
    createOverlayConstraint(
        viewport: DOMRect,
        alignment: OverlayAlignment
    ): DrivenOverlayConstraint {
        return new DrivenOverlayConstraint(viewport, alignment);
    }

    createOverlayRenderAdjuster(
        element: OverlayElement,
        behavior: OverlayBehavior
    ): DrivenOverlayRenderAdjuster {
        return new DrivenOverlayRenderAdjuster(element, behavior);
    }
}

export class BottomOverlayRender extends DrivenOverlayRender {
    performLayout(element: OverlayElement) {
        const target = element.target.getBoundingClientRect();
        const viewport = element.parent.getBoundingClientRect();
        const behavior = element.behavior;

        let overlay = element.getBoundingClientRect();

        // The centered position relative to target.
        const centeredX = target.x + (target.width - overlay.width) / 2;
        const centeredY = target.bottom;

        overlay = DOMRectUtil.merge(overlay, {x: centeredX, y: centeredY});

        const constraint = this.createOverlayConstraint(viewport, OverlayAlignment.ALL);
        const adjuster = this.createOverlayRenderAdjuster(element, behavior);
        
        overlay = adjuster.performLayout(overlay, constraint);
        
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