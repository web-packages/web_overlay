
export class DOMRectUtil {
    static merge(child: DOMRect, parent: Partial<DOMRect>): DOMRect {
        return new DOMRect(
            parent.x ?? child.x,
            parent.y ?? child.y,
            parent.width ?? child.width,
            parent.height ?? child.height
        )
    }

    static reflowHorizontal(target: HTMLElement, rect: DOMRect): DOMRect {
        target.style.left = `${rect.left}px`;
        target.style.top = `${rect.top}px`;
        target.style.width = `${rect.width}px`;
        target.style.height = null;
        return target.getBoundingClientRect();
    }

    static reflowVertical(target: HTMLElement, rect: DOMRect): DOMRect {
        target.style.left = `${rect.left}px`;
        target.style.top = `${rect.top}px`;
        target.style.width = null;
        target.style.height = `${rect.height}px`;
        return target.getBoundingClientRect();
    }

    static applyPadding(rect: DOMRect, padding: number): DOMRect {
        return new DOMRect(
            rect.x + padding,
            rect.y + padding,
            rect.width - padding * 2,
            rect.height - padding * 2
        )
    }
}