/**
 * Yonas Gebregziabher
 * M9: Another Kind of CC
 * 12/12/2023
 * CSCI 3725
 *
 * DOM manipulation script to download state of canvas
 */

saveImageButton = document.querySelector("button#save-image");

saveImageButton.addEventListener("click", function (e) {
  canvas = document.getElementById("defaultCanvas0");
  canvasURL = canvas.toDataURL("image/jpeg", 0.5);
  console.log(canvasURL);
  canvasLinkElement = document.createElement("a");
  canvasLinkElement.href = canvasURL;
  canvasLinkElement.download = "web_kam_art.jpeg";
  canvasLinkElement.click();
  canvasLinkElement.remove();
});
