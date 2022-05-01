import React from 'react';
import { Dropdown } from 'monday-ui-react-core';

type DropDownProps = {
	options: {
		label: string;
		value: string;
	}[];
	placeholder: string;
};

const DropDown = (props: DropDownProps) => {
	return (
		<div
			style={{
				height: '150px',
				width: '300px',
			}}
		>
			<Dropdown
				className="dropdown-stories-styles_spacing"
				onBlur={function noRefCheck() {}}
				onChange={function noRefCheck() {}}
				onClear={function noRefCheck() {}}
				onFocus={function noRefCheck() {}}
				onInputChange={function noRefCheck() {}}
				onMenuClose={function noRefCheck() {}}
				onOptionSelect={function noRefCheck() {}}
				openMenuOnFocus={function noRefCheck() {}}
				options={[
					{
						label: 'Option 1',
						value: 1,
					},
					{
						label: 'Option 2',
						value: 2,
					},
					{
						label: 'Option 3',
						value: 3,
					},
				]}
				placeholder={props.placeholder}
			/>
		</div>
	);
};
export default DropDown;
