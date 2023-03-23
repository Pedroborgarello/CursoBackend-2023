import express from 'express';
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'


// crear __dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Server port
const app = express();
const PORT = process.env.PORT||8080;

//motor de plantillas handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// public
app.use(express.static(__dirname + '/public'));

// http Server
const httpServer = app.listen(PORT, () => {
    console.log( 'Server listening on: ' + PORT );
});

// socket server
const socketServer = new Server(httpServer);

// routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

// eventos
socketServer.on('connection', socket => {
    console.log('client connected' + socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected' + socket.id);
    })
    socket.emit('welcome', 'Welcome to chat with sockets');
})
