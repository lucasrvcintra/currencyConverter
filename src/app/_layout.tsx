import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : DefaultTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={theme}>
          <FavoritesProvider>
            <StatusBar style="auto" />
            <Drawer
              screenOptions={{
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
                },
                headerTintColor: isDark ? "#ffffff" : "#171717",
                drawerActiveTintColor: "#2f66e8",
                drawerInactiveTintColor: isDark ? "#d1d1d6" : "#555555",
                drawerActiveBackgroundColor: isDark ? "#2c2c2e" : "#e5edff",
                drawerStyle: {
                  backgroundColor: isDark ? "#1c1c1e" : "#ffffff",
                  width: 280,
                },
                drawerLabelStyle: {
                  fontSize: 14,
                  fontWeight: "600",
                  marginLeft: -8,
                },
                drawerItemStyle: {
                  borderRadius: 8,
                  marginHorizontal: 10,
                  marginVertical: 4,
                },
              }}
            >
              <Drawer.Screen
                name="index"
                options={{
                  title: "Início",
                  drawerLabel: "Início",
                  headerTitle: "Conversor de Moedas",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons
                      name="home-outline"
                      size={size}
                      color={typeof color === "string" ? color : undefined}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="moedas"
                options={{
                  title: "Moedas",
                  drawerLabel: "Moedas",
                  headerTitle: "Moedas & Câmbio",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons
                      name="cash-outline"
                      size={size}
                      color={typeof color === "string" ? color : undefined}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="about"
                options={{
                  title: "Sobre",
                  drawerLabel: "Sobre",
                  headerTitle: "Sobre o App",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons
                      name="information-circle-outline"
                      size={size}
                      color={typeof color === "string" ? color : undefined}
                    />
                  ),
                }}
              />
            </Drawer>
          </FavoritesProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
