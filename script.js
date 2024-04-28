console.log("Welcome to spotify-your own music adda")

let songIndex=0;
let audioElement=new Audio('songs/Blue - One Love.mp3');
let masterPlay=document.getElementById('masterPlay');
let gif=document.getElementById('gif');
let myProgressBar=document.getElementById('myProgressBar');
let songItem=Array.from(document.getElementsByClassName('songItem'));
let masterSongName=document.getElementById('masterSongName');

let songs=[
    {songName:"Blue - One Love", filePath:"songs/Blue - One Love.mp3", coverPath:"cover/Bluecover1.jpg"},
    {songName:"Imagine Dragons - Believer", filePath:"songs/Imagine Dragons - Believer.mp3", coverPath:"cover/Believer.jpg"},
    {songName:"James Bond - Skyfall", filePath:"songs/James Bond - Skyfall.mp3", coverPath:"cover/Skyfall.jpg"},
    {songName:"Kaleo - Way Down We Go", filePath:"songs/Kaleo - Way Down We Go.mp3", coverPath:"cover/Kaleow.jpg"},
]

songItem.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        gif.style.opacity=1;
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=songs[songIndex-1].filePath;
        masterSongName.innerText=songs[songIndex-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>3){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    gif.style.opacity=1;
    masterSongName.innerText=songs[songIndex-1].songName
    audioElement.src=songs[songIndex-1].filePath;;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    gif.style.opacity=1;
    audioElement.src=songs[songIndex-1].filePath;;
    masterSongName.innerText=songs[songIndex-1].songName
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})