export type OverlayConstraintOverflowed = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};
export declare abstract class OverlayConstraint {
    viewport: DOMRect;
    constructor(viewport: DOMRect);
    abstract overflowed(rect: DOMRect): OverlayConstraintOverflowed;
}
export declare class DrivenOverlayConstraint extends OverlayConstraint {
    overflowed(rect: DOMRect): OverlayConstraintOverflowed;
}
