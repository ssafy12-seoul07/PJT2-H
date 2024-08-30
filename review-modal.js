// review-modal.js

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the close button
var closeBtn = document.getElementById("closeModalBtn");

// Get the submit button
var submitBtn = document.getElementById("submitReview");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on close button, close the modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Add event listener for the submit button
submitBtn.onclick = function() {
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
    var date = new Date().toLocaleString();

    // Add the review to the list
    addReview(title, content, date);

    // Clear the modal inputs
    document.getElementById("title").value = '';
    document.getElementById("content").value = '';

    // Close the modal
    modal.style.display = "none";
}
