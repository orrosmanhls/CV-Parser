import React, { useState } from 'react';
import mondaySdk from 'monday-sdk-js';
const monday = mondaySdk();

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
			const formData = new FormData();

			formData.append('pdfFile', selectedFile);

			const response = await fetch('/extract-text', {
				method: 'post',
				body: formData,
			});

			const data = await response.text();

			setData(data);

			const context = await monday.get('context');
			const boardId = context.data.boardIds[0];

			const createItemResponse = await monday.api(`mutation {
                            create_item (board_id: ${boardId}, item_name: "A name") {
                                id
                            }
                        }`);

			console.log(createItemResponse);
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
