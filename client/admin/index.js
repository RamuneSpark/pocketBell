let socket = io(serverURL());

let preloadArea = [];
let preloadSoundID = null;
let preloadSoundMode = false;

let preloadSound = preloadSoundFunction();

function preloadSoundFunction() {

    const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "asterisk", "sharp", "connect", "guide0", "guide1", "standby", "wait"];
    let j = 0;

    function load(i) {
        if (typeof preloadArea[i] === 'undefined') {
            preloadArea[i] = new Audio();
        }
        preloadArea[i].src = "mp3/" + a[i] + ".mp3";
        preloadArea[i].preload = 'auto';
        preloadArea[i].load();
        console.log([i, j]);

    }


    //クロージャでjを記憶
    return () => {

        if (preloadSoundMode === false) {

            preloadSoundMode = true;
    
            for (let i = 0; i < a.length; i++) {
    
                load(i);
    
            }
    
    
        } else {
    
    
            load(j);
    
    
        }
    

        j++;
        j %= a.length;
        return j;

    }

}



function serverURL() {

    const a = location.protocol; //http:
    const b = location.hostname; //ip
    const c = location.port; //port

    const d = a + "//" + b + ":" + c;

    return d;

}

function bellURL() {

    const a = location.protocol; //http:
    const b = location.hostname; //ip
    const c = location.port; //port

    const d = a + "//" + b + ":" + c + "/pocketbell";

    return d;

}

let secret = 2;

const onOff = ["ON", "ON（番号ヒミツ）", "OFF"];

const div_message = document.createElement("div");
document.body.appendChild(div_message);

div_message.style.position = "absolute";
div_message.style.color = "#FFFFFF";
div_message.style.fontSize = "1.35vw";
div_message.style.left = "0%";
div_message.style.transform = "translate(0%,0%)";
div_message.style.textAlign = "left";

const div_subMessage = document.createElement("div");
document.body.appendChild(div_subMessage);

div_subMessage.style.position = "absolute";
div_subMessage.style.bottom = "0%";
div_subMessage.style.left = "0%";
div_subMessage.style.transform = "translate(0%,0%)";
div_subMessage.style.color = "#FFFFFF";
div_subMessage.style.fontSize = "1.35vw";
div_subMessage.innerHTML = "";

let message = ["メッセージを　送るには　受話器を　上げてください"];

const div_QRBase = document.createElement("div");
document.body.appendChild(div_QRBase);

div_QRBase.style.position = "absolute";
div_QRBase.style.left = "25%";
div_QRBase.style.top = "50%";
div_QRBase.style.backgroundColor = "#FFFFFF";
div_QRBase.style.height = "34%";
div_QRBase.style.width = div_QRBase.offsetHeight + "px";
div_QRBase.style.transform = "translate(-50%, -50%)";

const div_QR = document.createElement("div");
div_QRBase.appendChild(div_QR);

div_QR.style.position = "absolute";
div_QR.style.left = "50%";
div_QR.style.top = "50%";
div_QR.style.transform = "translate(-50%, -50%)";

let base = bellURL();

const div_howTo = document.createElement("div");
const div_howToIMG = document.createElement("img");
document.body.appendChild(div_howTo);
div_howTo.appendChild(div_howToIMG);

let howToScale = 1;
let howToScaleMove = 0.05;
let fps = 50;

div_howTo.style.position = "absolute";
div_howTo.style.top = "1%";
div_howTo.style.left = "99%";
div_howTo.style.transformOrigin = "right top";

function howToTransform() {

    div_howTo.style.opacity = howToScale;

    if (2076 * ((window.innerHeight * 0.84) / 1700) >= window.innerWidth / 2) {
        div_howTo.style.transform = "translate(-100%, 0%) rotate(0.5deg) scale(" + ((window.innerWidth * 0.5) / 2076) + ") scaleX(" + howToScale + ")";


    } else {
        div_howTo.style.transform = "translate(-100%, 0%) rotate(0.5deg) scale(" + ((window.innerHeight * 0.84) / 1700) + ") scaleX(" + howToScale + ")";

    }

}

