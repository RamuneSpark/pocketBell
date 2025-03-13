document.addEventListener("DOMContentLoaded", () => {
    const mp3Path = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "asterisk", "sharp"];
    for (let i = 0; i < mp3Path.length; i++) {
        const audio = document.createElement("audio");
        audio.preload = "auto";
        audio.src = `mp3/${mp3Path[i]}.mp3`; // 音声ファイルのパスを指定
        document.head.appendChild(audio);
       }
});


let sound = [];
let soundLoop = [];

for (let i = 0; i < 13; i++) {

    sound[i] = new Audio();

    soundLoop[i] = "false";

    sound[i].addEventListener('ended', function() {
        if (soundLoop[i] !== "false") {
            sound[i].currentTime = soundLoop[i]; // ループ地点に戻る
            sound[i].play();
        }
    });
        

}


function soundPlay(i, path, vol = 1,isLoop = "false") {

    
    if(isLoop === "false"){

        soundLoop[i] = "false";

    }else if(isLoop === "true"){

        soundLoop[i] = 0;

    }else if(isLoop >= 0){

        soundLoop[i] = isLoop;

    }

    sound[i].loop = false;

    sound[i].volume = vol;
    sound[i].src = path;
    sound[i].play();


}

