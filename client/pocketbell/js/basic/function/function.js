let socket = io(serverURL());

function serverURL() {

    const a = location.protocol; //http:
    const b = location.hostname; //ip
    const c = location.port; //port

    const d = a + "//" + b + ":" + c;

    return d;


}

//-------------------------------------------------------------------------------------------------
// 要素表示の関数
//-------------------------------------------------------------------------------------------------
function createDiv(id, e) {
    const div = document.createElement("div");
    div.id = id;
    document.body.appendChild(div);

    if (e === "img") {
        let imgElement = document.createElement('img');
        div.appendChild(imgElement);
        imgElement.style.display = "none";
    } else if (e === "txt") {
        let spanElement = document.createElement('span');
        spanElement.classList.add("mainTxt");
        div.appendChild(spanElement);
    }


    return div;
}

//-------------------------------------------------------------------------------------------------
// 要素表示の関数
//-------------------------------------------------------------------------------------------------

//画像を表示します。element…要素、src…出力したい画像パス
function setImage(element, src) {

    // div要素内の最初のimg要素を取得
    let imgElement = element.getElementsByTagName('img')[0];

    if (imgElement.style.display !== "block") {
        imgElement.style.display = "block";
    }

    // 画像のsrc属性が新しいURLと異なる場合にのみ、src属性を新しいURLに書き換え
    if (imgElement.src.endsWith(src) === false) {
        imgElement.src = src;


        imgElement.onload = function () {
            if (imgElement.width !== imgElement.naturalWidth || imgElement.height !== imgElement.naturalHeight) {
                imgElement.width = imgElement.naturalWidth;
                imgElement.height = imgElement.naturalHeight;
            }
        };

    }


}

//画像を表示します(widthプロパティあり)。element…要素、src…出力したい画像パス、widthSet…widthプロパティ
function setImageWidth(element, src, widthSet) {

    // div要素内の最初のimg要素を取得
    let imgElement = element.getElementsByTagName('img')[0];

    if (imgElement.style.display !== "block") {
        imgElement.style.display = "block";
    }

    // 画像のsrc属性が新しいURLと異なる場合にのみ、src属性を新しいURLに書き換え
    if (imgElement.src.endsWith(src) === false) {
        imgElement.src = src;
    }

    // 画像のwidth属性が新しいwidthと異なる場合にのみ、width属性を新しいwidthに書き換え
    if (imgElement.width !== widthSet) {
        imgElement.width = widthSet;


        imgElement.onload = function () {
            if (imgElement.height !== widthSet * (imgElement.naturalHeight / imgElement.naturalWidth)) {
                imgElement.height = widthSet * (imgElement.naturalHeight / imgElement.naturalWidth);
            }
        };

    }

}



//文字を表示します。element…要素、text…出力したい文字
function setText(element, text) {


    const spanElement = element.querySelector('.mainTxt');

    if (spanElement) {
        if (spanElement.innerHTML !== "<nobr>" + text + "</nobr>") {
            spanElement.innerHTML = "<nobr>" + text + "</nobr>";
        }
    }

    /*
    let edgeSpan = element.querySelector('.edgeSpan');

    if (edgeSpan) {
        if(edgeSpan.innerHTML !== "<nobr>"+text+"</nobr>"){
            edgeSpan.innerHTML = "<nobr>"+text+"</nobr>";
        }
    }
        */

}
//element…要素　で　画像や文字を消します
function Remove(element) {
    const children = element.childNodes;
    for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];

        if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() === 'img') {
            child.removeAttribute('src');

            if (child.style.display !== "none") {
                child.style.display = "none";

            }

            if (child.width !== 0 || child.height !== 0) {
                child.width = 0;
                child.height = 0;
            }

        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() === 'span' && (child.classList.contains('mainTxt') || child.classList.contains('edgeSpan'))) {
            child.textContent = '';
        }
    }
}

//-------------------------------------------------------------------------------------------------
// 要素位置・変形の関数
//-------------------------------------------------------------------------------------------------


//element…要素、x,y…置きたい座標(left, topプロパティ)
function putXY(element, x, y) {
    if (x !== "no") {
        if (!isNaN(x)) {
            element.style.left = x + "px";
        } else {
            element.style.left = x;
        }
    }

    if (y !== "no") {
        if (!isNaN(y)) {
            element.style.top = y + "px";
        } else {
            element.style.top = y;
        }
    }
}

