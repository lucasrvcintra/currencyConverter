import React, { useState, useMemo } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "expo-router/react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { CurrencyInfo } from "@/types/currency";

type CurrencyPickerModalProps = {
  visible: boolean;
  title: string;
  currencies: CurrencyInfo[];
  selectedCode: string;
  onSelect: (currency: CurrencyInfo) => void;
  onClose: () => void;
};

export function CurrencyPickerModal({
  visible,
  title,
  currencies,
  selectedCode,
  onSelect,
  onClose,
}: CurrencyPickerModalProps) {
  const theme = useTheme();
  const [search, setSearch] = useState("");

  const modalBg = theme.dark ? "#1c1c1e" : "#ffffff";
  const itemBg = theme.dark ? "#2c2c2e" : "#f8f9fa";
  const textColor = theme.dark ? "#ffffff" : "#171717";
  const secondaryTextColor = theme.dark ? "#d1d1d6" : "#666666";
  const borderColor = theme.dark ? "#48484a" : "#e5e5e5";
  const inputBg = theme.dark ? "#2c2c2e" : "#f1f3f5";

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
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: modalBg }]}>
        <View style={[styles.header, { borderBottomColor: borderColor }]}>
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fechar"
            onPress={onClose}
            style={({ pressed }) => [
              styles.closeBtn,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="close" size={24} color={textColor} />
          </Pressable>
        </View>

        <View style={styles.searchContainer}>
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

        <FlatList
          data={filteredCurrencies}
          keyExtractor={(item) => item.code}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isSelected = item.code === selectedCode;
            return (
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  onSelect(item);
                  onClose();
                  setSearch("");
                }}
                style={({ pressed }) => [
                  styles.item,
                  {
                    backgroundColor: isSelected
                      ? theme.dark
                        ? "#1e3a5f"
                        : "#e5edff"
                      : itemBg,
                    borderColor: isSelected ? "#2f66e8" : borderColor,
                  },
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.itemBadge}>
                  <Text style={styles.itemCode}>{item.code}</Text>
                </View>
                <View style={styles.itemTextContainer}>
                  <Text style={[styles.itemName, { color: textColor }]}>
                    {item.name}
                  </Text>
                  {item.symbol ? (
                    <Text
                      style={[styles.itemSymbol, { color: secondaryTextColor }]}
                    >
                      {item.symbol}
                    </Text>
                  ) : null}
                </View>
                {isSelected && (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color="#2f66e8"
                  />
                )}
              </Pressable>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: secondaryTextColor }]}>
                {`Nenhuma moeda encontrada para "${search}"`}
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  closeBtn: {
    padding: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    fontSize: 15,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  itemBadge: {
    backgroundColor: "#2f66e8",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 12,
    minWidth: 48,
    alignItems: "center",
  },
  itemCode: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "600",
  },
  itemSymbol: {
    fontSize: 12,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
  },
});
