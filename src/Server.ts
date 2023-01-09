const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require("body-parser");

class Server {
    public app;

    constructor() {
        this.app = express();
        this.middleware();
    };

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.static("./public"));
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({extended: true}));
        this.app.use((req:any, res:any, next:any) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Controll-Allow-Headers", "Access, Content-Type, Authorization, Acept, Origin, X-Requested-With");
            this.app.use(cors);
            next();
        });
    }

}

module.exports = new Server().app;