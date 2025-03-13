//ここに書いてある項目が1/50秒に1回実行されます。
let clock = 0;
let t = 0;

let type = 0;

let offLightPath = "image/offLight.png";

if (Math.random() < 0.01) {

    type = 10;
    offLightPath = "image/offLight_Gold.png";


} else if (Math.random() < 0.2) {

    type = Math.floor(Math.random() * 9) + 1;

}

let light = { p: 0, k: 0 };

let preload = 0;

function run() {

    if (scene === "pocketbell") {

        preload++;

        if(preload >= fps){
            sound.load();
        }

        preload %= fps;

        if (light.p > 0) {

            light.k++;

            if (light.k >= 3) {

                light.k = 0;
                light.p--;

            }

        }

        load = ["image/bg.jpg", "image/pocketbell" + type + ".png", offLightPath];

        div_offLight.style.opacity = 1 - (light.p % 2);
        setImageWidth(div_offLight, offLightPath, 800);

        setImageWidth(div_pocketbell, "image/pocketbell" + type + ".png", 800);
        setImage(div_bg, "image/bg.jpg");

        if (bs === -100) {
            textEdge(div_num, 4, "#000000");
        }

        putXY(div_num, "98%", "2%");
        translate(div_num, Right, Top);
        fontSet(div_num, "#FFFFFF", "lcd", "35", "normal", "right")
        setText(div_num, `<span style = "color:#BBBBBB">Your number</span><br><span style = "opacity:${asterisk}">*</span>` + number);

        mesShift++;


        if (mesShift >= 6) {

            if (mes[0].length >= 1 && mesCount[0] < mes[0].length) {

                mesCount[0]++;

            } else if (mes[1].length >= 1 && mesCount[1] < mes[1].length) {

                mesCount[1]++;

            }

            mesShift = 0;

        }

        let m = [];

        if (clock === 0) {

            t++;



        } else {

            clock--;

            if (clock <= 1) {

                clock = 1;
                t = 0;

            }



        }

        for (let i = 0; i < 2; i++) {

            //    m[i] = mes[i].substring(0, mesCount[i]);
            //    m[i] = modify(m[i]);
            if (clock > 0) {
                m[i] = modify(mes[i]);
            } else {

                if (i === 0) {

                    function zeroPlus(e) {

                        let a = "";

                        if (e >= 10) {

                            a = JSON.stringify(e);

                        } else {

                            a = "0" + JSON.stringify(e);

                        }

                        return a;

                    }

                    const now = new Date();

                    let year = now.getFullYear();
                    year %= 100;
                    year = zeroPlus(year);

                    let month = now.getMonth() + 1;
                    month = zeroPlus(month);

                    // 日付を取得
                    let date = now.getDate();
                    date = zeroPlus(date);

                    // 曜日を取得 (0 から 6 までの値を返す)
                    const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
                    const w = week[now.getDay()];

                    // 時、分、秒を取得
                    let hour = now.getHours();
                    hour = zeroPlus(hour);

                    let minute = now.getMinutes();
                    minute = zeroPlus(minute);


                    // 結果を表示

                    let a = year + "/" + month + "/" + date + "_" + "[" + w + "]";

                    let b = "";

                    if (t % (fps) >= (fps / 2)) {
                        b = hour + ":" + minute;
                    } else {
                        b = hour + "_" + minute;
                    }

                    m[0] = modify(a);
                    m[1] = modify(b);

                }

            }
        }

        setText(div_message, m[0]);
        setText(div_message2, m[1]);


    } else if (scene === "num") {

        load = JSON.parse(JSON.stringify(buttonList));


        if (number.length >= 1) {

            button[10].opacity = 1;
            button[11].opacity = 1;

        } else {

            button[10].opacity = 0.3;
            button[11].opacity = 0.3;

        }

        button[12].opacity = 1;

        if (vibPermission) {

            button[13].opacity = 1;

        } else {

            button[13].opacity = 0.3;

        }

        if (number.length < 17) {
            for (let i = 0; i < 10; i++) {
                button[i].opacity = 1;
            }

        } else {

            for (let i = 0; i < 10; i++) {
                button[i].opacity = 0.3;
            }
        }




        for (let i = 0; i < 14; i++) {




            if (button[i].filter < Math.PI / 2) {

                if (i === 10) {
                    button[i].filter += 0.02;

                } else {
                    button[i].filter += 0.1;

                }

                if (button[i].filter >= Math.PI / 2) {

                    button[i].filter = Math.PI / 2;

                }

            }

            div_button[i].style.filter = "brightness(" + (Math.cos(button[i].filter) * 0.8 + 1) + ")";
            div_button[i].style.opacity = button[i].opacity;
            putXY(div_button[i], x[i] + "%", y[i] + "%");
            if (i === 13) {
                setImage(div_button[i], "image/vib_button_" + vib + ".png");
            } else {
                setImage(div_button[i], buttonList[i]);
            }

        }

        if (error > 0) {
            error--;

            if (error <= 0) {

                error = 0;

            }
        }

        if (error > 0) {

            div_numNavi.style.opacity = error % 2;
            fontSet(div_numNavi, "#F0B3A6", "Higashi", "30", "bold", "right")
            setText(div_numNavi, "既に使われている番号です！");

        } else {

            div_numNavi.style.opacity = 1;
            fontSet(div_numNavi, "#FFFFFF", "Higashi", "30", "bold", "center")

            let a = "";

            if (wide === 0) {

                a = "あなたのポケットベルの番号を<br>決めてください";

            } else {

                a = "あなたのポケットベルの番号を決めてください";

            }

            setText(div_numNavi, a);

        }

        if (wide === 0) {
            putXY(div_num, "10%", "30%");
        } else {
            putXY(div_num, "20%", "25%");

        }

        translate(div_num, Left, Center);
        fontSet(div_num, "#FFFFFF", "lcd", "35", "normal", "right");
        setText(div_num, `<span style = "opacity:${asterisk}">*</span>` + number);


        //        setImage(div_bg, "image/bg.jpg");

    }








}

