<div align="center">
    <img src="https://github.com/user-attachments/assets/862a6848-60ce-4ec5-8674-b3f747e5bc3d">
    <h1>Web Overlay Layout</h1>
    <table>
        <thead>
          <tr>
            <th>Version</th>
            <th>v1.0.0-alpha1</th>
          </tr>
        </tbody>
    </table>
</div>

This package provides the foundation to implement overlay elements that take overflow-considered.

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
