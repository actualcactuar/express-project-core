const fs = require('fs');

const en =  JSON.parse(fs.readFileSync(`${__dirname}/../lang/en.json`,'utf-8'));
const fi =  JSON.parse(fs.readFileSync(`${__dirname}/../lang/fi.json`,'utf-8'));

module.exports = {
    en:en,
    fi:fi
}