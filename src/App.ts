require('dotenv').config();
const app = require('./Server');
const productsController = require('./App/Controllers/ProductController');
const sectionController = require('./App/Controllers/SectionController');
const fillingController = require('./App/Controllers/FillingsController');
const productTypeController = require("./App/Controllers/ProductTypeController");
const imageController = require("./App/Controllers/ImageController");
import fs from "fs";
const path = require("path");

const port: string | number = process.env.SERVER_PORT || 3333;

if(!fs.existsSync(path.join(__dirname, './public/images/')))
    fs.mkdirSync(path.join(__dirname, './public/images'), {recursive: true});

app.get("/images", imageController.index);
app.get("/images/show/:imageId", imageController.show);
app.post("/images", imageController.upload.single('image'), imageController.create);

app.get('/products', productsController.index);
app.get('/products/show', productsController.show);
app.post('/products', productsController.create);
app.delete('/products', productsController.remove);
app.put('/products', productsController.update);
app.post('/products/fillings', productsController.addFilling);
app.delete('/products/fillings', productsController.removeFilling);
app.post('/products/types', productsController.addType);
app.delete('/products/types', productsController.removeType);

app.get('/sections', sectionController.index);
app.post('/sections', sectionController.create);
app.get('/sections/show', sectionController.show);
app.delete('/sections', sectionController.remove);
app.put('/sections', sectionController.update);

app.get('/fillings', fillingController.index);
app.post('/fillings', fillingController.create);
app.get('/fillings/show', fillingController.show);
app.put('/fillings', fillingController.update);
app.delete('/fillings', fillingController.remove);

app.get('/productsTypes', productTypeController.index);
app.post('/productsTypes', productTypeController.create);
app.get("/productsTypes/show", productTypeController.show);
app.delete("/productsTypes", productTypeController.remove);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});