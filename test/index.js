import { Overlay } from "../dist/index.esm.js";

const overlayTarget = document.getElementById("target");
const overlay = document.createElement("div");
overlay.style.display = "flex";
overlay.style.margin = "10px";
overlay.style.padding = "15px";
overlay.style.borderRadius = "10px";
overlay.style.backgroundColor = "red";
overlay.textContent = "Overlay Content, Overlay Content, Overlay Content, Overlay Content, Overlay Content";

Overlay.attach(overlay, overlayTarget, overlayTarget.parentElement);