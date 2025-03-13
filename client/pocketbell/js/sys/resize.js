//画面の大きさを決めます
let screenWidth = 800;
let screenHeight = 800;

let screenLong;

if (screenWidth >= screenHeight) {

    screenLong = "width";

} else {

    screenLong = "height";

}

let windowWidthBasic = null;
let windowHeightBasic = null;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let ri = 0;
let screenScale = 40;

let lastScene = "";

let wide = 0;

const rotate_switch = ["0", "0"];

function monitorResize() {

    phoneCheck();


    if (windowWidthBasic !== window.innerWidth || windowHeightBasic !== window.innerHeight || lastScene !== scene) {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;


        if ((windowWidth >= windowHeight)) {

            if (scene === "pocketbell") {
                screenWidth = 800;
                screenHeight = 450;
                setImage(screen, "sys/screenW.png");
            } else {
                screenWidth = 1000;
                screenHeight = 450;
                setImage(screen, "sys/screenW_SP.png");

            }


            putXY(div_pocketbell, "50%", "45%");

            transform(div_pocketbell, Center, Center, 0, 0.95);

            let a = [28, 39, 50, 61, 72];
            let b = [66, 88, 44];

            x = [a[0], a[1], a[2], a[3], a[4], a[0], a[1], a[2], a[3], a[4], a[4], a[0], a[1], (a[2] + a[3]) / 2];
            y = [b[0], b[0], b[0], b[0], b[0], b[1], b[1], b[1], b[1], b[1], b[2], b[2], b[2], b[2]];

            wide = 1;

        } else if ((windowWidth < windowHeight)) {

            screenWidth = 600;
            screenHeight = 800;
            setImage(screen, "sys/screenH.png");

            putXY(div_pocketbell, "50%", "50%");

            transform(div_pocketbell, Center, Center, 0, 0.8);

            let a = [14, 32, 50, 68, 86];
            let b = [70, 82, 58];

            x = [a[0], a[1], a[2], a[3], a[4], a[0], a[1], a[2], a[3], a[4], a[4], a[0], a[1], (a[2] + a[3]) / 2];
            y = [b[0], b[0], b[0], b[0], b[0], b[1], b[1], b[1], b[1], b[1], b[2], b[2], b[2], b[2]];
            wide = 0;

        }

        if (windowWidth / windowHeight >= screenWidth / screenHeight) {
            //ウィンドウが横長な時

            //縦を軸に取る
            screenScale = (windowHeight / screenHeight);

        } else {

            screenScale = (windowWidth / screenWidth);

        }


        transform(screen, Center, Center, rotate_switch[ri], screenScale)

        windowWidthBasic = window.innerWidth;
        windowHeightBasic = window.innerHeight;

        lastScene = scene;

    }


}