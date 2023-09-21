import React, { ReactNode } from "react";
import notFound from './img/ic-notfound.svg';
import { Link } from 'react-router-dom';
import s from './styles.module.css';
export const NotFound = ( {children, title, buttonText = "На главную", buttonAction}: NotFoundProps ) => {
	return (
		<>
			<div className={s.notFound}>
				<img src={notFound} className={s.image} aria-hidden="true" alt="" />
				<h1 className={s.title}>{title}</h1>
				{children && children}
				{buttonAction
					? <button className="btn" onClick={buttonAction}>{buttonText}</button>
					: <Link to="/" className="btn" >{buttonText}</Link>
				}
			</div>
		</>
	);
}

interface NotFoundProps {
	children?: ReactNode,
	title: string,
	buttonText: string,
	buttonAction?: () => void,
}
