const os = require('os');

const port = 3000;

function IP() {
    let ip;
    const n = os.networkInterfaces();
    const keys = Object.keys(n);

    for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        for (let i = 0; i < n[key].length; i++) {
            const net = n[key][i];
            if (net.family === 'IPv4' && !net.internal) {
                ip = net.address;
            }
        }
    }

    return ip;
}

const path = require('path');

const express = require('express');
const exApp = express();

exApp.use(express.static(path.join(__dirname, 'client')));
const http = require('http')
const server = http.Server(exApp);

const io = require('socket.io')(server);

server.listen(port, () => {
    console.log(`SERVER LISTNING ON PORT ` + port);
    console.log('');
    console.log('ADMIN');
    console.log('http://' + IP() + ':' + port + "/admin");
    console.log('');
    console.log('POCKET-BELL');
    console.log('http://' + IP() + ':' + port + "/pocketbell");
    console.log('');
});

io.on('connection', (socket) => {

    
    socket.number = "none";


    socket.on("sendMessage_PC", (e) => {

        console.log(e);

        io.emit("sendMessage_phone",e);


    })


    socket.on("sendNumber_phone", (e) => {

        const a = ["","*"]

        let num = a[e[1]]+e[0];

        let numberData = [e[0],e[1],num];

        if (numberList.includes(num)) {

            socket.emit("sendNumber_phone_result", null);

        } else {

            numberList.push(num);
            socket.number = num;

            socket.emit("sendNumber_phone_result", numberData);

            console.log(numberList);

        }

    })

    socket.on('disconnect',()=>{

        if(socket.number !== "none"){

            numberList = removeElement(numberList, socket.number);

        }

    })

    


})

let numberList = [];

function removeElement(e, value) {
    let index = e.indexOf(value);
    if (index >= 0) {
      e.splice(index, 1);
    }
    return e;
  }
  
  