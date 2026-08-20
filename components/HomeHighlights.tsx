import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const quickActions = [
  {
    label: "Pay bills",
    icon: "receipt-outline",
    family: "ionicons",
    color: "#2563A9",
    background: "#E8F1FF",
    route: "/(protected)/(nodrawer)/Bills",
  },
  {
    label: "Fund wallet",
    icon: "wallet-outline",
    family: "ionicons",
    color: "#008751",
    background: "#E4FFE5",
    route: "/(protected)/(nodrawer)/FundWallet",
  },
  {
    label: "Find housing",
    icon: "home-city-outline",
    family: "material",
    color: "#9A6200",
    background: "#FFF0CD",
    route: "/(protected)/(nodrawer)/FindCategory?category=Apartments",
  },
  {
    label: "Safety",
    icon: "shield-checkmark",
    family: "ionicons",
    color: "#C24141",
    background: "#FFE8E8",
    route: "/(protected)/(nodrawer)/CampusSafety",
  },
  {
    label: "Create post",
    icon: "add-circle-outline",
    family: "ionicons",
    color: "#7C3FB0",
    background: "#F2E9FF",
    route: "/(protected)/(nodrawer)/AnonymousHelpForm",
  },
];

const nearby = [
  {
    title: "FreshBite Kitchen",
    note: "Open · 4 min away",
    icon: "restaurant-outline",
    route: "/(protected)/(nodrawer)/Restaurants",
  },
  {
    title: "Campus Bookshop",
    note: "Open · Student Centre",
    icon: "storefront-outline",
    route: "/(protected)/(nodrawer)/Shops",
  },
  {
    title: "Tech repair desk",
    note: "Available · 7 min away",
    icon: "construct-outline",
    route: "/(protected)/(nodrawer)/Services",
  },
];

const recent = [
  {
    title: "Self-contained apartment",
    note: "Viewed in Find",
    icon: "home-outline",
    route: "/(protected)/(drawer)/(student-tabs)/Find",
  },
  {
    title: "ICT CDS",
    note: "Recent conversation",
    icon: "chatbubble-outline",
    route: "/(protected)/(nodrawer)/Chats",
  },
  {
    title: "Campus market deals",
    note: "Viewed in Marketplace",
    icon: "bag-outline",
    route: "/(protected)/(drawer)/(student-tabs)/MarketPlace",
  },
];

const go = (route: string) => router.push(route as any);

type LiveWeather = {
  temperature: number;
  feelsLike: number;
  rainChance: number;
  weatherCode: number;
  place: string;
};

const weatherDetails = (code: number) => {
  if (code === 0)
    return {
      label: "Clear sky",
      icon: "sunny-outline" as const,
      advice: "Bright outside · Stay hydrated",
    };
  if (code <= 3)
    return {
      label: "Partly cloudy",
      icon: "partly-sunny-outline" as const,
      advice: "Good conditions for getting around",
    };
  if (code === 45 || code === 48)
    return {
      label: "Foggy",
      icon: "cloud-outline" as const,
      advice: "Visibility may be reduced",
    };
  if (code >= 51 && code <= 67)
    return {
      label: "Rainy",
      icon: "rainy-outline" as const,
      advice: "Take an umbrella to lectures",
    };
  if (code >= 71 && code <= 77)
    return {
      label: "Snowy",
      icon: "snow-outline" as const,
      advice: "Dress warmly outdoors",
    };
  if (code >= 80 && code <= 82)
    return {
      label: "Rain showers",
      icon: "rainy-outline" as const,
      advice: "Keep an umbrella nearby",
    };
  if (code >= 95)
    return {
      label: "Thunderstorm",
      icon: "thunderstorm-outline" as const,
      advice: "Stay indoors where possible",
    };
  return {
    label: "Cloudy",
    icon: "cloud-outline" as const,
    advice: "Check conditions before heading out",
  };
};

