import { useState, useEffect } from 'react';
import { ref, get, query, orderByKey } from 'firebase/database';
import { db } from '../../firebase/config'; 
import PsychologistCard from '../../components/PsychologistCard/PsychologistCard';
import styles from './PsychologistsPage.module.css';

const PsychologistsPage = () => {
  const [allPsychologists, setAllPsychologists] = useState([]); // Tüm ham veri
  const [visibleCount, setVisibleCount] = useState(3); // Şartname gereği ilk başta 3 kart
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('A to Z'); // Seçili filtre state'i
  const [isOpen, setIsOpen] = useState(false); // Dropdown açık/kapalı state'i

  const filterOptions = [
    'A to Z',
    'Z to A',
    'Less than 10$',
    'Greater than 10$',
    'Popular',
    'Not popular',
    'Show all'
  ];

  // Firebase'den tüm veriyi tek seferde çekiyoruz İstemci tarafında rahat filtrelemek için
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const dbRef = ref(db);
        const snapshot = await get(query(dbRef, orderByKey()));

        if (snapshot.exists()) {
          const data = snapshot.val();
          
          let loadedData = [];
          if (Array.isArray(data)) {
            loadedData = data
              .map((item, index) => item ? { id: index.toString(), ...item } : null)
              .filter(item => item !== null);
          } else if (data !== null && typeof data === 'object') {
            loadedData = Object.keys(data)
              .filter(key => data[key] !== null)
              .map(key => ({
                id: key,
                ...data[key]
              }));
          }

          setAllPsychologists(loadedData);
        }
      } catch (error) {
        console.error("Firebase veri okuma hatası:", error);
      }
      setLoading(false);
    };

    fetchAllData();
  }, []);

  //  FİLTRELEME VE SIRALAMA FONKSİYONU
  const getFilteredAndSortedData = () => {
    let result = [...allPsychologists];

    switch (filter) {
      case 'A to Z':
        // İsme göre alfabetik
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z to A':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Less than 10$':
        result = result.filter(doctor => Number(doctor.price_per_hour) < 10);
        break;
      case 'Greater than 10$':
        result = result.filter(doctor => Number(doctor.price_per_hour) > 10);
        break;
      case 'Popular':
        // Puana göre azalan (En yüksek puan en üstte)
        result.sort((a, b) => Number(b.rating) - Number(a.rating));
        break;
      case 'Not popular':
        // Puana göre artan (En düşük puan en üstte)
        result.sort((a, b) => Number(a.rating) - Number(b.rating));
        break;
      case 'Show all':
        // Orijinal veritabanı sırası
        break;
      default:
        break;
    }

    return result;
  };

  const processedData = getFilteredAndSortedData();
  // visibleCount kadarı yüklenecek
  const displayedPsychologists = processedData.slice(0, visibleCount);
  const hasMore = processedData.length > visibleCount;

  const loadMoreData = () => {
    setVisibleCount(prev => prev + 3); // Her tıklandığında 3 kart daha ekle
  };

  const handleFilterSelect = (option) => {
    setFilter(option);
    setIsOpen(false);
    setVisibleCount(3); // Filtre değişince listeyi tekrar ilk 3 karttan başlatıyoruz
  };

  return (
    <div className={styles.pageContainer}>
      
      {/* FİGMA TASARIMINA UYGUN ÖZEL DROPDOWN SEÇİCİ */}
      <div className={styles.filterWrapper}>
        <label className={styles.filterLabel}>Filters</label>
        <div className={styles.dropdownContainer}>
          <button 
            className={`${styles.dropdownTrigger} ${isOpen ? styles.activeTrigger : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {filter}
            <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>▼</span>
          </button>
          
          {isOpen && (
            <ul className={styles.dropdownMenu}>
              {filterOptions.map((option) => (
                <li 
                  key={option} 
                  className={`${styles.dropdownItem} ${filter === option ? styles.selectedItem : ''}`}
                  onClick={() => handleFilterSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Kart Listesi */}
      <div className={styles.listContainer}>
        {displayedPsychologists.map((doctor) => (
          <PsychologistCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {loading && <p className={styles.loadingText}>Loading specialists...</p>}

      {/* Eğer filtrelenmiş listede daha fazla eleman varsa Load More aktif olur */}
      {hasMore && !loading && (
        <button className={styles.loadMoreBtn} onClick={loadMoreData}>
          Load more
        </button>
      )}
    </div>
  );
};

export default PsychologistsPage;