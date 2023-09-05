import React, { memo } from "react";
import './index.css';

const Footer = memo(() => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__wrapper">
					<div className="footer__col">
						<p>Create by Nataliia Kersnovskaia</p>
						<p>2023</p>	
					</div>
				</div>
			</div>
		</footer>
	);
});

export default Footer;
