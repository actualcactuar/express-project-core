const path = require('path');
const fs = require('fs')
const express = require('express');
const bodyparser = require ('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);
app.set('view engine','ejs');
app.set('views', `${__dirname}/tpl`);

app.use('/build', express.static(path.join(`${__dirname}/build`)));
app.use(bodyparser.json());

app.all('/',(req,res,next) => {
    /*let langs = req.headers["accept-language"];
    let localeLang =  require(`./src/lang/${lang}.json`);
    req.lang = localeLang ? localeLang : require('./src/lang/en-US.json');*/
    next();
})

app.get('/', (req, res) => {
    console.log(req.lang);
    res.render('pages/landing.ejs',{lang:req.lang})
})

app.listen(port,() => {
    console.log(`Listening ${port}`)
})

  