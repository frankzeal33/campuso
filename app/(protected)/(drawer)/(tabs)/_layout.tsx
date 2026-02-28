import { FontAwesome, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabsLayout = () => {

  const navigation = useNavigation();

   const {top, bottom} = useSafeAreaInsets()

   const bottomHeight = Platform.OS === 'ios' ? bottom : bottom + 10

   const marginX = Platform.OS === 'ios' ? 10 : 12

   const openDrawer = () => {
      navigation.dispatch(DrawerActions.toggleDrawer());
    };

  return (
    <>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarShowLabel: true,
            tabBarActiveTintColor: '#218225',
            tabBarInactiveTintColor: '#21822566',
            tabBarLabelStyle: {
              fontFamily: 'Raleway-Bold',
              fontSize: 11
            },

            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Home") {
                return (
                  <Ionicons
                    name={focused ? "home" : "home-outline"}
                    size={size}
                    color={color}
                  />
                );
              }

              if (route.name === "CreateAgent") {
                return (
                  <MaterialIcons
                    name="support-agent"
                    size={size}
                    color={color}
                  />
                );
              }

              if (route.name === "MyAgent") {
                return (
                  <Fontisto
                    name={focused ? "world" : "world-o"}
                    size={size}
                    color={color}
                  />
                );
              }

              if (route.name === "History") {
                return (
                  <MaterialCommunityIcons
                    name="history"
                    size={size}
                    color={color}
                  />
                );
              }

              if (route.name === "Profile") {
                return (
                  <FontAwesome
                    name={focused ? "user" : "user-o"}
                    size={size}
                    color={color}
                  />
                );
              }

              return <Ionicons name="ellipse-outline" size={size} color={color} />;
            },

            tabBarStyle: {
              backgroundColor: '#ffffff',
              height: 70,
              paddingBottom: 8,
              paddingTop: 8,
              position: 'absolute',
              bottom: bottomHeight,
              borderWidth: 1,
              borderColor: '#DDDDDD',
              marginHorizontal: marginX,
              borderRadius: 6,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 6
            }
          })}
        >
          <Tabs.Screen name="Home" options={{ title: "Home" }} />
          <Tabs.Screen name="CreateAgent" options={{ title: "Create Agent" }} />
          <Tabs.Screen name="MyAgent" options={{ title: "My Agent" }} />
          <Tabs.Screen name="History" options={{ title: "History" }} />
          <Tabs.Screen name="Profile" options={{ title: "Profile" }} 
            listeners={() => ({
              tabPress: (e) => {
                e.preventDefault()
                openDrawer()
              }
            })}
          />
        </Tabs>
    </>
  )
}

export default TabsLayout