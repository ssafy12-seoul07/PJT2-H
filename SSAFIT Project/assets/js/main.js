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
                    link.href = `../pages/add_review.html?videoId=${data[j].id}&videoTitle=${encodeURIComponent(data[j].title)}&channelName=${encodeURIComponent(data[j].channelName)}`;
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
                        <a href="${video.url}" target="_blank"> <!-- 영상 링크로 이동 -->
                            <img src="${thumbnailUrl}" class="card-img-top" alt="${video.title}">
                            <div class="card-body">
                                <h5 class="card-title">${video.title}</h5>
                                <p class="card-text">채널: ${video.channelName}</p>
                            </div>
                        </a>
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
