// src/components/PsychologistCard/PsychologistCard.jsx
import { useState } from 'react';
import styles from './PsychologistCard.module.css';
import AppointmentModal from '../AppointmentModal/AppointmentModal';

const PsychologistCard = ({ doctor, onFavoriteToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //  Sayfa yenilendiğinde favori durumunu LocalStorage'dan kontrol etme
  const [isFavorite, setIsFavorite] = useState(() => {
    const savedFavorites = localStorage.getItem('psychologist_favorites');
    if (savedFavorites && doctor) {
      const favoritesArray = JSON.parse(savedFavorites);
      return favoritesArray.includes(doctor.id);
    }
    return false;
  });

  if (!doctor) return null;

  //  Kalp butonuna tıklanınca favoriye ekleme / çıkarma 
  const handleFavoriteClick = () => {
    const savedFavorites = localStorage.getItem('psychologist_favorites');
    let favoritesArray = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (isFavorite) {
      // Zaten favoriyse listeden çıkart
      favoritesArray = favoritesArray.filter(id => id !== doctor.id);
      setIsFavorite(false);
    } else {
      // Favori değilse listeye ekle
      favoritesArray.push(doctor.id);
      setIsFavorite(true);
    }

    // Güncel listeyi LocalStorage'a yaz
    localStorage.setItem('psychologist_favorites', JSON.stringify(favoritesArray));

    // Eğer favoriler sayfasındaysak listenin anlık güncellenmesi için tetikleyiciler
    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className={styles.card}>
      {/* Profil Fotoğrafı Çerçevesi */}
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

      {/* Tüm İçerik */}
      <div className={styles.contentContainer}>
        
        {/* Üst Başlık Alanı */}
        <div className={styles.cardHeader}>
          <div className={styles.titleInfo}>
            <span className={styles.profession}>Psychologist</span>
            <h2 className={styles.name}>{doctor.name}</h2>
          </div>
          
          <div className={styles.metaInfo}>
            <span className={styles.rating}><img src="/star.svg" alt="Star Icon" /> Rating: {doctor.rating}</span>
            <span className={styles.divider}>|</span>
            <span className={styles.priceInfo}>
              Price / 1 hour: <span className={styles.price}>{doctor.price_per_hour}$</span>
            </span>
            
            {/* FAVORİ BUTONU */}
            <button 
              className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteActive : ''}`} 
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill={isFavorite ? "#54be96" : "none"} 
                stroke={isFavorite ? "#54be96" : "#191A15"} 
                strokeWidth="2"
                style={{ transition: 'fill 0.2s ease, stroke 0.2s ease' }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Satır İçi Özellik Tagleri */}
        <div className={styles.tagsContainer}>
          <span className={styles.tag}>Experience: <strong className={styles.tagValue}>{doctor.experience}</strong></span>
          <span className={styles.tag}>License: <strong className={styles.tagValue}>{doctor.license}</strong></span>
          <span className={styles.tag}>Specialization: <strong className={styles.tagValue}>{doctor.specialization}</strong></span>
          <span className={styles.tag}>Initial consultation: <strong className={styles.tagValue}>{doctor.initial_consultation}</strong></span>
        </div>

        {/* Hakkında Metni */}
        <p className={styles.aboutText}>{doctor.about}</p>

        {/* Açılan Detay ve Yorumlar Alanı */}
        {isExpanded ? (
          <div className={styles.expandedContent}>
            <div className={styles.reviewsList}>
              {doctor.reviews && doctor.reviews.map((review, index) => {
                // Veritabanındaki gerçek "reviewer" ve "rating" anahtarları kullanıldı
                const currentReviewerName = review.reviewer || "Anonymous";
                const currentReviewerRating = review.rating || "0";
                
                return (
                  <div key={index} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      {/* Dinamik Kullanıcı Baş Harfi */}
                      <div className={styles.reviewerAvatar}>
                        {currentReviewerName.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.reviewerMeta}>
                        <h4 className={styles.reviewerName}>{currentReviewerName}</h4>
                        <span className={styles.reviewerRating}><img src="/star.svg" alt="Star Icon" /> {currentReviewerRating}</span>
                      </div>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>
                );
              })}
            </div>

            {/* Randevu Modalı Açıcı Buton */}
            <button className={styles.appointmentBtn} onClick={() => setIsModalOpen(true)}>
              Make an appointment
            </button>
          </div>
        ) : (
          /*  Kapalıyken Sadece Bu Link Görünür, Basılınca Tamamen Kaybolur */
          <button 
            className={styles.readMoreBtn} 
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}
      </div>

      {/* Randevu Formu Popup Modalı */}
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