import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom'; // 🌟 useLocation eklendi
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import LoginModal from '../../Modals/LoginModal/LoginModal';
import RegisterModal from '../../Modals/RegisterModal/RegisterModal';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  const location = useLocation(); // 🌟 Aktif sayfa yolunu almak için

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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

        {/* ORTA MENÜ */}
        <div className={styles.menuLinks}>
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
          
          {/* 🌟 1. SORUNUN ÇÖZÜMÜ: Sadece "/psychologists" veya "/favorites" sayfasındayken gösterilir */}
          {(location.pathname === '/psychologists' || location.pathname === '/favorites') && (
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              Favorites
            </NavLink>
          )}
        </div>

        {/* SAĞ BUTONLAR / PROFİL ALANI */}
        <div className={styles.authButtons}>
          {user ? (
            <div className={styles.userProfile}>
              <div className={styles.userIconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className={styles.userName}>{user.displayName || 'User'}</span>
              
              {/* 🌟 2. SORUNUN ÇÖZÜMÜ: Görseldeki gibi oval ve şık Log out butonu */}
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <>
              <button style={{ background: 'none', border: '1px solid rgba(25,26,21,0.2)', padding: '14px 39px', borderRadius: '30px', cursor: 'pointer', fontWeight: 500, fontFamily: 'var(--font-family)' }} onClick={() => setIsLoginOpen(true)}>
                Log In
              </button>
              <button style={{ backgroundColor: 'var(--color-light-green)', border: 'none', padding: '14px 40px', borderRadius: '30px', color: '#fff', cursor: 'pointer', fontWeight: 500, fontFamily: 'var(--font-family)' }} onClick={() => setIsRegisterOpen(true)}>
                Registration
              </button>
            </>
          )}
        </div>
      </div>

      {/* MODALLAR */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </nav>
  );
};

export default Navbar;