howToTransform();

let howToID = null;

div_howToIMG.src = "howTo_" + voiceMode + ".jpg";

const div_subMessage2 = document.createElement("div");
document.body.appendChild(div_subMessage2);
div_subMessage2.style.position = "absolute";
div_subMessage2.style.right = "0%";
div_subMessage2.style.bottom = "0%";
//div_subMessage2.style.transform = "translate(-100%, -100%)";
div_subMessage2.style.color = "#FFFFFF";
div_subMessage2.style.textAlign = "right";
div_subMessage2.style.fontSize = "1.35vw";
div_subMessage2.innerHTML = `<span style = "font-size:1.15vw">「QRコード」は株式会社デンソーウェーブの登録商標です。</span><br>「メッセージを送る方法」の表示・非表示　・・・　Enterキー / Spaceキー`;

let qrcode;



function updateQRCodeSize() {

    div_QRBase.style.height = "34%";
    div_QRBase.style.width = div_QRBase.offsetHeight + "px";

    let size = div_QRBase.offsetHeight * 0.85;

    div_QR.innerHTML = "";

    qrcode = new QRCode(div_QR, {
        text: base,
        width: size,
        height: size
    });

    howToTransform();

}

window.addEventListener('resize', updateQRCodeSize);
updateQRCodeSize();



messageUpdate();

let mode = 0;
//mode === 0 受話器が下がってる
//mode === 1 番号入力　…　どの　携帯に？
//mode === 2 #スキップ
//mode === 4 「こちらは、ポケットベル…」

let number = "";
let sendMessage = "";

let jpMode = 0; //日本語モード
let clearMode = 0; //消去モード
let sendMode = 0; //送信モード
let jp = [];
let no = 0; //数字入力モード
let voice = 0; //ボイスモード

let allSend = 0; //裏ワザ・オールセンド

let timerID = null;
let phoneNumber = "";

let subTimerID = null;

