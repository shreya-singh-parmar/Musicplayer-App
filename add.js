let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let filter = document.getElementById('filter');
filter.addEventListener('keyup',filterItem);
let song = [
    {songName:"Love You Zindagi", filePath:"songs/1.mp3",coverPath:"img/cover1.jpg"},
    {songName:"Ruk Jana Nahi Tu", filePath:"songs/2.mp3",coverPath:"img/cover2.jfif"},
    {songName:"Phir Se Udd Chale", filePath:"songs/3.mp3",coverPath:"img/cover3.jpg"},
    {songName:"Kya Karoon??", filePath:"songs/4.mp3",coverPath:"img/cover4.jpg"},
    {songName:"Get Ready To Fight", filePath:"songs/5.mp3",coverPath:"img/cover5.jpg"},
    {songName:"Yeh Hosla Kaise Juke", filePath:"songs/6.mp3",coverPath:"img/cover6.jpg"},
    {songName:"Patakha Guddi ", filePath:"songs/7.mp3",coverPath:"img/cover7.jpg"},
]
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src= song[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML=song[i].songName;
})
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        playButtons[songIndex].classList.remove('fa-circle-play');
        playButtons[songIndex].classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        playButtons[songIndex].classList.remove('fa-circle-pause');
        playButtons[songIndex].classList.add('fa-circle-play');
    }
})
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seekbar
    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
element.classList.add('fa-circle-play');
    })
}

const playButtons = Array.from(document.getElementsByClassName('songItemPlay'));
playButtons.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-circle-play')) {
            
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            audioElement.src = song[songIndex].filePath;
            masterSongName.innerText = song[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
        } else {
           
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
        }
    });
})



document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src= `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime =0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    playButtons[songIndex].classList.remove('fa-circle-play');
    playButtons[songIndex].classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src= `songs/${songIndex+1}.mp3`;
   masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime =0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    playButtons[songIndex].classList.remove('fa-circle-play');
    playButtons[songIndex].classList.add('fa-circle-pause');
    
})

// filter functionality
function filterItem() {
    const searchTerm = filter.value.toLowerCase();
    songItems.forEach((element, i) => {
        const songName = song[i].songName.toLowerCase();
        if (songName.includes(searchTerm)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}

const timestamps = Array.from(document.querySelectorAll('.timestamp'));


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}


song.forEach((songData, index) => {
    const audio = new Audio(songData.filePath);
    audio.addEventListener('loadedmetadata', () => {
        const totalDuration = Math.floor(audio.duration);
        timestamps[index].textContent = formatTime(totalDuration);
        audio.currentTime = 0;
    });
});



