export declare class DOMRectUtil {
    static merge(child: DOMRect, parent: Partial<DOMRect>): DOMRect;
    static reflowHorizontal(target: HTMLElement, rect: DOMRect): DOMRect;
    static applyPadding(rect: DOMRect, padding: number): DOMRect;
}
