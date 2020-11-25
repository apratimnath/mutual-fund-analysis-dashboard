const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'))

app.listen(process.env.PORT || 9800);

app.get('/*', function(req, res){
	res.sendFile(path.join(__dirname + '/dist/index.html'));
})

console.log(`Mutual Fund Aanalysis Dashboard listening on port ${port}!`);