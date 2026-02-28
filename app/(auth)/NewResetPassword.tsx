import AuthHeader from '@/components/AuthHeader'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const NewResetPassword = () => {

  const { bottom } = useSafeAreaInsets();

  const [form, setForm] = useState({
    newPassword: '',
    confirmNewPassword: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    router.push("/(auth)/Login")

  }

  return (
    <View className="flex-1 bg-green">
      <AuthHeader/>
      <View className='flex-1 bg-white px-5 rounded-t-3xl'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
          <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
            <View className="w-full justify-center my-6">
              <Text className="text-2xl text-center text-green font-msbold">Change your password</Text>
              <Text className="text-sm text-center font-mregular mb-8">Enter your new password and confirm as well</Text>
              <FormField title="New Password" value={form.newPassword} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, newPassword: e })} otherStyles="mt-7"/>
              <FormField title="Confirm New Password" value={form.confirmNewPassword} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, confirmNewPassword: e })} otherStyles="mt-7"/>
            </View>
            <View className='w-full justify-center mt-3' style={{ paddingBottom: bottom + 20 }}>
              <CustomButton title="Reset Password" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
              <View className="mt-6 flex-row gap-1 flex-wrap items-center justify-center">
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

export default NewResetPassword
