import { Overlay, OverlayAlignment, OverlayDirection } from "../dist/index.esm.js";

const overlayTarget = document.getElementById("target");
const overlayParent = document.getElementById("target-wrapper");
const overlay = document.createElement("div");
overlay.style.display = "flex";
overlay.style.height = "100%";
overlay.style.maxHeight = "max-content";
overlay.style.padding = "15px";
overlay.style.borderRadius = "10px";
overlay.style.backgroundColor = "red";
overlay.style.boxSizing = "border-box"
overlay.style.overflowY = "auto";

const child = document.createElement("div");
child.style.height = "max-content";
child.textContent = "Overlay Content Overlay Content, Overlay Content, Overlay Content, Overlay Content";

overlay.append(child);

const instance = Overlay.attach({
    element: overlay,
    target: overlayTarget,
    parent: overlayParent,
    behavior: {
        viewportPadding: 15,
        targetGap: 10,
        direction: OverlayDirection.BOTTOM_CENTER,
        animation: {
            fadein: "fade-in 0.3s",
            fadeout: "fade-out 0.3s"
        },
        alignment: {
            horizontal: OverlayAlignment.ALL,
            vertical: OverlayAlignment.ALL
        },
    }
});