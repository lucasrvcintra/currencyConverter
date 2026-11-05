import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "expo-router/react-navigation";

export default function MoedasTabsLayout() {
  const theme = useTheme();
  const barColor = theme.dark ? "#1c1c1e" : "#ffffff";
  const borderColor = theme.dark ? "#48484a" : "#e5e5e5";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2f66e8",
        tabBarInactiveTintColor: theme.dark ? "#d1d1d6" : "#777777",
        tabBarStyle: {
          backgroundColor: barColor,
          borderTopColor: borderColor,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Moedas",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              size={22}
              color={typeof color === "string" ? color : undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritas",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "star" : "star-outline"}
              size={22}
              color={focused ? "#f59e0b" : typeof color === "string" ? color : undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="convert"
        options={{
          title: "Converter",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "swap-horizontal" : "swap-horizontal-outline"}
              size={22}
              color={typeof color === "string" ? color : undefined}
            />
          ),
        }}
      />
    </Tabs>
  );
}
