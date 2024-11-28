// by: dipson kc
// modal = div with the help content
// function that displays the help div
function showModal() {
  var modal = document.getElementById("myModal");

  modal.style.display = "block";
}

// function that hides the help div
function closeModal() {
  var modal = document.getElementById("myModal");

  modal.style.display = "none";
}

// when clicked outside the modal it closes the modal
function closeModalOutside(event) {
  var modal = document.getElementById("myModal");

  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// closes the modal when clicked outside of the help div (model-content)
document.getElementById("myModal").onclick = closeModalOutside;
