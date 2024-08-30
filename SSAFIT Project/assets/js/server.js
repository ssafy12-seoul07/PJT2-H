// 서버에서 리뷰 데이터를 가져와서 테이블에 추가하는 함수
async function loadReviews() {
    try {
        const response = await fetch('/reviews');
        const reviews = await response.json();
        const reviewList = document.getElementById('reviewList');

        reviews.forEach(review => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${review.title}</td>
                <td>${review.content}</td>
                <td>${review.date}</td>
                <td>${review.videoTitle}</td>
            `;
            reviewList.appendChild(row);
        });
    } catch (error) {
        console.error('리뷰를 불러오는 중 오류가 발생했습니다:', error);
    }
}

// 리뷰를 서버에 저장하는 함수
async function saveReview(review) {
    try {
        const response = await fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });

        if (response.ok) {
            console.log('리뷰가 성공적으로 저장되었습니다.');
        } else {
            console.error('리뷰 저장에 실패했습니다.');
        }
    } catch (error) {
        console.error('리뷰 저장 중 오류가 발생했습니다:', error);
    }
}

// 비디오 선택 박스를 채우는 함수
async function loadVideos() {
    try {
        const response = await fetch('/video.json');
        const videos = await response.json();
        const videoSelect = document.getElementById('videoSelect');
        const videoTitle = document.getElementById('videoTitle');
        const pageTitle = document.getElementById('pageTitle');
        const videoPlayer = document.getElementById('videoPlayer');

        videos.forEach(video => {
            const option = document.createElement('option');
            option.value = video.url;
            option.text = video.title;
            videoSelect.appendChild(option);
        });

        videoSelect.onchange = function() {
            const selectedTitle = this.options[this.selectedIndex].text;
            videoPlayer.src = this.value;
            videoTitle.textContent = selectedTitle;
            pageTitle.textContent = selectedTitle;
        };

        // 첫 번째 비디오를 기본으로 설정
        videoSelect.selectedIndex = 0;
        videoSelect.onchange();
    } catch (error) {
        console.error('비디오 목록을 불러오는 중 오류가 발생했습니다:', error);
    }
}

document.getElementById('submitReview').onclick = async function() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const date = new Date().toLocaleString();
    const videoTitle = document.getElementById('videoSelect').selectedOptions[0].text;

    const newReview = { title, content, date, videoTitle };

    // 서버에 리뷰 저장
    await saveReview(newReview);

    // 새 리뷰를 테이블에 추가
    const reviewList = document.getElementById('reviewList');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${title}</td>
        <td>${content}</td>
        <td>${date}</td>
        <td>${videoTitle}</td>
    `;
    reviewList.appendChild(row);

    // 입력 필드 초기화
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';

    // 모달 닫기
    document.getElementById('myModal').style.display = 'none';
};

document.getElementById('closeModalBtn').onclick = function() {
    document.getElementById('myModal').style.display = 'none';
};

// 페이지 로드 시 기존 리뷰와 비디오 목록을 서버에서 가져옴
window.onload = function() {
    loadReviews();
    loadVideos();
};

// 모달 외부 클릭 시 모달 닫기
window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = 'none';
    }
};

// 모달 열기
document.getElementById('openModalBtn').onclick = function() {
    document.getElementById('myModal').style.display = 'block';
};



// 기존에 등록된 리뷰 데이터를 가져와서 테이블에 추가하는 코드
const reviews = [
    { title: "리뷰 1", content: "내용 1", date: "2024-08-30 12:00" },
    { title: "리뷰 2", content: "내용 2", date: "2024-08-31 14:30" }
];

const reviewManagementList = document.getElementById('reviewManagementList');
let currentEditingIndex = -1;

function populateReviewTable() {
    reviewManagementList.innerHTML = ''; // 기존 테이블 내용을 초기화

    reviews.forEach((review, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${review.title}</td>
            <td>${review.content}</td>
            <td>${review.date}</td>
            <td>
                <button class="edit-btn" onclick="editReview(${index})">수정</button>
                <button class="delete-btn" onclick="deleteReview(${index})">삭제</button>
            </td>
        `;
        reviewManagementList.appendChild(row);
    });
}

function editReview(index) {
    currentEditingIndex = index;

    // 모달을 통해 리뷰 수정
    document.getElementById('editTitle').value = reviews[index].title;
    document.getElementById('editContent').value = reviews[index].content;

    // 모달 열기
    document.getElementById('editModal').style.display = 'block';
}

function deleteReview(index) {
    // 리뷰 삭제 로직 구현
    reviews.splice(index, 1);
    populateReviewTable();
}

document.getElementById('saveChanges').onclick = function() {
    if (currentEditingIndex > -1) {
        reviews[currentEditingIndex].title = document.getElementById('editTitle').value;
        reviews[currentEditingIndex].content = document.getElementById('editContent').value;

        // 테이블 갱신
        populateReviewTable();

        // 모달 닫기
        document.getElementById('editModal').style.display = 'none';
    }
};

document.getElementById('closeEditModal').onclick = function() {
    // 모달 닫기
    document.getElementById('editModal').style.display = 'none';
};

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target == document.getElementById('editModal')) {
        document.getElementById('editModal').style.display = 'none';
    }
};

// 초기 테이블 채우기
populateReviewTable();

//리뷰를 추가하는 함수
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