document.onkeydown = function (e) {

    if (e.repeat) {
        return false;
    }

    e.preventDefault();

    if (preloadSoundID === null) {

        preloadSoundID = setInterval(()=>{

            preloadSound();

        }, 400);

    }


    //エンターキー押下
    if (e.code === "Enter" || e.code === "Space") {


        howToScaleMove *= -1;

        if (howToID === null) {

            howToID = setInterval(() => {

                let check = false;
                howToScale += howToScaleMove;

                if (howToScale >= 1) {

                    howToScale = 1;
                    check = true;

                } else if (howToScale <= 0) {

                    howToScale = 0;
                    check = true;

                }

                howToTransform();

                if (check) {

                    clearInterval(howToID);
                    howToID = null;

                }


            }, 1000 / fps);


        }

    }


    if (e.code === "F2") {

        secret++;

        if (secret === 1) {
            secret = 2;
        }

        secret %= 3;
        div_subMessage.innerHTML = `デバッグモード　<span style="font-size:2.5vw">` + onOff[Number(secret)] + `</span>` + "<br>デバッグモード切り替え　・・・　F2キー";
        messageUpdate();

        if (subTimerID !== null) {

            clearTimeout(subTimerID);

        }

        if (secret === 2) {

            subTimerID = setTimeout(() => {

                div_subMessage.innerHTML = "";
                subTimerID = null;

            }, 5000)

        }
        if (secret === 2) {
            div_QRBase.style.opacity = 1;
        } else {
            div_QRBase.style.opacity = 0;

        }


    }

    //受話器を上げたとき
    if (e.code === "KeyG" && mode === 0) {

        mode = 1;
        number = "";
        timerID = null;

        allSend = 0;

        soundPlay(10, "mp3/standby.mp3", 1, "true");

        message.push("受話器　OK");
        message.push("ナンバーを　入力してください（プッシュキー）");
        messageUpdate();

    }

    //番号入力
    for (let i = 0; i < 10; i++) {
        //3 + Shift (#) を除外する
        if (e.code === "Digit" + i && e.key !== "#") {

            if (mode === 1) {

                if (timerID !== null) {

                    clearTimeout(timerID);

                }

                timerID = setTimeout(() => {

                    access();

                }, 2500)

                number += JSON.stringify(i);
                numberMessageUpdate();

            } else if (mode === 4) {

                clearMode = 0;
                sendMode = 0;
                voice = 0;

                if (i === 8 && no === 1) {

                    no = 0;
                    jpMode = 0;

                } else if (i === 2 && (jpMode === 1 || jpMode === 3)) {

                    no = 0;
                    jpMode++;

                    if (jpMode === 4) {

                        jpMode = 30;

                    }

                } else {

                    no = 0;

                    if (jpMode !== 30) {

                        jpMode = 0;
                        sendMessage += JSON.stringify(i);
                        sendMessageUpdate();


                    } else {

                        if (jp[0] === "empty") {

                            jp[0] = JSON.stringify(i);

                        } else if (jp[1] === "empty") {

                            jp[1] = JSON.stringify(i);

                            let j = jpMessage();

                            if (j !== "x") {
                                sendMessage += j;
                                sendMessageUpdate();
                            }

                            jp = ["empty", "empty"];


                        }





                    }




                }






            }

            if (mode === 1 || mode === 4) {

                sound[10].pause();
                soundPlay(i, "mp3/" + i + ".mp3", 0.14);

            }

        }
    }

    //*入力
    if (e.code === "Quote") {

        if (mode === 1) {

            if (number === "") {

                number += "*";
                numberMessageUpdate();


            }


        } else if (mode === 4 || mode === 120) {

            if (mode === 4) {
                sendMode = 0;

                if (voiceMode && voice === 0) {

                    voice = 1;

                }

                if (jpMode === 30 && no === 0) {

                    no = 1;

                } else if (jpMode === 0 || jpMode === 2) {
                    jpMode++;
                } else if (jpMode !== 30) {

                    jpMode = 0;

                }

                jp = ["empty", "empty"];

            }

            clearMode++;
            if (clearMode >= 2) {

                synth.cancel();

                timerID = setTimeout(() => {


                    if (timerID !== null) {
                        clearTimeout(timerID);
                    }

                    timerID = null;

                    accessSet();


                }, 500);


                message.push("テキストメッセージを　ALL CLEAR　しました");
                message.push("メッセージを　入力してください（プッシュキー）");
                messageUpdate();



            }


        }

        if (mode === 1 || mode === 4 || mode === 120) {

            sound[10].pause();
            soundPlay(11, "mp3/asterisk.mp3", 0.14);

        }


    }

    //#入力
    if (e.code === "Digit3" && e.key === "#") {

        let a = null;

        if (mode === 1 && number !== "") {

            if (timerID !== null) {

                clearTimeout(timerID);

            }

            a = 2;

            timerID = setTimeout(() => {

                access();

            }, 700)

        } else if (mode === 1) {

            allSend++;


            if (allSend >= 3) {

                if (timerID !== null) {

                    clearTimeout(timerID);

                }

                number = "ALL";
                a = 2;

                timerID = setTimeout(() => {

                    access();

                }, 700)

            }


        } else if (mode === 4/* && sendMessage !== ""*/) {

            sendMode++;

            if (voice === 1) {

                a = 119;
                clearMode = 0;

                sendMessagetoVoice();

                setTimeout(() => {

                    if (mode === 119) {

                        mode = 120;

                        message.push("音声確認中");
                        messageUpdate();

                        for (let i = 0; i < uttr.length; i++) {
                            synth.speak(uttr[i]);
                        }

                    }

                }, 1000)





            } else if (sendMode >= 2) {

                a = 100;

                setTimeout(() => {

                    if (mode === 100) {

                        soundPlay(10, "mp3/guide1.mp3");

                        send();

                        message.push("受話器を　戻してください");
                        messageUpdate();


                    }

                }, 1000)


            }

        }

        if (mode === 1 || mode === 4) {

            sound[10].pause();
            soundPlay(12, "mp3/sharp.mp3", 0.14);

        }

        if (a !== null) {

            mode = a;

        }

    }

    if (e.code === "KeyH" && mode !== 0) {

        if (mode === 120) {

            send();
            messageUpdate();

        }


        mode = 0;
        if (timerID !== null) {
            clearTimeout(timerID);
        }

        timerID = null;
        sound[10].pause();


        synth.cancel();
        uttr = [];

        message.push("ハングアップ　しました");
        message.push("");
        message.push("メッセージを　送るには　受話器を　上げてください");
        messageUpdate();

    }
};

