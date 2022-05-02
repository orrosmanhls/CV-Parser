import React, { useState, useEffect } from 'react';
import {
	parsePDF,
	createItem,
	haveBeenInInterview,
	getStatusColumnValues,
} from 'src/utils';
import { Button } from 'monday-ui-react-core';
import DropDown from '../components/DropDown';

const InputForm: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | undefined>();
	const [data, setData] = useState<any>('');
	const [sourceLabels, setSourceLabels] =
		useState<{ label: unknown; value: unknown }[]>();
	const [source, setSource] = useState<string>('');
	const [wasAdded, setWasAdded] = useState<boolean | null>(null);

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setSelectedFile(event.target.files[0]);
		}
	};

	const handleSubmission = async () => {
		if (selectedFile) {
			console.log(selectedFile);

			const data = JSON.parse(await parsePDF(selectedFile));

			setData(data);
			if (await haveBeenInInterview(data.email)) {
				console.log('exist');
				setWasAdded(false);
			} else {
				await createItem(data, source);
				console.log('new item added');
				setWasAdded(true);
			}
		}
	};

	const handleSelect = (source: { label: string; value: string }) => {
		setSource(() => source.value);
	};

	useEffect(() => {
		(async () => {
			const labels = await getStatusColumnValues('source');
			setSourceLabels(labels);
		})();
	}, []);

	useEffect(() => {}, [wasAdded]);

	console.log(Button);

	return (
		<div className="input-form">
			{!selectedFile ? (
				<div className="file-input">
					<div className="description">
						<p>
							<strong>Add CV file (.pdf)</strong>
						</p>
						<p>We'll add a new candidate to the board for you</p>
					</div>
					<Button>
						<label className="custom-file-upload">
							<input
								type="file"
								id="inpFile"
								onChange={changeHandler}
								style={{ display: 'none' }}
							/>
							+ Add File
						</label>
					</Button>
				</div>
			) : null}

			{/* <DropDown labels={[]} placeholder="Group" /> */}
			{selectedFile ? (
				<div className="upload-area">
					<label className="custom-file-upload" style={{ cursor: 'pointer' }}>
						<input
							type="file"
							id="inpFile"
							onChange={changeHandler}
							style={{ display: 'none' }}
						/>
						{selectedFile.name}
					</label>
					<DropDown
						labels={sourceLabels ? sourceLabels : null}
						placeholder="Source"
						onChange={handleSelect}
					/>
					{selectedFile && source ? (
						<Button onClick={handleSubmission}>Upload</Button>
					) : (
						<Button disabled="true">Upload</Button>
					)}
					{wasAdded !== null && !wasAdded ? (
						<div>The candidate already exists</div>
					) : wasAdded ? (
						<div>New candidate was added!</div>
					) : null}
				</div>
			) : null}
		</div>
	);
};
export default InputForm;
