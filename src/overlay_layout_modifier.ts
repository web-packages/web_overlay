import { DrivenOverlayConstraint, OverlayConstraint } from "./overlay_constraint";
import { OverlayLayoutPosition } from "./overlay_layout";
import { DOMRectUtil } from "./utils/dom_rect";

export type OverlayLayoutRepositionCallback = (rect: DOMRect) => OverlayLayoutPosition;
       type RC = OverlayLayoutRepositionCallback;

export enum OverlaySizedOverflowBehavior {
    NONE = "none",
    REFLOW = "reflow",
    REFLOW_REPOSITION = "reflow_reposition"
}

export abstract class OverlayLayoutModifier<T extends OverlayConstraint = OverlayConstraint> {
    protected child?: OverlayLayoutModifier;

    constructor(public parent?: OverlayLayoutModifier<T>) {
        if (parent) this.parent.child = this;
    }

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

export class SizedOverlayLayoutModifier extends OverlayLayoutModifier {
    constructor(public overflowBehavior = OverlaySizedOverflowBehavior.NONE) {
        super();
    }

    performLayoutVertical(element: HTMLElement, rect: DOMRect, constraint: OverlayConstraint, reposition: RC): DOMRect {
        let overflowed = constraint.overflowed(rect);
        let markNeedReflow = false;
        let markNeedReposition = false;

        if (overflowed.bottom) {
            rect = DOMRectUtil.merge(rect, {height: Math.max(rect.height - overflowed.bottom, 0)});
            markNeedReflow = true;
            markNeedReposition = true;
        }
        if (overflowed.top) {
            rect = DOMRectUtil.merge(rect, {y: rect.y + overflowed.top, height: rect.height - overflowed.top});
            markNeedReflow = true;
            markNeedReposition = true;
        }

        if (markNeedReflow
         && this.overflowBehavior == OverlaySizedOverflowBehavior.REFLOW
         || this.overflowBehavior == OverlaySizedOverflowBehavior.REFLOW_REPOSITION) {
            rect = DOMRectUtil.reflowVertical(element, rect);
        }
        
        if (markNeedReposition && this.overflowBehavior == OverlaySizedOverflowBehavior.REFLOW_REPOSITION) {
            rect = DOMRectUtil.merge(rect, {x: reposition(rect).x});
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

export class PositionedOverlayLayoutModifier extends OverlayLayoutModifier {
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
            rect = DOMRectUtil.merge(rect, {x: rect.x - overflowed.right});
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

export class AbsoluateOverlayLayoutModifier extends OverlayLayoutModifier {
    performLayoutVertical(_: HTMLElement, rect: DOMRect): DOMRect {
        return rect;
    }

    performLayoutHorizontal(_: HTMLElement, rect: DOMRect): DOMRect {
        return rect;
    }
}