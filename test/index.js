import { Overlay, OverlayDirection } from "../dist/index.esm.js";

const overlayTarget = document.getElementById("target");
const overlay = document.createElement("div");
overlay.style.display = "flex";
overlay.style.height = "fit-content";
overlay.style.minHeight = "0px";
overlay.style.maxHeight = "max-content";
overlay.style.margin = "10px";
overlay.style.padding = "15px";
overlay.style.borderRadius = "10px";
overlay.style.backgroundColor = "red";
overlay.style.overflowY = "auto";

const child = document.createElement("div");
child.style.height = "max-content";
child.textContent = "Overlay Content, Overlay Content, Overlay Content, Overlay Content, Overlay Content";

overlay.append(child);
Overlay.attach(
    overlay,
    overlayTarget,
    overlayTarget.parentElement,
    {
        layout: OverlayDirection.BOTTOM
    }
);