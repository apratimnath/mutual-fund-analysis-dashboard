'use strict';

const express = require('express')
const helmet = require('helmet')
const frameguard = require('frameguard')
const app = express()
const port = process.env.PORT || 9800
const http = require('http')

var path_1 = require('path')
var dist_folder = path_1.join(process.cwd(), 'mf-analysis-dashboard/dist/mf-analysis-dashboard');

app.use(helmet());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('views', path_1.join(dist_folder, ''));
app.get('*.*', express.static(path_1.join(dist_folder, ''), {
}));

app.get('*', function(req, res, next){
	res.render('index.html', { req: req});
});

var server = http.createServer(app).listen(port, () => console.log(`Mutual Fund Aanalysis Dashboard listening on port ${port}!`));
	