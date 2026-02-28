import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { router, useLocalSearchParams  } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import OTPTextInput from "react-native-otp-textinput";
import { images } from '@/constants'
// import Modal from '@/components/Modal'
// import { useToast } from 'react-native-toast-notifications'
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import CountDown from 'react-native-countdown-component';
import { Platform } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
// import { axiosClient } from '@/globalApi'
// import * as SecureStore from "expo-secure-store";
// import AsyncStorage from '@react-native-async-storage/async-storage'

const Terms = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = () => {

    }

  return (
    <SafeAreaView className="bg-white h-full px-4">
      <View className='flex-row items-center justify-between mt-3 pb-3'>
        <TouchableOpacity onPress={() => router.back()}><AntDesign name="leftcircle" size={30} color="#C3C3C3"/></TouchableOpacity>
        <Image source={images.logo}/>
        <View className='w-10'/>
      </View>
      <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-full justify-center my-6 mt-6">
            <Text className="text-2xl text-center text-green mt-4 mb-8 font-rbold">Terms & Conditions</Text>
            <View>
              <Text className='mb-2 font-rbold'>Last Updated: [June, 2024]</Text>
              <Text className='text-justify font-rmedium mb-6'>
                <Text className='font-rbold'>1. Acceptance of Terms By downloading, accessing, or using the ArdVest, </Text>you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with these Terms, you must not use the App.
              </Text>
              <Text className='text-justify font-rmedium mb-6'>
                <Text className='font-rbold'>2. Account Registration a. Eligibility: </Text>To create an account, you must be at least 18 years old and legally capable of entering into binding contracts. b. Account Information: You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. c. Account Security: You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.
              </Text>
              <Text className='text-justify font-rmedium mb-6'>
                <Text className='font-rbold'>3. Investment Risks a. General Risk: </Text>Investing in agricultural projects involves risk, including the potential loss of your investment. You acknowledge and agree that you are solely responsible for your investment decisions. b. No Guarantees: The performance of investments through the App is not guaranteed. Past performance is not indicative of future results.
              </Text>
              <Text className='text-justify font-rmedium mb-6'>
                <Text className='font-rbold'>4. Use of the App a. Permitted Use: </Text>You may use the App for lawful purposes and in accordance with these Terms. b. Prohibited Activities: You agree not to use.
              </Text>
              
            </View>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <View className='w-full justify-center my-3'>
      <CustomButton title="Accept" handlePress={() => router.push('/(onboarding)/SetPin')} containerStyles="w-full mb-3" isLoading={isSubmitting} textStyles='text-white'/>
      <CustomButton title="Cancel" handlePress={() => router.push("/(onboarding)")} containerStyles="w-full" isLoading={isSubmitting} bgColor='bg-red-100' textStyles='text-red-500'/>
    </View>

    <StatusBar style='dark'/>
  </SafeAreaView>
  )
}


export default Terms

