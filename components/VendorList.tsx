import { useSkeletonCommonProps } from '@/utils/SkeletonProps';
import { router } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, Text, View } from 'react-native';
const width = Dimensions.get("window").width

type vendorType = {
  id: string;
  name: string;
  logo: string;
}

let hasFetched = false;
let cachedVendors: vendorType[] = [];

const vendors: vendorType[] = [
  {
    id: "ven_001",
    name: "Dangote Group",
    logo: "https://logo.clearbit.com/dangote.com"
  },
  {
    id: "ven_002",
    name: "GTBank",
    logo: "https://logo.clearbit.com/gtbank.com"
  },
  {
    id: "ven_003",
    name: "MTN Nigeria",
    logo: "https://logo.clearbit.com/mtn.ng"
  },
  {
    id: "ven_004",
    name: "Flutterwave",
    logo: "https://logo.clearbit.com/flutterwave.com"
  },
  {
    id: "ven_005",
    name: "Jumia",
    logo: "https://logo.clearbit.com/jumia.com.ng"
  }
];

const VendorList = () => {

  const [vendors, setVendors] = useState<vendorType[]>([
    {
      id: "ven_001",
      name: "Dangote Group",
      logo: "https://logo.clearbit.com/dangote.com"
    },
    {
      id: "ven_002",
      name: "GTBank",
      logo: "https://logo.clearbit.com/gtbank.com"
    },
    {
      id: "ven_003",
      name: "MTN Nigeria",
      logo: "https://logo.clearbit.com/mtn.ng"
    },
    {
      id: "ven_004",
      name: "Flutterwave",
      logo: "https://logo.clearbit.com/flutterwave.com"
    },
    {
      id: "ven_005",
      name: "Jumia",
      logo: "https://logo.clearbit.com/jumia.com.ng"
    }
  ])
  const [loading, setLoading] = useState(true)
  const skeletonProps = useSkeletonCommonProps();
  const dummy = new Array(4).fill(null)

  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (!hasFetched) {
      fetchVendors()
    } else {
      setVendors(cachedVendors)
      setLoading(false);
    }
  }, []);
    
  const fetchVendors = async () => {
    setLoading(true)
    try {
    } catch (error: any) {
        
    } finally {
      setLoading(false)
    }
  }

    
  const gotToVendorProduct = (id: string) => {
    router.push({
      pathname: "/(protected)/(routes)/NaijaShopVendorProducts",
      params: { id }
    });
  }

  return (
    <View style={{ paddingTop: 10, paddingBottom: 20, borderBottomRightRadius: 18, borderBottomLeftRadius: 18 }}>
      <View className='w-full px-4 pb-2 flex-row items-center justify-between gap-1'>
        <Text className='font-abold text-xl'>Latest News & Events</Text>
        <Pressable className='px-1' onPress={() => router.push("/(protected)/(routes)/(modals)/NaijaShopVendorListModal")}>
          <Text className='font-abold text-blue text-xl'>All</Text>
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
          <View style={{ width: 130 }}>
            <Skeleton.Group show={loading}>
              <Skeleton height={130} width={130} radius={10} {...skeletonProps} />
            </Skeleton.Group>
          </View>
          )}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        />
    ) : (
      <FlatList
        data={vendors}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable className='p-2 items-center bg-gray-50 rounded-md' style={{ minWidth: 100 }} onPress={() => gotToVendorProduct(item?.id)}>
            <Image
              style={{width:50, height:50, borderRadius: 25}}
              source={{
                uri: item?.logo
              }}
              resizeMode={"contain"}
            />
            <Text className='font-abold text-center text-base mt-1 leading-4 max-w-24' numberOfLines={3}>{item?.name}</Text>
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center px-2 py-8 bg-gray-50 rounded-md" style={{width: width - 24}}>
            <Text className="text-xl font-extrabold">
                No Vendor Found
            </Text>
            <Text className="text-sm text-center mt-1">
                All vendors will show here.
            </Text>
          </View>
        )}
        scrollEnabled={true}
        nestedScrollEnabled={true}
      />
    )}
    </View>
  )
}

export default VendorList
