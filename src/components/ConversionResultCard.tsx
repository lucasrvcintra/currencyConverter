import { StyleSheet, Text, View, Pressable } from "react-native";
import { useTheme } from "expo-router/react-navigation";
import { ConversionResult } from "@/types/currency";

type ConversionResultCardProps = {
  result: ConversionResult;
  onClose: () => void;
};

export function ConversionResultCard({
  result,
  onClose,
}: ConversionResultCardProps) {
  const theme = useTheme();
  const cardBg = theme.dark ? "#2c2c2e" : "#ffffff";
  const borderColor = theme.dark ? "#48484a" : "#d1d5db";
  const textColor = theme.dark ? "#ffffff" : "#111827";
  const secondaryTextColor = theme.dark ? "#9ca3af" : "#4b5563";

  const formattedResult =
    typeof result.result === "number"
      ? Number.isInteger(result.result)
        ? result.result.toString()
        : result.result.toFixed(6)
      : String(result.result);

  const formattedRate =
    typeof result.rate === "number"
      ? result.rate.toFixed(6)
      : String(result.rate);

  return (
    <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
      <Text style={[styles.fromText, { color: secondaryTextColor }]}>
        {result.amount} em {result.baseCode} equivale a
      </Text>

      <Text style={[styles.resultValue, { color: textColor }]}>
        {formattedResult} em {result.targetCode}
      </Text>

      <Text style={[styles.rateText, { color: secondaryTextColor }]}>
        Taxa de conversão utilizada: {formattedRate}
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={onClose}
        style={({ pressed }) => [
          styles.closeButton,
          { borderColor },
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={[styles.closeButtonText, { color: textColor }]}>
          Fechar
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  fromText: {
    fontSize: 16,
    marginBottom: 10,
  },
  resultValue: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  rateText: {
    fontSize: 14,
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.6,
  },
});
