import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { OverlayLayoutPosition } from "./overlay_layout";
import { DOMRectUtil } from "./utils/dom_rect";

export type OverlayLayoutRepositionCallback = (rect: DOMRect) => OverlayLayoutPosition;
type RC = OverlayLayoutRepositionCallback;

export abstract class OverlayLayoutBehavior<T extends OverlayConstraint = OverlayConstraint> {
    constructor(public parent?: OverlayLayoutBehavior<T>) {}

    performLayout(
        element: HTMLElement,
        current: DOMRect,
        constraint: T,
        reposition: RC
    ): DOMRect {
        // Generally, height is calculated according to width,
        // so the overflow degree in the horizontal direction
        // is calculated and reflowed first.
        const horizontal = this.performLayoutHorizontal(element, current, constraint, reposition);

        return this.performLayoutVertical(element, horizontal, constraint, reposition);
    }

    abstract performLayoutVertical(
        element: HTMLElement,
        current: DOMRect,
        constraint: T,
        reposition: RC
    ): DOMRect;

    abstract performLayoutHorizontal(
        element: HTMLElement,
        current: DOMRect,
        constraint: T,
        reposition: RC
    ): DOMRect;
}

export class SizedOverlayLayoutBehavior extends OverlayLayoutBehavior {
    performLayoutVertical(_: HTMLElement, rect: DOMRect, constraint: OverlayConstraint): DOMRect {
        let overflowed = constraint.overflowed(rect);

        console.log(overflowed);

        if (overflowed.bottom) {
            rect = DOMRectUtil.merge(rect, {height: Math.max(rect.height - overflowed.bottom, 0)});
        } else if (overflowed.top) {
            rect = DOMRectUtil.merge(rect, {y: rect.y + overflowed.top, height: rect.height - overflowed.top});
        }

        return rect;
    }

    performLayoutHorizontal(element: HTMLElement, rect: DOMRect, constraint: OverlayConstraint, reposition: RC): DOMRect {
        let overflowed = constraint.overflowed(rect);
        let markNeedReposition = false;

        if (overflowed.left) {
            rect = DOMRectUtil.merge(rect, {x: rect.x + overflowed.left, width: rect.width - overflowed.left});
            rect = DOMRectUtil.reflowHorizontal(element, rect);
            markNeedReposition = true;
        }

        if (overflowed.right) {
            rect = DOMRectUtil.merge(rect, {width: rect.width - overflowed.right});
            rect = DOMRectUtil.reflowHorizontal(element, rect);
            markNeedReposition = true;
        }

        if (markNeedReposition) {
            rect = DOMRectUtil.merge(rect, {y: reposition(rect).y});
        }

        return rect;
    }
}

export class PositionedOverlayLayoutBehavior extends OverlayLayoutBehavior {
    performLayoutVertical(_: HTMLElement, rect: DOMRect, constraint: OverlayConstraint, reposition: RC): DOMRect {
        let overflowed = constraint.overflowed(rect);
        let markNeedDelegateToParent = false;

        if (overflowed.bottom) {
            rect = DOMRectUtil.merge(rect, {y: rect.y - overflowed.bottom});
            overflowed = constraint.overflowed(rect);

            // Delegate to the parent the when top overflowed.
            if (overflowed.top) markNeedDelegateToParent = true;
        } else if (overflowed.top) {
            rect = DOMRectUtil.merge(rect, {y: rect.y + overflowed.top});
            overflowed = constraint.overflowed(rect);

            // Delegate to the parent the when bottom overflowed.
            if (overflowed.bottom) markNeedDelegateToParent = true;
        }

        if (markNeedDelegateToParent) {
            return this.parent?.performLayoutVertical(_, rect, constraint, reposition) ?? rect;
        }

        return rect;
    }

    performLayoutHorizontal(_: HTMLElement, rect: DOMRect, constraint: DrivenOverlayConstraint, reposition: RC): DOMRect {
        let overflowed = constraint.overflowed(rect);
        let markNeedDelegateToParent = false;

        if (overflowed.left) {
            rect = DOMRectUtil.merge(rect, {x: rect.x + overflowed.left});
            overflowed = constraint.overflowed(rect);
            
            // Delegate to the parent the when right overflowed.
            if (overflowed.right) markNeedDelegateToParent = true;
        } else if (overflowed.right) {
            rect = DOMRectUtil.merge(rect, {x: rect.x - Math.max(overflowed.right, constraint.viewport.left)});
            overflowed = constraint.overflowed(rect);

            // Delegate to the parent the when left overflowed.
            if (overflowed.left) markNeedDelegateToParent = true;
        }

        if (markNeedDelegateToParent) {
            return this.parent?.performLayoutHorizontal(_, rect, constraint, reposition) ?? rect;
        }

        return rect;
    }
}

export class AbsoluateOverlayLayoutBehavior extends OverlayLayoutBehavior {
    performLayoutVertical(_: HTMLElement, rect: DOMRect): DOMRect {
        return rect;
    }

    performLayoutHorizontal(_: HTMLElement, rect: DOMRect): DOMRect {
        return rect;
    }
}