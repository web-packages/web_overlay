
export class DOMRectUtil {
    static merge(child: DOMRect, parent: Partial<DOMRect>): DOMRect {
        return new DOMRect(
            parent.x ?? child.x,
            parent.y ?? child.y,
            parent.width ?? child.width,
            parent.height ?? child.height
        )
    }
}