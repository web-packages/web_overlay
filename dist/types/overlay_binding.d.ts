export declare enum OverlayAlignment {
    auto = "auto",
    autoLeft = "auto_left",
    autoRight = "auto_right",
    autoCenter = "auto_center"
}
export declare class OverlayBinding {
    private static overlays;
    static attach(target: HTMLElement, parent?: HTMLElement, alignment?: OverlayAlignment): void;
    static detach(element: HTMLElement): void;
}
