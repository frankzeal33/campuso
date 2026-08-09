import AppScreenHeader from "@/components/AppScreenHeader";
import { images } from "@/constants";
import { useProfileStore } from "@/store/ProfileStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Share, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type ProfileTab = "Posts" | "Listings" | "Events" | "Saved";

const posts = [
  { id: "post-1", image: images.eventTech, text: "Had an amazing time at Campus Tech Week. So many brilliant student projects!", time: "2h", likes: 84, comments: 12 },
  { id: "post-2", image: images.featured4, text: "Looking for two more people to join our weekend study group.", time: "Yesterday", likes: 36, comments: 18 },
];

const listings = [
  { id: "listing-1", image: images.featured1, title: "Study desk", price: "₦18,000", status: "Available" },
  { id: "listing-2", image: images.featured3, title: "Laptop repair", price: "From ₦5,000", status: "Service" },
  { id: "listing-3", image: images.card2, title: "Shared apartment", price: "₦250k/year", status: "Housing" },
];

const events = [
  { id: "event-1", image: images.eventBusiness, title: "Student Business Meetup", date: "AUG 16", location: "Main Auditorium" },
  { id: "event-2", image: images.eventTech, title: "Campus Tech Week", date: "AUG 21", location: "Innovation Hub" },
  { id: "event-3", image: images.eventFootball, title: "Faculty Football Finals", date: "AUG 24", location: "Sports Complex" },
];

const saved = [
  { id: "saved-1", image: images.featured3, title: "Trusted campus services", note: "Service · Student Centre" },
  { id: "saved-2", image: images.card2, title: "Self-contained apartment", note: "Housing · South Gate" },
  { id: "saved-3", image: images.featured1, title: "Student marketplace deal", note: "Marketplace · Nearby" },
];

function ProfileHeader() {
  const profile = useProfileStore((state) => state.userProfile);
  const name = profile.fullName || "Oladapo Koiki";
  const username = profile.userName || "oladapokoiki";
  const avatar = profile.profilePicture ? { uri: profile.profilePicture } : { uri: "https://i.pravatar.cc/240?img=12" };

  return <View className="px-4 pb-5">
    <View className="flex-row items-center">
      <View className="rounded-full border-2 border-green bg-white p-0.5"><Image source={avatar} className="size-20 rounded-full" /></View>
      <View className="ml-4 flex-1">
        <View className="flex-row items-center"><Text className="font-mbold text-xl text-gray">{name}</Text><Ionicons name="checkmark-circle" size={17} color="#008751" className="ml-1" /></View>
        <Text className="mt-0.5 font-mregular text-[10px] text-gray-300">@{username}</Text>
        <Text className="mt-1 font-mmedium text-[10px] text-green">{profile.course || "Computer Science"} · {profile.level || "400L"}</Text>
      </View>
      <Pressable onPress={() => Share.share({ message: `Connect with ${name} (@${username}) on Campuso.` })} className="size-10 items-center justify-center rounded-full bg-gray-light"><Ionicons name="share-social-outline" size={19} color="#008751" /></Pressable>
    </View>
    <Text className="mt-4 font-mregular text-[11px] leading-4 text-gray">{profile.bio || "Building, learning and connecting across campus. Interested in technology, design and football."}</Text>
    <View className="mt-4 flex-row rounded-2xl bg-green-drawer py-4">
      {[{ value: "24", label: "Posts" }, { value: "368", label: "Connections" }, { value: "12", label: "Groups" }].map((stat, index) => <View key={stat.label} className={`flex-1 items-center ${index ? "border-l border-green-lighter" : ""}`}><Text className="font-mbold text-base text-gray">{stat.value}</Text><Text className="mt-0.5 font-mregular text-[8px] text-gray-300">{stat.label}</Text></View>)}
    </View>
    <View className="mt-3 flex-row gap-2">
      <Pressable onPress={() => router.push("/(protected)/(nodrawer)/EditProfile" as any)} className="flex-1 flex-row items-center justify-center rounded-xl bg-green py-3"><Ionicons name="create-outline" size={16} color="#fff" /><Text className="ml-2 font-msbold text-[11px] text-white">Edit profile</Text></Pressable>
      <Pressable onPress={() => router.push("/(protected)/(nodrawer)/DiscoverySettings" as any)} className="size-11 items-center justify-center rounded-xl border border-green"><Ionicons name="settings-outline" size={17} color="#008751" /></Pressable>
    </View>
  </View>;
}

function PostsTab() {
  return <View className="px-4 pt-3">{posts.map((post) => <Pressable key={post.id} className="mb-4 overflow-hidden rounded-2xl bg-gray-light">
    <View className="flex-row items-center p-3"><View className="size-9 items-center justify-center rounded-full bg-green"><Text className="font-msbold text-xs text-white">OD</Text></View><View className="ml-2 flex-1"><Text className="font-msbold text-xs text-gray">Oladapo Koiki</Text><Text className="font-mregular text-[8px] text-gray-300">{post.time} · University of Lagos</Text></View><Ionicons name="ellipsis-horizontal" size={18} color="#787878" /></View>
    <Image source={post.image} className="h-48 w-full" resizeMode="cover" />
    <View className="p-3"><Text className="font-mregular text-[11px] leading-4 text-gray">{post.text}</Text><View className="mt-3 flex-row items-center gap-4"><Text className="font-msbold text-[9px] text-gray-300"><Ionicons name="heart-outline" size={14} color="#787878" /> {post.likes}</Text><Text className="font-msbold text-[9px] text-gray-300"><Ionicons name="chatbubble-outline" size={13} color="#787878" /> {post.comments}</Text><Pressable onPress={() => Share.share({ message: `${post.text}\n\nShared from Campuso` })} className="flex-row items-center"><Ionicons name="share-social-outline" size={14} color="#787878" /><Text className="ml-1 font-msbold text-[9px] text-gray-300">Share</Text></Pressable><Pressable onPress={() => router.push({ pathname: "/(protected)/(nodrawer)/EditOwnedContent", params: { type: "post", title: post.text, detail: post.text } } as any)} className="ml-auto flex-row items-center"><Ionicons name="pencil-outline" size={12} color="#008751" /><Text className="ml-1 font-msbold text-[9px] text-green">Edit</Text></Pressable></View></View>
  </Pressable>)}</View>;
}

