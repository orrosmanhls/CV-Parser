import React, { useState, useEffect } from 'react';
// import './App.css';
// import mondaySdk from 'monday-sdk-js';
// import pdf from 'pdf-parse';
// import pdf from 'pdfjs-dist';

// const monday = mondaySdk();

const Or: React.FC = () => {
	// const [settings, setSettings]: JSON = {};
	// const [name, setName]: String = '';

	const [selectedFile, setSelectedFile] = useState<File | undefined>();
	// const [isFilePicked, setIsFilePicked] = useState<Boolean>(false);
	const [data, setData] = useState<any>('');

	const extractData = async (bufferData: any) => {
		console.log('Processing File');

		// const data = Buffer.from(bufferData);

		// const data = new FormData();
		// data.append('file', bufferData);
		// data.append('user', 'hubot');

		const response = await fetch('http://localhost:8080', {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			body: 'dd', // body data type must match "Content-Type" header
		});

		return response;

		// pdf(data).then((data) => setData(data.text));
		// pdf.
	};

	useEffect(() => {
		(async () => {
			// const arrayBufferData = await selectedFile?.arrayBuffer();
			// console.log(arrayBufferData);

			if (selectedFile) {
				const response = await extractData(selectedFile);
				const data = response;
				console.log(data);
			} else {
				console.log('No Data');
			}
		})();
	}, [selectedFile]);

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setSelectedFile(event.target.files[0]);
		}
	};
	const handleSubmission = () => {
		if (selectedFile) {
			const formData = new FormData();

			formData.append('pdfFile', selectedFile);

			fetch('/extract-text', {
				method: 'post',
				body: formData,
			})
				.then((response) => {
					return response.text();
				})
				.then((extractedText) => {
					setData(extractedText.trim());
				});
		}
	};

	return (
		<div>
			<input type="file" id="inpFile" onChange={changeHandler} />
			<button type="button" id="btnUpload" onClick={handleSubmission}>
				Upload
			</button>
			<br />
			<br />
			<textarea
				style={{ width: '300px', height: '150px' }}
				id="resultText"
				placeholder="Your PDF text will appear here..."
				value={data}
			></textarea>
		</div>
	);
};
export default Or;