function putXY2(element, e) {

    putXY(element, e.x, e.y);


}

const Center = -50 + "%";
const Left = "0%";
const Top = Left;
const Right = -100 + "%";
const Bottom = Right;

//element…要素、x, y…ずらし（ずらしは、"-50%"などと記載するか、Leftを使ってください）
//element…要素、x, y…ずらし（ずらしは、"-50%"などと記載するか、Leftを使ってください）
function translate(element, x, y) {

    element.style.transform = "translate(" + x + ", " + y + ") rotate(0deg) scale(100%)";

}

//element…要素、x, y…ずらし、r…回転角度（deg）、s…拡大率
function transform(element, x, y, r, s) {

    element.style.transform = "translate(" + x + ", " + y + ") rotate(" + r + "deg) scale(" + s + ")";

}

//element…要素、x, y…ずらし、r…回転角度（deg）、sx,xy…左右拡大率
function transformScaleXY(element, x, y, r, sx, sy) {

    element.style.transform = "translate(" + x + ", " + y + ") rotate(" + r + "deg) scaleX(" + sx + ") scaleY(" + sy + ")";

}

//-------------------------------------------------------------------------------------------------
// 文字編集の関数
//-------------------------------------------------------------------------------------------------

//フリガナをふります。
function Rb(e, f) {

    return "<ruby>" + e + "<rt>" + f + "</rt></ruby>"

}

//element…要素、c…カラーコード、f…フォント、s…サイズ、b…太さ、a…align
function fontSet(element, c, f, s, b, a) {

    if (c == "green") {
        c = "#BFFFB0"
    } else if (c == "blue") {
        c = "#AFD0FF"
    } else if (c == "red") {
        c = "#FFC6BB"
    }

    if (element.style.color !== c) {
        element.style.color = c;
    }
    if (element.style.fontFamily !== f) {
        element.style.fontFamily = f;
    }
    if (element.style.fontSize !== s) {
        if (!isNaN(s)) {
            element.style.fontSize = s + "px";
        } else {
            element.style.fontSize = s;
        }
    }
    if (element.style.fontWeight !== b) {
        element.style.fontWeight = b;
    }
    if (element.style.textAlign !== a) {
        element.style.textAlign = a;
    }

}

//element…要素、c…カラーコードのみ変更
function fontColorSet(element, c) {

    if (c == "green") {
        c = "#BFFFB0"
    } else if (c == "blue") {
        c = "#AFD0FF"
    } else if (c == "red") {
        c = "#FFC6BB"
    }

    if (element.style.color !== c) {
        element.style.color = c;
    }
}

//element…要素、f…ふちの太さ、c…ふちのカラーコード
function textEdge(element, f, c) {

    if (f !== 0) {

        if (c == "green") {
            c = "#17890B"
        } else if (c == "blue") {
            c = "#012DD4"
        } else if (c == "red") {
            c = "#CE2807"
        }



        let edge = "";

        for (let j = 0; j < 32; j++) {
            for (let i = 1; i <= 2; i++) {

                let th = Math.PI * 2 * (j / 32);

                let rx = Math.cos(th) * (i / 2) * f;
                let ry = Math.sin(th) * (i / 2) * f;
                //  let rx = Math.cos(th)*f;
                //  let ry = Math.sin(th)*f;

                if (i === 1 && j === 0) {

                } else {

                    edge += ",";


                }

                edge += rx + "px " + ry + "px 0px " + c;

            }
        }

        if (element.style.textShadow !== edge) {
            element.style.textShadow = edge;
        }

    } else if (f === 0) {

        if (element.style.textShadow !== "") {
            element.style.textShadow = "";
        }

    }

}

//-------------------------------------------------------------------------------------------------
// 画像初期設定用関数
//-------------------------------------------------------------------------------------------------


let allDiv = [];

//画像の初期設定をする関数です。element…要素名、p…親要素
function defaultSet(element, p) {

    p.appendChild(element);
    allDiv.push(element);
    element.style.position = "absolute";

}

//-------------------------------------------------------------------------------------------------
// スマートフォン判定関数
//-------------------------------------------------------------------------------------------------


let phone;

//スマホなら変数phoneにtrue、違うならfalseを返します。
function phoneCheck() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        phone = true;
    } else {
        phone = false;
    }
}
phoneCheck();

