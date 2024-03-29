// console.log("Welcome to Spotify");
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let songItem=Array.from (document.getElementsByClassName("songItem"));

let songs=[
    {songName:"Hare Krishna Hare Ram", filePath:"./songs/1.mp3",coverPath:"./covers/1.jpg"},
    {songName:"Habibi Remix", filePath:"./songs/2.mp3",coverPath:"./covers/2.jfif"},
    {songName:"Paisa Hai to", filePath:"./songs/3.mp3",coverPath:"./covers/3.jfif"},
    {songName:"Sigma Rule", filePath:"./songs/4.mp3",coverPath:"./covers/4.jfif"},
    {songName:"You and I -Katty Perry", filePath:"./songs/5.mp3",coverPath:"./covers/5.jfif"},
   
];

songItem.forEach((element, i)=>{
//  console.log(element,i);
 element.getElementsByTagName("img")[0].src=songs[i].coverPath;
 element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

});


  masterPlay.addEventListener("click",() =>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
    }
  })



audioElement.addEventListener("timeupdate", () =>{
    //   console.log("timeupdate");
      progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    //   console.log(progress);
      myProgressBar.value=progress;
});

myProgressBar.addEventListener("change" ,()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
});

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-pause")
        element.classList.add("fa-play")
})

}
// Important 
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click" , (e)=>{
        //  console.log(element);
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove("fa-play")
        e.target.classList.add("fa-pause")
        audioElement.src=`./songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
    })

})

document.getElementById("next").addEventListener("click" ,()=>{
    if(songIndex>=4){
    songIndex=0
    }
    else{
        songIndex+=1
    }
    audioElement.src=`./songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play');
    document.getElementById(songIndex).classList.add('fa-pause');
})

document.getElementById("previous").addEventListener("click" ,()=>{
    if(songIndex<=0){
    songIndex=4
    }
    else{
        songIndex-=1
    }
    audioElement.src=`./songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-play');
    document.getElementById(songIndex).classList.add('fa-pause');
})
