import { useState, useEffect, useMemo, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "expo-router/react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/ThemedView";
import { CurrencyCard } from "@/components/CurrencyCard";
import { useFavorites } from "@/context/FavoritesContext";
import { fetchSupportedCurrencies } from "@/services/currencyApi";
import { CurrencyInfo } from "@/types/currency";

export default function CurrenciesScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [currencies, setCurrencies] = useState<CurrencyInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isDark = theme.dark;
  const textColor = isDark ? "#ffffff" : "#171717";
  const secondaryTextColor = isDark ? "#d1d1d6" : "#666666";
  const borderColor = isDark ? "#48484a" : "#e5e5e5";
  const backgroundColor = isDark ? "#1c1c1e" : "#f5f5f7";
  const inputBg = isDark ? "#2c2c2e" : "#ffffff";

  const loadData = useCallback(async () => {
    try {
      const list = await fetchSupportedCurrencies();
      setCurrencies(list);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar as moedas. Tente novamente.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetchSupportedCurrencies()
      .then((list) => {
        if (active) {
          setCurrencies(list);
          setError(null);
        }
      })
      .catch((err) => {
        console.error(err);
        if (active) {
          setError("Não foi possível carregar as moedas. Tente novamente.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const filteredCurrencies = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return currencies;
    return currencies.filter(
      (c) =>
        c.code.toLowerCase().includes(term) ||
        c.name.toLowerCase().includes(term)
    );
  }, [currencies, search]);

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.safeArea}>
        <View style={[styles.header, { borderBottomColor: borderColor }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Todas as Moedas
          </Text>
          <Text style={[styles.sectionSubtitle, { color: secondaryTextColor }]}>
            {currencies.length > 0
              ? `${currencies.length} moedas disponíveis`
              : "Recuperando moedas da ExchangeRate-API..."}
          </Text>

          <View style={[styles.searchBox, { backgroundColor: inputBg, borderColor }]}>
            <Ionicons name="search" size={20} color={secondaryTextColor} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar por código ou nome..."
              placeholderTextColor={secondaryTextColor}
              style={[styles.searchInput, { color: textColor }]}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
            {search ? (
              <Pressable onPress={() => setSearch("")}>
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={secondaryTextColor}
                />
              </Pressable>
            ) : null}
          </View>
        </View>

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#2f66e8" />
            <Text style={[styles.loadingText, { color: secondaryTextColor }]}>
              Carregando moedas da API...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
            <Text style={[styles.errorText, { color: textColor }]}>
              {error}
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={loadData}
              style={({ pressed }) => [
                styles.retryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.retryButtonText}>Tentar Novamente</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={filteredCurrencies}
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
            refreshing={refreshing}
            onRefresh={onRefresh}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Text style={[styles.emptyText, { color: secondaryTextColor }]}>
                  {`Nenhuma moeda encontrada para "${search}".`}
                </Text>
              </View>
            }
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
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
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
  errorText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#2f66e8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 40,
  },
  buttonPressed: {
    opacity: 0.75,
  },
});
