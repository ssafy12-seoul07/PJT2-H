// review-list.js

// Function to add a review to the list
function addReview(title, content, date) {
    var reviewList = document.getElementById("reviewList");
    var newRow = document.createElement("tr");

    var titleCell = document.createElement("td");
    var contentCell = document.createElement("td");
    var dateCell = document.createElement("td");

    titleCell.innerText = title;
    contentCell.innerText = content;
    dateCell.innerText = date;

    newRow.appendChild(titleCell);
    newRow.appendChild(contentCell);
    newRow.appendChild(dateCell);

    reviewList.appendChild(newRow);
}
