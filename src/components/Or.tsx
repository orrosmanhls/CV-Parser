import React, { useState, useEffect } from 'react';
// import './App.css';
// import mondaySdk from 'monday-sdk-js';
// import pdf from 'pdf-parse';
import pdf from 'pdfjs-dist';

// const monday = mondaySdk();

const Or: React.FC = () => {
	// const [settings, setSettings]: JSON = {};
	// const [name, setName]: String = '';

	const [selectedFile, setSelectedFile] = useState<File>();
	// const [isFilePicked, setIsFilePicked] = useState<Boolean>(false);
	const [bufferData, setBufferData] = useState<ArrayBuffer>();
	const [data, setData] = useState<String>('');

	const extractData = (bufferData: any) => {
		console.log('Processing File');

		const data = Buffer.from(bufferData);
		// pdf(data).then((data) => setData(data.text));
		// pdf.
	};

	useEffect(() => {
		(async () => {
			const arrayBufferData = await selectedFile?.arrayBuffer();
			setBufferData(arrayBufferData);
			extractData(bufferData);
			console.log(data);
		})();
	}, [selectedFile, bufferData, data]);

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setSelectedFile(event.target.files[0]);

			// if (selectedFile) {
			// 	setIsFilePicked(() => true);
			// } else {
			// 	setIsFilePicked(() => false);
			// }
		}
	};
	const handleSubmission = () => {};

	return (
		<div>
			<input type="file" name="file" onChange={changeHandler} />
			{selectedFile ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	);
};
export default Or;
