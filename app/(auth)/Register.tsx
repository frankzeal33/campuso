import AuthHeader from '@/components/AuthHeader'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import Checkbox from 'expo-checkbox'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Register = () => {

  const { bottom } = useSafeAreaInsets();
  const [isChecked, setChecked] = useState(false);

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
              <Text className="text-2xl text-center text-green font-msbold">Register as</Text>
              <FormField title="Email Address" value={form.email} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address"/>
              <FormField title="Phone Number" value={form.phoneNumber} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, phoneNumber: e })} otherStyles="mt-7" keyboardType="phone-pad"/>
              <FormField title="Password" value={form.password} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, password: e })} otherStyles="mt-7"/>
              <FormField title="Confirm Password" value={form.confirmPassword} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, confirmPassword: e })} otherStyles="mt-7"/>
              <View className='w-full flex-row items-start gap-2 mt-7'>
                <Checkbox value={isChecked} onValueChange={setChecked} color='#008751' style={{borderRadius: 5}}/>
                <View className="flex-row flex-wrap flex-1 w-full -mt-1">
                  <Text className="font-mregular">By checking this box, you totally accept the </Text>
                  <TouchableOpacity>
                    <Text className="text-green font-msbold">terms & conditions</Text>
                  </TouchableOpacity>
                  <Text className="font-mregular"> of Campuso</Text>
                </View>
              </View>
            </View>
            <View className='w-full justify-center mt-3' style={{ paddingBottom: bottom + 20 }}>
              <CustomButton title="Continue" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
              <View className="mt-6 flex-row gap-1 flex-wrap items-center justify-center">
                <Text className="text-sm text-center font-msbold">Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
                  <Text className="text-green font-msbold">Login</Text>
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

export default Register
