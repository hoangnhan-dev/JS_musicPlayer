const musicList = [
    {
        'img': '.img/nauchoeman.jpg',
        'name': 'Nấu Cho Em Ăn',
        'artist': 'Đen Vâu',
        'music': './music/NauChoEmAn.mp3'
    },
    {
        'img': '.img/mang-tien-ve-cho-me.jpg',
        'name': 'Mang Tiền Về Cho Mẹ',
        'artist': 'Đen Vâu',
        'music': '.music/mang-tien-ve-cho-me.mp3'
    },
    {
        'img': '.img/loi-nho.jpg',
        'name': 'Lối Nhỏ',
        'artist': 'Đen Vâu',
        'music': '.music/loi-nho.mp3'
    },
    {
        'img': '.img/tron-tim.jpg',
        'name': 'Trốn Tìm',
        'artist': 'Đen Vâu',
        'music': '.music/tron-tim.mp3'
    }
];

const currentTrack = document.createElement('audio');


// Hiển thị đọ dài danh sách phát
const playList = document.querySelector('.play-list');
playList.innerHTML = musicList.length;


function playBack(index) {
    // Hiển thị số thứ tự danh sách đang phát
    const nowPlaying = document.querySelector('.now-playing');
    nowPlaying.innerHTML = index + 1;

    // Phát nhạc 
    currentTrack.src = musicList[index].music;
    currentTrack.load();
    currentTrack.play();

    // Xoay ảnh
    const trackImg = document.querySelector('.track-img');
    trackImg.classList.add('active');

    // Hiển thị wave
    const wave = document.querySelectorAll('.stroke');
    const waveList = document.querySelector('.stroke__list');
    waveList.style.height = '70px';
    waveList.style.display = 'flex';
    wave.forEach(function(item) {
        item.classList.add('active');
    });
}

// Lắng nghe sự kiện click vào nhút Play
const playBtn = document.querySelector('.play__btn');
const btnPause = document.querySelector('.play__btn i:first-child');
const btnPlay = document.querySelector('.play__btn i:last-child');
playBtn.addEventListener('click', function() {
    // Thay đổi nút play
    btnPause.style.display = 'none';
    btnPlay.style.display = 'block';

    //Phát nhạc
    playBack(0);
})

console.log(currentTrack.play());
