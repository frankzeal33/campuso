import { useThemeStore } from "@/store/ThemeStore";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  const { theme } = useThemeStore();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="Register" />
        <Stack.Screen name="Login" />
      </Stack>

      <StatusBar
        style={theme.dark ? "light" : "dark"}
        backgroundColor={theme.colors.background}
      />
    </>
  );
};

export default AuthLayout;
