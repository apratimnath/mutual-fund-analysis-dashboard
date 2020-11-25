const express = require('express');
const app = express();
const path = require('path');
const forceSSL = function () {
	return function (req, res, next) {
		if (req.headers['x-forwarded-proto'] !== 'https') {
			return res.redirect(
				['https://', req.get('Host'), req.url].join('')
			);
		}
		next();
	}
}
app.use(express.static(__dirname + '/dist/mf-analysis-dashboard'));

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname + '/dist/mf-analysis-dashboard/index.html'));
});

app.listen(process.env.PORT || 9800);

console.log(`Mutual Fund Aanalysis Dashboard listening on port ${port}!`);