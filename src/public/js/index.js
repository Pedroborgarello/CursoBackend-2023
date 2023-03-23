const socketClient = io();

socketClient.on('welcom', data => {
    console.log(data);
})