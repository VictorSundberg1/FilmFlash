import React, { useState } from 'react';
import { NavLink } from 'react-router';
import styles from './Header.module.css';
import filmStip from '../assets/filmStip.png';
import filmFlash from '../assets/filmFlash.png';
import filmReel from '../assets/filmReel.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => { setMenuOpen(!menuOpen);};

  return (
    <div className={styles.header}>
        <div className={styles.inner}>
            <div className={styles.brand}>
                <NavLink to="/" className={styles.brandLink}>
                    <img src={filmStip} alt="filmStrip" className={styles.filmStrip} />
                    <div className={styles.rect}></div>
                    <img src={filmFlash} alt="filmFlash" className={styles.filmFlash} />
                    <img src={filmReel} alt="filmReel" className={styles.filmReel} />
                </NavLink>
            </div>

            {/* Navigation links */}
            <nav className={`${styles.nav} ${menuOpen ? styles.showMenu : ""}`}>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? styles.active : undefined)}
                    onClick={() => setMenuOpen(false)}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/movies"
                    className={({ isActive }) => (isActive ? styles.active : undefined)}
                    onClick={() => setMenuOpen(false)}
                >
                    Movies
                </NavLink>
                <NavLink
                    to="/checkout"
                    className={({ isActive }) => (isActive ? styles.active : undefined)}
                    onClick={() => setMenuOpen(false)}
                >
                    Cart
                </NavLink>
            </nav>

            <NavLink to="/checkout" className={styles.cart}>
                🛒
                <span className={styles.count}>1</span>
            </NavLink>

            {/* Hamburger button */}
            <button
                className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
                onClick={toggleMenu}
                >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
  );
};

export default Header;
