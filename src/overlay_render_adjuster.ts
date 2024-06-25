import { OverlayAlignment } from "./overlay";
import { OverlayConstraint } from "./overlay_constraint";
import { DOMRectUtil } from "./utils/dom_rect";

export class OverlayRenderAdjuster {
    constructor(
        public element: HTMLElement,
        public alignment: OverlayAlignment,
    ) {}

    performLayout(rect: DOMRect, constraint: OverlayConstraint): DOMRect {
        // Generally, height is calculated according to width,
        // so the overflow degree in the horizontal direction is calculated and reflowed first.
        return this.performLayoutHorizontal(rect, constraint);
    }

    performLayoutHorizontal(rect: DOMRect, constraint: OverlayConstraint) {
        let overflowed = constraint.getOverflowed(rect);

        if (overflowed.left != 0) {
            rect = DOMRectUtil.merge(rect, {x: rect.x + overflowed.left});
            overflowed = constraint.getOverflowed(rect);
            
            if (overflowed.right) {
                rect = DOMRectUtil.merge(rect, {width: rect.width - overflowed.right});
                rect = DOMRectUtil.reflowHorizontal(this.element, rect);
            }
        } else if (overflowed.right != 0) {
            rect = DOMRectUtil.merge(rect, {x: rect.x - Math.max(overflowed.right, constraint.viewport.left)});
            overflowed = constraint.getOverflowed(rect);

            if (overflowed.left) {
                rect = DOMRectUtil.merge(rect, {x: rect.x + overflowed.left, width: rect.width - overflowed.left});
                rect = DOMRectUtil.reflowHorizontal(this.element, rect);
            }
        }

        return rect;
    }
}