const express = require('express');
const app = express();
const port = 8080;

// app.use(express.json());

app.get('/', (req, res) => {
	res.send('Express + TypeScript Server');
});

app.post('/', (req, res) => {
	console.log('got request');
	console.log(req.body);
	res.send(JSON.stringify(req.body));
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
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
