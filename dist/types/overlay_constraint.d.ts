import { OverlayAlignment } from "./overlay";
export type OverlayConstraintSized = {
    width: number;
    height: number;
};
export type OverlayConstraintOverflowed = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};
export declare abstract class OverlayConstraint {
    viewport: DOMRect;
    alignment: OverlayAlignment;
    constructor(viewport: DOMRect, alignment: OverlayAlignment);
    abstract getSized(rect: DOMRect): OverlayConstraintSized;
    abstract getOverflowed(rect: DOMRect): OverlayConstraintOverflowed;
}
export declare class FlexibleOverlayConstraint extends OverlayConstraint {
    getSized(rect: DOMRect): OverlayConstraintSized;
    getOverflowed(rect: DOMRect): OverlayConstraintOverflowed;
}
