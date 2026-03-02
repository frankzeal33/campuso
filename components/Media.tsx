import { useSkeletonCommonProps } from '@/utils/SkeletonProps';
import { router } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, Text, View } from 'react-native';
const width = Dimensions.get("window").width

const blogs = [
  {
    id: 1,
    title: "Top 10 Restaurants You Should Try This Weekend",
    slug: "top-10-restaurants-weekend",
    excerpt: "Discover the best restaurants around you offering delicious meals and great ambience.",
    content: "Looking for where to eat this weekend? We’ve curated a list of the top 10 restaurants offering amazing meals, cozy environments, and great service. From local delicacies to international cuisine, there’s something for everyone...",
    author: "Admin",
    category: "Food",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    readTime: "5 min read",
    publishedAt: "2026-03-01"
  },
   {
    id: 2,
    title: "Why Shopping Local Markets is a Smart Choice",
    slug: "why-shop-local-markets",
    excerpt: "Support local vendors while getting fresher and more affordable products.",
    content: "Shopping at local markets not only helps small businesses grow but also gives you access to fresher produce at better prices. You also build relationships within your community...",
    author: "Community Desk",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80",
    readTime: "6 min read",
    publishedAt: "2026-02-20"
  },
  {
    id: 3,
    title: "Upcoming Events You Shouldn’t Miss",
    slug: "upcoming-events-2026",
    excerpt: "Check out exciting concerts, festivals, and business events happening near you.",
    content: "2026 is packed with exciting events ranging from music concerts to business expos. Don’t miss out on networking opportunities, entertainment, and unforgettable experiences...",
    author: "Events Team",
    category: "Events",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    readTime: "3 min read",
    publishedAt: "2026-02-18"
  },
  {
    id: 4,
    title: "How to Save Money on Your Monthly Bills",
    slug: "save-money-monthly-bills",
    excerpt: "Smart tips to reduce your electricity, water, and subscription costs.",
    content: "Managing monthly bills can be stressful, but with the right strategy, you can significantly cut down expenses. Start by reviewing your subscriptions, switching to energy-efficient appliances, and tracking your spending habits...",
    author: "Finance Team",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    readTime: "4 min read",
    publishedAt: "2026-02-25"
  }
]

const Media = () => {

  const [loading, setLoading] = useState(false)
  const skeletonProps = useSkeletonCommonProps();
  const dummy = new Array(4).fill(null)

  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false)

    
  const gotToVendorProduct = (id: string) => {
    router.push({
      pathname: "/(protected)/(routes)/NaijaShopVendorProducts",
      params: { id }
    });
  }

  return (
    <View className='py-2'>
      <View className='w-full px-4 pb-2 flex-row items-center justify-between gap-1'>
        <Text className='font-msbold text-base'>Media, News & Content</Text>
        <Pressable onPress={() => router.push("/(protected)/(drawer)/(tabs)/Home")}>
            <Text className='font-msbold text-green text-base'>View All</Text>
        </Pressable>
      </View>
      {loading ? (
        <FlatList
          data={dummy}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View className="w-3" />}
          renderItem={({ item }) => (
          <View className='w-44'>
            <Skeleton.Group show={loading}>
              <Skeleton height={230} width={"100%"} radius={12} {...skeletonProps} />
            </Skeleton.Group>
          </View>
          )}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        />
    ) : (
      <FlatList
        nestedScrollEnabled={true}
        horizontal
        scrollEnabled={true}
        data={blogs}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
            <Pressable className='w-44 gap-1'>
                <View className="bg-gray-50 size-44 rounded-xl items-center justify-center overflow-hidden">
                    <Image
                        style={{width: "100%", height: "100%" }}
                        source={{uri: item?.image}}
                        resizeMode="cover"
                    />
                </View>
                <View className="items-start gap-1">
                    <Text className="font-mbold text-sm" numberOfLines={2}>{item?.title}</Text>
                    <Text className="font-mmedium text-xs text-gray-300" numberOfLines={2}>{item.excerpt}</Text>
                </View>
            </Pressable>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center px-2 py-8 bg-gray-50 rounded-md" style={{width: width - 24}}>
            <Text className="text-xl font-extrabold">
                No Events Yet
            </Text>
            <Text className="text-sm text-center mt-1">
                Latest events will show here.
            </Text>
          </View>
        )}
      />
    )}
    </View>
  )
}

export default Media
