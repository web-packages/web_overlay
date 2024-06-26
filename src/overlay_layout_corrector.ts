import { OverlayElement } from "./components/overlay_element";
import { OverlayBehavior } from "./overlay";
import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { OverlayLayoutPosition } from "./overlay_layout";
import { DOMRectUtil } from "./utils/dom_rect";

export type OverlayLayoutRepositionCallback = (rect: DOMRect) => OverlayLayoutPosition;

export abstract class OverlayLayoutCorrector<T extends OverlayConstraint> {
    constructor(
        public element: OverlayElement,
        public reposition: OverlayLayoutRepositionCallback
    ) {}

    performLayout(rect: DOMRect, constraint: T): DOMRect {
        // Generally, height is calculated according to width,
        // so the overflow degree in the horizontal direction
        // is calculated and reflowed first.
        return this.performLayoutVertical(this.performLayoutHorizontal(rect, constraint), constraint);
    }

    abstract performLayoutVertical(rect: DOMRect, constraint: T): DOMRect;
    abstract performLayoutHorizontal(rect: DOMRect, constraint: T): DOMRect;
}

export class SizedOverlayLayoutCorrector extends OverlayLayoutCorrector<DrivenOverlayConstraint> {
    performLayoutVertical(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect {
        return rect;
    }

    performLayoutHorizontal(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect {
        return rect;
    }
}

export class PositionedOverlayLayoutCorrector extends OverlayLayoutCorrector<DrivenOverlayConstraint> {
    performLayoutVertical(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect {
        const overflowed = constraint.getOverflowed(rect);

        if (overflowed.bottom) {
            rect = DOMRectUtil.merge(rect, {y: rect.y - overflowed.bottom});
        } else if (overflowed.top) {
            rect = DOMRectUtil.merge(rect, {y: rect.y + overflowed.top});
        }

        return rect;
    }

    performLayoutHorizontal(rect: DOMRect, constraint: DrivenOverlayConstraint): DOMRect {
        const overflowed = constraint.getOverflowed(rect);

        if (overflowed.left) {
            rect = DOMRectUtil.merge(rect, {x: rect.x - Math.max(overflowed.right, constraint.viewport.left)});
        } else if (overflowed.right) {
            rect = DOMRectUtil.merge(rect, {x: rect.x - Math.max(overflowed.right, constraint.viewport.left)});
        }

        return rect;
    }
}

export class DrivenOverlayRenderCorrector extends OverlayLayoutCorrector<DrivenOverlayConstraint> {
    constructor(
        public behavior: OverlayBehavior,
        element: OverlayElement,
        repositionCallback: OverlayLayoutRepositionCallback,
    ) {
        super(element, repositionCallback);
    }

    performLayoutHorizontal(rect: DOMRect, constraint: OverlayConstraint): DOMRect {
        let overflowed = constraint.getOverflowed(rect);
        let markNeedReposition = false;

        if (overflowed.left) {
            rect = DOMRectUtil.merge(rect, {x: rect.x + overflowed.left});
            overflowed = constraint.getOverflowed(rect);

            // Again after adjustment, resize the width when overflowed.
            if (overflowed.right) {
                rect = DOMRectUtil.merge(rect, {width: rect.width - overflowed.right});
                rect = DOMRectUtil.reflowHorizontal(this.element, rect);
                markNeedReposition = true;
            }
        } else if (overflowed.right) {
            rect = DOMRectUtil.merge(rect, {x: rect.x - Math.max(overflowed.right, constraint.viewport.left)});
            overflowed = constraint.getOverflowed(rect);

            // Again after adjustment, resize the width when overflowed.
            if (overflowed.left) {
                rect = DOMRectUtil.merge(rect, {x: rect.x + overflowed.left, width: rect.width - overflowed.left});
                rect = DOMRectUtil.reflowHorizontal(this.element, rect);
                markNeedReposition = true;
            }
        }

        // As the width has decreased, need to reposition the Y.
        if (markNeedReposition) {
            const repositioned = this.reposition(rect);
            rect = DOMRectUtil.merge(rect, {y: repositioned.y});
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