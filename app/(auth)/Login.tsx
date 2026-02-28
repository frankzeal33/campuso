import AuthHeader from '@/components/AuthHeader'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Login = () => {

  const { bottom } = useSafeAreaInsets();

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    referral: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    router.push("/(auth)/RegisterOTP")

  }

  return (
    <View className="flex-1 bg-green">
      <AuthHeader/>
      <View className='flex-1 bg-white px-5 rounded-t-3xl'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
          <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
            <View className="w-full justify-center my-6">
              <Text className="text-2xl text-center text-green font-msbold">Welcome Back!</Text>
              <FormField title="Email Address" value={form.email} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address"/>
              <FormField title="Password" value={form.password} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, password: e })} otherStyles="mt-7"/>
              <View className="justify-end pt-3 flex-row gap-1">
                <TouchableOpacity onPress={() => router.push("/(auth)/ResetPassword")}><Text className='text-base text-green font-msbold'>Forgot Password?</Text></TouchableOpacity>
              </View>
            </View>
            <View className='w-full mt-3' style={{ paddingBottom: bottom + 20 }}>
              <View className='flex-row w-full items-center gap-4'>
                <CustomButton title="Log In" handlePress={submit} containerStyles="w-[78%]" isLoading={isSubmitting} textStyles='text-white'/>
                <Entypo name="fingerprint" size={50} color="#218225" className='w-[18%] mx-auto'/>
              </View>
              <View className="mt-6 flex-row gap-1 flex-wrap items-center justify-center">
                <Text className="text-sm text-center font-msbold">Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/Register")}>
                  <Text className="text-green font-msbold">Register</Text>
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

export default Login

