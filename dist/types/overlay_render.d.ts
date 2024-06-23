export type OverlayRenderResult = {
    x: number;
    y: number;
    size: {
        width: number;
        height: number;
    };
};
export declare abstract class OverlayRender {
    private static get tolerance();
    abstract performLayout(element: HTMLElement, target: HTMLElement, parent: HTMLElement): OverlayRenderResult;
    measureSize(target: HTMLElement): OverlayRenderResult;
    reflow(target: HTMLElement): void;
}
export declare class OverlayRenderWithAlignCenter extends OverlayRender {
    performLayout(element: HTMLElement, target: HTMLElement, parent: HTMLElement): OverlayRenderResult;
}