function send() {

    socket.emit("sendMessage_PC", [phoneNumber, sendMessage]);


    message.push("**********************************************");
    message.push("送信しました！");
    message.push("**********************************************");
    if (sendMessage === "ｸﾚｼﾞﾂﾄﾐｾﾃ" && phoneNumber === "ALL") {
        message.push("ポケットベル体験コーナー");
        message.push("制作：RAMUNE SPARK");
        message.push("**********************************************");

    }
    if (sendMessage === "ﾌﾞ-ﾒﾗﾝｻﾊﾞｲﾊﾞ-ﾊｵﾓｼﾛｲ" && phoneNumber === "ALL") {
        message.push("遊んでくれて　ありがとう！");
        message.push("by RAMUNE SPARK");
        message.push("**********************************************");

    }


}


function access() {

    mode = 3;

    soundPlay(10, "mp3/connect.mp3");

    timerID = setTimeout(() => {


        if (timerID !== null) {
            clearTimeout(timerID);
        }



        timerID = null;
        phoneNumber = number; //送り先を格納

        accessSet();

        message.push("こちらは　ポケットベル　です！");
        message.push("メッセージを　入力したら　#を2回　押してください");
        message.push("メッセージを　入力してください（プッシュキー）");
        messageUpdate();

    }, 2000);


}

function accessSet() {

    soundPlay(10, "mp3/guide0.mp3", 1, 7.348);

    mode = 4;

    jp = ["empty", "empty"];
    no = 0;
    sendMessage = "";

    jpMode = 0;
    clearMode = 0;
    sendMode = 0;
    voice = 0;

}

//メッセージ更新関数
function messageUpdate() {

    message = trimming(message);

    const title = `<span style = "color:#00F500;font-size:3vw;font-weight:bold">ポケットベル　体験コーナー</span><br><span style = "font-size:1.5vw;font-weight:bold">受話器を操作する前に・・・<br>QRコードをスマートフォンで読み取って、<br>ポケットベルの準備をしましょう。</span>`;

    if (secret === 2) {
        div_message.innerHTML = title;

    } else {

        let a = "";

        for (let i = 0; i < message.length; i++) {

            a += message[i];

            if (i < message.length - 1) {
                a += "<br>";
            }
        }

        div_message.innerHTML = title + `<br><br><br>` + a;

    }


}

function numberMessageUpdate() {

    if (secret === 1) {
        message[message.length - 1] = "ナンバー入力中…（プッシュキー）";
        messageUpdate();

    } else {
        message[message.length - 1] = number;
        messageUpdate();

    }

}

function sendMessageUpdate() {

    if (secret === 1) {
        message[message.length - 1] = "メッセージ入力中…（プッシュキー）";
        messageUpdate();

    } else {
        message[message.length - 1] = modify(sendMessage);
        messageUpdate();

    }
}

function trimming(e) {
    while (e.length > 10) {
        e.shift();
    }
    return e;
}

