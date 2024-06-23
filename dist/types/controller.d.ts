export declare enum OverlayAlignment {
    auto = "auto",
    autoLeft = "auto_left",
    autoRight = "auto_right",
    autoCenter = "auto_center"
}
export declare class Overlay {
    static attach(target: HTMLElement, parent?: HTMLElement, alignment?: OverlayAlignment): void;
}
