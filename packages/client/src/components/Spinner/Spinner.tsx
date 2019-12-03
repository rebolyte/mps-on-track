import React, { FC } from 'react';

import './Spinner.css';

const Spinner: FC = () => (
	<div className="w-12 mx-auto">
		<div className="la-line-scale la-dark">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
);

export default Spinner;
