import { OverlayAlignment } from "./overlay";
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
    abstract getOverflowed(rect: DOMRect): OverlayConstraintOverflowed;
}
export declare class FlexibleOverlayConstraint extends OverlayConstraint {
    getOverflowed(rect: DOMRect): OverlayConstraintOverflowed;
}
