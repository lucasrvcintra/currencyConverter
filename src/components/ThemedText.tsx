import { Text, type TextProps } from "react-native";
import { useTheme } from "expo-router/react-navigation";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedTextProps) {
  const theme = useTheme();
  const color = theme.dark
    ? (darkColor ?? theme.colors.text)
    : (lightColor ?? theme.colors.text);

  return <Text style={[{ color }, style]} {...otherProps} />;
}
