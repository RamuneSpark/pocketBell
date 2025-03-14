//背景
const div_bg = createDiv("bg", "img");
defaultSet(div_bg, screen);
////プロパティ
putXY(div_bg, "50%", "50%");
translate(div_bg, Center, Center)
div_bg.style.zIndex = 0;
////出力
setImage(div_bg, "");

const div_pocketbell = createDiv("pocketbell", "img");
defaultSet(div_pocketbell, screen);
////プロパティ
putXY(div_pocketbell, "50%", "40%");
transform(div_pocketbell, Center, Center, 0, 0.8)
div_pocketbell.style.zIndex = 10;
////出力
setImage(div_pocketbell, "");

const div_offLight = createDiv("offLight", "img");
defaultSet(div_offLight, div_pocketbell);
////プロパティ
putXY(div_offLight, "50%", "50%");
transform(div_offLight, Center, Center, 0, 1)
div_offLight.style.zIndex = 1;
////出力
setImage(div_offLight, "");

let button = [];
let div_button = [];
for (let i = 0; i < 14; i++) {

    button[i] = {};
    button[i].filter = Math.PI / 2;
    button[i].opacity = 1;

    div_button[i] = createDiv("button" + i, "img");
    defaultSet(div_button[i], screen);
    ////プロパティ
    transform(div_button[i], Center, Center, 0, 0.7)
    div_button[i].style.zIndex = 0;
    div_button[i].style.mixBlendMode = "normal";
    ////出力
    setImage(div_button[i], "");
}


const div_num = createDiv("num", "txt");
defaultSet(div_num, screen);
////プロパティ
putXY(div_num, "10%", "30%")
translate(div_num, Left, Center);
fontSet(div_num, "#FFFFFF", "lcd", "45", "normal", "right")
div_num.style.zIndex = 10;
////出力
setText(div_num, "");

const div_message = createDiv("message", "txt");
defaultSet(div_message, div_pocketbell);
////プロパティ
putXY(div_message, 400 - ((579.66 * (800 / 912)) / 2), "46%")
translate(div_message, Left, Center);
fontSet(div_message, "#848D7C", "lcd", "45", "normal", "right")
div_message.style.zIndex = 10;
div_message.style.mixBlendMode = "multiply";
////出力
setText(div_message, "");

const div_message2 = createDiv("message2", "txt");
defaultSet(div_message2, div_pocketbell);
////プロパティ
putXY(div_message2, 400 - ((579.66 * (800 / 912)) / 2), "52%")
translate(div_message2, Left, Center);
fontSet(div_message2, "#848D7C", "lcd", "45", "normal", "right")
div_message2.style.zIndex = 10;
div_message2.style.mixBlendMode = "multiply";
////出力
setText(div_message2, "");

let mes = ["", ""];
let mesShift = 0;

let mesCount = [0, 0];

const div_numNavi = createDiv("numNavi", "txt");
defaultSet(div_numNavi, screen);
////プロパティ
putXY(div_numNavi, "50%", "2%")
translate(div_numNavi, Center, Top);
fontSet(div_numNavi, "#FFFFFF", "Higashi", "45", "normal", "right")
div_numNavi.style.zIndex = 10;
////出力
setText(div_numNavi, "");

let number = "";

let vib = 0;

let vibPermission = false;

if ('vibrate' in navigator) {
    vibPermission = true;
    vib = 1;

}


let x = [];
let y = [];

function click(e, f) {
    let a = 0;


    e.addEventListener("touchstart", function (event) {

        event.preventDefault();

        a = 1;
        f();

        startUpAudioContext();

        return false;

    });


    e.addEventListener("mousedown", function (event) {

        event.preventDefault();

        if (a === 0) {


            f();
        }
        a = 0;

        startUpAudioContext();

        return false;


    });




}

click(div_pocketbell, () => {

    if (scene === "pocketbell" && clock === 1) {

        clock = 0;

    }


})

let asterisk = 0;

for (let i = 0; i < 14; i++) {
    click(div_button[i], () => {

        if (bs === 0 && scene === "num" && button[i].opacity === 1 && (button[i].filter === Math.PI / 2 || i !== 10)) {

            button[i].filter = 0;

            if (i < 10) {

                if (number.length < 17) {
                    number += JSON.stringify(i);
                }
            }

            if (i === 11) {

                if (number.length >= 1) {
                    number = number.slice(0, -1);
                }

            }

            if (i === 12) {


                asterisk ^= 1;


            }
            if (i === 13) {

                vib ^= 1;

            }

            if (i === 10) {

                if (number.length >= 1) {

                    socket.emit("sendNumber_phone", [number, asterisk]);


                }

            }

        }

    })
}

socket.on("sendNumber_phone_result", (e) => {

    if (e !== null) {

        number = e[0];
        asterisk = e[1];
        numberText = e[2];
        nextScene = "pocketbell";

    } else {

        error = 150;

    }


})

let error = 0;