function ListingsTab() {
  return <View className="flex-row flex-wrap justify-between px-4 pt-3">{listings.map((item) => <Pressable key={item.id} onPress={() => router.push("/(protected)/(drawer)/(tabs)/MarketPlace" as any)} className="relative mb-3 w-[48.5%] overflow-hidden rounded-2xl bg-gray-light"><Image source={item.image} className="h-28 w-full" resizeMode="cover" /><Pressable onPress={(event) => { event.stopPropagation(); router.push({ pathname: "/(protected)/(nodrawer)/EditOwnedContent", params: { type: "listing", title: item.title } } as any); }} className="absolute right-2 top-2 flex-row items-center rounded-full bg-white px-2.5 py-1.5"><Ionicons name="pencil-outline" size={11} color="#008751" /><Text className="ml-1 font-msbold text-[8px] text-green">Edit</Text></Pressable><View className="p-3"><Text className="font-msbold text-xs text-gray" numberOfLines={1}>{item.title}</Text><Text className="mt-1 font-mregular text-[8px] text-gray-300">{item.status}</Text><Text className="mt-2 font-mbold text-xs text-green">{item.price}</Text></View></Pressable>)}</View>;
}

function EventsTab() {
  return <View className="px-4 pt-2">{events.map((item, index) => <Pressable key={item.id} onPress={() => router.push("/(protected)/(nodrawer)/EventDetails" as any)} className="flex-row items-center py-3"><Image source={item.image} className="size-20 rounded-xl" resizeMode="cover" /><View className={`ml-3 flex-1 pb-3 ${index === events.length - 1 ? "" : "border-b border-gray-100"}`}><Text className="font-msbold text-[9px] text-green">{item.date}</Text><Text className="mt-1 font-msbold text-sm text-gray">{item.title}</Text><Text className="mt-1 font-mregular text-[9px] text-gray-300"><Ionicons name="location-outline" size={11} color="#787878" /> {item.location}</Text><Pressable onPress={(event) => { event.stopPropagation(); router.push({ pathname: "/(protected)/(nodrawer)/EditOwnedContent", params: { type: "event", title: item.title, detail: item.location } } as any); }} className="mt-2 self-start flex-row items-center"><Ionicons name="pencil-outline" size={11} color="#008751" /><Text className="ml-1 font-msbold text-[8px] text-green">Edit</Text></Pressable></View><Ionicons name="chevron-forward" size={18} color="#C3C3C3" /></Pressable>)}</View>;
}

function SavedTab() {
  return <View className="px-4 pt-2">{saved.map((item, index) => <Pressable key={item.id} onPress={() => router.push("/(protected)/(nodrawer)/SavedItems" as any)} className="flex-row items-center py-3"><Image source={item.image} className="size-16 rounded-xl" resizeMode="cover" /><View className={`ml-3 flex-1 pb-3 ${index === saved.length - 1 ? "" : "border-b border-gray-100"}`}><Text className="font-msbold text-sm text-gray">{item.title}</Text><Text className="mt-1 font-mregular text-[10px] text-gray-300">{item.note}</Text><Text className="mt-2 font-msbold text-[9px] text-green">View saved item</Text></View><Ionicons name="chevron-forward" size={18} color="#C3C3C3" /></Pressable>)}</View>;
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<ProfileTab>("Posts");
  const tabs: { name: ProfileTab; icon: keyof typeof Ionicons.glyphMap }[] = [
    { name: "Posts", icon: "newspaper-outline" },
    { name: "Listings", icon: "pricetag-outline" },
    { name: "Events", icon: "calendar-outline" },
    { name: "Saved", icon: "bookmark-outline" },
  ];

  return <SafeAreaView className="flex-1 bg-white">
    <AppScreenHeader title="Profile" subtitle="Your campus identity and activity" back />
    <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]} contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
      <ProfileHeader />
      <View className="bg-white py-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
          {tabs.map((tab) => {
            const active = activeTab === tab.name;
            return <Pressable key={tab.name} onPress={() => setActiveTab(tab.name)} className={`flex-row items-center rounded-full px-4 py-2.5 ${active ? "bg-green" : "bg-gray-light"}`}><Ionicons name={tab.icon} size={14} color={active ? "#fff" : "#787878"} /><Text className={`ml-1.5 font-msbold text-[10px] ${active ? "text-white" : "text-gray-300"}`}>{tab.name}</Text></Pressable>;
          })}
        </ScrollView>
      </View>
      {activeTab === "Posts" ? <PostsTab /> : activeTab === "Listings" ? <ListingsTab /> : activeTab === "Events" ? <EventsTab /> : <SavedTab />}
    </ScrollView>
  </SafeAreaView>;
}
