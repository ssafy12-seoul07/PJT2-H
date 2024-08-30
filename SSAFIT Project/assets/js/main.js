document.addEventListener("DOMContentLoaded", function() {
    fetch('../assets/data/videos.json')
        .then(response => response.json())
        .then(data => {
            const partVideos = document.getElementById('part-videos');
            const partDropdownItems = document.querySelectorAll('.dropdown-item');

            // 초기 로드 시 기본 부위를 "전신"으로 설정하여 영상 표시
            updateVideos('전신');

            // 드롭다운 아이템 클릭 시 해당 부위의 영상 목록 업데이트
            partDropdownItems.forEach(item => {
                item.addEventListener('click', function() {
                    const part = this.getAttribute('data-part');
                    updateVideos(part);

                    // 버튼 텍스트를 선택한 부위로 변경
                    const partSelectButton = document.getElementById('partSelectButton');
                    partSelectButton.textContent = `운동 부위: ${part}`;
                });
            });

            // 운동 부위에 맞는 영상을 업데이트하는 함수
            function updateVideos(part) {
                partVideos.innerHTML = ''; // 기존의 영상 초기화
                const filteredVideos = data.filter(video => video.part === part);
                filteredVideos.forEach(video => {
                    const videoCard = createPartVideoCard(video);
                    partVideos.appendChild(videoCard);
                });
            }

            // 운동 부위별 영상 카드 생성 함수
            function createPartVideoCard(video) {
                const colDiv = document.createElement('div');
                colDiv.classList.add('col-md-4', 'mb-4');

                const thumbnailUrl = getThumbnailUrl(video.id, 'mqdefault');

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
            function getThumbnailUrl(videoId, quality = 'mqdefault') {
                return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
            }
        })
        .catch(error => console.error('Error loading video data:', error));
});

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
