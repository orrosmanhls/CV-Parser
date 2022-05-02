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
				await createItem(data, source);
				console.log('new item added');
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

	return (
		<div>
			<Button>
				<input type="file" id="inpFile" onChange={changeHandler} />
			</Button>
			<br />

			<DropDown
				labels={sourceLabels ? sourceLabels : null}
				placeholder="Source"
				onChange={handleSelect}
			/>
			<br />
			{/* <DropDown labels={[]} placeholder="Group" /> */}

			<br />

			<Button onClick={handleSubmission}>Upload</Button>
		</div>
	);
};
export default InputForm;
