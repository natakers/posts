import React, { memo } from "react";
import './index.css';

const Footer = memo(() => {
	console.log('footer');
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__wrapper">
					<div className="footer__col">
						2023
					</div>
				</div>
			</div>
		</footer>
	);
});

export default Footer;
