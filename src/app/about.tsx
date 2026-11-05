import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "expo-router/react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";

export default function AboutScreen() {
  const router = useRouter();
  const theme = useTheme();

  const isDark = theme.dark;
  const textColor = isDark ? "#ffffff" : "#171717";
  const secondaryTextColor = isDark ? "#d1d1d6" : "#555555";
  const borderColor = isDark ? "#48484a" : "#e5e5e5";
  const backgroundColor = isDark ? "#1c1c1e" : "#f5f5f7";
  const cardBg = isDark ? "#2c2c2e" : "#ffffff";

  function handleBack() {
    router.navigate("/moedas");
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.infoArea}>
            <View style={styles.iconContainer}>
              <Ionicons name="cash" size={64} color="#2f66e8" />
            </View>

            <Text style={[styles.appTitle, { color: textColor }]}>
              Conversor de Moedas
            </Text>
            <Text style={[styles.appVersion, { color: secondaryTextColor }]}>
              Versão 1.0.0 • Trabalho Acadêmico
            </Text>

            <View style={[styles.divider, { backgroundColor: borderColor }]} />

            <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
              <Text style={[styles.cardTitle, { color: textColor }]}>
                Sobre o Projeto
              </Text>
              <Text style={[styles.description, { color: secondaryTextColor }]}>
                Aplicativo móvel desenvolvido para praticar arquitetura e
                padrões modernos no React Native com Expo Router:
              </Text>

              <View style={styles.list}>
                <Text style={[styles.listItem, { color: secondaryTextColor }]}>
                  • **Drawer Navigation** na raiz (Início, Moedas, Sobre)
                </Text>
                <Text style={[styles.listItem, { color: secondaryTextColor }]}>
                  • **Bottom Tabs Navigation** no grupo Moedas (Moedas, Favoritas, Converter)
                </Text>
                <Text style={[styles.listItem, { color: secondaryTextColor }]}>
                  • Integração com a **ExchangeRate-API** para cotações em tempo real
                </Text>
                <Text style={[styles.listItem, { color: secondaryTextColor }]}>
                  • Persistência local de favoritos via **AsyncStorage**
                </Text>
                <Text style={[styles.listItem, { color: secondaryTextColor }]}>
                  • Suporte dinâmico a temas **Claro (Light)** e **Escuro (Dark)**
                </Text>
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
              <Text style={[styles.cardTitle, { color: textColor }]}>
                Desenvolvimento
              </Text>
              <Text style={[styles.infoRow, { color: secondaryTextColor }]}>
                <Text style={[styles.bold, { color: textColor }]}>Instituição: </Text>
                UniAcademia
              </Text>
              <Text style={[styles.infoRow, { color: secondaryTextColor }]}>
                <Text style={[styles.bold, { color: textColor }]}>Disciplina: </Text>
                Desenvolvimento Mobile
              </Text>
              <Text style={[styles.infoRow, { color: secondaryTextColor }]}>
                <Text style={[styles.bold, { color: textColor }]}>Aluno: </Text>
                Lucas Cintra
              </Text>
              <Text style={[styles.infoRow, { color: secondaryTextColor }]}>
                <Text style={[styles.bold, { color: textColor }]}>Stack: </Text>
                Expo SDK 58, React 19, TypeScript
              </Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={handleBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.backButtonText}>VOLTAR PARA MOEDAS</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  infoArea: {
    alignItems: "center",
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(47, 102, 232, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 13,
    marginBottom: 20,
  },
  divider: {
    width: "100%",
    height: 1,
    marginBottom: 20,
  },
  card: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  list: {
    marginTop: 4,
    gap: 6,
  },
  listItem: {
    fontSize: 13,
    lineHeight: 18,
  },
  infoRow: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "600",
  },
  backButton: {
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "#2f66e8",
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 10,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.75,
  },
});