function LiveWeatherCard() {
  const [weather, setWeather] = useState<LiveWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWeather = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        setError("Allow location to see live campus weather");
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = position.coords;
      const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code&daily=precipitation_probability_max&timezone=auto&forecast_days=1`;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Weather request failed");
      const data = await response.json();
      const places = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const location = places[0];
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        feelsLike: Math.round(data.current.apparent_temperature),
        rainChance: Math.round(
          data.daily.precipitation_probability_max[0] ?? 0,
        ),
        weatherCode: data.current.weather_code,
        place:
          location?.district ||
          location?.city ||
          location?.subregion ||
          "Current location",
      });
    } catch {
      setError("Live weather is unavailable right now");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const details = weatherDetails(weather?.weatherCode ?? 0);
  return (
    <View className="px-4 pb-3 pt-1">
      <View className="flex-row items-center rounded-2xl bg-[#E8F1FF] p-4">
        <View className="size-12 items-center justify-center rounded-full bg-white">
          {loading ? (
            <ActivityIndicator size="small" color="#2563A9" />
          ) : (
            <Ionicons
              name={weather ? details.icon : "cloud-offline-outline"}
              size={25}
              color={weather ? "#E29B18" : "#787878"}
            />
          )}
        </View>
        <View className="ml-3 flex-1">
          {weather ? (
            <>
              <Text className="font-mbold text-sm text-gray">
                {weather.temperature}° · {details.label}
              </Text>
              <Text className="mt-1 font-mregular text-[9px] text-gray-300">
                {details.advice} · Feels like {weather.feelsLike}°
              </Text>
            </>
          ) : (
            <>
              <Text className="font-mbold text-sm text-gray">
                {loading ? "Getting live weather…" : "Weather unavailable"}
              </Text>
              <Text className="mt-1 font-mregular text-[9px] text-gray-300">
                {error || "Using your current location"}
              </Text>
            </>
          )}
        </View>
        {weather ? (
          <Pressable onPress={loadWeather} className="items-end">
            <Text
              className="font-msbold text-[9px] uppercase text-[#2563A9]"
              numberOfLines={1}
            >
              {weather.place}
            </Text>
            <Text className="mt-1 font-mregular text-[8px] text-gray-300">
              Rain {weather.rainChance}% · Refresh
            </Text>
          </Pressable>
        ) : !loading ? (
          <Pressable
            onPress={loadWeather}
            className="rounded-full bg-white px-3 py-2"
          >
            <Text className="font-msbold text-[9px] text-[#2563A9]">Retry</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

function SectionTitle({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View className="mb-3 flex-row items-center justify-between px-4">
      <Text className="font-msbold text-base text-gray">{title}</Text>
      {action ? (
        <Pressable onPress={onPress}>
          <Text className="font-msbold text-[10px] text-green">{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export default function HomeHighlights({
  afterToday,
  beforeNearby,
}: {
  afterToday?: ReactNode;
  beforeNearby?: ReactNode;
}) {
  return (
    <View>
      <View className="px-4 pb-3 pt-2">
        <View className="rounded-2xl bg-green-drawer p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="size-10 items-center justify-center rounded-full bg-white">
                <Ionicons name="calendar-outline" size={20} color="#008751" />
              </View>
              <View className="ml-3">
                <Text className="font-mbold text-sm text-gray">
                  Today on campus
                </Text>
                <Text className="mt-0.5 font-mregular text-[9px] text-gray-300">
                  Monday · Your day at a glance
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => go("/(protected)/(nodrawer)/CampusPlanner")}
            >
              <Ionicons name="arrow-forward-circle" size={23} color="#008751" />
            </Pressable>
          </View>
          <View className="mt-4 flex-row gap-2">
            <View className="flex-1 rounded-xl bg-white p-3">
              <Text className="font-msbold text-[9px] text-green">
                10:00 AM
              </Text>
              <Text className="mt-1 font-msbold text-[11px] text-gray">
                CSC 412
              </Text>
              <Text className="mt-0.5 font-mregular text-[8px] text-gray-300">
                LT 2 · Next class
              </Text>
            </View>
            <View className="flex-1 rounded-xl bg-white p-3">
              <Text className="font-msbold text-[9px] text-[#9A6200]">
                DUE TODAY
              </Text>
              <Text className="mt-1 font-msbold text-[11px] text-gray">
                Project outline
              </Text>
              <Text className="mt-0.5 font-mregular text-[8px] text-gray-300">
                Submit before 6 PM
              </Text>
            </View>
          </View>
        </View>
      </View>

      {afterToday}

      <View className="py-2">
        <SectionTitle title="Quick actions" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}
        >
          {quickActions.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => go(item.route)}
              className="w-[82px] items-center rounded-2xl p-3"
              style={{ backgroundColor: item.background }}
            >
              <View className="size-10 items-center justify-center rounded-full bg-white">
                {item.family === "material" ? (
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={20}
                    color={item.color}
                  />
                ) : (
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={item.color}
                  />
                )}
              </View>
              <Text
                className="mt-2 text-center font-msbold text-[9px] text-gray"
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View className="px-4 py-4">
        <Pressable
          onPress={() => go("/(protected)/(nodrawer)/CampusNews")}
          className="flex-row items-center rounded-2xl bg-[#E8F1FF] p-4"
        >
          <View className="size-11 items-center justify-center rounded-full bg-white">
            <Ionicons name="megaphone-outline" size={21} color="#2563A9" />
          </View>
          <View className="ml-3 flex-1">
            <View className="flex-row items-center">
              <Text className="font-mbold text-sm text-gray">
                Latest announcement
              </Text>
              <View className="ml-2 size-2 rounded-full bg-red-500" />
            </View>
            <Text
              className="mt-1 font-mregular text-[9px] leading-3 text-gray-300"
              numberOfLines={2}
            >
              Course registration closes Friday. Confirm your registered courses
              before the deadline.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={19} color="#2563A9" />
        </Pressable>
      </View>

      <View className="py-2">
        <SectionTitle
          title="Campus pulse"
          action="Join conversation"
          onPress={() => go("/(protected)/(nodrawer)/AnonymousHelp")}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}
        >
          <Pressable
            onPress={() => go("/(protected)/(nodrawer)/AnonymousHelp")}
            className="w-56 rounded-2xl bg-[#F2E9FF] p-4"
          >
            <Text className="font-msbold text-[9px] text-[#7C3FB0]">
              TRENDING · 42 REPLIES
            </Text>
            <Text className="mt-2 font-msbold text-sm leading-5 text-gray">
              How are you preparing for second semester exams?
            </Text>
            <Text className="mt-3 font-mregular text-[9px] text-gray-300">
              Anonymous Campus Help
            </Text>
          </Pressable>
          <Pressable
            onPress={() => go("/(protected)/(nodrawer)/Events")}
            className="w-56 rounded-2xl bg-yellow-light p-4"
          >
            <Text className="font-msbold text-[9px] text-[#9A6200]">
              POPULAR THIS WEEK
            </Text>
            <Text className="mt-2 font-msbold text-sm leading-5 text-gray">
              Tech Week registrations are now open
            </Text>
            <Text className="mt-3 font-mregular text-[9px] text-gray-300">
              238 students interested
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      {beforeNearby}

      <View className="py-4">
        <SectionTitle
          title="Nearby now"
          action="Explore all"
          onPress={() => go("/(protected)/(drawer)/(student-tabs)/Find")}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}
        >
          {nearby.map((item, index) => (
            <Pressable
              key={item.title}
              onPress={() => go(item.route)}
              className={`w-48 rounded-2xl p-4 ${index === 0 ? "bg-green-drawer" : index === 1 ? "bg-yellow-light" : "bg-[#E8F1FF]"}`}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color={
                  index === 0 ? "#008751" : index === 1 ? "#9A6200" : "#2563A9"
                }
              />
              <Text className="mt-4 font-msbold text-xs text-gray">
                {item.title}
              </Text>
              <Text className="mt-1 font-mregular text-[9px] text-gray-300">
                {item.note}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View className="px-4 py-2">
        <Pressable
          onPress={() => go("/(protected)/(drawer)/(student-tabs)/MarketPlace")}
          className="overflow-hidden rounded-2xl bg-green p-5"
        >
          <View className="absolute -right-5 -top-6 size-28 rounded-full bg-yellow/20" />
          <View className="flex-row items-center justify-between">
            <View className="rounded-full bg-yellow px-3 py-1.5">
              <Text className="font-mbold text-[8px] text-gray">
                DAILY STUDENT DEAL
              </Text>
            </View>
            <Ionicons name="flash" size={22} color="#FEC844" />
          </View>
          <Text className="mt-4 font-mbold text-lg text-white">
            20% off lunch combos
          </Text>
          <Text className="mt-1 font-mregular text-[10px] text-white/70">
            Today only at selected campus restaurants
          </Text>
          <View className="mt-4 self-start flex-row items-center rounded-full bg-white px-3 py-2">
            <Text className="font-msbold text-[9px] text-green">View deal</Text>
            <Ionicons
              name="arrow-forward"
              size={12}
              color="#008751"
              className="ml-1"
            />
          </View>
        </Pressable>
      </View>

      <View className="py-4">
        <SectionTitle title="Continue where you stopped" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}
        >
          {recent.map((item) => (
            <Pressable
              key={item.title}
              onPress={() => go(item.route)}
              className="w-52 flex-row items-center rounded-2xl bg-gray-light p-3"
            >
              <View className="size-10 items-center justify-center rounded-full bg-white">
                <Ionicons name={item.icon as any} size={19} color="#008751" />
              </View>
              <View className="ml-3 flex-1">
                <Text
                  className="font-msbold text-[11px] text-gray"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text className="mt-1 font-mregular text-[8px] text-gray-300">
                  {item.note}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <LiveWeatherCard />
    </View>
  );
}
