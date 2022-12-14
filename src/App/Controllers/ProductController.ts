class ProductController {
    
    async index(req:any, res:any): Promise<string> {
        return res.send('Products route');
    }

}

module.exports = new ProductController();