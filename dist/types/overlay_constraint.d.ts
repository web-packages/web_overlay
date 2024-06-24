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
export interface OverlayConstraintResult {
    size: OverlayConstraintSized;
    overflowed: OverlayConstraintOverflowed;
}
export declare abstract class OverlayConstraint {
    viewport: DOMRect;
    alignment: OverlayAlignment;
    constructor(viewport: DOMRect, alignment: OverlayAlignment);
    measure(rect: DOMRect): OverlayConstraintResult;
    abstract measureSized(rect: DOMRect): OverlayConstraintSized;
    abstract measureOverflowed(rect: DOMRect): OverlayConstraintOverflowed;
}
export declare class FlexibleOverlayConstraint extends OverlayConstraint {
    measureSized(rect: DOMRect): OverlayConstraintSized;
    measureOverflowed(rect: DOMRect): OverlayConstraintOverflowed;
}
