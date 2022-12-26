const express = require('express');
const router = express.Router();

const productsController = require('../App/Controllers/ProductController');

router.get('/', (req: any, res: any) => {
    return res.send(productsController.index);
});

export {router};