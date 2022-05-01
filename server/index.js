// const express = require('express');
// const app = express();
// const port = 8080;

// app.use(express.json());

// app.get('/', (req, res) => {
// 	res.send('Express + TypeScript Server');
// });

// app.post('/', (req, res) => {
// 	console.log('got request');
// 	console.log(req.body);
// 	res.send('hello');
// });

// app.listen(port, () => {
// 	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });

// import express, { Express, Request, Response } from 'express';
// const app: Express = express();
// const port = 8080;

// app.get('/', (_req: Request, res: Response) => {
// 	res.send('Express + TypeScript Server');
// });

// app.post('/', (req: Request, res: Response) => {
// 	res.send(JSON.stringify(req.body));
// });

// app.listen(port, () => {
// 	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });

// const express = require('express');
// const fileUpload = require('express-fileupload');
// const pdfParse = require('pdf-parse');

// const app = express();

// app.use('/', express.static('../build'));
// app.use(fileUpload());

// app.post('/extract-text', (req, res) => {
// 	if (!req.files && !req.files.pdfFile) {
// 		res.status(400);
// 		res.end();
// 	}

// 	pdfParse(req.files.pdfFile).then((result) => {
// 		res.send(result.text);
// 	});
// });

// app.listen(8080, () => {
// 	console.log(`⚡️[server]: Server is running at http://localhost:8080`);
// });

const express = require('express');
const cors = require('cors');

const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');

const app = express();
app.use(cors());

app.use('/', express.static('../build'));
app.use(fileUpload());

app.post('/extract-text', (req, res) => {
	if (!req.files && !req.files.pdfFile) {
		res.status(400);
		res.end();
	}

	pdfParse(req.files.pdfFile).then((result) => {
		res.send(result.text);
	});
});

app.listen(8080, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:8080`);
});
