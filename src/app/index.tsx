import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "expo-router/react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  const isDark = theme.dark;
  const textColor = isDark ? "#ffffff" : "#171717";
  const secondaryTextColor = isDark ? "#d1d1d6" : "#666666";
  const cardBg = isDark ? "#2c2c2e" : "#ffffff";
  const borderColor = isDark ? "#48484a" : "#e5e5e5";
  const backgroundColor = isDark ? "#1c1c1e" : "#f5f5f7";

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.heroCard, { backgroundColor: "#2f66e8" }]}>
            <View style={styles.heroIconContainer}>
              <Ionicons name="cash-outline" size={36} color="#ffffff" />
            </View>
            <Text style={styles.heroTitle}>Conversor de Moedas</Text>
            <Text style={styles.heroSubtitle}>
              Cotações em tempo real e conversão instantânea integrada à
              ExchangeRate-API.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Objetivo do App
            </Text>
            <Text style={[styles.bodyText, { color: secondaryTextColor }]}>
              Este aplicativo foi desenvolvido para atender ao desafio prático
              de Desenvolvimento Mobile da faculdade UniAcademia.
            </Text>
            <Text style={[styles.bodyText, { color: secondaryTextColor }]}>
              Ele permite aos usuários explorar cotações de moedas do mundo
              todo, favoritar suas moedas mais utilizadas com persistência local
              e realizar cálculos de câmbio precisos com apenas alguns toques.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Navegação e Funcionalidades
            </Text>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: isDark ? "#1e3a5f" : "#e5edff" }]}>
                <Ionicons name="list" size={20} color="#2f66e8" />
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: textColor }]}>
                  Listagem de Moedas
                </Text>
                <Text style={[styles.featureDesc, { color: secondaryTextColor }]}>
                  Consulte mais de 160 moedas suportadas com busca em tempo real.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: isDark ? "#3f3014" : "#fef3c7" }]}>
                <Ionicons name="star" size={20} color="#f59e0b" />
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: textColor }]}>
                  Moedas Favoritas
                </Text>
                <Text style={[styles.featureDesc, { color: secondaryTextColor }]}>
                  Marque e acesse rapidamente as moedas que você mais utiliza.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: isDark ? "#123a2a" : "#dcfce7" }]}>
                <Ionicons name="swap-horizontal" size={20} color="#10b981" />
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: textColor }]}>
                  Calculadora de Câmbio
                </Text>
                <Text style={[styles.featureDesc, { color: secondaryTextColor }]}>
                  Simule conversões exatas entre pares de moedas com taxas atualizadas.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/moedas/convert")}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Ionicons name="swap-horizontal" size={18} color="#ffffff" />
              <Text style={styles.primaryButtonText}>CONVERTER AGORA</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/moedas")}
              style={({ pressed }) => [
                styles.secondaryButton,
                { borderColor },
                pressed && styles.buttonPressed,
              ]}
            >
              <Ionicons name="list-outline" size={18} color={textColor} />
              <Text style={[styles.secondaryButtonText, { color: textColor }]}>
                VER TODAS AS MOEDAS
              </Text>
            </Pressable>
          </View>
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
    padding: 16,
    paddingBottom: 32,
  },
  heroCard: {
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
  },
  heroIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
    textAlign: "center",
  },
  heroSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  featureIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  actionButtons: {
    gap: 10,
    marginTop: 4,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2f66e8",
    borderRadius: 10,
    paddingVertical: 14,
    gap: 8,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 14,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  buttonPressed: {
    opacity: 0.75,
  },
});
