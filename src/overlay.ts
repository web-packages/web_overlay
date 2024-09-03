import { OverlayElement } from "./components/overlay_element";
import { OverlayConstraint } from "./overlay_constraint";
import { BottomCenterOverlayLayout, BottomLeftOverlayLayout, BottomRightOverlayLayout, LeftOverlayLayout, OverlayLayout, OverlayLayoutPosition, OverlayLayoutResult, RightOverlayLayout, TopCenterOverlayLayout, TopLeftOverlayLayout, TopRightOverlayLayout } from "./overlay_layout";
import { AbsoluateOverlayLayoutModifier, OverlayLayoutModifier, PositionedOverlayLayoutModifier, SizedOverlayLayoutModifier } from "./overlay_layout_modifier";

/**
 * This constants values that defines overlay layout objects that defines
 * alignment directions of an overlay element.
 */
export const OverlayDirection = {
    BOTTOM_CENTER: new BottomCenterOverlayLayout(),
    BOTTOM_RIGHT: new BottomRightOverlayLayout(),
    BOTTOM_LEFT: new BottomLeftOverlayLayout(),
    TOP_CENTER: new TopCenterOverlayLayout(),
    TOP_RIGHT: new TopRightOverlayLayout(),
    TOP_LEFT: new TopLeftOverlayLayout(),
    LEFT: new LeftOverlayLayout(),
    RIGHT: new RightOverlayLayout()
}

/** Signature for the types about the overlay alignment behavior. */
export const OverlayAlignment = {
    ALL: new PositionedOverlayLayoutModifier(new SizedOverlayLayoutModifier()),
    NONE: new AbsoluateOverlayLayoutModifier(),
    SIZE: new SizedOverlayLayoutModifier(),
    POSITION: new PositionedOverlayLayoutModifier()
}

/** Signature for the type that defines a modifier for overlay elements by direction. */
export type OverlayLayoutModifierByDirection = {
    vertical: OverlayLayoutModifier,
    horizontal: OverlayLayoutModifier
}

/**
 * Signature for the function that is called when after the layout
 * calculation has finally been completed.
 */
export type OverlayLayoutBehindCallback = (element: HTMLElement, result: OverlayLayoutResult) => void;

/**
 * Signature for the interface that defines overlay behaviors about
 * measure position of an overlay element and post-processing or other tasks.
 */
export interface OverlayBehavior<T extends OverlayConstraint = any> {
    /**
     * The property that defines an instance that defines where
     * an overlay element is placed in the viewport.
     */
    direction: OverlayLayout<T>;
    /**
     * The property that defines an instance for post-processing
     * when an overlay element overflows the viewport.
     */
    alignment?: OverlayLayoutModifier | OverlayLayoutModifierByDirection;
    /**
     * The pixel value for how far the overlay element should be
     * relative to the particular element(target) that should be placed.
     * 
     * See Also, The default value is 0.
     */
    targetGap?: number;
    /**
     * The pixel value representing the padding around the viewport
     * to ensure that the overlay element does not overlap the edges
     * of the viewport or to provide additional spacing.
     * 
     * See Also, The default value is 0.
     */
    viewportPadding?: number;
    /**
     * The callback function that is invoked after the layout
     * calculation has been completed.
     * 
     * This function receives the overlay element and the final layout result,
     * allowing for additional processing or adjustments
     * once the layout has been finalized.
     */
    onLayoutBehind?: OverlayLayoutBehindCallback;
}

/**
 * This class provides methods for managing and attaching overlay elements
 * to a target element within a parent container. It handles the creation and
 * positioning of overlay elements, as well as applying specified behaviors 
 * for proper layout and display.
 * 
 * See Also: Used to handle the placement and configuration of overlays, 
 * ensuring they are correctly positioned and managed within the DOM.
 */
export class Overlay {
    private static overlays = new Map<HTMLElement, OverlayElement>();

    /** This value defines the default overlay behavior. */
    private static defaultBehavior: OverlayBehavior = {
        direction: OverlayDirection.BOTTOM_CENTER
    }

    /**
     * Attaches an overlay element to a target element within a specified parent container.
     * 
     * @param params - An object containing parameters for attaching the overlay.
     * @param params.element - The overlay element to be attached.
     * @param params.target - The target element to which the overlay is relative.
     * @param params.parent - The parent container where the overlay will be appended.
     * @param params.behavior - The behavior configuration for the overlay.
     * 
     * @returns The created `OverlayElement` wrapping the provided overlay.
     * 
     * See Also, This method ensures the overlay is correctly positioned and behaves 
     * according to the specified `OverlayBehavior`.
     */
    static attach({element, target, parent, behavior}: {
        element: HTMLElement,
        target: HTMLElement,
        parent: HTMLElement,
        behavior: OverlayBehavior
    }) {
        if (element == null) throw new Error("todo");
        if (target == null) throw new Error("todo");
        if (parent == null) throw new Error("todo");

        const wrapper = document.createElement("overlay-wrapper") as OverlayElement;
        wrapper.append(element);
        wrapper.target = target;
        wrapper.parent = parent;
        wrapper.behavior = behavior ?? Overlay.defaultBehavior;

        this.overlays.set(element, wrapper);
        parent.append(wrapper);

        return wrapper;
    }

    /**
     * Creates and positions an overlay element at a specific position within a parent container.
     * 
     * @param params - An object containing parameters for positioning the overlay.
     * @param params.element - The overlay element to be created and positioned.
     * @param params.parent - The parent container where the overlay will be appended.
     * @param params.behavior - The behavior configuration for the overlay.
     * @param params.position - The position where the overlay should be placed, specified as 
     * a coordinate.
     * 
     * @returns The created `OverlayElement` wrapping the provided overlay.
     * 
     * See Also, This method allows for precise control over the overlay's position 
     * by specifying exact coordinates.
     */
    static at({element, parent, behavior, position}: {
        element: HTMLElement,
        parent: HTMLElement,
        behavior: OverlayBehavior,
        position: OverlayLayoutPosition,
    }) {
        const wrapper = document.createElement("overlay-wrapper") as OverlayElement;
        wrapper.append(element);
        wrapper.target = new DOMRect(position.x, position.y);
        wrapper.parent = parent ?? document.body;
        wrapper.behavior = behavior ?? Overlay.defaultBehavior;

        this.overlays.set(element, wrapper);
        parent.append(wrapper);

        return wrapper;
    }
}