let buttonList = [];
for (let i = 0; i < 10; i++) {
    buttonList[i] = ["image/" + i + "button.png"];
}
buttonList.push("image/ok_button.png");
buttonList.push("image/back_button.png");
buttonList.push("image/a_button.png");
buttonList.push("image/vib_button_1.png");
buttonList.push("image/vib_button_0.png");


let load = [];


socket.on("sendMessage_phone", (e) => {

    /*
    console.log(scene === "pocketbell");
    console.log(numberText === e[0]);
    console.log(numberText);
    console.log(e[0]);
    */

    let a = 1200 + Math.floor(Math.random() * 1600);

    if (scene === "pocketbell" && (numberText === e[0] || e[0] === "ALL")) {


        setTimeout(() => {
            let x = e[1];

            sound.play();

            let v = [];

            if (vib === 1) {
                for (let i = 0; i < 8; i++) {

                    let a = 170;
                    let b = 233 - a;

                    v.push(a);
                    v.push(b);
                    v.push(a);
                    v.push(b + 155);


                }
                navigator.vibrate(v);
            }

            light.p = 85;

            mesCount = [0, 0];
            mesShift = 0;

            clock = fps * 15;

            let lineTxt = 15;

            if (x.length <= lineTxt) {

                mes[0] = x.substring(0, x.length);
                mes[1] = "";

            } else if (x.length <= lineTxt * 2) {

                mes[0] = x.substring(0, lineTxt);
                mes[1] = x.substring(lineTxt, x.length);

            } else {

                mes[0] = x.substring(0, lineTxt);
                mes[1] = x.substring(lineTxt, lineTxt * 2);


            }


        }, a)

    }



})

let numberText = "";

let sound = new Audio();
sound.preload = "auto";
sound.loop = false;
sound.volume = 0.7;
sound.src = "mp3/call.mp3";

function modify(input) {
    let a = input;
    a = a.replace(/y/g, `&yen;`);
    a = a.replace(/_/g, `<span style = "opacity:0">_</span>`);
    return a;
}
