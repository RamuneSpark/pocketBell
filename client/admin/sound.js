

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

let soundTimerID = [];

function resetSoundTimer(i){

    if(typeof soundTimerID[i] === 'undefined'){
        soundTimerID[i] = null;
    }

    if(soundTimerID[i] !== null){

        clearTimeout(soundTimerID[i]);
        soundTimerID[i] = null;

    }


}

function soundPlay(i, path, vol = 1,isLoop = "false") {

    resetSoundTimer(i);

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

