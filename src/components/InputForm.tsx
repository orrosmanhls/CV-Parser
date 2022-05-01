import React, { useState } from 'react';
import { parsePDF, createItem, haveBeenInInterview } from 'src/utils';
import { Button } from 'monday-ui-react-core';
import DropDown from '../components/DropDown';

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
			<Button>
				<input type="file" id="inpFile" onChange={changeHandler} />
			</Button>
			<br />

			<DropDown options={[{ label: 'a', value: '1' }]} placeholder="Source" />
			<br />
			<DropDown options={[{ label: 'a', value: '1' }]} placeholder="Group" />

			<br />
			<Button onClick={handleSubmission}>Upload</Button>
			{/* <button type="button" id="btnUpload" onClick={handleSubmission}></button> */}
		</div>
	);
};
export default InputForm;
