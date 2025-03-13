//y → \（￥マーク）
//_ → （SPACE）
//x → （該当なし）

//let table = ["ｱｲｳｴｵABCDE", "ｶｷｸｹｺFGHIJ", "ｻｼｽｾｿKLMNO", "ﾀﾁﾂﾃﾄPQRST", "ﾅﾆﾇﾈﾉUVWXY", "ﾊﾋﾌﾍﾎZ?!-/", "ﾏﾐﾑﾒﾓy&:;@", "ﾔ(ﾕ)ﾖ*#_$%", "ﾗﾘﾙﾚﾛ12345", "ﾜｦﾝﾞﾟ67890"];

let table = ["ｱｲｳｴｵABCDE", "ｶｷｸｹｺFGHIJ", "ｻｼｽｾｿKLMNO", "ﾀﾁﾂﾃﾄPQRST", "ﾅﾆﾇﾈﾉUVWXY", "ﾊﾋﾌﾍﾎZ?!-/", "ﾏﾐﾑﾒﾓy&xxx", "ﾔ(ﾕ)ﾖ*#_xx", "ﾗﾘﾙﾚﾛ12345", "ﾜｦﾝﾞﾟ67890"];

function zeroSet(e) {

    e.unshift(e.pop());
    return e;

}

table = zeroSet(table);

for (let i = 0; i < table.length; i++) {

    if (Array.isArray(table[i]) === false) {
        table[i] = table[i].split("");
    }

    table[i] = zeroSet(table[i]);

}
console.log(table);

function jpMessage() {

    let a = [];

    for (let i = 0; i < 2; i++) {

        a[i] = Number(jp[i]);

    }

    return table[a[0]][a[1]];

}

function modify(input) {

    let a = input;
    a = a.replace(/y/g, `&yen;`);
    return a;
}
