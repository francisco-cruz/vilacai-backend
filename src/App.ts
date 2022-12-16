require('dotenv').config();
const app = require('./Server');

const productsController = require('./App/Controllers/ProductController');
const sectionController = require('./App/Controllers/SectionController');

const port: string | number = process.env.SERVER_PORT || 3333;

app.get('/products', productsController.index);
app.get('/products/show', productsController.show);
app.post('/products', productsController.create);
app.delete('/products', productsController.remove);
app.put('/products', productsController.update);

app.get('/sections', sectionController.index);
app.post('/sections', sectionController.create);
app.get('/sections/show', sectionController.show);
app.delete('/sections', sectionController.remove);
app.put('/sections', sectionController.update);
app.post('/section/addProduct', sectionController.addProduct);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});