import React, { memo } from "react";
import "./index.css";


const Spinner = memo(() => {
	console.log('spinner');
	return (
		<div className="lds-dual-ring"></div>
	);
});

export default Spinner;
