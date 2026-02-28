import AuthHeader from '@/components/AuthHeader'
import Provider from '@/screens/register/Provider'
import Student from '@/screens/register/Student'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'

const Register = () => {

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  
  const renderScene = SceneMap({
    first: Student,
    second: Provider
  });
  
  const routes = [
    { key: 'first', title: 'Student' },
    { key: 'second', title: 'Provider' }
  ];

  // Render the custom tab bar
  const renderTabBar = (props: any) => {
    const { routes, index } = props.navigationState;

    return (
      <View className="border-b-2 border-gray-100">
        <View className="flex-row">
          {routes.map((route: any, i: number) => {
            const isFocused = index === i;

            return (
              <TouchableOpacity
                key={route.key}
                className="flex-1 items-center py-2"
                onPress={() => props.jumpTo(route.key)}
              >
                <Text
                  className={`text-base font-msbold ${
                    isFocused ? "text-green" : "text-gray-300"
                  }`}
                >
                  {route.title}
                </Text>

                {/* Active indicator */}
                {isFocused && (
                  <View className="absolute -bottom-0.5 w-full h-[2px] bg-green" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-green">
      <AuthHeader/>
      <View className='flex-1 bg-white px-5 rounded-t-3xl'>
        <Text className="text-2xl text-center text-green font-msbold py-4">Register as</Text>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{ width: layout.width }}
        />
      </View>
      <StatusBar style='light'/>
    </View>
  )
}

export default Register
