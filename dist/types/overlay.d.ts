import { OverlayElement } from "./components/overlay_element";
export declare const OverlayAlignment: {
    AUTO: string;
    AUTO_LEFT: string;
    AUTO_RIGHT: string;
    AUTO_CENTER: string;
};
export declare class Overlay {
    private static overlays;
    static attach(element: HTMLElement, target: HTMLElement, parent?: HTMLElement, alignment?: string): OverlayElement;
    static detach(element: HTMLElement): void;
}
