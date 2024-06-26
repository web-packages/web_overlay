import { OverlayElement } from "./components/overlay_element";
import { OverlayAlignment } from "./overlay";
import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { PositionedOverlayLayoutBehavior, SizedOverlayLayoutBehavior } from "./overlay_layout_behavior";
import { DOMRectUtil } from "./utils/dom_rect";

export type OverlayLayoutPosition = { x: number; y: number; };

export type OverlayLayoutResult = {
    initialRect: DOMRect,
    correctedRect: DOMRect
};

export abstract class OverlayLayout<T extends OverlayConstraint> {
    /**
     * Calculates the static position and size where the overlay element
     * will be located and returns it.
     */
    abstract performLayout(element: OverlayElement): OverlayLayoutResult;

    /**
     * Static position where the overlay element should be located
     * without overflow consideration.
     */
    abstract perfromLayoutPosition(overlay: DOMRect, target: DOMRect): OverlayLayoutPosition;

    /** Returns the overlay constraint instance that is created. */
    abstract createOverlayConstraint(viewport: DOMRect): T;
}

export abstract class DrivenOverlayLayout extends OverlayLayout<DrivenOverlayConstraint> {
    createOverlayConstraint(viewport: DOMRect): DrivenOverlayConstraint {
        return new DrivenOverlayConstraint(viewport);
    }

    performLayout(element: OverlayElement): OverlayLayoutResult {
        const overlay  = element.getBoundingClientRect();
        const target   = element.targetRect;
        const viewport = element.viewportRect;
        const behavior = element.behavior;

        const initialRect = DOMRectUtil.merge(overlay, this.perfromLayoutPosition(overlay, target));
        const constraint = this.createOverlayConstraint(viewport);
        const corrector = new PositionedOverlayLayoutBehavior(new SizedOverlayLayoutBehavior());

        const correctedRect = corrector.performLayout(element, initialRect, constraint, (rect) => {
            return this.perfromLayoutPosition(rect, target);
        });

        return {
            initialRect: initialRect,
            correctedRect: correctedRect
        }
    }
}

export abstract class VerticalCenterOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect): OverlayLayoutPosition {
        const x = this.getPositionHorizontal(overlay, target);
        const y = target.y + (target.height - overlay.height) / 2;

        return {x, y};
    }

    abstract getPositionHorizontal(overlay: DOMRect, target: DOMRect): number;
}

export abstract class HorizontalCenterOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect): OverlayLayoutPosition {
        const x = target.x + (target.width - overlay.width) / 2;
        const y = this.getPositionVertical(overlay, target);

        return {x, y};
    }

    abstract getPositionVertical(overlay: DOMRect, target: DOMRect): number;
}

export class BottomCenterOverlayLayout extends HorizontalCenterOverlayLayout {
    getPositionVertical(_: DOMRect, target: DOMRect): number {
        return target.bottom;
    }
}

export class BottomLeftOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect): OverlayLayoutPosition {
        return {
            x: target.right - overlay.width,
            y: target.bottom
        }
    }
}

export class BottomRightOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(_: DOMRect, target: DOMRect): OverlayLayoutPosition {
        return {
            x: target.left,
            y: target.bottom
        }
    }
}

export class TopCenterOverlayLayout extends HorizontalCenterOverlayLayout {
    getPositionVertical(overlay: DOMRect, target: DOMRect): number {
        return target.top - overlay.height;
    }
}

export class TopLeftOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect): OverlayLayoutPosition {
        return {
            x: target.right - overlay.width,
            y: target.y - overlay.height
        }
    }
}

export class TopRightOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect): OverlayLayoutPosition {
        return {
            x: target.left,
            y: target.top - overlay.height
        }
    }
}

export class LeftOverlayLayout extends VerticalCenterOverlayLayout {
    getPositionHorizontal(overlay: DOMRect, target: DOMRect): number {
        return target.left - overlay.width;
    }
}

export class RightOverlayLayout extends VerticalCenterOverlayLayout {
    getPositionHorizontal(_: DOMRect, target: DOMRect): number {
        return target.right;
    }
}