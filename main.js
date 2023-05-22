const musicList = [
    {
        'img': './img/nauchoeman.jpg',
        'name': 'Nấu Cho Em Ăn',
        'artist': 'Đen Vâu',
        'music': '/music/NauChoEmAn.mp3'
    },
    {
        'img': '/img/mang-tien-ve-cho-me.jpg',
        'name': 'Mang Tiền Về Cho Mẹ',
        'artist': 'Đen Vâu',
        'music': '/music/mangtienvechome.mp3'
    },
    {
        'img': './img/loi-nho.jpg',
        'name': 'Lối Nhỏ',
        'artist': 'Đen Vâu',
        'music': '/music/loi-nho.mp3'
    },
    {
        'img': './img/tron-tim.jpg',
        'name': 'Trốn Tìm',
        'artist': 'Đen Vâu',
        'music': '/music/tron-tim.mp3'
    }
];

const currentTrack = document.createElement('audio');
const trackImg = document.querySelector('.track-img');
const wave = document.querySelectorAll('.stroke');
const playList = document.querySelector('.play-list');
const nowPlaying = document.querySelector('.now-playing');
const waveList = document.querySelector('.stroke__list');
const playBtn = document.querySelector('.play__btn');
const btnPause = document.querySelector('.play__btn i:first-child');
const btnPlay = document.querySelector('.play__btn i:last-child');
const trackName = document.querySelector('.track-info h3');
const trackArtist = document.querySelector('.track-info p');
const backBtn = document.querySelector('.backBtn');
const nextBtn = document.querySelector('.nextBtn');
const currentTime = document.querySelector('.current-time');
const trackDuration = document.querySelector('.track-duration');
const trackSlider = document.querySelector('.track-slider input');
const trackVolumn = document.querySelector('.track-volumn input');
const trackShuffle = document.querySelector('.track-shuffle');
const trackRepeat = document.querySelector('.track-repeat');
const changeBG = document.querySelector('body');

let isPlaying = false;
let index = 0;
let time;
let isRandom = false;

// Hiển thị độ dài danh sách phát
playList.innerHTML = musicList.length;

function changeBg() {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e'];
    let firstColorIndex;
    let secondColorIndex;
    let firstColor = '';
    let secondColor = '';
    for (let i = 0; i < 6; i++) {
        firstColorIndex = Math.floor(Math.random() * 15);
        firstColor += hex[firstColorIndex];
        secondColorIndex = Math.floor(Math.random() * 15);
        secondColor += hex[secondColorIndex];
    }
    console.log(firstColor, secondColor);
    changeBG.style.backgroundImage = `linear-gradient(to right, #${firstColor}, #${secondColor});`
    trackSlider.style.backgroundImage = `linear-gradient(to right, #${firstColor}, #${secondColor});`
    trackVolumn.style.backgroundImage = `linear-gradient(to right, #${firstColor}, #${secondColor});`
}

function randomTrack() {
    trackShuffle.addEventListener('click', function () {
        isRandom = isRandom ? false : true;
        isRandom ? this.style.color = '#000' : this.style.color = '#fff';
    })
}

function trackRepeatAll() {
    trackRepeat.addEventListener('click', function () {
        isRandom = isRandom ? false : true;
    })
}

function nextTrack() {
    if (isRandom) {
        let randTrack = Math.floor(Math.random() * 4);
        while (randTrack === index) {
            randTrack = Math.floor(Math.random() * 4);
        }
        index = randTrack;
    }
    else {
        index = index + 1 === musicList.length ? 0 : index + 1;
    }
    playBack(index);
}

function backTrack() {
    if (isRandom) {
        let randTrack = Math.floor(Math.random() * 4);
        while (randTrack === index) {
            randTrack = Math.floor(Math.random() * 4);
        }
        index = randTrack;
    }
    else {
        index = index > 0 ? index - 1 : musicList.length - 1;
    }
    playBack(index);
}

function playBack(index) {
    // Hiển thị số thứ tự danh sách đang phát
    nowPlaying.innerHTML = index + 1;

    // Phát nhạc 
    currentTrack.src = musicList[index].music;
    currentTrack.load();
    currentTrack.play();

    // Xử lí thanh volumn
    trackVolumn.value = 100;
    trackVolumn.addEventListener('change', function () {
        currentTrack.volume = trackVolumn.value / 100;
    })

    // Xử lí thanh trượt.
    time = setInterval(function () {
        // Hiển thị thời gian hiện tại
        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime % 60);
        currentSeconds < 10 ? currentTime.innerText = `0${currentMinutes}:0${currentSeconds}` :
            currentTime.innerText = `0${currentMinutes}:${currentSeconds}`;


        // Hiển thị tổng thời lượng bài hát
        let trackMinutes = Math.floor(currentTrack.duration / 60);
        let trackSeconds = Math.floor(currentTrack.duration % 60);
        trackSeconds < 10 ? trackDuration.innerText = `0${trackMinutes}:0${trackSeconds}` :
            trackDuration.innerText = `0${trackMinutes}:${trackSeconds}`;

        // Hiển thị thanh thời lượng bài hát
        trackSlider.value = currentTrack.currentTime / currentTrack.duration * 100;
    }, 1000);

    // Import ảnh, tên nhạc, tên tác giả
    trackImg.style.backgroundImage = `url('${musicList[index].img}');`;
    trackName.innerHTML = musicList[index].name;
    trackArtist.innerHTML = musicList[index].artist;

    // Xoay ảnh
    trackImg.classList.add('active');

    // Hiển thị wave
    waveList.style.height = '70px';
    waveList.style.display = 'flex';
    wave.forEach(function (item) {
        item.classList.add('active');
    });

    // Tự động phát tiếp nhạc
    currentTrack.addEventListener('ended', function () {
        nextTrack();
    })
}

function pauseTrack() {
    // Dừng nhạc
    currentTrack.pause();
    isPlaying = false;

    // Dừng xoay ảnh
    trackImg.classList.remove('active');

    // Ẩn wave
    waveList.style.display = 'none';

    // Dừng current time
    clearInterval(time);
    currentTime.innerText = `00:00`;
}

// Lắng nghe sự kiện click vào nhút Play
playBtn.addEventListener('click', function () {
    if (isPlaying === false) {
        isPlaying = true;

        // Thay đổi nút play
        btnPause.style.display = 'none';
        btnPlay.style.display = 'block';

        // Đổi màu nền
        changeBg();

        //Phát nhạc
        playBack(index);
    } else {
        // Thay đổi nút play
        btnPause.style.display = 'block';
        btnPlay.style.display = 'none';

        // Dừng nhạc
        pauseTrack();
    }
})

// Lắng nghe sự kiện back
backBtn.addEventListener('click', function () {
    btnPause.style.display = 'none';
    btnPlay.style.display = 'block';

    // Đổi màu nền
    changeBg();

    backTrack();
})

// Lắng nghe sự kiện next
nextBtn.addEventListener('click', function () {
    btnPause.style.display = 'none';
    btnPlay.style.display = 'block';

    // Đổi màu nền
    changeBg();

    nextTrack();
})

// Bật mix nhạc 
randomTrack();

//Track repeat
trackRepeatAll();
