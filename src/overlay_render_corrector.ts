import { OverlayBehavior } from "./overlay";
import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { DOMRectUtil } from "./utils/dom_rect";

export abstract class OverlayRenderCorrector<T extends OverlayConstraint> {
    constructor(
        public element: HTMLElement,
        public behavior: OverlayBehavior,
    ) {}

    performLayout(rect: DOMRect, constraint: T): DOMRect {
        // Generally, height is calculated according to width,
        // so the overflow degree in the horizontal direction is calculated and reflowed first.
        return this.performLayoutVertical(this.performLayoutHorizontal(rect, constraint), constraint);
    }

    abstract performLayoutVertical  (rect: DOMRect, constraint: T): DOMRect;
    abstract performLayoutHorizontal(rect: DOMRect, constraint: T): DOMRect;
}

export class SizedOverlayRenderCorrector<T extends OverlayConstraint> extends OverlayRenderCorrector<T> {
    performLayoutVertical(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect {
        return rect;
    }

    performLayoutHorizontal(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect {
        return rect;
    }
}

export class PositionedOverlayRenderCorrector<T extends OverlayConstraint> extends OverlayRenderCorrector<T> {
    performLayoutVertical(rect: DOMRect, constraint: T): DOMRect {
        return rect;
    }

    performLayoutHorizontal(rect: DOMRect, constraint: T): DOMRect {
        return rect;
    }
}

export class DrivenOverlayRenderCorrector extends OverlayRenderCorrector<DrivenOverlayConstraint> {
    performLayoutHorizontal(rect: DOMRect, constraint: OverlayConstraint): DOMRect {
        let overflowed = constraint.getOverflowed(rect);

        if (overflowed.left) {
            rect = DOMRectUtil.merge(rect, {x: rect.x + overflowed.left});
            overflowed = constraint.getOverflowed(rect);

            // Again after adjustment, resize the width when overflowed.
            if (overflowed.right) {
                rect = DOMRectUtil.merge(rect, {width: rect.width - overflowed.right});
                rect = DOMRectUtil.reflowHorizontal(this.element, rect);
            }
        } else if (overflowed.right) {
            rect = DOMRectUtil.merge(rect, {x: rect.x - Math.max(overflowed.right, constraint.viewport.left)});
            overflowed = constraint.getOverflowed(rect);

            // Again after adjustment, resize the width when overflowed.
            if (overflowed.left) {
                rect = DOMRectUtil.merge(rect, {x: rect.x + overflowed.left, width: rect.width - overflowed.left});
                rect = DOMRectUtil.reflowHorizontal(this.element, rect);
            }
        }

        return rect;
    }

    performLayoutVertical(rect: DOMRect, constraint: OverlayConstraint): DOMRect {
        let overflowed = constraint.getOverflowed(rect);

        if (overflowed.bottom) {
            rect = DOMRectUtil.merge(rect, {y: rect.y - overflowed.bottom});
            overflowed = constraint.getOverflowed(rect);

            // Again after adjustment, resize the height when overflowed.
            if (overflowed.top) {
                return DOMRectUtil.merge(rect, {
                    y: rect.y + overflowed.top,
                    height: Math.max(rect.height - overflowed.top, 0)
                });
            }
        } else if (overflowed.top) {
            rect = DOMRectUtil.merge(rect, {y: rect.y + overflowed.top});
            overflowed = constraint.getOverflowed(rect);

            // Again after adjustment, resize the height when overflowed.
            if (overflowed.bottom) {
                return DOMRectUtil.merge(rect, {height: Math.max(rect.height - overflowed.bottom, 0)})
            }
        }

        return rect;
    }
}