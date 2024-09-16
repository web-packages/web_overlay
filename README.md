<div align="center">
    <img src="https://github.com/user-attachments/assets/ae6c1d98-5754-4c2e-9c4f-685a7d45000e">
    <h1>Web Overlay Layout</h1>
    <table>
        <thead>
          <tr>
            <th>Version</th>
            <th>v1.0.0</th>
          </tr>
        </tbody>
    </table>
</div>

# Introduction
This package provides the foundation to implement overlay elements that take overflow-considered.

> See Also, If you want the change-log by version for this package. refer to [Change Log](CHANGELOG.md) for details.

> __Details__<br>
> This package provides offers a comprehensive solution for managing content that extends beyond the boundaries of its container, ensuring seamless integration and optimal user experience across various display contexts.

## Preview
![preview](https://github.com/MTtankkeo/web_overlay/assets/122026021/c98ea6fb-8802-4497-b3a3-a81606f04ece)

## How to add overlay to target element.
This when you want to attach an overlay element to a specific element rather than a specific static position by calling to `Overlay.attach` function.

### When only required properties.
The example below define only required values to adding the overlay element to the target element.

```ts
const overlay = ...;
const overlayTarget = ...;

Overlay.attach({
    element: overlay,
    target: overlayTarget,
    parent: overlayTarget.parentElement, // default is body
});
```

### When adding options about overlay.
The example below define behaviors in the `behavior` that is properties key.

```ts
Overlay.attach({
    ...,
    behavior: {
        viewportPadding: 15,
        targetGap: 10,
        direction: OverlayDirection.BOTTOM_CENTER,
        animation: {...},

        // Define how to correct overflowed.
        alignment: OverlayAlignment.ALL,
        
        // Define how to correct overflowed by direction.
        alignment: {
            horizontal: OverlayAlignment.ALL,
            vertical: OverlayAlignment.SIZE
        },
    }
});
```

## The Properties of OverlayDirection
This constants values that defines overlay layout objects that defines alignment directions of an overlay element.

```ts
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
```

## The Properties of OverlayAlignment
Signature for the types about the overlay alignment behavior.

```ts
export const OverlayAlignment = {
    ALL: new PositionedOverlayLayoutModifier(new SizedOverlayLayoutModifier()),
    NONE: new AbsoluateOverlayLayoutModifier(),
    SIZE: new SizedOverlayLayoutModifier(),
    POSITION: new PositionedOverlayLayoutModifier()
}
```

## The Properties of OverlayBehavior\<T\>
Signature for the interface that defines overlay behaviors about measure position of an overlay element and post-processing or other tasks.

| Name | Description | Type |
| ---- | ----------- | ---- |
| direction | The property that defines an instance that defines where the overlay element is placed in the viewport. | OverlayLayout<T>
| alignment? | The property that defines an instance for post-processing when an overlay element overflows the viewport. | OverlayLayoutModifier \| OverlayLayoutModifierByDirection
| animation? | The property that defines a CSS Keyframes for an overlay element about fade-in and fade-out animation. | OverlayAnimation
| targetGap? | The pixel value for how far the overlay element should be relative to the particular element(target) that should be placed. | number
| viewportPadding? | The pixel value representing the padding around the viewport to ensure that the overlay element does not overlap the edges of the viewport or to provide additional spacing. | number
| onLayoutBehind? | The callback function that is invoked after the layout calculation has been completed. And this function receives the overlay element and the final layout result, allowing for additional processing or adjustments once the layout has been finalized. | OverlayLayoutBehindCallback
