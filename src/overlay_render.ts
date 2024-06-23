
export type OverlayRenderResult = {
    x: number,
    y: number,
    size: {width: number, height: number}
};

export abstract class OverlayRender {
    private static get tolerance(): number {
        return 0.3;
    }

    /**
     * Calculates the static position and size where the overlay element
     * will be located and returns it.
     */
    abstract performLayout(
        element: HTMLElement,
        target: HTMLElement,
        parent: HTMLElement
    ): OverlayRenderResult;

    /**
     * Returns a unique size of the given element by calculating
     * for a scale degree.
     */
    measureSize(target: HTMLElement): OverlayRenderResult {
        const painted = target.getBoundingClientRect();
        const scaleX = target.clientWidth / painted.width;
        const scaleY = target.clientHeight / painted.height;
        const tolerance = OverlayRender.tolerance;

        return {
            x: painted.x,
            y: painted.y,
            size: {
                width: painted.width * scaleX + tolerance,
                height: painted.height * scaleY + tolerance,
            }
        };
    }

    /** Call this function to trigger a reflow of the given element. */
    reflow(target: HTMLElement) {
        target.getBoundingClientRect();
    }
}

export class OverlayRenderWithAlignCenter extends OverlayRender {
    performLayout(
        element: HTMLElement,
        target: HTMLElement,
        parent: HTMLElement
    ): OverlayRenderResult {
        const overlay = this.measureSize(element);
        const viewport = this.measureSize(parent);
        const targetLayout = this.measureSize(target);

        // Calculate overflow based on viewport dimensions (assuming no scrolling)
        const overflowed = {
            x: Math.max(overlay.size.width - viewport.size.width, 0),
            y: Math.max(overlay.size.height - viewport.size.height, 0),
        };

        return {
            x: overflowed.x,
            y: overflowed.y,
            size: overlay.size
        }
    }
}