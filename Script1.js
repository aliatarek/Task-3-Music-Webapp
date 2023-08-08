let trackname= document.getElementById('trackname');
let artist= document.getElementById('artist');
let trackimage= document.getElementById('trackimage');

let playb= document.getElementById('playtrack');
let nextsong= document.getElementById('nextsong');
let prevsong= document.getElementById('prevsong');

let seekslider= document.getElementById('seekslider');
let volume= document.getElementById('volume');
let currenttime= document.getElementById('currenttime');
let duration= document.getElementById('duration');

let index=0;
let isplaying=false;
let updatet;

let curr_track=document.createElement('audio');
//document.appendChild('curr_track');

let curr_song=[
    {
        songname:"august",
        artist:"Taylor Swift",
        image:"August.jpg",
        song:"august.mp3",
    },
    {
        songname:"Fix You",
        artist:"Coldplay",
        image:"fixyou.jpg",
        song:"fixu.mp3",
    },
    {
        songname:"Summertime Sadness",
        artist:"Lana Del Ray",
        image:"summer.png",
        song:"summer.mp3",
    },
    {
        songname:"Cardigan",
        artist:"Taylor Swift",
        image:"cardigan.jpg",
        song:"cardigan.mp3",
    },
];

function loads(index){
    clearInterval(updatet);
    seekslider.value=0;
    currenttime.textContent="00:00";
    duration.textContent="00:00";

    curr_track.src=curr_song[index].song;
    curr_track.load();

    trackimage.style.backgroundImage="url("+curr_song[index].image+")";
    trackname.textContent=curr_song[index].songname;
    artist.textContent=curr_song[index].artist;
    //need a counter for the seek bar

    updatet=setInterval(seekupdate,1000);
    curr_track.addEventListener("ended", nexttrack);
}

function playtrack(){
    if(!isplaying){
    curr_track.play();
    isplaying=true;
    playb.innerHTML='<i class="fa fa-pause-circle fa-5x"></i>';
    }
    else{
        curr_track.pause();
        playb.innerHTML='<i class="fa fa-play-circle fa-5x"></i>';
        isplaying=false;
    }
}

function nexttrack(){
    if( index<curr_song.length-1){
        index=index+1;}
    else{
    index=0;}

    loads(index);
    playtrack();
}

function prevtrack(){
    if(index==0){
        index=curr_song.length-1;}
    else{
    index=index-1;}

    loads(index);
    playtrack();
}

function seekTO(){
   let seekto = curr_track.duration * (seekslider.value / 100);

    curr_track.currentTime = seekto;
}

function seekupdate(){
    let seekposition=0;
  if (!isNaN(curr_track.duration)) {
    seekposition=curr_track.currentTime*(100/curr_track.duration)
    //seekslider.value = seekposition;
    let cminutes=Math.floor(curr_track.currentTime/60);
    let cseconds=Math.floor(curr_track.currentTime-cminutes*60);
    let totalm=Math.floor(curr_track.duration/60);
    let totals=Math.floor(curr_track.duration-totalm*60);

    if(cminutes<10){
        cminutes="0"+cminutes;
    }
    if(cseconds<10){
        cseconds="0"+cseconds;
    }
    if(totalm<10){
        totalm="0"+totalm;
    }
    if(totals<10){
        totals="0"+totals;
    }
    const firstTwoNumbers = String(cseconds).substring(0, 2);
    currenttime.textContent=cminutes+":"+ firstTwoNumbers;
    duration.textContent=totalm+":"+Math.floor(totals);
 
    // Display the updated duration
    currenttime.textContent = currentMinutes + ":" + currentSeconds;
    duration.textContent = durationMinutes + ":" + durationSeconds;
}
}

function volumebar(){
    curr_track.volume=volume.value/100 ;//why divide
}

loads(index);
