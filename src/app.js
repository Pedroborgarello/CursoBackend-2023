import express from 'express';
//import ProductManager from './productManager.js';
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'

// crear __dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Server port
const app = express();
const PORT = process.env.PORT||8080;

//const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// public
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
    console.log( 'Server listening on: ' + PORT );
});

// routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);


/*app.get('/products', (req, res) => {
    let limit = req.query.limit
    limit = parseInt(limit)
    if (limit) {
        productManager.getProducts().then(result => {
            const products = result.product;
            const productsLimit = products.slice(0, limit);
            res.send(productsLimit);
        })     
    } else {
        productManager.getProducts().then(result => {
            res.send(result.product);
        })
    }
})

app.get('/products/:pid', (req, res) => {
    let id = req.params.pid;
    id = parseInt(id);
    productManager.getProductById(id).then(result => {
        res.send(result.product);
    })
})*/