import React from 'react';
import { Dropdown } from 'monday-ui-react-core';

type DropDownProps = {
	labels: { label: unknown; value: unknown }[] | null;
	placeholder: string;
	onChange: Function;
};

const DropDown = (props: DropDownProps) => {
	return (
		<div
			style={{
				width: '300px',
			}}
		>
			<Dropdown
				className="dropdown-stories-styles_spacing"
				onChange={props.onChange}
				options={props.labels}
				placeholder={props.placeholder}
			/>
		</div>
	);
};
export default DropDown;
