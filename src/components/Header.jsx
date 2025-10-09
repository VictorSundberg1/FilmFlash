import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router';
import styles from './Header.module.css';
import filmStip from '../assets/filmStip.png';
import filmFlash from '../assets/filmFlash.png';
import filmReel from '../assets/filmReel.png';
import CartDropdown from './CartDropdown.jsx';
import { useSelector } from 'react-redux';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [showCart, setShowCart] = useState(false);
  const cartCount = useSelector((state) => state.cart.movies.length);
  const timeoutRef = useRef(null);

  const handleMouseLeave = () => {
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowCart(false);
    }, 200);
  }

  const handleMouseEnter = () => {
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowCart(true);
  }

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
        <nav className={`${styles.nav} ${menuOpen ? styles.showMenu : ''}`}>
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

        <div
          className={styles.container}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <NavLink to="/checkout" className={styles.cart}>
            🛒
          {cartCount > 0 && <span className={styles.count}>{cartCount}</span>}
          </NavLink>
          {showCart && <CartDropdown 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave} />}
        </div>

        {/* Hamburger button */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
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
