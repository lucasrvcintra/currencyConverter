import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "currency_app_favorites_v1";

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (code: string) => boolean;
  toggleFavorite: (code: string) => Promise<void>;
  removeFavorite: (code: string) => Promise<void>;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: async () => {},
  removeFavorite: async () => {},
  isLoading: true,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          setFavorites(JSON.parse(stored));
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error("Erro ao carregar moedas favoritas:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadFavorites();
  }, []);

  const saveFavorites = async (newList: string[]) => {
    try {
      setFavorites(newList);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (error) {
      console.error("Erro ao salvar favoritos:", error);
    }
  };

  const isFavorite = useCallback(
    (code: string) => {
      const upper = code.toUpperCase();
      return favorites.includes(upper);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (code: string) => {
      const upper = code.toUpperCase();
      const updated = favorites.includes(upper)
        ? favorites.filter((c) => c !== upper)
        : [...favorites, upper];
      await saveFavorites(updated);
    },
    [favorites]
  );

  const removeFavorite = useCallback(
    async (code: string) => {
      const upper = code.toUpperCase();
      const updated = favorites.filter((c) => c !== upper);
      await saveFavorites(updated);
    },
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de um FavoritesProvider");
  }
  return context;
}
