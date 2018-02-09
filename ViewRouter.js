const express = require('express');

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();
        router.get('/',(req,res)=>res.render("./view/home.handlebars"));

        return router;
    }
}