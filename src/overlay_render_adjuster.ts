import { OverlayAlignment } from "./overlay";
import { OverlayConstraint, OverlayConstraintOverflowed } from "./overlay_constraint";
import { DOMRectUtil } from "./utils/dom_rect";

export class OverlayRenderAdjuster {
    constructor(
        public rect: DOMRect,
        public viewport: DOMRect,
        public alignment: OverlayAlignment,
    ) {}

    performLayout(constraint: OverlayConstraint): DOMRect {
        let rect = this.rect;
        let overflowed = constraint.getOverflowed(rect);

        if (overflowed.left != 0) {
            rect = DOMRectUtil.merge(rect, {x: rect.x + overflowed.left});
            overflowed = constraint.getOverflowed(rect);
            
            if (overflowed.right) {
                rect = DOMRectUtil.merge(rect, {width: rect.width - overflowed.right});
            }
        } else if (overflowed.right != 0) {
            rect = DOMRectUtil.merge(rect, {x: rect.x - Math.max(overflowed.right, this.viewport.left)});
            overflowed = constraint.getOverflowed(rect);

            if (overflowed.left) {
                rect = DOMRectUtil.merge(rect, {x: rect.x + overflowed.left, width: rect.width - overflowed.left});
            }
        }

        return rect;
    }
}