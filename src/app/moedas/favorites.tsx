import { useState, useEffect, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "expo-router/react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/ThemedView";
import { CurrencyCard } from "@/components/CurrencyCard";
import { EmptyState } from "@/components/EmptyState";
import { useFavorites } from "@/context/FavoritesContext";
import { fetchSupportedCurrencies } from "@/services/currencyApi";
import { CurrencyInfo } from "@/types/currency";

export default function FavoritesScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { favorites, isFavorite, toggleFavorite, isLoading: favoritesLoading } =
    useFavorites();

  const [allCurrencies, setAllCurrencies] = useState<CurrencyInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const isDark = theme.dark;
  const textColor = isDark ? "#ffffff" : "#171717";
  const secondaryTextColor = isDark ? "#d1d1d6" : "#666666";
  const borderColor = isDark ? "#48484a" : "#e5e5e5";
  const backgroundColor = isDark ? "#1c1c1e" : "#f5f5f7";

  useEffect(() => {
    async function loadCurrencies() {
      try {
        const list = await fetchSupportedCurrencies();
        setAllCurrencies(list);
      } catch (err) {
        console.error("Erro ao carregar moedas para favoritas:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCurrencies();
  }, []);

  const favoriteCurrenciesList = useMemo(() => {
    return favorites.map((favCode) => {
      const match = allCurrencies.find(
        (c) => c.code.toUpperCase() === favCode.toUpperCase()
      );
      return match || { code: favCode, name: favCode };
    });
  }, [favorites, allCurrencies]);

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.safeArea}>
        <View style={[styles.header, { borderBottomColor: borderColor }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Moedas Favoritas
          </Text>
          <Text style={[styles.sectionSubtitle, { color: secondaryTextColor }]}>
            {favorites.length === 1
              ? "1 moeda favoritada"
              : `${favorites.length} moedas favoritadas`}
          </Text>
        </View>

        {loading || favoritesLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#2f66e8" />
            <Text style={[styles.loadingText, { color: secondaryTextColor }]}>
              Carregando favoritas...
            </Text>
          </View>
        ) : favoriteCurrenciesList.length === 0 ? (
          <EmptyState
            icon="star-outline"
            title="Nenhuma favorita ainda"
            message="Toque na estrela ao lado de qualquer moeda na aba 'Moedas' para adicioná-la aos seus favoritos."
            actionLabel="Explorar Moedas"
            onAction={() => router.push("/moedas")}
          />
        ) : (
          <FlatList
            data={favoriteCurrenciesList}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <CurrencyCard
                item={item}
                isFavorite={isFavorite(item.code)}
                onToggleFavorite={() => toggleFavorite(item.code)}
                onPress={() =>
                  router.push({
                    pathname: "/moedas/convert",
                    params: { from: item.code },
                  })
                }
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
});
