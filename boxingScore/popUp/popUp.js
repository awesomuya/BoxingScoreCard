function openPopup() {
  document.getElementById("overlay").style.display = "flex";
  document.body.style.overflow = "hidden"; // Disable scrolling on the main page
}

function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.body.style.overflow = ""; // Enable scrolling on the main page
}
