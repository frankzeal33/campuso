import AuthHeader from '@/components/AuthHeader'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ResetPassword = () => {

  
  const { bottom } = useSafeAreaInsets();

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState("")

  const submit = async () => {
    router.push('/(auth)/ResetPasswordOTP')
   
  }

  return (
    <View className="flex-1 bg-green">
      <AuthHeader/>
      <View className='flex-1 bg-white px-5 rounded-t-3xl'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
          <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
            <View className="w-full justify-center my-6">
              <Text className="text-2xl text-center text-green font-msbold">Reset your password</Text>
              <Text className="text-sm text-center font-mregular mb-8">Enter your email address and we’ll send you a reset code</Text>
              <FormField title="Email Address" value={email} placeholder="Enter here" handleChangeText={(e: any) => setEmail(e)} otherStyles="mt-7" keyboardType="email-address"/>
            </View>
            <View className='w-full justify-center mt-3' style={{ paddingBottom: bottom + 20 }}>
              <CustomButton title="Request OTP" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
              <View className="mt-6 w-full flex-row gap-1 flex-wrap items-center justify-center">
                <Text className="text-sm text-center font-msbold">Was this request a mistake?</Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
                  <Text className="text-green font-msbold">Back to Login</Text>
                </TouchableOpacity >
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <StatusBar style='light'/>
    </View>
  )
}


export default ResetPassword
