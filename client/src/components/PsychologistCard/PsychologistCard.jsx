import { useState } from 'react';
import styles from './PsychologistCard.module.css';
import AppointmentModal from '../AppointmentModal/AppointmentModal'; // 🌟 Modalı içeri aktarıyoruz

const PsychologistCard = ({ doctor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 🌟 Modal açma/kapama state'i

  if (!doctor) return null;

  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarWrapper}>
          <img 
            src={doctor.avatar_url} 
            alt={doctor.name} 
            className={styles.avatar} 
            onError={(e) => { e.target.src = "https://via.placeholder.com/96"; }}
          />
          <span className={styles.onlineStatus}></span>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.cardHeader}>
          <div className={styles.titleInfo}>
            <span className={styles.profession}>Psychologist</span>
            <h2 className={styles.name}>{doctor.name}</h2>
          </div>
          
          <div className={styles.metaInfo}>
            <span className={styles.rating}>★ Rating: {doctor.rating}</span>
            <span className={styles.divider}>|</span>
            <span className={styles.priceInfo}>
              Price / 1 hour: <span className={styles.price}>{doctor.price_per_hour}$</span>
            </span>
            <button className={styles.favoriteBtn} aria-label="Add to favorites">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#191A15" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.tagsContainer}>
          <span className={styles.tag}>Experience: <strong className={styles.tagValue}>{doctor.experience}</strong></span>
          <span className={styles.tag}>License: <strong className={styles.tagValue}>{doctor.license}</strong></span>
          <span className={styles.tag}>Specialization: <strong className={styles.tagValue}>{doctor.specialization}</strong></span>
          <span className={styles.tag}>Initial consultation: <strong className={styles.tagValue}>{doctor.initial_consultation}</strong></span>
        </div>

        <p className={styles.aboutText}>{doctor.about}</p>

        {isExpanded ? (
          <div className={styles.expandedContent}>
            <div className={styles.reviewsList}>
              {doctor.reviews && doctor.reviews.map((review, index) => {
                const currentReviewerName = review.reviewer || "Anonymous";
                const currentReviewerRating = review.rating || "0";
                
                return (
                  <div key={index} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerAvatar}>
                        {currentReviewerName.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.reviewerMeta}>
                        <h4 className={styles.reviewerName}>{currentReviewerName}</h4>
                        <span className={styles.reviewerRating}>★ {currentReviewerRating}</span>
                      </div>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>
                );
              })}
            </div>

            {/* 🌟 Butona tıklandığında modalı açıyoruz */}
            <button className={styles.appointmentBtn} onClick={() => setIsModalOpen(true)}>
              Make an appointment
            </button>
          </div>
        ) : (
          <button 
            className={styles.readMoreBtn} 
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}
      </div>

      {/* 🌟 FORM MODALI EN ALTTA ÇAĞRILIYOR */}
      <AppointmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctorName={doctor.name}
        doctorAvatar={doctor.avatar_url}
      />
    </div>
  );
};

export default PsychologistCard;