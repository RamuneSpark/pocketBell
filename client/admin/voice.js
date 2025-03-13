let voiceMode = false;

if ('speechSynthesis' in window) {
    voiceMode = true;

}



let synth;

let uttr = [];

let voiceTable;
let voiceType;

if (voiceMode) {

    synth = window.speechSynthesis;
    voiceTable = speechSynthesis.getVoices();

}

//念押し
setTimeout(() => {
    voiceTable = speechSynthesis.getVoices();

    for (const element of voiceTable) {
        if (element.lang === "ja-JP" && element.name.includes("Sayaka")) {
            voiceType = element;
            console.log(voiceType);
            break; // 条件に合致するものが見つかったらループを終了
        }
    }

}, 1000)



function sendMessagetoVoice() {

    let a = sendMessage.split("");

    uttr = [];
    let c = [];

    for (let i = 0; i < a.length; i++) {

        const dakuten = "ｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾊﾋﾌﾍﾎ";
        const hanDakuten = "ﾊﾋﾌﾍﾎ";
        let b;

        if (i >= 1 && ((a[i] === `ﾞ` && dakuten.includes(a[i - 1])) || (a[i] === `ﾟ` && hanDakuten.includes(a[i - 1])))) {

            b = a[i - 1] + a[i];
            c[c.length - 1] = b;

        } else {

            b = txtToSound(a[i]);
            c.push(b);

        }


    }

    let d = "";

    for (let i = 0; i < c.length; i++) {

        d += c[i];

        if (i < c.length - 1) {

            d += "...";

        }

    }



    uttr.push(new SpeechSynthesisUtterance(d));

    uttr.push(new SpeechSynthesisUtterance("を送ります。"));
    uttr.push(new SpeechSynthesisUtterance("よろしければ、電話をお切りください。"));
    uttr.push(new SpeechSynthesisUtterance("訂正される場合は、コメジルシを2回押してください。"));

    for (let i = 0; i < uttr.length; i++) {

        uttr[i].pitch = 1.7;
        uttr[i].rate = 1.8;
        uttr[i].voice = voiceType;
        uttr[i].volume = 0.9;

    }

}

function txtToSound(e) {

    let a = e;

    if (Object.keys(vDatabase).indexOf(a) !== -1) {
        a = vDatabase[a];

    }

    return a;


}

let vDatabase = {};

if (voiceMode) {
    vDatabase["A"] = "エー";
    vDatabase["B"] = "ビー";
    vDatabase["C"] = "シー";
    vDatabase["D"] = "ディー";
    vDatabase["E"] = "イー";
    vDatabase["F"] = "エフ";
    vDatabase["G"] = "ジー";

    vDatabase["H"] = "エイチ";
    vDatabase["I"] = "アイ";
    vDatabase["J"] = "ジェイ";
    vDatabase["K"] = "ケー";
    vDatabase["L"] = "エル";
    vDatabase["M"] = "エム";
    vDatabase["N"] = "エヌ";

    vDatabase["O"] = "オー";
    vDatabase["P"] = "ピー";
    vDatabase["Q"] = "キュー";
    vDatabase["R"] = "アール";
    vDatabase["S"] = "エス";
    vDatabase["T"] = "ティー";
    vDatabase["U"] = "ユー";

    vDatabase["V"] = "ブイ";
    vDatabase["W"] = "ダブリュー";
    vDatabase["X"] = "エクス";
    vDatabase["Y"] = "ワイ";
    vDatabase["Z"] = "ゼットゥ";

    vDatabase["?"] = "ハテナマーク";
    vDatabase["!"] = "ビックリマーク";
    vDatabase["-"] = "よこぼう";
    vDatabase["/"] = "ななめせん";
    vDatabase["y"] = "エンマーク";
    vDatabase["&"] = "アンド";
    vDatabase["("] = "かっこ";
    vDatabase[")"] = "かっことじ";
    vDatabase["*"] = "こめじるし";
    vDatabase["#"] = "シャープ";
    vDatabase["_"] = "スペース";

    vDatabase["ﾞ"] = "だくてん";
    vDatabase["ﾟ"] = "はんだくてん";

    vDatabase["1"] = "いち";
    vDatabase["2"] = "に";
    vDatabase["3"] = "さん";
    vDatabase["4"] = "よん";
    vDatabase["5"] = "ご";
    vDatabase["6"] = "ろく";
    vDatabase["7"] = "なな";
    vDatabase["8"] = "はち";
    vDatabase["9"] = "きゅう";
    vDatabase["0"] = "ぜろ";
}