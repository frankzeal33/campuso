import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { DrawerItem } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomDrawerContent = (props: any) => {

  const {top, bottom} = useSafeAreaInsets()
    const pathname = usePathname();
    
    const openDrawer = () => {
      props.navigation.toggleDrawer();
    }
  
    return (
      <View className="flex-1">
        <ScrollView {...props} contentContainerStyle={{flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className="bg-green-drawer px-6 h-52 relative" style={{ paddingTop: top + 15}}>
            <TouchableOpacity onPress={openDrawer} className="ml-auto items-center justify-center size-10 rounded-full bg-white">
              <Entypo name="chevron-small-left" size={32} color="#000000" />
            </TouchableOpacity>
            <View className='flex-row gap-3 items-start absolute -bottom-6 left-6'>
              <View className='size-[80px] bg-green rounded-full items-center justify-center z-10'>
                <Text className="text-white font-mblack text-4xl">OD</Text>
              </View>
              <View>
                <Text className="text-lg font-mbold max-w-56" numberOfLines={1}>Oladapo Koiki</Text>
                <Text className="text-sm font-mregular max-w-56" numberOfLines={1}>bjkoiki19@gmail.com</Text>
              </View>
            </View>
          </View>
          
          <View className="bg-white flex-1 px-2 pt-14 py-6">
            <DrawerItem
              icon={({ color, size }) => (
                <View className={`flex items-center justify-center size-12 rounded-full bg-green-drawer`}>
                  <FontAwesome name="user" color={"#218225"} size={26}/>
                </View>
              )}
              label={"User Profile"}
              labelStyle={[
                styles.navItemLabel,
                { fontFamily: pathname === "/home" ? "Raleway-Bold" : "Raleway-Regular" },
                { color: pathname === "/home" ? "#218225" : "#000" },
              ]}
              style={{borderBottomWidth: 1, borderBottomColor: "#ccc"}}
              onPress={() => {
                router.push("/(drawer)/(routes)/UserProfile");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <View className={`flex items-center justify-center size-12 rounded-full bg-green-drawer`}>
                  <MaterialIcons name="print" color={"#218225"} size={26}/>
                </View>
              )}
              label={"Withdrawal Account"}
              labelStyle={[
                styles.navItemLabel,
                { fontFamily: pathname === "/transactions" ? "Raleway-Bold" : "Raleway-Regular" },
                { color: pathname === "/transactions" ? "#218225" : "#000" },
              ]}
              style={{borderBottomWidth: 1, borderBottomColor: "#ccc"}}
              onPress={() => {
                router.push("/(drawer)/(routes)/WithdrawalAccount");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <View className={`flex items-center justify-center size-12 rounded-full bg-green-drawer`}>
                  <Fontisto name="locked" color={"#218225"} size={24}/>
                </View>
              )}
              label={"Security"}
              labelStyle={[
                styles.navItemLabel,
                { fontFamily: pathname === "/transactions" ? "Raleway-Bold" : "Raleway-Regular" },
                { color: pathname === "/transactions" ? "#218225" : "#000" },
              ]}
              style={{borderBottomWidth: 1, borderBottomColor: "#ccc"}}
              onPress={() => {
                router.push("/(drawer)/(routes)/Secutity");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <View className={`flex items-center justify-center size-12 rounded-full bg-green-drawer`}>
                  <Octicons name="bell-fill" color={"#218225"} size={24}/>
                </View>
              )}
              label={"Notification"}
              labelStyle={[
                styles.navItemLabel,
                { fontFamily: pathname === "/transactions" ? "Raleway-Bold" : "Raleway-Regular" },
                { color: pathname === "/transactions" ? "#218225" : "#000" },
              ]}
              style={{borderBottomWidth: 1, borderBottomColor: "#ccc"}}
              onPress={() => {
                router.push("/(drawer)/(routes)/Notifications");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <View className={`flex items-center justify-center size-12 rounded-full bg-green-drawer`}>
                  <FontAwesome5 name="headphones" color={"#218225"} size={24}/>
                </View>
              )}
              label={"Support"}
              labelStyle={[
                styles.navItemLabel,
                { fontFamily: pathname === "/transactions" ? "Raleway-Bold" : "Raleway-Regular" },
                { color: pathname === "/transactions" ? "#218225" : "#000" },
              ]}
              onPress={() => {
                router.push("/(drawer)/(routes)/Support");
              }}
            />
          </View>
        </ScrollView>
        <View style={{marginBottom: bottom + 10}} className="px-8 pt-4 flex-row gap-2 justify-between items-center opacity-50">
          <TouchableOpacity onPress={() => router.replace('/(onboarding)/SignIn')} className="flex-row gap-3 justify-between items-center">
            <View className={`flex items-center justify-center size-11 rounded-full bg-red-500`}>
              <FontAwesome name="power-off" color={"#ffffff"} size={24}/>
            </View>
            <Text className="text-red-500 font-mmedium text-xl">Logout</Text>
          </TouchableOpacity>
          <Text className="text-lg">V.1</Text>
        </View>
      </View>
    );
  };

export default CustomDrawerContent
  
const styles = StyleSheet.create({
  navItemLabel: {
    fontSize: 16,
  }
})