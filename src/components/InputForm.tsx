import React, { useState } from 'react';
import { parsePDF, createItem, haveBeenInInterview } from 'src/utils';

const InputForm: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | undefined>();
	const [data, setData] = useState<any>('');

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setSelectedFile(event.target.files[0]);
		}
	};

	const handleSubmission = async () => {
		if (selectedFile) {
			const data = JSON.parse(await parsePDF(selectedFile));

			setData(data);
			if (await haveBeenInInterview(data.email)) {
				console.log('exist');
			} else {
				await createItem(data);
				console.log('new item added');
			}
		}
	};

	return (
		<div>
			<input type="file" id="inpFile" onChange={changeHandler} />
			<br />
			<br />
			<textarea
				style={{ width: '300px', height: '150px' }}
				id="resultText"
				placeholder="Your PDF text will appear here..."
				value={data}
			></textarea>
			<br />
			<div>Dropdown - Source of CV</div>
			<div> Dropdown - Candidate Group</div>
			<br />
			<button type="button" id="btnUpload" onClick={handleSubmission}>
				Upload
			</button>
		</div>
	);
};
export default InputForm;
