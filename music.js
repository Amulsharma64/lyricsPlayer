 const image = document.querySelector('img');
 const music = document.querySelector('audio');
 const play = document.getElementById('play');
 const artist = document.getElementById('artist');
 const title = document.getElementById('title');
 const Previous = document.getElementById('prev');
 const next = document.getElementById('forward');

 let progress = document.getElementById('progress');
 let totalDuration = document.getElementById('duration');
 let tcurrentTime = document.getElementById('current_time');
 const progress_div = document.getElementById('progress_div'); 

const songs=[
{
name: "music1",
title:"night lane",
artist:"fellings",
},
{
name: "music2",
title:"fav one",
artist:"artist",
},
{
name: "music3",
title:"fave two",
artist:"artist",
},
{
name: "music4",
title:"fav three",
artist:"artist",
},
{
name: "music5",
title: "fav four",
artist: "artist",
},];

 let playing = false;
//for play function

playMusic = () => {
playing = true;
music.play();
image.classList.add('animation');
play.classList.replace('fa-play',  'fa-pause');
};
//for pause function

pauseMusic = () => {
playing = false;
music.pause();
image.classList.remove('animation');
play.classList.replace('fa-pause',  'fa-play');
};

play.addEventListener('click',()=>{
if(playing){
pauseMusic();
}else{
playMusic();
}
})

// changing music data 

const loadSongs = (songs) =>{
title.textContent=songs.title;
artist.textContent=songs.artist;
music.src = "music/"+songs.name+".mp3";
image.src =  "images/"+songs.name+".jpg";
}; 
let songIndex = 0;


const nextSong = () => {
songIndex = ( songIndex +1) % songs.length;
loadSongs(songs[songIndex]);
playMusic();
};

const prevSong = () => {
songIndex = ( songIndex - 1  + songs.length)%songs.length;
loadSongs(songs[songIndex]);
playMusic();
}; 

//progress js work

music.addEventListener('timeupdate',(Event) => {
     const { currentTime, duration } = Event.target;
     let progress_time =  (currentTime/duration)*100;
    progress.style.width = `${progress_time}%`;

    //  music duration update
    let min_duration = Math.floor(duration/60);
    let sec_duration = Math.floor(duration%60);
    let totDuration = `${min_duration}:${sec_duration}`;
    if(duration){
    totalDuration.textContent =  `${totDuration}`;
    }

     //  Current duration update
     let min_currentTime = Math.floor(currentTime/60);
     let sec_currentTime = Math.floor(currentTime%60);
     
     if(sec_currentTime<10){
         sec_currentTime=`0${sec_currentTime}`;
     }
     let totCurrentTime = `${min_currentTime}:${sec_currentTime}`;
     tcurrentTime.textContent =  `${totCurrentTime}`;
});
//function on click functionality 
progress_div.addEventListener('click',(Event)=>{
 const { duration } = music;
 let move_progress = 
 (Event.offsetX / Event.target.clientWidth)*duration;
 music.currentTime = move_progress;
});
//if music end call next song  
music.addEventListener('ended',nextSong);

next.addEventListener('click', nextSong);

Previous.addEventListener('click', prevSong);