//-------------------------------------------------------------------------------------------------
// ベクトル計算用関数
//-------------------------------------------------------------------------------------------------

let lastVec = {}; //「Vector系関数使用後の値の取り出し」以外には使わないでください。

//（fX,fY）→(tX,tY)の単位ベクトルを、グローバル変数(lastVec.x,lastVec.y)に返します。
function Vector(fX, fY, tX, tY) {

    let tfX = tX - fX; //X座標距離
    let tfY = tY - fY; //Y座標距離

    let tf = tfX * tfX + tfY * tfY;

    tf = Math.sqrt(tf);

    if (tf == 0) {
        lastVec.x = 0;
        lastVec.y = 1;
        lastVec.z = 1


    } else {
        lastVec.x = tfX / tf;
        lastVec.y = tfY / tf;
        lastVec.z = tf;
    }

}

//（fX,fY）→(tX,tY)のベクトルを、グローバル変数(lastVec.x,lastVec.y)に返します。
function Vector2(fX, fY, tX, tY) {

    let tfX = tX - fX; //X座標距離
    let tfY = tY - fY; //Y座標距離

    let tf = tfX * tfX + tfY * tfY;

    tf = Math.sqrt(tf);

    if (tf == 0) {
        lastVec.x = 0;
        lastVec.y = 1;
        lastVec.z = 1


    } else {
        lastVec.x = tfX;
        lastVec.y = tfY;
        lastVec.z = tf;
    }



}

//=（fX,fY）→(tX,tY)のベクトルを、上下左右のいずれかで判定します。
function Vector3(fX, fY, tX, tY) {

    let tfX = tX - fX; //X座標距離
    let tfY = tY - fY; //Y座標距離

    let result;

    if (Math.abs(tfY) > Math.abs(tfX)) {

        if (tfY >= 0) {
            result = "down";
        } else {
            result = "up";
        }

    } else if (Math.abs(tfY) < Math.abs(tfX)) {

        if (tfX > 0) {
            result = "right";
        } else {
            result = "left";
        }

    } else {

        result = [];

        result[0] = "diagonal";

        if (tfY >= 0) {
            result[1] = "down";
        } else {
            result[1] = "up";
        }

        if (tfX > 0) {
            result[2] = "right";
        } else {
            result[2] = "left";
        }


    }

    console.log(result);

    return result;


}


//-------------------------------------------------------------------------------------------------
// 要素接触時発火関数
//-------------------------------------------------------------------------------------------------

//=要素e1とe2が少しでも重なったときに、resultにtrueを返します。
function touchElement(e1, e2) {

    let rect = [];
    let upDown = false;
    let leftRight = false;
    let result = false;

    rect[1] = e1.getBoundingClientRect();
    rect[2] = e2.getBoundingClientRect();


    if (rect[1].top < rect[2].top) { //rect[1]が上に位置する
        rect[2] = e1.getBoundingClientRect();
        rect[1] = e2.getBoundingClientRect();
    }

    if (rect[2].bottom > rect[1].top) {
        upDown = true;
    }

    rect[1] = e1.getBoundingClientRect();
    rect[2] = e2.getBoundingClientRect();


    if (rect[2].left < rect[1].left) { //rect[2]が左に位置する
        rect[2] = e1.getBoundingClientRect();
        rect[1] = e2.getBoundingClientRect();
    }

    if (rect[1].right > rect[2].left) {
        leftRight = true;
    }

    if (leftRight == true && upDown == true) {
        result = true;
    } else {
        result = false;
    }

    return result;

}

//=要素e1とe2が少しでも重なったときに、e1がe2に対してどの方向に属するかを伝えます。
function touchElement2(e1, e2) {

    let rect = [];

    let touch = touchElement(e1, e2);
    let result = false;

    rect[1] = e1.getBoundingClientRect();
    rect[2] = e2.getBoundingClientRect();

    let el = []; el[1] = {}; el[2] = {};

    let x, y;

    if (touch == true) {

        el[1].y = (rect[1].top + rect[1].bottom) / 2;
        el[2].y = (rect[2].top + rect[2].bottom) / 2;

        el[1].x = (rect[1].left + rect[1].right) / 2;
        el[2].x = (rect[2].left + rect[2].right) / 2;

        result = Vector3(el[2].x, el[2].y, el[1].x, el[1].y)




    }

    return result;


}