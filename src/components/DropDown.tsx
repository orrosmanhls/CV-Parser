import React from 'react';
import { Dropdown } from 'monday-ui-react-core';

type DropDownProps = {
	labels: { label: unknown; value: unknown }[] | null;
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
				options={props.labels}
				placeholder={props.placeholder}
			/>
		</div>
	);
};
export default DropDown;
