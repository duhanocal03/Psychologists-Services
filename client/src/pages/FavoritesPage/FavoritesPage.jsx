import { useState, useEffect } from 'react';
import { ref, get, query, orderByKey } from 'firebase/database';
import { db } from '../../firebase/config';
import PsychologistCard from '../../components/PsychologistCard/PsychologistCard';
import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const [favoritePsychologists, setFavoritePsychologists] = useState([]); // Filtrelenmiş favori doktorlar
  const [visibleCount, setVisibleCount] = useState(3); // İlk başta 3 kart gösterilecek
  const [loading, setLoading] = useState(false);
  const [favoritesIds, setFavoritesIds] = useState([]);

  //  LocalStorage'daki favori ID'lerini oku ve değişiklikleri dinle
  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem('psychologist_favorites');
      if (savedFavorites) {
        setFavoritesIds(JSON.parse(savedFavorites));
      } else {
        setFavoritesIds([]);
      }
    };

    loadFavorites();

    // Kullanıcı sayfa içindeki bir karttan kalbe basıp favoriden çıkarırsa listeyi anlık güncellemek için event ekliyoruz
    window.addEventListener('storage', loadFavorites);
    return () => window.removeEventListener('storage', loadFavorites);
  }, []);

  //  Firebase'den verileri çek ve sadece favori listesinde olanları ayıkla
  useEffect(() => {
    const fetchFavoriteData = async () => {
      if (favoritesIds.length === 0) {
        setFavoritePsychologists([]);
        return;
      }

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

          //  Sadece favori ID'leri içeren doktorları filtrele
          const filteredFavorites = loadedData.filter(doctor => favoritesIds.includes(doctor.id));
          setFavoritePsychologists(filteredFavorites);
        }
      } catch (error) {
        console.error("Favori verileri çekilirken hata oluştu:", error);
      }
      setLoading(false);
    };

    fetchFavoriteData();
  }, [favoritesIds]);

  // Karttan direkt kalbe basılarak favoriden çıkarıldığında sayfa yenilenmeden anında arayüzden düşmesi için tetikleyici fonksiyon
  const handleRefreshFavorites = () => {
    const savedFavorites = localStorage.getItem('psychologist_favorites');
    if (savedFavorites) {
      setFavoritesIds(JSON.parse(savedFavorites));
    }
  };

  // Sayfalama (Load More) Mantığı
  const displayedPsychologists = favoritePsychologists.slice(0, visibleCount);
  const hasMore = favoritePsychologists.length > visibleCount;

  const loadMoreData = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <div className={styles.pageContainer}>
      
      {/* 🌟 ŞARTNAME KONTROLÜ: Favoriler Boşsa Gösterilecek Alan */}
      {!loading && favoritePsychologists.length === 0 ? (
        <div className={styles.emptyContainer}>
          <h2 className={styles.emptyTitle}>You don't have any favorites yet</h2>
          <p className={styles.emptyText}>
            Go back to the psychologists page and add some specialists to your list to see them here!
          </p>
        </div>
      ) : (
        <>
          {/* Favori Kart Listesi */}
          <div className={styles.listContainer}>
            {displayedPsychologists.map((doctor) => (
              // OnFavoriteToggle ile kart içindeki tıklamayı dinleyip listeyi anlık güncelletiyoruz
              <PsychologistCard 
                key={doctor.id} 
                doctor={doctor} 
                onFavoriteToggle={handleRefreshFavorites} 
              />
            ))}
          </div>

          {loading && <p className={styles.loadingText}>Loading your favorites...</p>}

          {/* Daha fazla favori kart varsa Load More butonu aktif olur */}
          {hasMore && !loading && (
            <button className={styles.loadMoreBtn} onClick={loadMoreData}>
              Load more
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesPage;