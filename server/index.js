const express = require('express');
const cors = require('cors');

const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');

// const mondaySdk = require('monday-sdk-js');
// const monday = mondaySdk();

const app = express();
app.use(cors());

app.use('/', express.static('../build'));
app.use(fileUpload());

app.post('/extract-text', async (req, res) => {
	if (!req.files && !req.files.pdfFile) {
		res.status(400);
		res.end();
	}

	const pdfText = (await pdfParse(req.files.pdfFile)).text;

	const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
	const phoneRegex = /\d{3}[-]?\d{7}/;

	const email = pdfText.match(emailRegex)[0];
	const phone = pdfText.match(phoneRegex)[0];

	// console.log(email, phone);
	// monday.listen('context', (res) => {
	// 	console.log(res);
	// });

	res.send({ email, phone });
});

app.listen(8080, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:8080`);
});
