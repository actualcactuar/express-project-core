const path = require('path');
const express = require('express');
const bodyparser = require ('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const langs = require('./src/lib/langs');
const routes = require('./src/lib/routes');

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

app.get('/:lang([a-z]{2})', (req, res) => {
    var lang = req.params.lang;
    var verifiedLang = lang && lang in langs ? langs[lang] : langs['en'];
    var route = lang && lang in langs ? 'landing.ejs' : 'notFound.ejs';
    res.render('app.ejs',{lang:verifiedLang,route:route});
})

app.get('/:lang([a-z]{2})/:route', (req, res) => {
    var lang = req.params.lang;
    var verifiedLang = lang && lang in langs ? langs[lang] : langs['en'];
    var route = req.params.route;
    var verifiedRoute = route && route in routes ? routes[route] : 'notFound.ejs';
    res.render('app.ejs',{lang:verifiedLang,route:verifiedRoute});
})

app.get('*', (req, res) => {
    var lang = langs[app.get('lang')];
    res.render('app.ejs',{lang:lang,route:'notFound.ejs'})
})

app.listen(port,() => {
    console.log(`Listening ${port}`)
})

  