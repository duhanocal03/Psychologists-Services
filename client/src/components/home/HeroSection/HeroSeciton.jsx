import { NavLink } from "react-router-dom";
import heroImg from "../../../assets/hero.png";
import cardSvg from "../../../assets/heroBlock.svg";
import purpleSvg from "../../../assets/heroQuestion.svg";
import orangeSvg from "../../../assets/heroUsers.svg";
import styles from "./HeroSection.module.css"

const HeroSection = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        The road to the <span className={styles.spanHero}>depths</span> of the human soul
                    </h1>
                    <p className={styles.description}>
                        We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.
                    </p>
                       
                    <NavLink className="btn-main" to="/psychologists">
                        Get Started
                        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="btn-icon"
    >
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
                    </NavLink>
                </div>

                <div className={styles.imageWrapper}>
                    <img src={heroImg} alt="Psychologist Services" />
                    <img src={cardSvg} alt="Info Card" className={styles.heroBlock} />
                    <img src={purpleSvg} alt="Question Icon" className={styles.heroQuestion} />
                    <img src={orangeSvg} alt="Users Icon" className={styles.heroUsers} />
                </div>
            </div>
        </section>
    );
};

export default HeroSection