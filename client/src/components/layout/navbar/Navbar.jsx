import styles from "./Navbar.module.css";
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {

    // Kullanıcının o an hangi sayfada olduğunu yakalamak için location'ı alıyoruz
    const location = useLocation();

    // Eğer kullanıcı "/psychologists" sayfasındaysa bu değişken true olacak
    const showFavorites = location.pathname === "/psychologists" || location.pathname === "/favorites";

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <NavLink to="/" className={styles.logo}>
                    <span>psychologists.</span>
                    <span>services</span>
                </NavLink>

               <div className={styles.menuLinks}>
                    <NavLink
                        to="/"
                        className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/psychologists"
                        className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        Psychologists
                    </NavLink>

                    {showFavorites && (
                        <NavLink
                            to="/favorites"
                            className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        >
                            Favorites
                        </NavLink>
                    )}
                </div>
                
                <div className={styles.authButtons}>
                    <button className="btn-login">Log In</button>
                    <button className="btn-register">Registration</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;