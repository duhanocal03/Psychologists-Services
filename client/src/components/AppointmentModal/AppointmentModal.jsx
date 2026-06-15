import { useState, useEffect } from 'react';
import styles from './AppointmentModal.module.css';

const AppointmentModal = ({ isOpen, onClose, doctorName, doctorAvatar }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+90',
    time: '09:30',
    email: '',
    comment: ''
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  //  ESC Tuşu ile Kapatma Fonksiyonu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Bileşen kapandığında veya unmount olduğunda listener'ı temizliyoruz
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const timeOptions = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', 
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Randevu Bilgileri:", formData);
    alert(`Randevu talebiniz ${doctorName} için başarıyla alındı!`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Kapatma Butonu*/}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <h2 className={styles.modalTitle}>Make an appointment with a psychologists</h2>
        <p className={styles.modalDescription}>
          You are on the verge of changing your life for the better. Fill out the short form below to book your personal appointment with a professional psychologist. We guarantee confidentiality and respect for your privacy.
        </p>

        {/* Seçilen Psikolog Bilgisi */}
        <div className={styles.doctorInfoContainer}>
          <img src={doctorAvatar} alt={doctorName} className={styles.doctorAvatar} />
          <div>
            <span className={styles.doctorLabel}>Your psychologists</span>
            <h3 className={styles.doctorName}>{doctorName}</h3>
          </div>
        </div>

        {/* Randevu Formu */}
        <form onSubmit={handleSubmit} className={styles.appointmentForm}>
          <div className={styles.inputGroup}>
            <input 
              type="text" 
              placeholder="Name" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Telefon ve Saat */}
          <div className={styles.rowInputs}>
            <div className={styles.inputGroup} style={{ flex: 1 }}>
              <input 
                type="tel" 
                placeholder="Phone" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            
            <div className={styles.timePickerContainer}>
              <div 
                className={styles.timeDisplayInput} 
                onClick={() => setShowTimePicker(!showTimePicker)}
              >
                <span>{formData.time}</span>
                <span className={styles.clockIcon}>🕒</span>
              </div>

              {showTimePicker && (
                <div className={styles.timeDropdown}>
                  <p className={styles.timeDropdownTitle}>Meeting time</p>
                  <ul className={styles.timeList}>
                    {timeOptions.map((t) => (
                      <li 
                        key={t} 
                        className={formData.time === t ? styles.selectedTime : ''}
                        onClick={() => {
                          setFormData({...formData, time: t});
                          setShowTimePicker(false);
                        }}
                      >
                        {t.split(':')[0]} : {t.split(':')[1]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <input 
              type="email" 
              placeholder="Email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className={styles.inputGroup}>
            <textarea 
              placeholder="Comment" 
              rows="4"
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className={styles.submitBtn}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;