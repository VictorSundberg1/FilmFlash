import React from 'react';
import logo from '../assets/logoFooter.png';
import styles from './Footer.module.css';
import { NavLink } from 'react-router';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<NavLink to='/'>
					<img src={logo} alt='LogoFooter' className={styles.logo} />
				</NavLink>
				<p className={styles.copy}>
					FilmFlash. {new Date().getFullYear()} &copy; All rights reserved.
				</p>
				<p className={styles.copy}>
					This website uses TMDB and the TMDB APIs but is not endorsed,
					certified, or otherwise approved by TMDB.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
