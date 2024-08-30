document.addEventListener("DOMContentLoaded", function() {
    fetch('../data/videos.json') // 경로를 수정합니다.
        .then(response => response.json())
        .then(data => {
            const videoList = document.getElementById('video-list');
            const partVideos = document.getElementById('part-videos');
            const partButtons = document.querySelectorAll('[data-part]');

            // 최근 인기 영상 목록 생성
            let chunkSize = 4; // 한 슬라이드에 표시할 영상 개수
            for (let i = 0; i < data.length; i += chunkSize) {
                const chunk = data.slice(i, i + chunkSize);
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (i === 0) {
                    carouselItem.classList.add('active');
                }

                const rowDiv = document.createElement('div');
                rowDiv.classList.add('row');

                chunk.forEach(video => {
                    const videoCard = createVideoCard(video);
                    rowDiv.appendChild(videoCard);
                });

                carouselItem.appendChild(rowDiv);
                videoList.appendChild(carouselItem);
            }

            // 운동 부위 버튼 클릭 시 해당 부위의 영상 목록 생성
            partButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const part = this.getAttribute('data-part');
                    partVideos.innerHTML = ''; // 기존의 영상을 초기화
                    const filteredVideos = data.filter(video => video.part === part);
                    filteredVideos.forEach(video => {
                        const videoCard = createPartVideoCard(video);
                        partVideos.appendChild(videoCard);
                    });
                });
            });
        })
        .catch(error => console.error('Error loading video data:', error));

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
