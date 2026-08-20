import { images } from "@/constants";
import { useAuthStore } from "@/store/AuthStore";
import { useAppModeStore } from "@/store/AppModeStore";
import { useProfileStore } from "@/store/ProfileStore";
import useWalletStore from "@/store/WalletStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function App() {
  const { login, logout, isLoading, setLoading, isAuthenticated } =
    useAuthStore((state) => state);
  const setProfile = useProfileStore((state) => state.setProfile);
  const setHideWallet = useWalletStore((state) => state.setHideWallet);
  const mode = useAppModeStore((state) => state.mode);
  const modeHasHydrated = useAppModeStore((state) => state.hasHydrated);

  useEffect(() => {
    const getData = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("accessToken");
        const userProfile = await AsyncStorage.getItem("userProfile");
        const hideStatus = await AsyncStorage.getItem("hideBalance");
        const user = userProfile ? JSON.parse(userProfile) : null;

        if (storedToken) {
          if (user) {
            setProfile(user);
          }
          login(storedToken);
          setHideWallet(hideStatus);
        } else {
          logout();
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [login, logout, setHideWallet, setLoading, setProfile]);

  if (isLoading || !modeHasHydrated) {
    return (
      <View className="flex-1 justify-center items-center bg-blue">
        <StatusBar backgroundColor="#003366" style="light" />
        <View className="items-center justify-center">
          <Image
            source={images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          {/* <Text className="text-white font-mbold text-3xl mt-1">Buzzycash</Text> */}
        </View>
      </View>
    );
  }

  return (
    <Redirect
      href={
        isAuthenticated
          ? mode === "provider"
            ? "/(protected)/(drawer)/(provider-tabs)/Dashboard"
            : "/(protected)/(drawer)/(student-tabs)/Home"
          : "/(auth)"
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 140,
    height: 150,
  },
});
