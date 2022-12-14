require('dotenv').config();
const app = require('./Server');

const productsController = require('./App/Controllers/ProductController');

const port: string | number = process.env.SERVER_PORT || 3333;

app.get('/products', productsController.index);
app.post('/products', productsController.create);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});