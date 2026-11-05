import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "expo-router/react-navigation";
import { CurrencyInfo } from "@/types/currency";

type CurrencyCardProps = {
  item: CurrencyInfo;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress?: () => void;
};

export function CurrencyCard({
  item,
  isFavorite,
  onToggleFavorite,
  onPress,
}: CurrencyCardProps) {
  const theme = useTheme();
  const cardColor = theme.dark ? "#2c2c2e" : "#ffffff";
  const borderColor = theme.dark ? "#48484a" : "#e5e5e5";
  const secondaryTextColor = theme.dark ? "#d1d1d6" : "#666666";
  const textColor = theme.dark ? "#ffffff" : "#171717";
  const badgeBg = theme.dark ? "#3a3a3c" : "#eaf1fb";
  const badgeTextColor = theme.dark ? "#70a6ff" : "#2f66e8";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: cardColor, borderColor },
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.content}>
        <View style={[styles.badge, { backgroundColor: badgeBg }]}>
          <Text style={[styles.badgeText, { color: badgeTextColor }]}>
            {item.code}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.name, { color: textColor }]} numberOfLines={1}>
            {item.name}
          </Text>
          {item.symbol ? (
            <Text style={[styles.symbol, { color: secondaryTextColor }]}>
              Símbolo: {item.symbol}
            </Text>
          ) : null}
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          style={({ pressed }) => [
            styles.favButton,
            pressed && styles.buttonPressed,
          ]}
          hitSlop={12}
        >
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={24}
            color={isFavorite ? "#f59e0b" : secondaryTextColor}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  cardPressed: {
    opacity: 0.8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 14,
    minWidth: 54,
    alignItems: "center",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  symbol: {
    fontSize: 13,
  },
  favButton: {
    padding: 6,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.6,
  },
});
