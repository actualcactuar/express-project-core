const path = require('path');
const fs = require('fs')
const express = require('express');
const bodyparser = require ('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const langs = require('./src/lib/langs');
const routes = {
    'about':'about.ejs',
}

app.set('port', port);
app.set('view engine','ejs');
app.set('views', `${__dirname}/tpl`);

app.use('/build', express.static(path.join(`${__dirname}/build`)));
app.use(bodyparser.json());

app.all('*',(req,res,next) => {
    let lang = req.acceptsLanguages('en','fi');
    let verifiedLang = lang ? lang : 'en';
    app.set('lang', verifiedLang);
    next();
})

app.get('/', (req, res) => {
    res.redirect(`/${app.get('lang')}`);
})


app.get('/:lang', (req, res) => {
    var lang = req.params.lang;

    if(lang in langs){
        console.log(langs[lang])
        res.render('app.ejs',{lang:langs[lang],route:'landing.ejs'})
    } else {
        res.render('app.ejs',{lang:langs.en,route:'notFound.ejs'})
    }
})

app.get('/:lang/:route', (req, res) => {
    var lang = langs[req.params.lang];
    var route = req.params.route;
    var verifiedRoute = route && route in routes ? route : 'notFound.ejs';
    res.render('app.ejs',{lang:lang,route:routes[verifiedRoute]});

})

app.get('*', (req, res) => {
    var lang = langs[app.get('lang')];
    res.render('app.ejs',{lang:lang,route:'notFound.ejs'})
})

app.listen(port,() => {
    console.log(`Listening ${port}`)
})

  