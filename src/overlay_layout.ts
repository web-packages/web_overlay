import { OverlayElement } from "./components/overlay_element";
import { OverlayAlignment, OverlayBehavior } from "./overlay";
import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { OverlayLayoutModifier } from "./overlay_layout_modifier";
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
    abstract perfromLayoutPosition(overlay: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition;

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
        const modifier = behavior.alignment ?? OverlayAlignment.ALL;
        const targetGap = behavior.targetGap ?? 0;
        const viewportPadding = behavior.viewportPadding ?? 0;

        const getPosition = (rect: DOMRect) => {
            return this.perfromLayoutPosition(rect, target, targetGap);
        }

        const initialRect = DOMRectUtil.merge(overlay, getPosition(overlay));
        const constraint = this.createOverlayConstraint(
            DOMRectUtil.applyPadding(viewport, viewportPadding)
        );
        
        let correctedRect = initialRect;

        if (modifier instanceof OverlayLayoutModifier) {
            correctedRect = modifier.performLayout(element, initialRect, constraint, getPosition);
        } else {
            console.assert(modifier.horizontal != null);
            console.assert(modifier.vertical != null);
            const hr = modifier.horizontal.performLayoutHorizontal(element, initialRect, constraint, getPosition);
            const vr = modifier.vertical.performLayoutVertical(element, hr, constraint, getPosition);
            correctedRect = vr;
        }

        return {
            initialRect: initialRect,
            correctedRect: correctedRect
        }
    }
}

export abstract class VerticalCenterOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition {
        const x = this.getPositionHorizontal(overlay, target, gap);
        const y = target.y + (target.height - overlay.height) / 2;

        return {x, y};
    }

    abstract getPositionHorizontal(overlay: DOMRect, target: DOMRect, gap: number): number;
}

export abstract class HorizontalCenterOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition {
        const x = target.x + (target.width - overlay.width) / 2;
        const y = this.getPositionVertical(overlay, target, gap);

        return {x, y};
    }

    abstract getPositionVertical(overlay: DOMRect, target: DOMRect, gap: number): number;
}

export class BottomCenterOverlayLayout extends HorizontalCenterOverlayLayout {
    getPositionVertical(_: DOMRect, target: DOMRect, gap: number): number {
        return target.bottom + gap;
    }
}

export class BottomLeftOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition {
        return {
            x: target.right - overlay.width,
            y: target.bottom + gap
        }
    }
}

export class BottomRightOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(_: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition {
        return {
            x: target.left,
            y: target.bottom + gap
        }
    }
}

export class TopCenterOverlayLayout extends HorizontalCenterOverlayLayout {
    getPositionVertical(overlay: DOMRect, target: DOMRect, gap: number): number {
        return target.top - overlay.height - gap;
    }
}

export class TopLeftOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition {
        return {
            x: target.right - overlay.width,
            y: target.y - overlay.height - gap
        }
    }
}

export class TopRightOverlayLayout extends DrivenOverlayLayout {
    perfromLayoutPosition(overlay: DOMRect, target: DOMRect, gap: number): OverlayLayoutPosition {
        return {
            x: target.left,
            y: target.top - overlay.height - gap
        }
    }
}

export class LeftOverlayLayout extends VerticalCenterOverlayLayout {
    getPositionHorizontal(overlay: DOMRect, target: DOMRect, gap: number): number {
        return target.left - overlay.width - gap;
    }
}

export class RightOverlayLayout extends VerticalCenterOverlayLayout {
    getPositionHorizontal(_: DOMRect, target: DOMRect, gap: number): number {
        return target.right + gap;
    }
}