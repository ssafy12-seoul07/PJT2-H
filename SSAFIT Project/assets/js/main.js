document.addEventListener("DOMContentLoaded", function() {
    fetch('../assets/data/videos.json')
        .then(response => response.json())
        .then(data => {
            const partVideos = document.getElementById('part-videos');
            const partSelect = document.getElementById('partSelect');
            const carouselItems = document.getElementById('carouselItems');
            let isActive = true;

            // 최근 가장 많이 본 영상 캐러셀 설정
            for (let i = 0; i < data.length; i += 2) {
                const item = document.createElement('div');
                item.className = `carousel-item ${isActive ? 'active' : ''}`;
                isActive = false;

                const row = document.createElement('div');
                row.className = 'row';

                for (let j = i; j < i + 2 && j < data.length; j++) {
                    const col = document.createElement('div');
                    col.className = 'col-md-6';

                    const card = document.createElement('div');
                    card.className = 'card';

                    const link = document.createElement('a');
                    link.href = data[j].url;
                    link.target = '_blank'; // 새로운 탭에서 열기
                    
                    const img = document.createElement('img');
                    img.src = `https://img.youtube.com/vi/${data[j].id}/mqdefault.jpg`;  // 유튜브 썸네일 URL
                    img.className = 'card-img-top';
                    img.alt = data[j].title;

                    link.appendChild(img);
                    card.appendChild(link);

                    col.appendChild(card);
                    row.appendChild(col);
                }

                item.appendChild(row);
                carouselItems.appendChild(item);
            }

            // 기본값으로 "전신" 부위의 영상 표시
            updateRecommendedVideos(data, '전신');

            // 운동 부위 선택 시 해당 부위의 영상 목록 생성
            partSelect.addEventListener('change', function() {
                const part = this.value;
                updateRecommendedVideos(data, part);
            });

            function updateRecommendedVideos(data, part) {
                partVideos.innerHTML = ''; // 기존의 영상을 초기화
                const filteredVideos = data.filter(video => video.part === part);
                filteredVideos.forEach(video => {
                    const videoCard = createPartVideoCard(video);
                    partVideos.appendChild(videoCard);
                });
            }

            // 운동 부위별 영상 카드 생성 함수
            function createPartVideoCard(video) {
                const colDiv = document.createElement('div');
                colDiv.classList.add('col-md-3', 'mb-4');

                const thumbnailUrl = getThumbnailUrl(video.id, 'maxresdefault');

                colDiv.innerHTML = `
                    <div class="card h-100">
                        <img src="${thumbnailUrl}" class="card-img-top" alt="${video.title}">
                        <div class="card-body">
                            <h5 class="card-title">${video.title}</h5>
                            <p class="card-text">채널: ${video.channelName}</p>
                        </div>
                    </div>
                `;

                return colDiv;
            }

            // 유튜브 썸네일 URL 생성 함수
            function getThumbnailUrl(videoId, quality = 'maxresdefault') {
                return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
            }
        })
        .catch(error => console.error('Error loading video data:', error));
});
<<<<<<< HEAD
=======

    // 유튜브 썸네일 URL 생성 함수
    function getThumbnailUrl(videoId, quality = 'mqdefault') {
        return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    }

    // 영상 카드 생성 함수 (carousel 전용)
    function createVideoCard(video) {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-12', 'mb-4');

        // 유튜브 썸네일 URL 생성
        const thumbnailUrl = getThumbnailUrl(video.id, 'maxresdefault');

        colDiv.innerHTML = `
            <div class="card h-100">
                <img src="${thumbnailUrl}" class="card-img-top" alt="${video.title}">
                <div class="card-body">
                    <h5 class="card-title">${video.title}</h5>
                    <p class="card-text">채널: ${video.channelName}</p>
                </div>
            </div>
        `;

        return colDiv;
    }

    // 운동 부위별 영상 카드 생성 함수
    function createPartVideoCard(video) {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-md-3', 'mb-4');
    
        const thumbnailUrl = getThumbnailUrl(video.id, 'maxresdefault');
    
        colDiv.innerHTML = `
            <div class="card h-100">
                <img src="${thumbnailUrl}" class="card-img-top" alt="${video.title}">
                <div class="duration">16:08</div> <!-- 이 부분에 시간을 표시 -->
                <div class="card-body">
                    <h5 class="card-title">${video.title}</h5>
                    <p class="card-text">채널: ${video.channelName}</p>
                </div>
            </div>
        `;
    
        return colDiv;
    }    
});

//작성한 리뷰를 리스트에 추가하는 함수
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

// 모달 작동을 위한 기능

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

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
let reviews = [];  // 간단한 메모리 내 저장소

app.use(bodyParser.json());
app.use(express.static('public'));  // 'public' 폴더에 클라이언트 파일들을 두고 서빙합니다.

// 비디오 목록 가져오기
app.get('../data/videos.json', (req, res) => {
    fs.readFile('./video.json', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to load video data' });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// 리뷰 목록 가져오기
app.get('/reviews', (req, res) => {
    res.json(reviews);
});

// 리뷰 추가하기
app.post('/reviews', (req, res) => {
    const newReview = req.body;
    reviews.push(newReview);
    res.status(201).json(newReview);
});

// 리뷰 수정하기
app.put('/reviews/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < reviews.length) {
        reviews[index] = req.body;
        res.status(200).json(reviews[index]);
    } else {
        res.status(404).json({ error: 'Review not found' });
    }
});

app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
>>>>>>> b9222d275a8d5fc7afcb88949279c76926b5f6ce
