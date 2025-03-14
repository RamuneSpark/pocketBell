
// AudioContext の作成
let audioContext = null;


function startUpAudioContext() {

    setTimeout(() => {
        if (audioContext === null) {

            audioContext = new (window.AudioContext || window.webkitAudioContext)();


        }
    }, 10)
}

function play(type, index, url, volume = 1.0, loop = false) {

    sound[type][index] = "reserve";
    playing(type, index, url, volume, loop);

    async function playing(type, index, url, volume, loop) {
        try {

            if (audioContext !== null) {
                pause(type, index);

                const gainNode = audioContext.createGain();
                gainNode.connect(audioContext.destination);

                let vol = volume;

                if(vol > 1.0){
                    vol = 1.0;
                }else if(vol < 0.0){
                    vol = 0.0;
                }

                gainNode.gain.value = vol;

                const fetchURL = await fetch(url);
                const arrayBuffer = await fetchURL.arrayBuffer();
                const finalBuffer = await audioContext.decodeAudioData(arrayBuffer);

                sound[type][index] = audioContext.createBufferSource();
                sound[type][index].buffer = finalBuffer;
                sound[type][index].loop = loop;
                sound[type][index].connect(gainNode);

                sound[type][index].start();

                sound[type][index].onended = () => {
                    sound[type][index] = null;
                }

                return sound[type][index];

            }
        } catch (error) {
            console.error("サウンド再生中止" + error);
        }

    }

}

function pause(type, index) {
    if (audioContext !== null) {
        if (!noUse(type, index)) {
            if (sound[type][index] !== "reserve") {
                sound[type][index].stop();
            }
            sound[type][index] = null;
        }
    }
}

function noUse(type, index) {

    let a = false;

    if (typeof sound[type][index] === 'undefined' || sound[type][index] === null) {

        a = true;

    }

    return a;

}