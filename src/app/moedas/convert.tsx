import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "expo-router/react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/ThemedView";
import { CurrencyPickerModal } from "@/components/CurrencyPickerModal";
import { ConversionResultCard } from "@/components/ConversionResultCard";
import {
  convertCurrency,
  fetchSupportedCurrencies,
} from "@/services/currencyApi";
import { CurrencyInfo, ConversionResult } from "@/types/currency";

export default function ConvertScreen() {
  const theme = useTheme();
  const params = useLocalSearchParams<{ from?: string; to?: string }>();

  const isDark = theme.dark;
  const textColor = isDark ? "#ffffff" : "#111827";
  const secondaryTextColor = isDark ? "#d1d1d6" : "#666666";
  const borderColor = isDark ? "#48484a" : "#d1d5db";
  const backgroundColor = isDark ? "#1c1c1e" : "#f9fafb";
  const inputBg = isDark ? "#2c2c2e" : "#f3f4f6";

  const [currencies, setCurrencies] = useState<CurrencyInfo[]>([]);
  const [originCurrency, setOriginCurrency] = useState<CurrencyInfo>({
    code: "BRL",
    name: "Brazilian Real",
    symbol: "R$",
  });
  const [destCurrency, setDestCurrency] = useState<CurrencyInfo>({
    code: "USD",
    name: "United States Dollar",
    symbol: "$",
  });
  const [amount, setAmount] = useState<string>("100");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const [originModalVisible, setOriginModalVisible] = useState(false);
  const [destModalVisible, setDestModalVisible] = useState(false);

  useEffect(() => {
    async function loadCurrencies() {
      try {
        const list = await fetchSupportedCurrencies();
        setCurrencies(list);

        if (params.from) {
          const foundOrigin = list.find(
            (c) => c.code.toUpperCase() === params.from?.toUpperCase()
          );
          if (foundOrigin) setOriginCurrency(foundOrigin);
        }
        if (params.to) {
          const foundDest = list.find(
            (c) => c.code.toUpperCase() === params.to?.toUpperCase()
          );
          if (foundDest) setDestCurrency(foundDest);
        }
      } catch (err) {
        console.error("Erro ao carregar moedas no conversor:", err);
      }
    }

    loadCurrencies();
  }, [params.from, params.to]);

  const handleSwapCurrencies = () => {
    const temp = originCurrency;
    setOriginCurrency(destCurrency);
    setDestCurrency(temp);
    setResult(null);
  };

  const handleConvert = useCallback(async () => {
    Keyboard.dismiss();
    const cleanAmount = amount.replace(",", ".").trim();
    const numAmount = parseFloat(cleanAmount);

    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert("Valor Inválido", "Por favor, digite um valor numérico maior que zero.");
      return;
    }

    setLoading(true);
    try {
      const conversionData = await convertCurrency(
        originCurrency.code,
        destCurrency.code,
        numAmount
      );
      setResult(conversionData);
    } catch (err: any) {
      Alert.alert(
        "Erro na Conversão",
        err.message || "Não foi possível realizar a conversão no momento."
      );
    } finally {
      setLoading(false);
    }
  }, [amount, originCurrency.code, destCurrency.code]);

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: textColor }]}>
              Converter Moeda
            </Text>
            <Text style={[styles.subtitle, { color: secondaryTextColor }]}>
              Selecione as moedas e digite o valor desejado
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: secondaryTextColor }]}>
              Moeda Origem *
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setOriginModalVisible(true)}
              style={({ pressed }) => [
                styles.selectButton,
                { backgroundColor: inputBg, borderColor },
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.selectTextContainer}>
                <Text style={[styles.selectValue, { color: textColor }]}>
                  {originCurrency.name} ({originCurrency.code})
                </Text>
              </View>
              <Ionicons
                name="chevron-down"
                size={20}
                color={secondaryTextColor}
              />
            </Pressable>
          </View>

          <View style={styles.swapContainer}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Inverter moedas"
              onPress={handleSwapCurrencies}
              style={({ pressed }) => [
                styles.swapButton,
                { borderColor },
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="swap-vertical" size={20} color="#2f66e8" />
              <Text style={styles.swapText}>Inverter moedas</Text>
            </Pressable>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: secondaryTextColor }]}>
              Moeda Destino *
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setDestModalVisible(true)}
              style={({ pressed }) => [
                styles.selectButton,
                { backgroundColor: inputBg, borderColor },
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.selectTextContainer}>
                <Text style={[styles.selectValue, { color: textColor }]}>
                  {destCurrency.name} ({destCurrency.code})
                </Text>
              </View>
              <Ionicons
                name="chevron-down"
                size={20}
                color={secondaryTextColor}
              />
            </Pressable>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: secondaryTextColor }]}>
              Valor *
            </Text>
            <View
              style={[
                styles.amountContainer,
                { backgroundColor: inputBg, borderColor },
              ]}
            >
              <Text style={[styles.amountPrefix, { color: secondaryTextColor }]}>
                {originCurrency.code}
              </Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor={secondaryTextColor}
                style={[styles.amountInput, { color: textColor }]}
                returnKeyType="done"
                onSubmitEditing={handleConvert}
              />
              {amount ? (
                <Pressable onPress={() => setAmount("")}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={secondaryTextColor}
                  />
                </Pressable>
              ) : null}
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={handleConvert}
            disabled={loading}
            style={({ pressed }) => [
              styles.calcButton,
              pressed && styles.pressed,
              loading && styles.buttonDisabled,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.calcButtonText}>Calcular Conversão</Text>
            )}
          </Pressable>

          {result && (
            <ConversionResultCard
              result={result}
              onClose={() => setResult(null)}
            />
          )}

          <CurrencyPickerModal
            visible={originModalVisible}
            title="Selecionar Moeda Origem"
            currencies={currencies}
            selectedCode={originCurrency.code}
            onSelect={(cur) => setOriginCurrency(cur)}
            onClose={() => setOriginModalVisible(false)}
          />

          <CurrencyPickerModal
            visible={destModalVisible}
            title="Selecionar Moeda Destino"
            currencies={currencies}
            selectedCode={destCurrency.code}
            onSelect={(cur) => setDestCurrency(cur)}
            onClose={() => setDestModalVisible(false)}
          />
        </ScrollView>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selectTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  selectValue: {
    fontSize: 15,
    fontWeight: "500",
  },
  swapContainer: {
    alignItems: "center",
    marginVertical: 4,
  },
  swapButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  swapText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2f66e8",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 14,
    height: 48,
  },
  amountPrefix: {
    fontSize: 15,
    fontWeight: "700",
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  calcButton: {
    backgroundColor: "#2f66e8",
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#1d4ed8",
  },
  calcButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.75,
  },
});
