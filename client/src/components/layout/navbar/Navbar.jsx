import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import LoginModal from '../../Modals/LoginModal/LoginModal';
import RegisterModal from '../../Modals/RegisterModal/RegisterModal';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handlePageChange = setTimeout(() => {
      setIsMenuOpen(false);
    }, 0);
    return () => clearTimeout(handlePageChange);
  }, [location]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* LOGO */}
        <Link to="/" className={styles.logo}>
          <span>psychologists.</span><span>services</span>
        </Link>

        {/* 📱 MOBİL AÇILIR MENÜ (Navigasyon + Giriş Butonları İç İçe) */}
        <div className={`${styles.menuLinks} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            Home
          </NavLink>
          <NavLink 
            to="/psychologists" 
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            Psychologists
          </NavLink>
          
          {(location.pathname === '/psychologists' || location.pathname === '/favorites') && (
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              Favorites
            </NavLink>
          )}

          {/* 🌟 480px altında menünün içine dahil olan alternatif butonlar */}
          <div className={styles.mobileAuthGroup}>
            {user ? (
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <>
                <button className={styles.loginBtn} onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }}>
                  Log In
                </button>
                <button className={styles.registerBtn} onClick={() => { setIsRegisterOpen(true); setIsMenuOpen(false); }}>
                  Registration
                </button>
              </>
            )}
          </div>
        </div>

        {/* 💻 MASAÜSTÜ / NORMAL MOBİL SAĞ ALAN (Büyük ekranlarda görünür, çok küçükte gizlenir) */}
        <div className={styles.authButtons}>
          {user ? (
            <div className={styles.userProfile}>
              <div className={styles.userIconWrapper}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className={styles.userName}>{user.displayName || 'User'}</span>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <>
              <button className={styles.loginBtn} onClick={() => setIsLoginOpen(true)}>
                Log In
              </button>
              <button className={styles.registerBtn} onClick={() => setIsRegisterOpen(true)}>
                Registration
              </button>
            </>
          )}
        </div>

        {/* HAMBURGER BUTONU */}
        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MODALLAR */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </nav>
  );
};

export default Navbar;