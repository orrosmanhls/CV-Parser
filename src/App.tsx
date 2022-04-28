import React, { useState } from 'react';
import './App.css';
import mondaySdk from 'monday-sdk-js';
import pdf from 'pdf-parse';

const monday = mondaySdk();

const App: React.FC = (props) => {
	// const [settings, setSettings]: JSON = {};
	// const [name, setName]: String = '';

	const [selectedFile, setSelectedFile] = useState<any>();
	const [isFilePicked, setIsFilePicked] = useState<Boolean>(false);
	const [data, setData] = useState<String>('');

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const fileReader = new FileReader();
			const file = event.target.files[0];
			setSelectedFile(fileReader.readAsArrayBuffer(file)); //.target.files[0]);
			if (selectedFile) {
				extractData(selectedFile);
				// setData(extractData(selectedFile));
				setIsFilePicked(() => true);
			}
		} else {
			setIsFilePicked(() => false);
		}
	};

	const extractData = (file: any): void => {
		const bufferData = Buffer.from(file);
		console.log(bufferData);
		// return pdf(bufferData).then((data) => data.text);
	};

	const handleSubmission = () => {};

	return (
		<div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked && selectedFile ? (
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

export default App;
